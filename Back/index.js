const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/newLogin')
.then(()=>{console.log('connected to data base');})
.catch(()=>{console.log('not connected');})
app.use(express.json());
const config = require('config');
const {body,validationResault} = require('express-validator');
const userRouter = require('./Routs/userRout')
app.use(cors()); // Enable CORS for all routes





app.use('/register',userRouter);





app.listen(config.get('serverPort'),()=>{console.log(`server is runing on port ${config.get('serverPort')}`)});