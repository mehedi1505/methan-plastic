const {Schema,model} = require('mongoose');

const rmUsedSchema = new Schema({
    batch_number : {
        type:String,
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
    item_name : {
        type:String,
        required:true
    },
    item_price : {
        type:String,
        default:0
    },
    total_item_qty : {
        type:Number,
        default:0
    },
},{timestamps : true});

module.exports = model('rmuses',rmUsedSchema);