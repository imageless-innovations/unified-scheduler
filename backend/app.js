const express=require('express');
require('module-alias/register')
const cors=require('cors');
const path=require('path');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
mongoose.set("strictQuery", false);
mongoose.promise = global.Promise
const app=express();
app.use(express.json());
app.use(cors());

dotenv.config();
// Serve static files from the 'userProfile' directory
app.use('/userProfile', express.static(path.join(__dirname, 'userProfile')));
app.use('/resourcePictures', express.static(path.join(__dirname, 'resourcePictures')));


const dbconnect=require('./src/config/database');

require('./src/models/model')

// const logRequest = require('@middleware/logger'); // Adjust the path as needed
// app.use(logRequest);
app.use( require('./src/Routes/')); // Mount your router
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
  });
dbconnect().then(()=>{
// Start the server
app.listen(process.env.PORT, async function () {
    try{
      console.log('Server listening on port ',process.env.PORT);
    }
    catch(err){
      console.log(err)
      console.log('server could not be started')
    }
    
  });
}).catch((err)=>{
  console.log('Error in connecting to database',err)
})
