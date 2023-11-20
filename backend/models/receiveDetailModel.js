const {Schema,model} = require('mongoose');

const receiveDetailSchema = new Schema({
    rec_master_id : {
        type:Schema.ObjectId,
        required:true
    }, 
    vendor_id : {
        type:Schema.ObjectId,
        required:true
    }, 
    rec_date : {
        type:Date,
        default: Date.now()
    },
    rec_invoice : {
        type:String,
        required:true
    }, 
    item_id : {
        type:Schema.ObjectId,
        required:true
    }, 
    item_name : {
        type:String,
        required:true
    },
    item_code : {
        type:String,
        required:true
    },
    item_qty : {
        type:Number,
        required:true
    }, 
    item_unit : {
        type:String,
        required:true
    },
    item_price : {
        type:Number,
        required:true
    },
    item_total : {
        type:Number,
        required:true
    },
    // references: { type: Schema.Types.ObjectId, ref: 'receivemasters' },

},{timestamps : true});
receiveDetailSchema.index({
    rec_invoice:"text",
})
module.exports = model('receivedetails',receiveDetailSchema);