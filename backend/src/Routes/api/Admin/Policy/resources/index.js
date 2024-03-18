const router = require('express').Router();
const checkParameters =require('@middleware/checkParameters');
const parameters = {
    name: 'string',
    reserveTimeInterval: 'number',
    maxReserveTime: 'number',
    availability: 'object',
  };

router.post('/create',checkParameters(parameters), require('./create'));
router.get('/min', require('./get').getmin);
router.get('/', require('./get').get);
module.exports = router;