const express = require('express')
const router = express.Router()
const responseHandler=require('@helpers/responseHandler')
const path = require('path')

router.use('/api', require('./api'))
// Serve static files from the 'userprofile' folder
router.use('/userProfile',express.static(path.join(__dirname, 'userProfile')));

router.use((req, res) => {
  // Respond with a 404 status code and a message
  console.table({ res, status: 404, message: 'Route not found' });
  return responseHandler.handleErrorResponse(res, 404, 'Route not found');
});
module.exports = router