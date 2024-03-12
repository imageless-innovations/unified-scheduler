const mongoose = require('mongoose');
const Reservations = mongoose.model('Reservations');
const responseHandler = require('@helpers/responseHandler');
const get=async(req,res)=>{
    try{
        const resources=await Reservations.find().populate('resourceID');
        return responseHandler.handleSuccessObject(res,resources,200);
    }catch(err){
        return responseHandler.handleErrorResponse(res,500,'Internal server error');
    }
}
module.exports=get;