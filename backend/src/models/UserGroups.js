const mongoose = require('mongoose');

const userGroupSchema = new mongoose.Schema({
  groupID: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  permissionID: {
    type: String,
  },
  description: {
    type: String,
  },
  ownerID: {
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

const UserGroup = mongoose.model('UserGroups', userGroupSchema);

module.exports = UserGroup;
