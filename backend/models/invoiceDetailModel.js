const {Schema,model} = require('mongoose');

const invoiceDetailSchema = new Schema({
    invoice_master_id : {
        type:Schema.ObjectId,
        required:true
    }, 
    cust_id : {
        type:Schema.ObjectId,
        required:true
    },
    invoice_number : {
        type:String,
        required:true
    },
    order_number : {
        type:String,
        required:true
    },
    invoice_date : {
        type:Date,
        default: Date.now()
    }, 
    product_id : {
        type:Schema.ObjectId,
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
        required:true
    }, 
    product_price : {
        type:Number,
        required:true
    },
    product_total : {
        type:Number,
        required:true
    },

},{timestamps : true});
invoiceDetailSchema.index({
    invoice_number:"text",
})
module.exports = model('invoiceDetails',invoiceDetailSchema);