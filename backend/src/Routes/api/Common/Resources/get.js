const mongoose = require('mongoose');
const Resource = mongoose.model('Resources');
const responseHandler = require('@helpers/responseHandler');
const get=async(req,res)=>{
    try{
        const resources=await Resource.find();
        return responseHandler.handleSuccessResponse(res,resources,200);
    }catch(err){
        return responseHandler.handleErrorResponse(res,500,'Internal server error');
    }
}
module.exports=get;