const express=require("express")
const responseHandler=require('@helpers/responseHandler');
const router=express.Router()
const mongoose=require('mongoose');
const bcrypt = require('bcryptjs');
const Users=mongoose.model('Users')
const {storeImage}=require('@helpers/utils')
const register=async (req,res)=>{
const {firstName,lastName,email,password,role,userName,}=req.body;
const newUser={}
const user=await Users.findOne({email:email,userName:userName})
if (user){
return responseHandler.handleErrorResponse(res,400,'User already exists')
}
if(req.file){
    const imageUrl=await storeImage("userProfile/",req.file) || ""
    if(!imageUrl){
        return responseHandler.handleErrorResponse(res,400,'Image upload failed')
    }
    newUser.avatar=imageUrl
}
const salt = await bcrypt.genSalt(10);
console.log('salt',salt,password)
const hashedPassword = await bcrypt.hash(password, salt);
newUser.firstName=firstName
newUser.lastName=lastName   
newUser.email=email 
newUser.password=hashedPassword
newUser.role=role
newUser.userName=userName

const User=new Users(newUser)
await User.save()
return responseHandler.handleSuccessResponse(res,"user created successfully",200)
}
module.exports = register;