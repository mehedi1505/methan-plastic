const {Schema,model} = require('mongoose');

const subAdminSchema = new Schema({
    name : {
        type:String,
        required:true
    },
    email : {
        type:String,
        required:true
    },
    password : {
        type:String,
        required:true,
        select : false
    },
    role : {
        type:String,
        default:'sub_admin'
    },
    status:{
        type:String,
        default:'pending'
    },
    image:{
        type:String,
        default:''
    },

},{timestamps : true});

module.exports = model('subAdmins',subAdminSchema);