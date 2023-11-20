const {Schema,model} = require('mongoose');

const expenseCategorySchema = new Schema({
    expense_cat_name : {
        type:String,
        required:true
    },
    expense_cat_note : {
        type:String,
        default:null
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
expenseCategorySchema.index({
    expense_cat_name: 'text',
})
module.exports = model('expensecategories',expenseCategorySchema);