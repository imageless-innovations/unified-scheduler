const router =require('express').Router();
const checkParameters =require('@middleware/checkParameters');
router.get('/',require('./get'));
const ReservationParameters = {
    resourceID: 'string',
    startDateTime: 'string',
    endDateTime: 'string',
  };

router.post('/create',checkParameters(ReservationParameters),require('./create'));

module.exports=router;