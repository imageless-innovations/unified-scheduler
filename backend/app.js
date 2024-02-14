const express=require('express');
require('module-alias/register')
const cors=require('cors');
const path=require('path');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
mongoose.set("strictQuery", false);
mongoose.promise = global.Promise
const app=express();
app.use(cors());
app.use(express.json());
dotenv.config();

require('./src/config/database');
require('./src/models/model')

// const logRequest = require('@middleware/logger'); // Adjust the path as needed
// app.use(logRequest);
app.use( require('./src/Routes/')); // Mount your router
app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
});

