const {Schema,model,mongoose} = require('mongoose');

const collectionSchema = new Schema({
    cust_id : {
        type:Schema.ObjectId,
        required:true
    },
    pay_mode_id : {
        type:Schema.ObjectId,
        required:true
    }, 
    cheque_no : {
        type:String,
        required:true
    }, 
    cheque_date : {
        type:Date,
        default: Date.now()
    },
    bank_id : {
        type:Schema.ObjectId,
        required:true
    },
    pay_date : {
        type:Date,
        default: Date.now()
    },
    pay_receive_by : {
        type:Schema.ObjectId,
        required:true
    }, 
    pay_amount : {
        type:Number,
        required:true
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
        default:null
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

collectionSchema.index({
    cheque_no:"text",
})

module.exports = model('collections',collectionSchema);