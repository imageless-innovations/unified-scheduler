const mongoose = require('mongoose');
const Reservations = mongoose.model('Reservations');
const Resources = mongoose.model('Resources');
const responseHandler = require('@helpers/responseHandler');

const create = async (req, res) => {
  try {
    console.log(req.body);
    const { resourceID, startDateTime, endDateTime } = req.body;

    // Check if the resource exists
    const resource = await Resources.findById(resourceID);
    if (!resource) {
      return responseHandler.handleErrorResponse(res, 404, 'Resource not found');
    }

    // Round startDateTime and endDateTime to the nearest specified time interval (e.g., 30 minutes)
    const timeInterval = resource.reserveTimeInterval * 60 * 1000; // Convert minutes to milliseconds
    const roundedStartDateTime = new Date(Math.round(new Date(startDateTime).getTime() / timeInterval) * timeInterval);
    const roundedEndDateTime = new Date(Math.round(new Date(endDateTime).getTime() / timeInterval) * timeInterval);

    // Check if the slot interferes with existing slots
    const existingReservations = await Reservations.find({
      resourceID,
      $or: [
        {
          $and: [
            { startDateTime: { $lt: roundedEndDateTime } },
            { endDateTime: { $gt: roundedStartDateTime } },
          ],
        },
      ],
    });

    if (existingReservations.length > 0) {
      return responseHandler.handleErrorResponse(res, 400, 'Selected slot interferes with existing reservations');
    }

    // Check if the time difference is within the specified limit
    const maxTimeDifference = resource.maxServerTime * 60 * 1000; // Convert minutes to milliseconds
    const timeDifference = roundedEndDateTime - roundedStartDateTime;

    if (timeDifference > maxTimeDifference) {
      return responseHandler.handleErrorResponse(res, 400, 'Time difference exceeds the specified limit');
    }

    // Check if the selected time slot falls within the resource's available time
    const isWithinAvailableTime = resource.availableTime.some((slot) => {
      const slotStart = new Date(`${roundedStartDateTime.toDateString()} ${slot.start}`);
      const slotEnd = new Date(`${roundedEndDateTime.toDateString()} ${slot.end}`);
      return (
        roundedStartDateTime >= slotStart &&
        roundedEndDateTime <= slotEnd &&
        (slot.day === 'All days' || roundedStartDateTime.getDay() === slot.day) &&
        (slot.day === 'All days' || roundedEndDateTime.getDay() === slot.day)
      );
    });

    if (!isWithinAvailableTime) {
      return responseHandler.handleErrorResponse(res, 400, 'Selected slot is outside of resource\'s available time');
    }

    // Create and save the reservation
    const reservation = await Reservations({
      resourceID,
      startDateTime: roundedStartDateTime,
      endDateTime: roundedEndDateTime,
      userID: req.user._id,
    });

    await reservation.save();
    return responseHandler.handleSuccessResponse(res, 'Reservation created successfully');
  } catch (err) {
    console.error(err);
    return responseHandler.handleErrorResponse(res, 500, 'Internal server error');
  }
};

module.exports = create;
