const express = require('express');
const router = express.Router();
router.get('/test',(req,res)=>{return res.send("reihruierhiueryuei")})
router.use('/resources', require('./Resources'));
  
module.exports = router;