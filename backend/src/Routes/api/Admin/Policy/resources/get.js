const mongoose=require('mongoose');
const ResourceAvailabilityPolicy = mongoose.model('ResourceAvailabilityPolicy');
const responseHandler = require('@helpers/responseHandler');
const get=async(req,res)=>{
    try{
        const resources=await ResourceAvailabilityPolicy.find().populate({path:'createdBy',select:'name email'});
        return responseHandler.handleSuccessObject(res,resources,200);
    }catch(err){
        console.log(err);
        return responseHandler.handleErrorResponse(res,500,'Internal server error');
    }
}
const getmin=async(req,res)=>{
    try{
        const resources=await ResourceAvailabilityPolicy.find({},{name:1})
        return responseHandler.handleSuccessObject(res,resources,200);
    }catch(err){
        console.log(err);
        return responseHandler.handleErrorResponse(res,500,'Internal server error');
    }
}
exports.get=get;
exports.getmin=getmin;