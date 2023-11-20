const vendorModel = require('../models/vendorModel')
const { responseReturn } = require('../utils/response')
const moment = require('moment')

class vendorControllers{

    vendor_add= async(req, res)=>{
        const {state,userName} = req.body
        const tempDate = moment(Date.now()).format('LLL')
           try {
               await vendorModel.create({
                vendor_name:state.vendor_name,
                vendor_company:state.vendor_company,
                vendor_contact_number: state.vendor_contact_number,
                vendor_vat_number: state.vendor_vat_number,
                vendor_country: state.vendor_country,
                vendor_district: state.vendor_district,
                vendor_city: state.vendor_city,
                vendor_street: state.vendor_street,
                vendor_zip: state.vendor_zip,
                vendor_website: state.vendor_website,
                vendor_email: state.vendor_email,
                entered_by:userName,
                entered_date:tempDate
                })
                responseReturn(res, 201, {message:'success'})
  
           } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
           }

    }

    vendor_get = async(req, res)=>{
        const {searchValue} = req.query
        // console.log(typeof searchValue)
        try{
           if(searchValue){
            const vendors = await vendorModel.find({$text:{$search:searchValue}}).sort({createdAt: -1})
            const totalVendor = await vendorModel.find({ $text:{$search:searchValue}}).countDocuments()
            // const vendors =  await vendorModel.find({'$or':[
            //     {'vendor_name':{'$regex':searchValue, '$options':'i'}},
            //     {'vendor_company':{'$regex':searchValue, '$options':'i'}}]})
            responseReturn(res, 200, {vendors,totalVendor})
           }else{
            const vendors = await vendorModel.find({}).sort({createdAt: -1})
            const totalVendor = await vendorModel.find({}).countDocuments()
            responseReturn(res, 200, {vendors,totalVendor})
           }
        }catch (error) {
            console.log(error.message) 
            // responseReturn(res, 500, {error:'Internal server error'})
        }
    }
    vendor_get_by_id =  async(req,res)=>{
        const {vendorId} = req.params
        try {
            const vendor = await vendorModel.findById(vendorId)
            responseReturn(res, 200, {vendor})
        } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
        }

    }
    vendor_update = async(req, res)=>{
        let {vendor_name,vendor_company,vendor_contact_number,vendor_vat_number,vendor_country,vendor_district,vendor_city,vendor_street,vendor_zip,vendor_website,vendor_email,vendorId,userName} = req.body;
        const tempDate = moment(Date.now()).format('LLL')
        // vendor_name= vendor_name.trim()
        try {
            await vendorModel.findByIdAndUpdate(vendorId,{
                vendor_name,
                vendor_company,
                vendor_contact_number,
                vendor_vat_number,
                vendor_country,
                vendor_district,
                vendor_city,
                vendor_street,
                vendor_zip,
                vendor_website,
                vendor_email,
                updated_by:userName,
                updated_date:tempDate

            })
            const vendor = await vendorModel.findById(vendorId)
            responseReturn(res, 200, {vendor, message:'update success'})
        } catch (error) {
            console.log(error.message) 
        }
    }
    vendor_delete = async(req, res)=>{
        const {vendor_id} = req.params
        try {
            await termModel.findByIdAndDelete(vendor_id)
            responseReturn(res, 200, {
                message: 'Deleted success'
            })
        } catch (error) {
            console.log(error.message)
        }
    }


 
 

}

module.exports = new vendorControllers(); 