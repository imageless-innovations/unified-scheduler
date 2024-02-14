// middleware/jwtauth.js
const jwt = require('jsonwebtoken');
const responseHandler = require('@helpers/responseHandler'); 

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return responseHandler.handleErrorResponse(res, 401, 'Bearer-Token is missing');
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return responseHandler.handleErrorResponse(res, 401, 'Invalid token');
    }

    req.user = user;
    next();
  });
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
};
