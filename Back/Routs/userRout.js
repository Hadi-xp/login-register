const express = require('express');
const userRouter = express.Router();
// const validate = require('../auth/authentication');
// const userSchema = require('../schema/schema');
const User = require('../schema/schema');
const {body,validationResult} = require('express-validator');



// Get All Users API
userRouter.get('/getAllUser',async(req,res)=>{
    const allUsers = await User.find();
    res.json({
        data:allUsers,
        msg:'all Users are here'
    })
})




// Get 1 User API by Name
userRouter.get('/getUser/:Name',async(req,res)=>{
    const user = await User.findOne({Name:req.params.Name});
    if(!user) return res.status(404).json({data:null,msg:'user not found'})
    res.json({data:user,mag:'user is here'});
})

// Post API
userRouter.post('/postUser',[
    body('Email','email must be valid').isEmail().notEmpty(),
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
        msg:'user saved successfully'
    })
})

// Put API
userRouter.put('/putUser/:Name',async(req,res)=>{
    const user = await User.findOneAndUpdate({Name:req.params.Name},{
        Name:req.body.Name,
        Email:req.body.Email,
        Password:req.body.Password
    },{new:true});
    if(!user){
        return res.status(404).json({data:null,mag:'user not found'})
    }
    res.json(user)
    
    
})

// Delete API
userRouter.delete('/deleteUser/:Name',async(req,res)=>{
    const user = await User.findOneAndDelete({Name:req.params.Name})
    if(!user) return res.status(404).json({data:null,msg:'user not found'})
    res.json(user)
})




module.exports = userRouter