const {Schema,model} = require('mongoose');

const employeeEntrySchema = new Schema({
    emp_id : {
        type:String,
        required:true,
    },
    emp_name : {
        type:String,
        required:true,
    },
    emp_email : {
        type:String,
        default:null
    },
    contact_number : {
        type:String,
        required:true
    },
    education : {
        type:String,
        required:true
    },
    marital_status : {
        type:String,
        required:true
    },
    gender : {
        type:String,
        required:true
    },
    religion : {
        type:String,
        required:true
    },
    blood_group : {
        type:String,
        required:true
    },
    department : {
        type:String,
        required:true
    },
    designation : {
        type:String,
        required:true
    },
    joining_date : {
        type:Date,
        default: Date.now()
    },
    basic_salary : {
        type:Number,
        required:true
    },
    gross_salary : {
        type:Number,
        required:true
    },
    dearness_allowance:{
        type:Number,
        required:true
    },
    house_rent:{
        type:Number,
        required:true
    },
    medical_allowance:{
        type:Number,
        required:true
    },
    provident_fund:{
        type:Number,
        default:0
    },
    tax:{
        type:Number,
        default:0
    },
    experience : {
        type:String,
        required:true
    },
    image : {
        type:String,
        required:true
    },
    status: {
        type: String,
        enum : ['active','inactive'],
        default: 'active'
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
employeeEntrySchema.index({
    emp_id: 'text',
    emp_name: 'text',
})

module.exports = model('employees',employeeEntrySchema);