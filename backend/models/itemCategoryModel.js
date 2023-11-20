const {Schema,model} = require('mongoose');

const itemCategorySchema = new Schema({
    item_category_name : {
        type:String,
        required:true
    },
    item_category_desc : {
        type:String,
        required:true
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

module.exports = model('itemcategories',itemCategorySchema);