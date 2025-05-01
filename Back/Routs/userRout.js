// requiring express - Router - body & validationResualt from express validator
const express = require('express');
const userRouter = express.Router();
const {body,validationResult} = require('express-validator');
// from User scheama
const User = require('../schema/schema');
// lodash for collecting data from req better
const _ = require('lodash');
// bcrypt for changing user password to unknown string
const bcrypt = require('bcrypt');
const logger = require('./logger');
const axios = require('axios');




// Get All Users API (this API is for showing all Users in DB)
userRouter.get('/getAllUser',async(req,res)=>{
    // making a const for our users and find method for query
    const allUsers = await User.find();
    // returing the users in object that contains a msg to show that users are here
    res.json({
        data:allUsers,
        msg:'all Users are here'
    })
})




// Get 1 User API by Name (this API will show only 1 user that we chose from parameter)
userRouter.get('/getUser/:Email',async(req,res)=>{
    // making a const for user with findOne methid that search for 1 user and Email parameter that we take it from req
    const user = await User.findOne({Email:req.params.Email});
    // this is the part that checks if the password is correct or not
    const isValid = await bcrypt.compare(req.body.Password,user.Password);
    if(!isValid) return res.json({data:null,msg:'password is wrong'})
    // if the user found it returns as object with a msg 
    logger.info(`User retrived: ${user.Name}`)
    res.json({data:_.pick(user,['Name','Email','_id']),mag:'user is here'});
})

// Post API (this API is for saving user in DB)
userRouter.post('/postUser',[
    // first we have our authentication part using body & validationResualt that we require from express-validator
    // the isEmail is for checking that if the Email is ok or not like if it has @ or gmail.com
    // the notEmpty is for checking that if the req.body is empty or not
    body('Email','email must be valid').isEmail().notEmpty(),
    body('Name','name cant be empty').notEmpty(),
    body('Password','password cant be empty').notEmpty()
],async (req,res)=>{
    // here is the auth part first we make a const and name it error and call function validationResualt and pass the req to it
    const errors = validationResult(req);
    // now it checks if our error we just made is empty or not if that is not empty means there are some errors in there
    if(!errors.isEmpty()){
        // then we use return to stop going to next lines and use status 404 and res an object with null value and errors in it with .array method
        return res.status(404).json({data:null,errors:errors.array()})

    }
    // this is the second part of our auth that checks if the Email is used before or not
    // i used findOne method and a query to check if we have that Email in DB or not
    const existUser = await User.findOne({Email:req.body.Email});
    if(existUser){
        // if there was an Email we res an object with null value and msg as error msg
        return res.status(404).json({data:null,msg:'This email has already been used'})
    }
    // but here if the all auth parts passd here we save our user
    // make a variable and name it newUser then we use our scheama model to save user data using lodash to pick data
    let newUser = new User(
        _.pick(req.body,['Name','Email','Password'])
    )
    // using bcrypt for user password to be unknowed in DB
    const salt = await bcrypt.genSalt(10);
    newUser.Password = await bcrypt.hash(newUser.Password,salt)
    // here we use save() to storing user data in DB
    newUser = await newUser.save();
    logger.info(`User created: ${newUser.Name}`)
    // i wanted to see what user saved so i res an object with user data in it
    res.json({data:newUser,msg:'user saved'});
    
})

// Put API (this API is for changing user data ad saving them again i used parameters again to find the user)
userRouter.put('/putUser/:Name',async(req,res)=>{
    // making an updateData and use lodash to collect new data from user in body req
    const updatedData = _.pick(req.body,['Name','Email','Password']);
    const salt = await bcrypt.genSalt(10);
    updatedData.Password = await bcrypt.hash(updatedData.Password,salt)
    // we used findOneAndUpdate to change all datas
    const user = await User.findOneAndUpdate({Name:req.params.Name},
        updatedData
    ,{new:true});
    // again here if the user was not in DB we return status 404 and null value
    if(!user){
        return res.status(404).json({data:null,mag:'user not found'})
    }
    logger.info(`User updated: ${user.Name}`)
    // at last we send user data but not the password
    res.json({data:_.pick(user,['Name','Email','_id','isAdmin','Balance']),msg:'data changed'});
    
    
})

// Delete API (this API is for deleting user from DB again using Name as parameter)
userRouter.delete('/deleteUser/:Name',async(req,res)=>{
    // using findOneAndDelete to find user and delete it
    const user = await User.findOneAndDelete({Name:req.params.Name})
    //again if the user was not found return that object with null value and error msg again
    if(!user) return res.status(404).json({data:null,msg:'user not found'})
    logger.info(`User deleted ${user.Name}`)
    res.json(user)
})


userRouter.post('/pay',async(req,res)=>{
    let params = {
        mercahnt_id:'6cded376-3063-11e9-a98e-005056a205be',
        amount:req.body.amount,
        callback_url:'http://localhost:5000/register/callback',
        description:'افزایش حساب',
        metadata:{email:req.body.email,mobile:req.body.mobile}
    }
    const response = await axios.post('https://api.zarinpal.com/pg/v4/payment/request.json',params);
    console.log(response);
})


userRouter.get('/callback',(req,res)=>{
    console.log('callback');
})





// exportig this routs to index file
module.exports = userRouter