const express = require('express');
const reactRouter = express.Router();

reactRouter.get('/getData',(req,res)=>{
    res.json({data:data=[{first_name:'hadi',last_name:'bahadori'},{first_name:'ahmad',last_name:'kohan'}]}
    )
})


module.exports = reactRouter