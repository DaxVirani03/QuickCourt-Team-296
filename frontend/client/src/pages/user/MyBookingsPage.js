import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Calendar, Clock, MapPin, BadgeCheck, XCircle } from 'lucide-react';

const statusBadge = (status) => {
  const map = {
    confirmed: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    cancelled: 'bg-red-100 text-red-800',
    completed: 'bg-blue-100 text-blue-800'
  };
  return map[status] || 'bg-gray-100 text-gray-800';
};

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadBookings = async () => {
    try {
      const res = await axios.get('/api/bookings/me');
      setBookings(res.data.bookings || []);
    } catch (err) {
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const canCancel = (b) => {
    if (!['pending', 'confirmed'].includes(b.status)) return false;
    const dt = new Date(b.date);
    const [h, m] = b.startTime.split(':');
    dt.setHours(parseInt(h, 10));
    dt.setMinutes(parseInt(m, 10));
    const deadline = new Date(dt.getTime() - 24 * 60 * 60 * 1000);
    return new Date() < deadline;
  };

  const cancelBooking = async (id) => {
    try {
      await axios.post(`/api/bookings/${id}/cancel`);
      toast.success('Booking cancelled');
      loadBookings();
    } catch (err) {
      const msg = err?.response?.data?.message || 'Failed to cancel';
      toast.error(msg);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">My Bookings</h1>

        {bookings.length === 0 ? (
          <div className="bg-white border rounded-xl p-8 text-center text-gray-600">No bookings yet.</div>
        ) : (
          <div className="space-y-4">
            {bookings.map((b) => (
              <div key={b._id} className="bg-white border rounded-xl p-6 flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusBadge(b.status)}`}>{b.status}</span>
                    <div className="text-sm text-gray-500">₹{b.pricing?.totalPrice?.toLocaleString?.() || 0}</div>
                  </div>
                  <div className="text-lg font-semibold text-gray-900">
                    {b.facility?.name} • {b.court?.name}
                  </div>
                  <div className="text-sm text-gray-600 capitalize">{b.court?.sport}</div>
                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-gray-600">
                    <div className="flex items-center"><Calendar className="w-4 h-4 mr-2" />{new Date(b.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}</div>
                    <div className="flex items-center"><Clock className="w-4 h-4 mr-2" />{b.startTime} - {b.endTime}</div>
                    <div className="flex items-center"><MapPin className="w-4 h-4 mr-2" />Booking ID: {b._id.slice(-6)}</div>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 flex items-center gap-3">
                  {canCancel(b) ? (
                    <button onClick={() => cancelBooking(b._id)} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-red-700 border-red-200 hover:bg-red-50">
                      <XCircle className="w-4 h-4" /> Cancel
                    </button>
                  ) : (
                    <div className="text-xs text-gray-500">Cancellation not available</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookingsPage;
