const router=require('express').Router();
const mongoose=require('mongoose');
const Resource=mongoose.model('Resources');
const responseHandler=require('@helpers/responseHandler');

router.get('/',require('./get'));
module.exports=router;