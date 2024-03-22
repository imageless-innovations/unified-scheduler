const mongoose = require('mongoose');
const Reservations = mongoose.model('Reservations');
const Resources = mongoose.model('Resources');
const responseHandler = require('@helpers/responseHandler');


const tzOffset = new Date().getTimezoneOffset(); // Get the local timezone offset in minutes
const tzOffsetHours = tzOffset / 60; // Convert the offset to hours
const tzOffsetMilliseconds = tzOffset * 60 * 1000;


const create = async (req, res) => {
  try {
    console.log(req.body);
    const { resourceID, startDateTime, endDateTime } = req.body;
    // Check if the resource exists
    const resource = await Resources.findById(resourceID).populate('resourceavailabilityID');
    if (!resource) {
      return responseHandler.handleErrorResponse(res, 404, 'Resource not found');
    }
    const startDate = new Date(startDateTime + 'Z'); 
    const endDate = new Date(endDateTime + 'Z');
    console.log(startDate,endDate);
    // Check if the slot interferes with existing slots
    const existingReservations = await Reservations.find({
      resourceID,
      $or: [
        {
          $and: [
            { startDateTime: { $lte: startDate } },
            { endDateTime: { $gte: endDate } },
          ],
        },
      ],
    });
    console.log(existingReservations);
    if (existingReservations.length > 0) {
      return responseHandler.handleErrorResponse(res, 400, 'Selected slot interferes with existing reservations');
    }

    // Check if the time difference is within the specified limit
    const maxTimeDifference = resource.maxServerTime * 60 * 1000; // Convert minutes to milliseconds
    const timeDifference = endDate - startDate;

    if (timeDifference > maxTimeDifference) {
      return responseHandler.handleErrorResponse(res, 400, 'Time difference exceeds the specified limit');
    }

    // Check if the selected time slot falls within the resource's available time
    const availability = resource.resourceavailabilityID?.availability;
    const isWithinAvailableTime = Object.keys(availability).some((slot) => {
      console.log("----->>>>>>>>>",slot);

      
      const slotStart = new Date()
      slotStart.setDate(startDate.getUTCDate());
      slotStart.setHours(availability[slot].start.split(':')[0], availability[slot].start.split(':')[1], 0, 0);
      slotStart.setMinutes(slotStart.getMinutes()-tzOffsetHours*60); // Adjust for local time zone offset
      const slotEnd = new Date()
      slotEnd.setDate(endDate.getUTCDate());
      slotEnd.setHours(availability[slot].end.split(':')[0], availability[slot].end.split(':')[1], 0, 0);
      slotEnd.setMinutes(slotEnd.getMinutes()-tzOffsetHours*60); // Adjust for local time zone offset
      return (
        slotStart<=startDate &&
        slotEnd>=endDate &&
        (slot === '0' || startDate.getUTCDay() === Number(slot)) &&
        (slot === '0' || endDate.getUTCDay() === Number(slot))
      );
    });
    if (!isWithinAvailableTime) {
      return responseHandler.handleErrorResponse(res, 400, 'Selected slot is outside of resource\'s available time');
    }

    // Create and save the reservation
    const reservation = await Reservations({
      resourceID,
      startDateTime: startDate,
      endDateTime: endDate,
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
