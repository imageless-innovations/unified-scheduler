const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
//Configure Database
const dbConnect=async ()=>{
  conn_msg=''
  let connectionString = ''
  if(process.env.ENV_TYPE === 'development') {
    connectionString = process.env.DEV_DB_URL
    conn_msg="connected to local DB"
  } else if(process.env.ENV_TYPE == 'production') {
    connectionString = process.env.PROD_DB_URL
    conn_msg="connected to Prod DB"
  }
  const isMongooseDebugMode = process.env.IS_MONGOOSE_DEBUG_MODE == 'true'
  await mongoose.connect(connectionString).then(()=>{
  console.log(conn_msg)
  })
  if(isMongooseDebugMode) {
    mongoose.set('debug', true)
  }
}
dbConnect()
module.exports=mongoose