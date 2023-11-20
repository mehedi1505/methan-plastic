const {Schema,model} = require('mongoose');

const termSchema = new Schema({
    term_name : {
        type:String,
        required:true
    },
    term_desc : {
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

module.exports = model('terms',termSchema);