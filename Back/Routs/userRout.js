const express = require('express');
const userRouter = express.Router();
// const validate = require('../auth/authentication');
// const userSchema = require('../schema/schema');
const User = require('../schema/schema');
const {body,validationResult} = require('express-validator');



// Get API
userRouter.get('/getUser',(req,res)=>{
    res.json({msg:'getting Users'})
})

// Post API
userRouter.post('/postUser',[
    body('Email','email must be valid').isEmail().isEmpty(),
    body('Name','name cant be empty').notEmpty(),
    body('Password','password cant be empty').notEmpty()
],async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(404).json({data:null,errors:errors.array()})

    }
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