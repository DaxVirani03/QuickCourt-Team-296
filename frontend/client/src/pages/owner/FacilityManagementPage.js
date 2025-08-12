import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, MapPin, Phone, Mail, Globe2, Image as ImageIcon, Trash2, CheckCircle, Clock, IndianRupee, Dumbbell, Wifi, Car, Coffee, ShowerHead, Shield } from 'lucide-react';
import toast from 'react-hot-toast';

const SPORTS = ['Basketball','Tennis','Football','Cricket','Badminton','Volleyball','Table Tennis','Squash','Swimming','Gym'];
const AMENITIES = [
  { key: 'parking', label: 'Parking', icon: Car },
  { key: 'wifi', label: 'WiFi', icon: Wifi },
  { key: 'cafe', label: 'Cafe', icon: Coffee },
  { key: 'showers', label: 'Showers', icon: ShowerHead },
  { key: 'equipment', label: 'Equipment Rental', icon: Dumbbell },
  { key: 'security', label: 'Security', icon: Shield },
];

const FacilityManagementPage = () => {
  const [form, setForm] = useState({
    name: '', description: '', phone: '', email: '', website: '', address: '', city: '', state: '', pincode: '', basePricePerHour: '',
    openingHours: { monday:'06:00 - 23:00', tuesday:'06:00 - 23:00', wednesday:'06:00 - 23:00', thursday:'06:00 - 23:00', friday:'06:00 - 23:00', saturday:'06:00 - 23:00', sunday:'06:00 - 23:00' }
  });
  const [sports, setSports] = useState([]);
  const [amenities, setAmenities] = useState({});
  const [photos, setPhotos] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleHoursChange = (day, value) => setForm(prev => ({ ...prev, openingHours: { ...prev.openingHours, [day]: value } }));
  const toggleSport = (sport) => setSports(prev => prev.includes(sport) ? prev.filter(s => s !== sport) : [...prev, sport]);
  const toggleAmenity = (key) => setAmenities(prev => ({ ...prev, [key]: !prev[key] }));
  const handlePhotos = (e) => {
    const files = Array.from(e.target.files || []);
    const newPreviews = files.map(file => ({ file, url: URL.createObjectURL(file) }));
    setPhotos(prev => [...prev, ...files]);
    setPreviews(prev => [...prev, ...newPreviews]);
  };
  const removePhoto = (idx) => {
    setPhotos(prev => prev.filter((_, i) => i !== idx));
    setPreviews(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return toast.error('Facility name is required');
    if (!form.address.trim() || !form.city.trim() || !form.state.trim() || !form.pincode.trim()) return toast.error('Complete address is required');
    if (sports.length === 0) return toast.error('Select at least one supported sport');

    setSubmitting(true);
    try {
      const data = new FormData();
      Object.entries(form).forEach(([k, v]) => data.append(k, k === 'openingHours' ? JSON.stringify(v) : v));
      data.append('sports', JSON.stringify(sports));
      data.append('amenities', JSON.stringify(amenities));
      photos.forEach(file => data.append('photos', file));
      // TODO: POST to backend endpoint when available
      // await axios.post('/api/owner/facilities', data, { headers: { 'Content-Type': 'multipart/form-data' } });
      toast.success('Facility saved (mock). Backend integration pending.');
    } catch (err) {
      toast.error('Failed to save facility');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Facility Management</h1>
            <p className="text-gray-600 mt-1">Add and manage your facilities, photos, and details</p>
          </div>
          <Link to="/owner/dashboard" className="text-sm font-medium text-primary-600 hover:text-primary-500">Back to Dashboard</Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center"><Building2 className="w-5 h-5 mr-2 text-gray-400" />Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Facility Name</label>
                <input name="name" value={form.name} onChange={handleChange} placeholder="e.g., Sports Complex Central" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Website (optional)</label>
                <div className="relative">
                  <Globe2 className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input name="website" value={form.website} onChange={handleChange} placeholder="https://" className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500" />
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea name="description" value={form.description} onChange={handleChange} rows={4} placeholder="Describe your facility, surfaces, lighting, seating, etc." className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center"><MapPin className="w-5 h-5 mr-2 text-gray-400" />Contact & Address</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="contact@example.com" className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500" />
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <input name="address" value={form.address} onChange={handleChange} placeholder="Street address" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                <input name="city" value={form.city} onChange={handleChange} placeholder="City" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                <input name="state" value={form.state} onChange={handleChange} placeholder="State" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">PIN Code</label>
                <input name="pincode" value={form.pincode} onChange={handleChange} placeholder="e.g., 395007" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Supported Sports & Amenities</h2>
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-700 mb-2">Sports</p>
              <div className="flex flex-wrap gap-2">
                {SPORTS.map((sport) => (
                  <button type="button" key={sport} onClick={() => toggleSport(sport)} className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${sports.includes(sport) ? 'bg-primary-600 text-white border-primary-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}>{sport}</button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Amenities</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {AMENITIES.map(({ key, label, icon: Icon }) => (
                  <label key={key} className="flex items-center space-x-3 p-2 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input type="checkbox" className="h-4 w-4 text-primary-600 border-gray-300 rounded" checked={!!amenities[key]} onChange={() => toggleAmenity(key)} />
                    <Icon className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700">{label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center"><ImageIcon className="w-5 h-5 mr-2 text-gray-400" />Facility Photos</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Upload Images</label>
              <input type="file" multiple accept="image/*" onChange={handlePhotos} className="block w-full text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100" />
              <p className="text-xs text-gray-500 mt-2">You can upload multiple images. Max 5MB each. Formats: JPG, PNG, WEBP.</p>
            </div>
            {previews.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {previews.map((p, idx) => (
                  <div key={idx} className="relative group">
                    <img src={p.url} alt={`preview-${idx}`} className="w-full h-32 object-cover rounded-lg border" />
                    <button type="button" onClick={() => removePhoto(idx)} className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 hover:bg-white shadow text-gray-700" aria-label="Remove"><Trash2 className="w-4 h-4" /></button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Pricing & Opening Hours</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Base Price Per Hour</label>
                <div className="relative">
                  <IndianRupee className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input name="basePricePerHour" value={form.basePricePerHour} onChange={handleChange} placeholder="e.g., 800" className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Opening Hours</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {Object.entries(form.openingHours).map(([day, value]) => (
                    <div key={day} className="flex items-center">
                      <span className="w-24 capitalize text-sm text-gray-600">{day}</span>
                      <input value={value} onChange={(e) => handleHoursChange(day, e.target.value)} className="flex-1 ml-3 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3">
            <Link to="/owner/dashboard" className="px-4 py-2 rounded-lg border text-gray-700 hover:bg-gray-50">Cancel</Link>
            <button type="submit" disabled={submitting} className="inline-flex items-center px-5 py-2.5 rounded-lg text-white bg-primary-600 hover:bg-primary-700 disabled:opacity-50">
              {submitting ? (<><Clock className="w-4 h-4 mr-2 animate-spin" /> Saving...</>) : (<><CheckCircle className="w-4 h-4 mr-2" /> Save Facility</>)}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FacilityManagementPage;
