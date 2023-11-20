const {Schema,model} = require('mongoose');

const productionSchema = new Schema({
    batch_number : {
        type:String,
        required:true
    }, 
    production_date : {
        type:Date,
        default: Date.now()
    }, 
    product_id : {
        type:Schema.ObjectId,
        required:true
    }, 
    product_name : {
        type:String,
        required:true
    },
    product_qty : {
        type:Number,
        default:0
    },
    product_price : {
        type:Number,
        default:0
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
productionSchema.index({
    product_code:"text",
    product_name:"text"
})

module.exports = model('productions',productionSchema);