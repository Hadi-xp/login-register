// requiring express - Router - body & validationResualt from express validator
const express = require('express');
const userRouter = express.Router();
const {body,validationResult} = require('express-validator');
// from User scheama
const User = require('../schema/schema');



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
userRouter.get('/getUser/:Name',async(req,res)=>{
    // making a const for user with findOne methid that search for 1 user and Name parameter that we take it from req
    const user = await User.findOne({Name:req.params.Name});
    // this is the part that checks if there is any user with this name or not 
    if(!user) return res.status(404).json({data:null,msg:'user not found'})
        // if the user found it returns as object with a msg 
    res.json({data:user,mag:'user is here'});
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
        return res.status(404).json({data:null,msg:'this Email has beed taken'})
    }
    // but here if the all auth parts passd here we save our user
    // make a variable and name it newUser then we use our scheama model to save user datas
    let newUser = new User({
        Name:req.body.Name,
        Email:req.body.Email,
        Password:req.body.Password
    })
    // here we use save() to storing user data in DB
    newUser = await newUser.save();
    // i wanted to see what user saved so i res an object with user data in it
    res.json({
        data:newUser,
        msg:'user saved successfully'
    })
})

// Put API (this API is for changing user data ad saving them again i used parameters again to find the user)
userRouter.put('/putUser/:Name',async(req,res)=>{
    // we used findOneAndUpdate to change all datas
    const user = await User.findOneAndUpdate({Name:req.params.Name},{
        Name:req.body.Name,
        Email:req.body.Email,
        Password:req.body.Password
    },{new:true});
    // again here if the user was not in DB we return status 404 and null value
    if(!user){
        return res.status(404).json({data:null,mag:'user not found'})
    }
    res.json(user)
    
    
})

// Delete API (this API is for deleting user from DB again using Name as parameter)
userRouter.delete('/deleteUser/:Name',async(req,res)=>{
    // using findOneAndDelete to find user and delete it
    const user = await User.findOneAndDelete({Name:req.params.Name})
    //again if the user was not found return that object with null value and error msg again
    if(!user) return res.status(404).json({data:null,msg:'user not found'})
    res.json(user)
})



// exportig this routs to index file
module.exports = userRouter