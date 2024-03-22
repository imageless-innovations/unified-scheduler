// middleware/jwtauth.js
const jwt = require('jsonwebtoken');
const responseHandler = require('@helpers/responseHandler'); 
const getTokenFromHeaders = (req) => {
  const { headers: { authorization }} = req
  if(authorization && authorization.split(' ')[0] === 'Bearer') {
    return authorization.split(' ')[1]
  }

  return null
}
const verifyToken = (req,res) => {
  const token = getTokenFromHeaders(req)
  if (!token) {
    return responseHandler.handleErrorResponse(res, 401, 'Bearer-Token is missing');
  }
  const decode=jwt.verify(token, process.env.JWT_SECRET,{ algorithm: 'HS256'})
    return decode;
  }

const authenticateToken = (req, res, next) => {
  try{
  const decode =verifyToken(req,res);
  req.user = decode.user;
  next();
  }
  catch(err){
    return responseHandler.handleErrorResponse(res, 401, 'Invalid Token');
  }
};

const adminAuthenticateToken = (req, res, next) => {
  // Assuming you have a role attribute in your JWT payload
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return responseHandler.handleErrorResponse(res, 403, 'Unauthorized. Admin access required');
  }
};

module.exports = {
  authenticateToken,
  adminAuthenticateToken,
  verifyToken
};
