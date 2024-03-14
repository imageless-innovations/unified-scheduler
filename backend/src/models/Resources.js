const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  resourceavailabilityID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ResourceAvailabilityPolicy',
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
  createdBy: {
    type: String,
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});


const Resource = mongoose.model('Resources', resourceSchema);

module.exports = Resource;
