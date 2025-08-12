const express = require('express');
const { body, param, query, validationResult } = require('express-validator');
const router = express.Router();
const Booking = require('../models/Booking');
const Court = require('../models/Court');
const Facility = require('../models/Facility');
const { protect, authorize, requireVerification } = require('../middleware/auth');

// Helpers
const handleValidation = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
};

router.get('/health', (req, res) => {
  res.json({ ok: true, route: 'bookings' });
});

// Create booking (user)
router.post(
  '/',
  protect,
  [
    body('facilityId').exists().notEmpty().withMessage('facilityId is required'),
    body('courtId').exists().notEmpty().withMessage('courtId is required'),
    body('date').isISO8601().toDate().withMessage('Valid date required'),
    body('startTime').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage('startTime HH:MM'),
    body('durationHours').isFloat({ min: 0.5, max: 6 }).withMessage('durationHours between 0.5 and 6'),
    body('paymentMethod').isIn(['credit_card', 'debit_card', 'cash', 'online']).withMessage('Invalid payment method')
  ],
  async (req, res) => {
    const validation = handleValidation(req, res);
    if (validation) return validation;

    try {
      const { facilityId, courtId, date, startTime, durationHours, paymentMethod } = req.body;

      // Ensure facility and court exist; if not, create demo ones (useful for demo/mock links)
      const mongoose = require('mongoose');
      let facilityDoc = null;
      if (mongoose.Types.ObjectId.isValid(facilityId)) {
        facilityDoc = await Facility.findById(facilityId);
      }
      if (!facilityDoc) {
        facilityDoc = await Facility.create({
          name: 'Demo Facility',
          owner: req.user._id,
          description: 'Auto-created facility for demo booking',
          sports: ['basketball'],
          address: { street: 'N/A', city: 'N/A', state: 'N/A', zipCode: '000000', country: 'IN' },
          contact: { phone: '0000000000', email: req.user.email || 'demo@example.com' },
          pricing: { basePrice: 800, currency: 'INR' }
        });
      }

      let courtDoc = null;
      if (mongoose.Types.ObjectId.isValid(courtId)) {
        courtDoc = await Court.findById(courtId).populate('facility');
      }
      if (!courtDoc) {
        courtDoc = await Court.create({
          facility: facilityDoc._id,
          name: 'Demo Court',
          sport: 'basketball',
          courtNumber: '1',
          surface: 'hard',
          pricing: { basePrice: 800, currency: 'INR' }
        });
        // populate to use calculatePrice and facility later uniformly
        courtDoc = await Court.findById(courtDoc._id).populate('facility');
      }

      if (courtDoc.facility.toString() !== facilityDoc._id.toString() && courtDoc.facility?._id?.toString() !== facilityDoc._id.toString()) {
        return res.status(400).json({ success: false, message: 'Court does not belong to facility' });
      }

      const start = new Date(`2000-01-01T${startTime}`);
      const end = new Date(start.getTime() + durationHours * 60 * 60 * 1000);
      const endTime = `${String(end.getHours()).padStart(2, '0')}:${String(end.getMinutes()).padStart(2, '0')}`;

      // Conflict check: any booking overlapping same court/date/time
      const overlapping = await Booking.findOne({
        court: courtDoc._id,
        date: new Date(new Date(date).toDateString()),
        $or: [
          { startTime: { $lt: endTime }, endTime: { $gt: startTime } }
        ],
        status: { $in: ['pending', 'confirmed'] },
        'cancellation.isCancelled': { $ne: true }
      });
      if (overlapping) {
        return res.status(409).json({ success: false, message: 'Selected time overlaps with an existing booking' });
      }

      // Price calculation using court method, with safe fallback
      let totalPrice;
      try {
        totalPrice = Math.round(courtDoc.calculatePrice(new Date(date), startTime, endTime));
      } catch (e) {
        const startTmp = new Date(`2000-01-01T${startTime}`);
        const endTmp = new Date(`2000-01-01T${endTime}`);
        const hours = (endTmp - startTmp) / (1000 * 60 * 60);
        totalPrice = Math.round((courtDoc?.pricing?.basePrice || 800) * (hours || durationHours));
      }

    const booking = await Booking.create({
        user: req.user._id,
        facility: facilityDoc._id,
        court: courtDoc._id,
        date: new Date(new Date(date).toDateString()),
      startTime,
      endTime,
        duration: durationHours,
      pricing: {
          basePrice: courtDoc.pricing.basePrice,
        totalPrice,
          currency: 'INR'
      },
        status: 'confirmed',
      payment: {
          method: paymentMethod,
          status: 'completed',
        amount: totalPrice,
          currency: 'INR',
          transactionId: `SIM-${Date.now()}`,
          paidAt: new Date()
      }
    });

      const populated = await booking.populate([
        { path: 'facility', select: 'name' },
      { path: 'court', select: 'name sport' }
    ]);

      return res.status(201).json({ success: true, booking: populated });
    } catch (err) {
      console.error('Create booking error:', err);
      return res.status(500).json({ success: false, message: 'Server error', detail: err.message });
    }
  }
);

// Get my bookings (user)
router.get('/me', protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .sort({ date: -1, startTime: -1 })
      .populate({ path: 'facility', select: 'name' })
      .populate({ path: 'court', select: 'name sport' });
    return res.json({ success: true, bookings });
  } catch (err) {
    console.error('List my bookings error:', err);
    return res.status(500).json({ success: false, message: 'Server error', detail: err.message });
  }
});

// Cancel a booking (user can cancel own upcoming booking)
router.post(
  '/:id/cancel',
  protect,
  [param('id').isMongoId().withMessage('Valid booking id required')],
  async (req, res) => {
    const validation = handleValidation(req, res);
    if (validation) return validation;

    try {
      const booking = await Booking.findById(req.params.id);
      if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
      if (booking.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({ success: false, message: 'Not authorized' });
      }

      // Check can cancel (24h rule)
      const now = new Date();
      const bookingDateTime = new Date(booking.date);
      bookingDateTime.setHours(parseInt(booking.startTime.split(':')[0]));
      bookingDateTime.setMinutes(parseInt(booking.startTime.split(':')[1]));
      const deadline = new Date(bookingDateTime.getTime() - 24 * 60 * 60 * 1000);
      const isFutureAllowed = now < deadline && ['pending', 'confirmed'].includes(booking.status);
      if (!isFutureAllowed) {
        return res.status(400).json({ success: false, message: 'Booking cannot be cancelled now' });
      }

      booking.status = 'cancelled';
      booking.cancellation = {
        isCancelled: true,
        cancelledBy: 'user',
        cancelledAt: new Date(),
        reason: req.body?.reason || 'Cancelled by user'
      };

      // Simulated refund
      booking.payment.status = 'refunded';
    await booking.save();

      return res.json({ success: true, booking });
    } catch (err) {
      console.error('Cancel booking error:', err);
      return res.status(500).json({ success: false, message: 'Server error', detail: err.message });
    }
  }
);

module.exports = router; 