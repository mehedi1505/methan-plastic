const {Schema,model} = require('mongoose');

const employeeTypeSchema = new Schema({
    emp_type_name : {
        type:String,
        required:true
    },
    type_description : {
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
employeeTypeSchema.index({
    emp_type_name: 'text',
})
module.exports = model('emptypes',employeeTypeSchema);