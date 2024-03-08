const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  resourceID: {
    type: String,
    required: true,
  },
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
  capacity: {
    type: Number,
  },
  pictures: {
    type: String,
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

const Resource = mongoose.model('Resources', resourceSchema);

module.exports = Resource;
