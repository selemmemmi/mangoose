import express from 'express';
import 'dotenv/config';
import connectDB from './config/connectDB.js';
import router from './router/contact.js';
import bodyParser from 'body-Parser';

const app =express()

//creat a server PORT
const PORT =process.env.PORT;
//*********************************************************


//call function that connect with the database
connectDB();

//middleware to read the json type
app.use(bodyParser.json());

// middleware for contact API
app.use("/api/contact",router);


// create server 
app.listen(PORT,(err)=>err?console.log(err):console.log(`serve is runnig in port ${PORT}`))