const express=require('express');
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
require('./src/Routes/api')

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
});

