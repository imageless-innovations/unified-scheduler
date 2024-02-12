const express = require('express')
const router = express.Router()
// const responseHandler=require('@helpers/responseHandler')

router.use('/api', require('./api'))


module.exports = router