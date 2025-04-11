const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    Name:{type:String,require:true},
    Email:{type:String,require:true},
    Password:{type:String,require:true},
    Balance:{type:Number,default:0},
    isAdmin:{type:Boolean,default:false}
})

const User = mongoose.model('User',userSchema);
module.exports = User
