const mongoose = require('mongoose');

const managesSchema = new mongoose.Schema({
  managesID: {
    type: String,
    required: true,
  },
  userID: {
    type: String,
    required: true,
  },
  resourceID: {
    type: String,
    required: true,
  },
  operationID: {
    type: Number,
    required: true,
  },
});

const Manages = mongoose.model('Manages', managesSchema);

module.exports = Manages;
