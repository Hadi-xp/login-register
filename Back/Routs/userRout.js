const express = require('express');
const userRouter = express.Router();



// Get API
userRouter.get('/getUser',(req,res)=>{
    res.json({mag:'users'})
})

// Post API
userRouter.post('/postUser',(req,res)=>{

})

// Put API
userRouter.put('/putUser',(req,res)=>{

})

// Delete API
userRouter.delete('/deleteUser',(req,res)=>{
    
})




module.exports = userRouter