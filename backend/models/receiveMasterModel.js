const {Schema,model} = require('mongoose');

const receiveMasterSchema = new Schema({
    rec_invoice : {
        type:String,
        required:true
    }, 
    rec_date : {
        type:Date,
        default: Date.now()
    }, 
    rec_type_id : {
        type:Schema.ObjectId,
        required:true
    }, 
    vendor_id : {
        type:Schema.ObjectId,
        required:true
    },
    discount : {
        type:Number,
        default:0
    },
    adjustment_qty : {
        type:Number,
        default:0
    },   
    rec_by : {
        type:String,
        required:true
    },  
    rec_note : {
        type:String,
        default:null
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
receiveMasterSchema.index({
    rec_invoice:"text",
})
module.exports = model('receivemasters',receiveMasterSchema);