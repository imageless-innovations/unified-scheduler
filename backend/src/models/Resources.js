const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  type: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  reserveTimeInterval: {
    type: Number,
    default: 30,
    min: [1, 'reserveTimeInterval must be at least 1'],
  },
  availableTime: {
    type: [
      {
        day: {
          type: String,
          required: true,
        },
        start: {
          type: String,
          required: true,
        },
        end: {
          type: String,
          required: true,
        },
      },
    ],
    default: [
      {
        day: 'All days',
        start: '00:00',
        end: '23:59',
      },
    ],
    validate: {
      validator: (array) => array.every((item) => 'day' in item && 'start' in item && 'end' in item),
      message: 'Each element in availableTime array should have day, start, and end properties.',
    },
  },
  maxServerTime: {
    type: Number,
    default: 60,
    min: [1, 'maxServerTime must be at least 1'],
  },
  capacity: {
    type: Number,
    min: [1, 'capacity must be at least 1'],
  },
  pictures: {
    type: Array,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

resourceSchema.virtual('formattedAvailableTime').get(function () {
  return this.availableTime.map((slot) => `${slot.day}: ${slot.start} - ${slot.end}`);
});

// Enable virtuals when converting to JSON or Object
resourceSchema.set('toObject', { virtuals: true });
resourceSchema.set('toJSON', { virtuals: true });

const Resource = mongoose.model('Resources', resourceSchema);

module.exports = Resource;
