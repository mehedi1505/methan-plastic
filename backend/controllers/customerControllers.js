const customerModel = require('../models/customerModel')
const { responseReturn } = require('../utils/response')
const moment = require('moment')

class customerControllers{

    customer_add= async(req, res)=>{
        const {state,userName} = req.body
        const tempDate = moment(Date.now()).format('LLL')
           try {
            const cusIdCheck = await customerModel.findOne({"cus_id":state.cus_id})
            const cusMailCheck = await customerModel.findOne({"cus_email":state.cus_email})
            if(!cusIdCheck){
                if(!cusMailCheck){
                    await customerModel.create({
                        cus_id:state.cus_id,
                        cus_name:state.cus_name,
                        cus_company:state.cus_company,
                        contact_number: state.contact_number,
                        vat_number: state.vat_number,
                        cus_desc: state.cus_desc,
                        cus_website: state.cus_website,
                        cus_email: state.cus_email,
                        country: state.country,
                        district: state.district,
                        zip: state.zip,
                        city: state.city,
                        street: state.street,
                        billing_country: state.billing_country,
                        billing_district: state.billing_district,
                        billing_zip: state.billing_zip,
                        billing_city: state.billing_city,
                        billing_street: state.billing_street,
                        shipping_country: state.shipping_country,
                        shipping_district: state.shipping_district,
                        shipping_zip: state.shipping_zip,
                        shipping_city: state.shipping_city,
                        shipping_street: state.shipping_street,
                        entered_by:userName,
                        entered_date:tempDate
                        })
                        responseReturn(res, 201, {message:'success'})
                }else{
                    responseReturn(res, 201, {error:'Email already exists!'}) 
                }
            }else{
                responseReturn(res, 201, {error:'Customer Id already exists!'})
            }
              
  
           } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
           }

    }

    customer_get = async(req, res)=>{
        const {searchValue} = req.query
        try{
           if(searchValue){
            const customers = await customerModel.find({$text:{$search:searchValue}}).sort({createdAt: -1})
            const totalCustomer = await customerModel.find({ $text:{$search:searchValue}}).countDocuments()
            responseReturn(res, 200, {customers,totalCustomer})
           }else{
            const customers = await customerModel.find({}).sort({createdAt: -1})
            const totalCustomer = await customerModel.find({}).countDocuments()
            responseReturn(res, 200, {customers,totalCustomer})
           }
        }catch (error) {
            // console.log(error.message) 
            responseReturn(res, 500, {error:'Internal server error'})
        }
    }
    customer_get_by_id =  async(req,res)=>{
        const {customerId} = req.params
        try {
            const customer = await customerModel.findById(customerId)
            responseReturn(res, 200, {customer})
        } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
        }

    }
    customer_update = async(req, res)=>{
        let {cus_id,cus_name,cus_company,contact_number,vat_number,cus_desc,cus_website,cus_email,status,country,district,zip,city,street,billing_country,billing_district,billing_zip,billing_city,billing_street,shipping_country,shipping_district,shipping_zip,shipping_city,shipping_street,customerId,userName} = req.body;
    
        const tempDate = moment(Date.now()).format('LLL')
        // cus_name= cus_name.trim()
        try {
            await customerModel.findByIdAndUpdate(customerId,{
                cus_id,
                cus_name,
                cus_company,
                contact_number,
                vat_number,
                cus_desc,
                cus_website,
                cus_email,
                status,
                country,
                district,
                zip,
                city,
                street,
                billing_country,
                billing_district,
                billing_zip,
                billing_city,
                billing_street,
                shipping_country,
                shipping_district,
                shipping_zip,
                shipping_city,
                shipping_street,
                updated_by:userName,
                updated_date:tempDate

            })
            const customer = await customerModel.findById(customerId)
            responseReturn(res, 200, {customer, message:'update success'})
        } catch (error) {
            console.log(error.message) 
        }
    }
    customer_delete = async(req, res)=>{
        const {customer_id} = req.params
        try {
            await customerModel.findByIdAndDelete(customer_id)
            responseReturn(res, 200, {
                message: 'Deleted success'
            })
        } catch (error) {
            console.log(error.message)
        }
    }


 
 

}

module.exports = new customerControllers(); 