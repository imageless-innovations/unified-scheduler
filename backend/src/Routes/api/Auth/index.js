const router = require('express').Router();
const checkParameters =require('@middleware/checkParameters');
const {processSingleFileOptionalMiddleware}=require('@middleware/processFile');
// Define the expected parameters and their data types
const registerParameters = {
    firstName: 'string',
    lastName: 'string',
    email: 'string',
    password: 'string',
    role: 'string',
    userName: 'string',
  };
const loginparameters = {
    password: 'string',
    userName: 'string'
  };
  
router.post('/register',processSingleFileOptionalMiddleware,checkParameters(registerParameters),require('./register'));
router.post('/login',checkParameters(loginparameters),require('./login'));

module.exports = router;