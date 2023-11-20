const {Schema,model} = require('mongoose');

const unitSchema = new Schema({
    unit_name : {
        type:String,
        required:true
    },
    unit_desc : {
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
unitSchema.index({
    unit_name:'text',
    unit_desc:'text'
})
module.exports = model('units',unitSchema);