const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/newLogin')
.then(()=>{console.log('connected to data base');})
.catch(()=>{console.log('not connected');})
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const config = require('config');
const userRouter = require('./Routs/userRout')
const reactRouter = require('./Routs/reactApi')
app.use(cors()); // enable CORS for all routes
app.use(express.static('public'));





app.use('/register',userRouter);
app.use('/reactAPI',reactRouter);

app.get('/Welcome',(req,res)=>{
    res.json({data:'its ok'})
})





app.listen(config.get('serverPort'),()=>{console.log(`server is runing on port ${config.get('serverPort')}`)});