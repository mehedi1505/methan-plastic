const {Schema,model} = require('mongoose');

const bomMasterSchema = new Schema({
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
bomMasterSchema.index({
    product_code:"text",
    product_name:"text",
})
module.exports = model('bommasters',bomMasterSchema);