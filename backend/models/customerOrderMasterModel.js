const {Schema,model} = require('mongoose');

const customerOrderMasterSchema = new Schema({
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
    discount : {
        type:Number,
        default:0
    },
    order_note : {
        type:String,
        default:null
    },
    status : {
        type:String,
        default:'pending'
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

customerOrderMasterSchema.index({
    order_number:"text",
})

module.exports = model('customerOrderMasters',customerOrderMasterSchema);