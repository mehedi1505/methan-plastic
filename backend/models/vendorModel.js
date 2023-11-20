const {Schema,model} = require('mongoose');

const vendorSchema = new Schema({
    vendor_name : {
        type:String,
        required:true,
    },
    vendor_company : {
        type:String,
        required:true,
    },
    vendor_contact_number : {
        type:String,
        required:true
    },
    vendor_vat_number : {
        type:String,
        default:null
    },
    vendor_country : {
        type:String,
        required:true
    },
    vendor_district : {
        type:String,
        required:true
    },
    vendor_city : {
        type:String,
        required:true
    },
    vendor_street : {
        type:String,
        required:true
    },
    vendor_zip : {
        type:String,
        required:true
    },
    vendor_website : {
        type:String,
        default:null
    },
    vendor_email : {
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
vendorSchema.index({
    vendor_name: 'text',
    vendor_company: 'text'
})

module.exports = model('vendors',vendorSchema);