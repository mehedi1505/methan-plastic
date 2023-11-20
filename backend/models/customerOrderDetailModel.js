const {Schema,model} = require('mongoose');

const customerOrderDetailSchema = new Schema({
    order_master_id : {
        type:Schema.ObjectId,
        required:true
    }, 
    cus_id : {
        type:Schema.ObjectId,
        required:true
    },
    order_number : {
        type:String,
        required:true
    },
    order_date : {
        type:Date,
        default: Date.now()
    },
    delivery_date : {
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
customerOrderDetailSchema.index({
    order_number:"text",
})
module.exports = model('customerOrderDetails',customerOrderDetailSchema);