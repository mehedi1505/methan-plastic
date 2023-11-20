const {Schema,model} = require('mongoose');

const billDetailSchema = new Schema({
    bill_master_id : {
        type:Schema.ObjectId,
        required:true
    },
    cus_id : {
        type:Schema.ObjectId,
        required:true
    },
    bill_number : {
        type:String,
        required:true
    }, 
    invoice_id : {
        type:Schema.ObjectId,
        required:true
    },
    invoice_number : {
        type:String,
        required:true
    }, 
    product_code : {
        type:String,
        required:true
    },
    product_name : {
        type:String,
        required:true
    },
    product_qty : {
        type:Number,
        default:0
    },
    product_price : {
        type:Number,
        default:0
    },
    product_total : {
        type:Number,
        default:0
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
billDetailSchema.index({
    product_code:"text",
    product_name:"text"
})

module.exports = model('billDetails',billDetailSchema);