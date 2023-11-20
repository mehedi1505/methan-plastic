const {Schema,model} = require('mongoose');

const bomDetailSchema = new Schema({
    product_id : {
        type:Schema.ObjectId,
        required:true
    }, 
    item_id : {
        type:Schema.ObjectId,
        required:true
    },
    item_code : {
        type:String,
        required:true
    },
    item_used_qty : {
        type:Number,
        required:true
    }, 
    item_unit : {
        type:String,
        required:true
    },
    wastage_qty : {
        type:Number,
        required:true
    },
    total_used_qty : {
        type:Number,
        required:true
    }

},{timestamps : true});

module.exports = model('bomdetails',bomDetailSchema);