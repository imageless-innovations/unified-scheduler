const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  roleID: {
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
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isManager: {
    type: Boolean,
    default: false,
  },
  isStaff: {
    type: Boolean,
    default: false,
  },
  isStudent: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  type: {
    type: String,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Role = mongoose.model('Roles', roleSchema);

module.exports = Role;
