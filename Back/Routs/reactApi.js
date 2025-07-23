const express = require('express');
const reactRouter = express.Router();

reactRouter.get('/getData',(req,res)=>{
    res.json([
        data={first_name:'hadi',last_name:'bahadori'}
    ])
})


module.exports = reactRouter