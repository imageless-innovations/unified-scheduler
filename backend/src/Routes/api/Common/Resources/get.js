const mongoose = require('mongoose');
const Resource = mongoose.model('Resources');
const responseHandler = require('@helpers/responseHandler');
const get=async(req,res)=>{
    try{
        const resources=await Resource.find().populate([{path:'createdBy',select:'name email'},{path:'resourceavailabilityID',select:'name availability maxReserveTime reserveTimeInterval'}]);
        return responseHandler.handleSuccessObject(res,resources,200);
    }catch(err){
        console.log(err);
        return responseHandler.handleErrorResponse(res,500,'Internal server error');
    }
}
module.exports=get;