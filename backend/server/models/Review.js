const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
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
    ref: 'Court'
  },
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    required: true
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot exceed 5']
  },
  title: {
    type: String,
    required: [true, 'Review title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  comment: {
    type: String,
    required: [true, 'Review comment is required'],
    trim: true,
    maxlength: [1000, 'Comment cannot exceed 1000 characters']
  },
  images: [{
    url: String,
    caption: String
  }],
  categories: {
    cleanliness: {
      type: Number,
      min: 1,
      max: 5
    },
    facilities: {
      type: Number,
      min: 1,
      max: 5
    },
    service: {
      type: Number,
      min: 1,
      max: 5
    },
    value: {
      type: Number,
      min: 1,
      max: 5
    },
    location: {
      type: Number,
      min: 1,
      max: 5
    }
  },
  helpful: {
    count: {
      type: Number,
      default: 0
    },
    users: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }]
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isEdited: {
    type: Boolean,
    default: false
  },
  editedAt: Date,
  editHistory: [{
    comment: String,
    editedAt: Date
  }],
  response: {
    from: {
      type: String,
      enum: ['facility_owner', 'admin']
    },
    comment: String,
    respondedAt: Date,
    respondedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  flags: [{
    reason: {
      type: String,
      enum: ['inappropriate', 'spam', 'fake', 'offensive', 'other']
    },
    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    reportedAt: Date,
    status: {
      type: String,
      enum: ['pending', 'reviewed', 'resolved'],
      default: 'pending'
    }
  }]
}, {
  timestamps: true
});

// Indexes for better query performance
reviewSchema.index({ facility: 1 });
reviewSchema.index({ court: 1 });
reviewSchema.index({ user: 1 });
reviewSchema.index({ booking: 1 });
reviewSchema.index({ rating: -1 });
reviewSchema.index({ status: 1 });
reviewSchema.index({ createdAt: -1 });
reviewSchema.index({ facility: 1, rating: -1 });
reviewSchema.index({ user: 1, facility: 1 }, { unique: true });

// Virtual for average category rating
reviewSchema.virtual('averageCategoryRating').get(function() {
  if (!this.categories) return this.rating;
  
  const categories = Object.values(this.categories).filter(val => val !== undefined);
  if (categories.length === 0) return this.rating;
  
  return categories.reduce((sum, val) => sum + val, 0) / categories.length;
});

// Virtual for formatted date
reviewSchema.virtual('formattedDate').get(function() {
  return this.createdAt.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

// Method to mark review as helpful
reviewSchema.methods.markHelpful = function(userId) {
  if (!this.helpful.users.includes(userId)) {
    this.helpful.users.push(userId);
    this.helpful.count += 1;
    return this.save();
  }
  return Promise.resolve(this);
};

// Method to unmark review as helpful
reviewSchema.methods.unmarkHelpful = function(userId) {
  const userIndex = this.helpful.users.indexOf(userId);
  if (userIndex > -1) {
    this.helpful.users.splice(userIndex, 1);
    this.helpful.count -= 1;
    return this.save();
  }
  return Promise.resolve(this);
};

// Method to flag review
reviewSchema.methods.flagReview = function(userId, reason) {
  const existingFlag = this.flags.find(flag => 
    flag.reportedBy.toString() === userId.toString() && 
    flag.status === 'pending'
  );
  
  if (!existingFlag) {
    this.flags.push({
      reason,
      reportedBy: userId,
      reportedAt: new Date()
    });
    return this.save();
  }
  return Promise.resolve(this);
};

// Method to respond to review
reviewSchema.methods.respondToReview = function(responderId, responderType, comment) {
  this.response = {
    from: responderType,
    comment,
    respondedAt: new Date(),
    respondedBy: responderId
  };
  return this.save();
};

// Pre-save middleware to update facility/court ratings
reviewSchema.post('save', async function() {
  try {
    const Facility = mongoose.model('Facility');
    const Court = mongoose.model('Court');
    
    // Update facility rating
    const facilityReviews = await mongoose.model('Review').find({
      facility: this.facility,
      status: 'approved'
    });
    
    if (facilityReviews.length > 0) {
      const avgRating = facilityReviews.reduce((sum, review) => sum + review.rating, 0) / facilityReviews.length;
      await Facility.findByIdAndUpdate(this.facility, {
        'rating.average': Math.round(avgRating * 10) / 10,
        'rating.count': facilityReviews.length
      });
    }
    
    // Update court rating if review is for specific court
    if (this.court) {
      const courtReviews = await mongoose.model('Review').find({
        court: this.court,
        status: 'approved'
      });
      
      if (courtReviews.length > 0) {
        const avgRating = courtReviews.reduce((sum, review) => sum + review.rating, 0) / courtReviews.length;
        await Court.findByIdAndUpdate(this.court, {
          'rating.average': Math.round(avgRating * 10) / 10,
          'rating.count': courtReviews.length
        });
      }
    }
  } catch (error) {
    console.error('Error updating ratings:', error);
  }
});

// Pre-remove middleware to update facility/court ratings
reviewSchema.pre('remove', async function() {
  try {
    const Facility = mongoose.model('Facility');
    const Court = mongoose.model('Court');
    
    // Recalculate facility rating
    const facilityReviews = await mongoose.model('Review').find({
      facility: this.facility,
      status: 'approved',
      _id: { $ne: this._id }
    });
    
    if (facilityReviews.length > 0) {
      const avgRating = facilityReviews.reduce((sum, review) => sum + review.rating, 0) / facilityReviews.length;
      await Facility.findByIdAndUpdate(this.facility, {
        'rating.average': Math.round(avgRating * 10) / 10,
        'rating.count': facilityReviews.length
      });
    } else {
      await Facility.findByIdAndUpdate(this.facility, {
        'rating.average': 0,
        'rating.count': 0
      });
    }
    
    // Recalculate court rating if review was for specific court
    if (this.court) {
      const courtReviews = await mongoose.model('Review').find({
        court: this.court,
        status: 'approved',
        _id: { $ne: this._id }
      });
      
      if (courtReviews.length > 0) {
        const avgRating = courtReviews.reduce((sum, review) => sum + review.rating, 0) / courtReviews.length;
        await Court.findByIdAndUpdate(this.court, {
          'rating.average': Math.round(avgRating * 10) / 10,
          'rating.count': courtReviews.length
        });
      } else {
        await Court.findByIdAndUpdate(this.court, {
          'rating.average': 0,
          'rating.count': 0
        });
      }
    }
  } catch (error) {
    console.error('Error updating ratings on review removal:', error);
  }
});

module.exports = mongoose.model('Review', reviewSchema); 