const {Schema,model} = require('mongoose');

const salaryPaySlipSchema = new Schema({
    emp_id : {
        type:String,
        required:true,
    },
    emp_name : {
        type:String,
        required:true,
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
        default:null
    },
    pay_period : {
        type:String,
        required:true
    },
    pay_date : {
        type:Date,
        default: Date.now()
    },
    salary_paid_by : {
        type:String,
        required:true
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
    loan:{
        type:Number,
        default:0
    },
    penalty:{
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
salaryPaySlipSchema.index({
    emp_id: 'text',
    emp_name: 'text',
})

module.exports = model('paySlips',salaryPaySlipSchema);