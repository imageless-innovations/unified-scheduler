const express = require('express');
const router = express.Router();
const checkParameters =require('@middleware/checkParameters');
const {processMultipleFileMiddleware}=require('@middleware/processFile');
const ResourceParameters = {
    name: 'string',
    location: 'string',
  };

router.post('/create'  ,processMultipleFileMiddleware,checkParameters(ResourceParameters), require('./create'))
module.exports = router;