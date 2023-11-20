const {Schema,model} = require('mongoose');

const invoiceMasterSchema = new Schema({
    cust_id : {
        type:Schema.ObjectId,
        required:true
    },
    invoice_number : {
        type:String,
        required:true
    }, 
    invoice_date : {
        type:Date,
        default: Date.now()
    }, 
    invoice_due_date : {
        type:Date,
        default: Date.now()
    },
    discount : {
        type:Number,
        default:0
    },
    adjustment : {
        type:Number,
        default:0
    }, 
    client_note : {
        type:String,
        default:null
    },
    term_id : {
        type:Schema.ObjectId,
        default: null
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

invoiceMasterSchema.index({
    invoice_number:"text",
})

module.exports = model('invoiceMasters',invoiceMasterSchema);