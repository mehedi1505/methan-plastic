const {Schema,model} = require('mongoose');

const productSchema = new Schema({
    product_name : {
        type:String,
        required:true
    },
    product_code : {
        type:String,
        required:true
    },
    price : {
        type:Number,
        default:0
    },
    opening_stock : {
        type:Number,
        default:0
    },
    status : {
        type: String,
        enum : ['active','inactive'],
        default: 'active'
    },
    bom_status : {
        type: Boolean, 
        default: 0
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
productSchema.index({
    product_name: 'text',
    product_code: 'text',
})
module.exports = model('products',productSchema);