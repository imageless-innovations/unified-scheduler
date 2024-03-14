const express = require('express');
const responseHandler = require('@helpers/responseHandler');
const mongoose = require('mongoose');
const Resource = mongoose.model('Resources');
const {storeMultipleImages}=require('@helpers/utils');
const { create } = require('../../../../models/ResourceAvailability');

// POST /api/admin/resource/create
const createResource = async (req, res) => {
    // Check if all attributes exist
   const {name, type, location, capacity,description,policyId} = req.body;
    const {files} = req;
    const existingResource = await Resource.findOne({name});
    if (existingResource) {
      return responseHandler.handleErrorResponse(res, 409, 'Resource already exists');
    }
    const resource={
        name,
        type,
        location,
        capacity,
        description,
        resourceavailabilityID:policyId,
        createdBy:req.user._id
    }
    console.log('resource',resource);
    if(req.files){
        const savedpictures=await storeMultipleImages(`resourcePictures/${type}/${name}`,req.files) || []
        if(!savedpictures){
            return responseHandler.handleErrorResponse(res,400,'Image upload failed')
        }
        resource.pictures=savedpictures
    }
    
    const newResource=new Resource(resource);
    await newResource.save();
    return responseHandler.handleSuccessResponse(res, 'Resource created successfully', 201);
};
module.exports = createResource;