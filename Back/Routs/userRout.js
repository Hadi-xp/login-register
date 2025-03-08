const express = require('express');
const userRouter = express.Router();

userRouter.get('/getUser',(req,res)=>{
    res.json({mag:'users'})
})




module.exports = userRouter