const express = require('express');
const { authenticateToken, adminAuthenticateToken ,verifyToken} = require('@middleware/jwtauth');
const responseHandler = require('@helpers/responseHandler');

const router = express.Router();
router.get('/heartbeat', (req, res) => {
    try{
    const decode=verifyToken(req,res)
    if(decode){
        return responseHandler.handleSuccessResponse(res,  'API is working',200);
    }
    return responseHandler.handleErrorResponse(res, 401, 'Invalid Token');
    }
    catch(err){
        console.log(err)
        return responseHandler.handleErrorResponse(res, 401, 'Invalid Token');
    }
});
router.use('/auth', require('./Auth'));
router.use(authenticateToken);
router.use('/common',  require('./Common'));
router.use('/admin',adminAuthenticateToken, require('./Admin'));

// Catch-all route for undefined routes
router.use((req, res) => {
    // Respond with a 404 status code and a message
    console.table({ status: 404, message: 'Route not found' });
    return responseHandler.handleErrorResponse(res, 404, 'Route not found');
});

module.exports = router;
