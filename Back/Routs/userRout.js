const express = require('express');
const userRouter = express.Router();



// Get API
userRouter.get('/getUser',(req,res)=>{
    res.json({msg:'getting Users'})
})

// Post API
userRouter.post('/postUser',(req,res)=>{
    res.json({mag:'posting Users'})
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