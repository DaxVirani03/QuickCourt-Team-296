const mongoose = require('mongoose');

const courtSchema = new mongoose.Schema({
  facility: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Facility',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Court name is required'],
    trim: true
  },
  sport: {
    type: String,
    required: [true, 'Sport type is required'],
    enum: ['basketball', 'tennis', 'football', 'cricket', 'badminton', 'volleyball', 'table-tennis', 'squash', 'swimming', 'gym']
  },
  courtNumber: {
    type: String,
    required: [true, 'Court number is required']
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  surface: {
    type: String,
    enum: ['hard', 'clay', 'grass', 'synthetic', 'wood', 'concrete', 'asphalt', 'indoor', 'outdoor'],
    required: true
  },
  dimensions: {
    length: Number,
    width: Number,
    unit: {
      type: String,
      enum: ['meters', 'feet'],
      default: 'meters'
    }
  },
  capacity: {
    type: Number,
    default: 1,
    min: 1
  },
  images: [{
    url: String,
    caption: String,
    isPrimary: {
      type: Boolean,
      default: false
    }
  }],
  amenities: [{
    name: String,
    icon: String,
    description: String
  }],
  pricing: {
    basePrice: {
      type: Number,
      required: [true, 'Base price is required']
    },
    currency: {
      type: String,
      default: 'INR'
    },
    peakHourMultiplier: {
      type: Number,
      default: 1.5
    },
    weekendMultiplier: {
      type: Number,
      default: 1.2
    },
    holidayMultiplier: {
      type: Number,
      default: 1.3
    }
  },
  availability: {
    monday: {
      isOpen: { type: Boolean, default: true },
      slots: [{
        startTime: String,
        endTime: String,
        isAvailable: { type: Boolean, default: true }
      }]
    },
    tuesday: {
      isOpen: { type: Boolean, default: true },
      slots: [{
        startTime: String,
        endTime: String,
        isAvailable: { type: Boolean, default: true }
      }]
    },
    wednesday: {
      isOpen: { type: Boolean, default: true },
      slots: [{
        startTime: String,
        endTime: String,
        isAvailable: { type: Boolean, default: true }
      }]
    },
    thursday: {
      isOpen: { type: Boolean, default: true },
      slots: [{
        startTime: String,
        endTime: String,
        isAvailable: { type: Boolean, default: true }
      }]
    },
    friday: {
      isOpen: { type: Boolean, default: true },
      slots: [{
        startTime: String,
        endTime: String,
        isAvailable: { type: Boolean, default: true }
      }]
    },
    saturday: {
      isOpen: { type: Boolean, default: true },
      slots: [{
        startTime: String,
        endTime: String,
        isAvailable: { type: Boolean, default: true }
      }]
    },
    sunday: {
      isOpen: { type: Boolean, default: true },
      slots: [{
        startTime: String,
        endTime: String,
        isAvailable: { type: Boolean, default: true }
      }]
    }
  },
  maintenance: {
    isUnderMaintenance: {
      type: Boolean,
      default: false
    },
    maintenanceStart: Date,
    maintenanceEnd: Date,
    maintenanceReason: String
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'maintenance'],
    default: 'active'
  },
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  features: [{
    name: String,
    value: String,
    icon: String
  }],
  rules: [String],
  notes: String
}, {
  timestamps: true
});

// Indexes for better query performance
courtSchema.index({ facility: 1 });
courtSchema.index({ sport: 1 });
courtSchema.index({ status: 1 });
courtSchema.index({ 'maintenance.isUnderMaintenance': 1 });

// Virtual for full court name
courtSchema.virtual('fullName').get(function() {
  return `${this.name} - Court ${this.courtNumber}`;
});

// Method to check if court is available at specific time
courtSchema.methods.isAvailableAt = function(date, startTime, endTime) {
  if (this.status !== 'active' || this.maintenance.isUnderMaintenance) {
    return false;
  }

  const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'lowercase' });
  const dayAvailability = this.availability[dayOfWeek];
  
  if (!dayAvailability.isOpen) {
    return false;
  }

  // Check if the requested time slot conflicts with any existing bookings
  // This would be implemented with actual booking data
  return true;
};

// Method to calculate price for a time slot
courtSchema.methods.calculatePrice = function(date, startTime, endTime) {
  let basePrice = this.pricing.basePrice;
  
  // Check if it's weekend
  const isWeekend = date.getDay() === 0 || date.getDay() === 6;
  if (isWeekend) {
    basePrice *= this.pricing.weekendMultiplier;
  }
  
  // Check if it's peak hour (6 PM - 9 PM)
  const hour = parseInt(startTime.split(':')[0]);
  const isPeakHour = hour >= 18 && hour <= 21;
  if (isPeakHour) {
    basePrice *= this.pricing.peakHourMultiplier;
  }
  
  // Calculate duration in hours
  const start = new Date(`2000-01-01T${startTime}`);
  const end = new Date(`2000-01-01T${endTime}`);
  const durationHours = (end - start) / (1000 * 60 * 60);
  
  return basePrice * durationHours;
};

// Pre-save middleware to ensure only one primary image
courtSchema.pre('save', function(next) {
  if (this.images && this.images.length > 0) {
    const primaryImages = this.images.filter(img => img.isPrimary);
    if (primaryImages.length > 1) {
      let foundPrimary = false;
      this.images.forEach(img => {
        if (img.isPrimary && !foundPrimary) {
          foundPrimary = true;
        } else if (img.isPrimary) {
          img.isPrimary = false;
        }
      });
    }
  }
  next();
});

module.exports = mongoose.model('Court', courtSchema); 