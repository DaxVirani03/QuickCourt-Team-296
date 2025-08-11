import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, 
  Star, 
  Clock, 
  Phone, 
  Mail, 
  Calendar,
  Users,
  Wifi,
  Car,
  Coffee,
  Shower,
  Dumbbell,
  Shield,
  ArrowLeft,
  Heart,
  Share2
} from 'lucide-react';

const VenueDetailPage = () => {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    // Mock data - replace with API call
    setTimeout(() => {
      setVenue({
        id: id,
        name: "Sports Complex Central",
        sport: "Basketball",
        price: 800,
        rating: 4.8,
        reviews: 124,
        location: "Downtown, City Center",
        description: "Professional basketball courts with excellent facilities. Perfect for both casual games and competitive matches. Our courts feature high-quality flooring, professional lighting, and comfortable seating areas.",
        images: [
          "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1592659762303-90081d34b277?w=800&h=600&fit=crop"
        ],
        amenities: [
          { name: "Parking", icon: Car, available: true },
          { name: "WiFi", icon: Wifi, available: true },
          { name: "Cafe", icon: Coffee, available: true },
          { name: "Showers", icon: Shower, available: true },
          { name: "Equipment Rental", icon: Dumbbell, available: true },
          { name: "Security", icon: Shield, available: true }
        ],
        courts: [
          { id: 1, name: "Basketball Court 1", price: 800, status: "available" },
          { id: 2, name: "Basketball Court 2", price: 800, status: "available" },
          { id: 3, name: "Basketball Court 3", price: 750, status: "maintenance" }
        ],
        reviews: [
          {
            id: 1,
            user: "John Doe",
            rating: 5,
            comment: "Excellent facilities! The courts are well-maintained and the staff is very friendly.",
            date: "2024-01-10"
          },
          {
            id: 2,
            user: "Jane Smith",
            rating: 4,
            comment: "Great place to play basketball. Good lighting and comfortable seating.",
            date: "2024-01-08"
          },
          {
            id: 3,
            user: "Mike Johnson",
            rating: 5,
            comment: "Best basketball courts in the city. Highly recommended!",
            date: "2024-01-05"
          }
        ],
        contact: {
          phone: "+91 98765 43210",
          email: "info@sportscomplex.com",
          address: "123 Sports Street, Downtown, City Center, 123456"
        },
        hours: {
          monday: "6:00 AM - 11:00 PM",
          tuesday: "6:00 AM - 11:00 PM",
          wednesday: "6:00 AM - 11:00 PM",
          thursday: "6:00 AM - 11:00 PM",
          friday: "6:00 AM - 11:00 PM",
          saturday: "6:00 AM - 11:00 PM",
          sunday: "6:00 AM - 11:00 PM"
        }
      });
      setLoading(false);
    }, 1000);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!venue) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Venue not found</h1>
          <Link to="/venues" className="text-primary-600 hover:text-primary-500">
            Back to venues
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <Link
              to="/venues"
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Venues
            </Link>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">{venue.name}</h1>
              <p className="text-gray-600">{venue.location}</p>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Heart className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden mb-8">
              <div className="relative h-96">
                <img
                  src={venue.images[selectedImage]}
                  alt={venue.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex space-x-2">
                    {venue.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`w-16 h-12 rounded-lg overflow-hidden border-2 ${
                          selectedImage === index ? 'border-white' : 'border-transparent'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${venue.name} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About this venue</h2>
              <p className="text-gray-600 leading-relaxed">{venue.description}</p>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {venue.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <amenity.icon className={`w-5 h-5 ${amenity.available ? 'text-green-600' : 'text-gray-400'}`} />
                    <span className={`text-sm ${amenity.available ? 'text-gray-900' : 'text-gray-400'}`}>
                      {amenity.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Reviews</h2>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">({venue.reviews} reviews)</span>
                </div>
              </div>
              
              <div className="space-y-6">
                {venue.reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{review.user}</h3>
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star} 
                            className={`w-4 h-4 ${star <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 mb-2">{review.comment}</p>
                    <p className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Booking Card */}
            <div className="bg-white rounded-xl shadow-sm border p-6 mb-6 sticky top-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Book Now</h3>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="ml-1 text-sm font-medium">{venue.rating}</span>
                  <span className="text-sm text-gray-500 ml-1">({venue.reviews})</span>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                {venue.courts.map((court) => (
                  <div key={court.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{court.name}</h4>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        court.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {court.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">₹{court.price} per hour</p>
                    <Link
                      to={`/book/${venue.id}/${court.id}`}
                      className={`w-full py-2 px-4 rounded-lg text-sm font-medium text-center transition-colors duration-200 ${
                        court.status === 'available'
                          ? 'bg-primary-600 text-white hover:bg-primary-700'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {court.status === 'available' ? 'Book Now' : 'Unavailable'}
                    </Link>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Starting from:</span>
                  <span className="font-semibold text-gray-900">₹{venue.price}</span>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{venue.contact.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{venue.contact.email}</span>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                  <span className="text-sm text-gray-600">{venue.contact.address}</span>
                </div>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Opening Hours</h3>
              <div className="space-y-2">
                {Object.entries(venue.hours).map(([day, hours]) => (
                  <div key={day} className="flex justify-between text-sm">
                    <span className="text-gray-600 capitalize">{day}</span>
                    <span className="text-gray-900">{hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueDetailPage;
