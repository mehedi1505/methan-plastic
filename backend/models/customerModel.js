const {Schema,model} = require('mongoose');

const customerSchema = new Schema({
    cus_id : {
        type:String,
        required:true,
    },
    cus_name : {
        type:String,
        required:true,
    },
    cus_company : {
        type:String,
        required:true,
    },
    contact_number : {
        type:String,
        required:true
    },
    vat_number : {
        type:String,
        default:null
    },
    cus_desc : {
        type:String,
        default:null
    },
    cus_website : {
        type:String,
        default:null
    },
    cus_email : {
        type:String,
        default:null
    },
    status: {
        type: String,
        enum : ['active','inactive'],
        default: 'active'
    },
    country : {
        type:String,
        required:true
    },
    district : {
        type:String,
        required:true
    },
    zip : {
        type:String,
        required:true
    },
    city : {
        type:String,
        required:true
    },
    street : {
        type:String,
        required:true
    },
    billing_country : {
        type:String,
        default:null
    },
    billing_district : {
        type:String,
        default:null
    },
    billing_zip : {
        type:String,
        default:null
    },
    billing_city : {
        type:String,
        default:null
    },
    billing_street : {
        type:String,
        default:null
    },
    shipping_country : {
        type:String,
        default:null
    },
    shipping_district : {
        type:String,
        default:null
    },
    shipping_zip : {
        type:String,
        default:null
    },
    shipping_city : {
        type:String,
        default:null
    },
    shipping_street : {
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
customerSchema.index({
    cus_id: 'text',
    cus_name: 'text',
    cus_company: 'text'
})

module.exports = model('customers',customerSchema);