const mongoose = require('mongoose');

const reservesSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },
  resourceID: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resources',
  },
  startDateTime: {
    type: Date,
    required: true,
  },
    endDateTime: {
        type: Date,
        required: true,
    },
    reservedAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },

});

const Reserves = mongoose.model('Reservations', reservesSchema);

module.exports = Reserves;
