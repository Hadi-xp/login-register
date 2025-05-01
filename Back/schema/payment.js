const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const paymentSchema = new Schema({
    user:{type : mongoose.Schema.Types.ObjectId , ref:'User'},
    resNumber:{type:String, require:true},
    amount:{type:Number,require:true},
    payment:{type:Boolean, default:false}
})
paymentSchema.plugin(timestamp);
module.exports = mongoose.model('Payment',paymentSchema);
