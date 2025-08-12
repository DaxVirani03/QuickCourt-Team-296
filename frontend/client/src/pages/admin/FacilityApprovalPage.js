import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, MapPin, Phone, Mail, CheckCircle, XCircle, Eye, Image as ImageIcon, Search } from 'lucide-react';

const mockPending = [
  {
    id: 'FAC-001',
    name: 'Surat Indoor Stadium',
    ownerName: 'Ravi Patel',
    email: 'ravi@example.com',
    phone: '+91 98765 43210',
    address: 'Athwa, Surat, Gujarat, 395007',
    sports: ['Basketball', 'Badminton'],
    amenities: ['Parking', 'WiFi', 'Showers'],
    basePricePerHour: 800,
    photos: ['/images/1.jpg', '/images/3.jpg'],
    submittedAt: '2024-01-15 10:20',
  },
  {
    id: 'FAC-002',
    name: 'Lalbhai Tennis Academy',
    ownerName: 'Neha Shah',
    email: 'neha@example.com',
    phone: '+91 99876 54321',
    address: 'Piplod, Surat, Gujarat, 395007',
    sports: ['Tennis'],
    amenities: ['Locker Rooms', 'Pro Shop', 'Cafe'],
    basePricePerHour: 1200,
    photos: ['/images/2.jpg'],
    submittedAt: '2024-01-15 12:05',
  },
];

const FacilityApprovalPage = () => {
  const [pending, setPending] = useState([]);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    // TODO: fetch from backend
    setPending(mockPending);
  }, []);

  const filtered = pending.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.ownerName.toLowerCase().includes(search.toLowerCase()) ||
    p.id.toLowerCase().includes(search.toLowerCase())
  );

  const approve = (id) => {
    // TODO: call backend approve
    setPending(prev => prev.filter(p => p.id !== id));
  };

  const reject = (id) => {
    // TODO: call backend reject
    setPending(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Facility Approval</h1>
              <p className="text-gray-600 mt-1">Review and approve pending facility submissions</p>
            </div>
            <Link to="/admin/dashboard" className="text-sm font-medium text-primary-600 hover:text-primary-500">Back to Dashboard</Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search */}
        <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by facility, owner, or ID..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>

        {/* Pending list */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filtered.map(f => (
            <div key={f.id} className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center space-x-3">
                    <Building2 className="w-5 h-5 text-gray-400" />
                    <h3 className="text-lg font-semibold text-gray-900">{f.name}</h3>
                    <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">Pending</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Submitted: {f.submittedAt} • ID: {f.id}</p>
                </div>
                <div className="flex -space-x-2">
                  {f.photos.slice(0, 3).map((src, i) => (
                    <img key={i} src={src} alt="preview" className="w-10 h-10 rounded-lg border object-cover" />
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center text-gray-700"><MapPin className="w-4 h-4 mr-2 text-gray-400" />{f.address}</div>
                <div className="flex items-center text-gray-700"><Phone className="w-4 h-4 mr-2 text-gray-400" />{f.phone}</div>
                <div className="flex items-center text-gray-700"><Mail className="w-4 h-4 mr-2 text-gray-400" />{f.email}</div>
                <div className="text-gray-700">Sports: {f.sports.join(', ')}</div>
                <div className="text-gray-700">Amenities: {f.amenities.join(', ')}</div>
                <div className="text-gray-700">Base Price: ₹{f.basePricePerHour}</div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <button onClick={() => setSelected(f)} className="inline-flex items-center text-primary-600 hover:text-primary-500">
                  <Eye className="w-4 h-4 mr-2" /> View Details
                </button>
                <div className="space-x-2">
                  <button onClick={() => reject(f.id)} className="inline-flex items-center px-3 py-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50">
                    <XCircle className="w-4 h-4 mr-1" /> Reject
                  </button>
                  <button onClick={() => approve(f.id)} className="inline-flex items-center px-3 py-2 rounded-lg border border-green-200 text-green-700 hover:bg-green-50">
                    <CheckCircle className="w-4 h-4 mr-1" /> Approve
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center text-gray-600">No pending submissions</div>
        )}
      </div>

      {/* Details Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-xl shadow-xl border max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">{selected.name} • {selected.id}</h3>
              <button onClick={() => setSelected(null)} className="text-gray-500 hover:text-gray-700">Close</button>
            </div>
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {selected.photos.map((src, i) => (
                    <img key={i} src={src} alt="photo" className="w-full h-24 object-cover rounded-lg border" />
                  ))}
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-gray-700"><MapPin className="w-4 h-4 mr-2 text-gray-400" />{selected.address}</div>
                  <div className="flex items-center text-gray-700"><Phone className="w-4 h-4 mr-2 text-gray-400" />{selected.phone}</div>
                  <div className="flex items-center text-gray-700"><Mail className="w-4 h-4 mr-2 text-gray-400" />{selected.email}</div>
                </div>
              </div>
              <div className="text-sm">
                <p className="text-gray-700"><strong>Owner:</strong> {selected.ownerName}</p>
                <p className="text-gray-700"><strong>Sports:</strong> {selected.sports.join(', ')}</p>
                <p className="text-gray-700"><strong>Amenities:</strong> {selected.amenities.join(', ')}</p>
                <p className="text-gray-700"><strong>Base Price:</strong> ₹{selected.basePricePerHour}</p>
                <div className="mt-4 flex items-center justify-end space-x-2">
                  <button onClick={() => { setSelected(null); reject(selected.id); }} className="inline-flex items-center px-3 py-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50">
                    <XCircle className="w-4 h-4 mr-1" /> Reject
                  </button>
                  <button onClick={() => { setSelected(null); approve(selected.id); }} className="inline-flex items-center px-3 py-2 rounded-lg border border-green-200 text-green-700 hover:bg-green-50">
                    <CheckCircle className="w-4 h-4 mr-1" /> Approve
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacilityApprovalPage;
