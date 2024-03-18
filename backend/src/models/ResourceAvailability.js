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
    required: true,
  },
  maxReserveTime: {
    type: Number,
    required: true,
  },
  availability: {
    type: mongoose.Schema.Types.Mixed, // Use mixed type for availability
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
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

const ResourceAvailabilityPolicy = mongoose.model('ResourceAvailabilityPolicy', resourceAvailabilitySchema);

module.exports = ResourceAvailabilityPolicy;
