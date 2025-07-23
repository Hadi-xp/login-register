const express = require('express');
const reactRouter = express.Router();

reactRouter.get('/getData',(req,res)=>{
    res.json({data:data=[{first_name:'hadi',last_name:'bahadori'},{first_name:'reza',last_name:'ahmadi'}]})
})


module.exports = reactRouter