// middleware/checkParameters.js
const responseHandler = require('@helpers/responseHandler');
const checkParameters = (requiredParams) => {
    return (req, res, next) => {
      const missingParams = [];
      const errors = [];
      // Check if each required parameter exists in the request
      Object.keys(requiredParams).forEach(name => {
        if (!req.body[name] ) {
          missingParams.push(name);
            errors.push(`${name} value cannot be empty`);
        }
        else{
          if(typeof(req.body[name])!==requiredParams[name]){
            errors.push(`${name} : Invalid datatype, expected ${requiredParams[name]}`);
          }
        }
      });
  console.log("Error",errors)
      if (missingParams.length > 0) {
        const errorMessage = `Missing required parameters or incorrect datatype`;
        return responseHandler.handleErrorObject(res, 400, errorMessage,errors);
      }
  
      next();
    };
  };
  
  module.exports = checkParameters;
  