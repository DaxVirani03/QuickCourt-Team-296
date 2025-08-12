const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  facility: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Facility',
    required: true
  },
  court: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Court',
    required: true
  },
  date: {
    type: Date,
    required: [true, 'Booking date is required']
  },
  startTime: {
    type: String,
    required: [true, 'Start time is required'],
    match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please enter a valid time format (HH:MM)']
  },
  endTime: {
    type: String,
    required: [true, 'End time is required'],
    match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please enter a valid time format (HH:MM)']
  },
  duration: {
    type: Number, // in hours
    required: true
  },
  participants: [{
    name: String,
    email: String,
    phone: String
  }],
  pricing: {
    basePrice: {
      type: Number,
      required: true
    },
    totalPrice: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      default: 'INR'
    },
    appliedMultipliers: [{
      type: String,
      value: Number
    }]
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed', 'no-show'],
    default: 'pending'
  },
  payment: {
    method: {
      type: String,
      enum: ['credit_card', 'debit_card', 'paypal', 'cash', 'online'],
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending'
    },
    transactionId: String,
    amount: Number,
    currency: {
      type: String,
      default: 'INR'
    },
    paidAt: Date
  },
  specialRequests: {
    type: String,
    maxlength: [500, 'Special requests cannot exceed 500 characters']
  },
  cancellation: {
    isCancelled: {
      type: Boolean,
      default: false
    },
    cancelledBy: {
      type: String,
      enum: ['user', 'facility_owner', 'admin', 'system']
    },
    cancelledAt: Date,
    reason: String,
    refundAmount: Number,
    refundStatus: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending'
    }
  },
  checkIn: {
    checkedIn: {
      type: Boolean,
      default: false
    },
    checkedInAt: Date,
    checkedInBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  checkOut: {
    checkedOut: {
      type: Boolean,
      default: false
    },
    checkedOutAt: Date,
    checkedOutBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  notes: {
    user: String,
    facility: String,
    admin: String
  },
  rating: {
    given: {
      type: Boolean,
      default: false
    },
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    review: String,
    reviewedAt: Date
  }
}, {
  timestamps: true
});

// Indexes for better query performance
bookingSchema.index({ user: 1 });
bookingSchema.index({ facility: 1 });
bookingSchema.index({ court: 1 });
bookingSchema.index({ date: 1 });
bookingSchema.index({ status: 1 });
bookingSchema.index({ 'payment.status': 1 });
bookingSchema.index({ 'cancellation.isCancelled': 1 });
bookingSchema.index({ user: 1, date: 1 });
bookingSchema.index({ court: 1, date: 1, startTime: 1, endTime: 1 });

// Virtual for booking duration in hours
bookingSchema.virtual('durationHours').get(function() {
  const start = new Date(`2000-01-01T${this.startTime}`);
  const end = new Date(`2000-01-01T${this.endTime}`);
  return (end - start) / (1000 * 60 * 60);
});

// Virtual for formatted date
bookingSchema.virtual('formattedDate').get(function() {
  return this.date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

// Virtual for time slot
bookingSchema.virtual('timeSlot').get(function() {
  return `${this.startTime} - ${this.endTime}`;
});

// Method to check if booking is in the past
bookingSchema.methods.isPast = function() {
  const now = new Date();
  const bookingDateTime = new Date(this.date);
  bookingDateTime.setHours(parseInt(this.endTime.split(':')[0]));
  bookingDateTime.setMinutes(parseInt(this.endTime.split(':')[1]));
  return bookingDateTime < now;
};

// Method to check if booking can be cancelled
bookingSchema.methods.canBeCancelled = function() {
  if (this.status !== 'confirmed' && this.status !== 'pending') {
    return false;
  }
  
  const now = new Date();
  const bookingDateTime = new Date(this.date);
  bookingDateTime.setHours(parseInt(this.startTime.split(':')[0]));
  bookingDateTime.setMinutes(parseInt(this.startTime.split(':')[1]));
  
  // Can cancel up to 24 hours before booking
  const cancellationDeadline = new Date(bookingDateTime.getTime() - 24 * 60 * 60 * 1000);
  return now < cancellationDeadline;
};

// Method to calculate refund amount
bookingSchema.methods.calculateRefundAmount = function() {
  if (!this.cancellation.isCancelled) {
    return 0;
  }
  
  const now = new Date();
  const bookingDateTime = new Date(this.date);
  bookingDateTime.setHours(parseInt(this.startTime.split(':')[0]));
  bookingDateTime.setMinutes(parseInt(this.startTime.split(':')[1]));
  
  const hoursUntilBooking = (bookingDateTime - now) / (1000 * 60 * 60);
  
  if (hoursUntilBooking >= 24) {
    // Full refund if cancelled 24+ hours before
    return this.pricing.totalPrice;
  } else if (hoursUntilBooking >= 2) {
    // 50% refund if cancelled 2-24 hours before
    return this.pricing.totalPrice * 0.5;
  } else {
    // No refund if cancelled less than 2 hours before
    return 0;
  }
};

// Pre-save middleware to calculate duration
bookingSchema.pre('save', function(next) {
  if (this.startTime && this.endTime) {
    const start = new Date(`2000-01-01T${this.startTime}`);
    const end = new Date(`2000-01-01T${this.endTime}`);
    this.duration = (end - start) / (1000 * 60 * 60);
  }
  next();
});

module.exports = mongoose.model('Booking', bookingSchema); 