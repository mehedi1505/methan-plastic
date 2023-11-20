const {Schema,model} = require('mongoose');

const itemGroupSchema = new Schema({
    item_group_name : {
        type:String,
        required:true
    },
    item_group_desc : {
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

module.exports = model('itemgroups',itemGroupSchema);