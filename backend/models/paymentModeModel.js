const {Schema,model} = require('mongoose');

const paymentModeSchema = new Schema({
    pay_mode : {
        type:String,
        required:true
    },
    pay_number : {
        type:String,
        default:null
    },
    pay_note : {
        type:String,
        default:null
    },
    entered_by : {
        type:String,
        default:null
    },
    entered_date :{
        type:String,
        default:Date.now()
    },
    updated_by : {
        type:String,
        default:null
    },
    updated_date :{
        type:String,
        default:null
    }

},{timestamps : true});
paymentModeSchema.index({
    pay_mode: 'text',
})
module.exports = model('paymodes',paymentModeSchema);