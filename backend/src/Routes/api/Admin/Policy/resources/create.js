const mongoose = require('mongoose');
const ResourceAvailabilityPolicy = mongoose.model('ResourceAvailabilityPolicy');
const responseHandler = require('@helpers/responseHandler');
// Create a POST endpoint for creating a resource availability policy
const create= async (req, res) => {
    const user = req.user;

    try {
      const {
        name,
        description,
        reserveTimeInterval,
        availability,
        maxReserveTime,
      } = req.body;
      console.log('req.body',req.body);
  
      // Check if a resource with the same name already exists
      const existingResource = await ResourceAvailabilityPolicy.findOne({ name });
      if (existingResource) {
        return responseHandler.handleErrorResponse(res, 409, 'Resource already exists');
      }
      const availabilityKeys = Object.keys(availability);
      if ('0' in availability && availabilityKeys.length !== 1) {
        return responseHandler.handleErrorResponse(res, 400, 'Invalid availability');
      }
      const newResourcePolicy = new ResourceAvailabilityPolicy({
        name,
        description,
        reserveTimeInterval,
        availability,
        maxReserveTime,
        createdBy:user._id,
      });
  
      const savedResourcePolicy = await newResourcePolicy.save();
  
      return responseHandler.handleSuccessResponse(res, 'Resource created successfully', 201);

    } catch (error) {
      console.error(error);
      return responseHandler.handleErrorResponse(res, 500, 'Internal server error');
    }
  }
  
module.exports = create;