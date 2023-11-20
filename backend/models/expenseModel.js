const {Schema,model} = require('mongoose');

const expenseSchema = new Schema({
    expense_name : {
        type:String,
        required:true
    }, 
    expense_category_id : {
        type:Schema.ObjectId,
        required:true
    }, 
    expense_date : {
        type:Date,
        default: Date.now()
    }, 
    expense_amount : {
        type:Number,
        required:true
    },
    cust_id : {
        type:Schema.ObjectId,
        required:true
    }, 
    pay_mode_id : {
        type:Schema.ObjectId,
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
expenseSchema.index({
    expense_name:"text",
})
module.exports = model('expenses',expenseSchema);