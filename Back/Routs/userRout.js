const express = require('express');
const userRouter = express.Router();
// const userSchema = require('../schema/schema');
const User = require('../schema/schema');



// Get API
userRouter.get('/getUser',(req,res)=>{
    res.json({msg:'getting Users'})
})

// Post API
userRouter.post('/postUser',async (req,res)=>{
    let newUser = new User({
        Name:req.body.Name,
        Email:req.body.Email,
        Password:req.body.Password
    })
    newUser = await newUser.save();
    res.json({
        data:newUser,
        msg:'user saved'
    })
})

// Put API
userRouter.put('/putUser',(req,res)=>{
    res.json({mag:'putting Users'})
})

// Delete API
userRouter.delete('/deleteUser',(req,res)=>{
    res.json({mag:'deleting Users'})
})




module.exports = userRouter