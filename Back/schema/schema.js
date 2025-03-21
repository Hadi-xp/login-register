const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    Name:{type:String,require:true},
    Email:{type:String,require:true},
    Balance:{type:Number},
    isAdmin:{type:Boolean}
})

const User = mongoose.model('User',userSchema);
module.exports = User
