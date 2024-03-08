const responseHandler=require('@helpers/responseHandler');
const User = require('../../../models/Users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const login=async (req,res)=>{
const hostname=process.env.HOST_NAME
const {userName,password}=req.body;
const user=await User.findOne({userName:userName})
if (!user){
    return responseHandler.handleErrorResponse(res,400,'Invalid username or password')
}
const isPasswordValid = await bcrypt.compare(password, user.password);
if (!isPasswordValid){
    return responseHandler.handleErrorResponse(res,400,'Invalid password')
}
const UserData={
    firstName:user.firstName,
    lastName:user.lastName,
    userName:user.userName,
    email:user.email,
    phone:user.phone,
    _id:user._id,
    groupId:user.groupId,
    role:user.role,
}
const token = jwt.sign({user:UserData}, process.env.JWT_SECRET, { expiresIn: '24h' },{ algorithm: 'HS256'});
UserData.token=token
console.log('user',token)
UserData.avatar=user.avatar?`${hostname}/${user.avatar}`:""
return responseHandler.handleSuccessObject(res,UserData)
}
module.exports = login;