const express = require('express');
const router = express.Router();
const responseHandler=require('@helpers/responseHandler');

router.use('/resources', require('./Resource'));
router.use((req, res) => {
    // Respond with a 404 status code and a message
    console.table({ res, status: 404, message: 'Route not found' });
    return responseHandler.handleErrorResponse(res, 404, 'Route not found');
  });
  
module.exports = router;