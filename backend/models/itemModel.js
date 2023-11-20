const {Schema,model,mongoose} = require('mongoose');

const itemSchema = new Schema({
    item_name : {
        type:String,
        required:true,
    },
    item_code : {
        type:String,
        required:true,
    },
    desc : {
        type:String,
        default:null
    },
    item_price : {
        type:Number,
        required:true
    },
    item_category : {
        type:Schema.ObjectId,
        required:true
    },
    unit : {
        type:Schema.ObjectId,
        required:true
    },
    group : {
        type:Schema.ObjectId,
        required:true
    },
    term: {
        type:Schema.ObjectId,
        required:true
    },
    opening_stock : {
        type:Number,
        default:0
    },
    status: {
        type: String,
        enum : ['active','inactive'],
        default: 'active'
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
itemSchema.index({
    item_name: 'text',
    item_desc: 'text',
    item_code: 'text',
})

module.exports = model('items',itemSchema);