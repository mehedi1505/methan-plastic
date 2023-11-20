const {Schema,model} = require('mongoose');

const gatePassDetailSchema = new Schema({
    gp_master_id : {
        type:Schema.ObjectId,
        required:true
    }, 
    gp_number : {
        type:String,
        required:true
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
gatePassDetailSchema.index({
    product_code:"text",
    product_name:"text",
})
module.exports = model('gpDetails',gatePassDetailSchema);