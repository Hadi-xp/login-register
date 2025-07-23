const express = require('express');
const reactRouter = express.Router();

reactRouter.post('/getData',(req,res)=>{
    const secondData = req.body;
    const objectCheck = Object.keys(secondData).length
      if(objectCheck === 0){
        res.json({data:data=[{first_name:'hadi',last_name:'bahadori'},{first_name:'reza',last_name:'ahmadi'}]})
    }else{
        res.json({data:data=[{first_name:'hadi',last_name:'bahadori'},{first_name:'reza',last_name:'ahmadi'},{first_name:secondData.first_name,last_name:secondData.last_name}]})
    }
})


module.exports = reactRouter