const {Schema,model} = require('mongoose');

const billMasterSchema = new Schema({
    bill_number : {
        type:String,
        required:true
    }, 
    bill_date : {
        type:Date,
        default: Date.now()
    }, 
    cus_id : {
        type:Schema.ObjectId,
        required:true
    },  
    discount : {
        type:Number,
        default:0
    },  
    bill_note : {
        type:String,
        required:true
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
billMasterSchema.index({
    bill_number:"text",
})
module.exports = model('billMasters',billMasterSchema);