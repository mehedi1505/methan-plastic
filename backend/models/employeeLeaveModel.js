const {Schema,model} = require('mongoose');

const employeeLeaveSchema = new Schema({
    emp_id: {
        type:String,
        required:true,
    },
    emp_name: {
        type:String,
        required:true,
    },
    leave_type: {
        type:String,
        required:true,
    },
    leave_start: {
        type:Date,
        default: Date.now()
    },
    leave_end: {
        type:Date,
        default: Date.now()
    },
   
    leave_note: {
        type:String,
        default:null,
    },
    entered_by: {
        type:String,
        default:null
    },
    entered_date:{
        type:String,
        default:null
    },
    updated_by: {
        type:String,
        default:null
    },
    updated_date:{
        type:String,
        default:null
    }

},{timestamps : true});
employeeLeaveSchema.index({
    emp_id: 'text',
    emp_name: 'text',
})

module.exports = model('employeesLeave',employeeLeaveSchema);