const mongoose = require('mongoose');

const resourceAvailabilitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  reserveTimeInterval: {
    type: Number,
    default: 30,
  },
  availableTime: {
    type: [
      {
        day: {
          type: String,
          required: true,
        },
        startTime: {
          type: String,
          required: true,
        },
        endTime: {
          type: String,
          required: true,
        },
      },
    ],
    default: [
      {
        day: 'All days',
        startTime: '00:00',
        endTime: '23:59',
      },
    ],
    validate: {
      validator: (array) => array.every((item) => 'day' in item && 'startTime' in item && 'endTime' in item),
      message: 'Each element in availableTime array should have day, start, and end properties.',
    },
  },
  maxReserveTime: {
    type: Number,
    default: 60,
    min: [1, 'maxReserveTime must be at least 1'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',

  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// resourceAvailabilitySchema.virtual('formattedAvailableTime').get(function () {
//   return this.availableTime.map((slot) => `${slot.day}: ${slot.startTime} - ${slot.endTime}`);
// });

// // Enable virtuals when converting to JSON or Object
// resourceAvailabilitySchema.set('toObject', { virtuals: true });
// resourceAvailabilitySchema.set('toJSON', { virtuals: true });

const Resource = mongoose.model('ResourceAvailabilityPolicy', resourceAvailabilitySchema);

module.exports = Resource;
