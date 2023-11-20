const invoiceMasterModel = require('../models/invoiceMasterModel')
const invoiceDetailModel = require('../models/invoiceDetailModel')
const customerOrderDetailModel = require('../models/customerOrderDetailModel')
const customerOrderMasterModel = require('../models/customerOrderMasterModel')
const productModel = require('../models/productModel')
const customerModel = require('../models/customerModel')
const termModel = require('../models/termModel')

const { responseReturn } = require('../utils/response')
const moment = require('moment')
const { mongo: { ObjectId}} = require('mongoose')

class invoiceControllers{

    get_customers = async(req, res)=>{
        try {
            const customers = await customerModel.find({}).sort({createdAt: -1})
            responseReturn(res, 200, {customers})
        } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
        }      
    }
    get_products = async(req, res)=>{
        const {orderNumber} = req.body
        // orderNumber = orderNumber.trim()
        try {
                const products = await customerOrderDetailModel.find({
                    $and:[
                        {
                            order_number:{
                                $eq:orderNumber
                            }
                        }
                    ]
                })
            responseReturn(res, 200, {products})
        } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
        }      
    }
    get_terms = async(req, res)=>{
        try {
            const terms = await termModel.find({}).sort({createdAt: -1})
            responseReturn(res, 200, {terms})
        } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
        }      
    }
    get_product_info = async(req, res)=>{
        const {orderNumber,productId} = req.params
        try {
            const productInfo = await customerOrderDetailModel.findOne({'order_number':orderNumber,'product_id':productId})
            responseReturn(res, 200, {productInfo})
            // const unit = await unitModel.findById(itemId)
        } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
        }      
    }
    order_status = async(req, res)=>{
        const {orderNumber} = req.params
        console.log(orderNumber)
        try {
            const orderStatus = await customerOrderMasterModel.findOne({'order_number':orderNumber})
            responseReturn(res, 200, {orderStatus})
            // const unit = await unitModel.findById(itemId)
        } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
        }      
    }

    invoice_create = async(req, res)=>{
        let {state,invoiceNumber,orderNumber,custId,invoiceDate,invoiceDueDate,discount,clientNote,adjustment,termId,productId,userName} = req.body
        const tempDate = moment(Date.now()).format('LLL')
        invoiceNumber = invoiceNumber.trim()
           try {
            const product = await productModel.findById(productId)
            const checkedInvoice = await invoiceMasterModel.find({
                $and:[
                    {
                        invoice_number:{
                            $eq: invoiceNumber
                        }
                    }
                ]
            })
            if(!checkedInvoice.length>0){
                    await invoiceMasterModel.create({
                        cust_id:custId,
                        invoice_number:invoiceNumber,
                        invoice_date:invoiceDate,
                        invoiceDueDate:invoiceDueDate,    
                        discount:discount,     
                        adjustment:adjustment,     
                        client_note:clientNote,
                        term_id:termId,  
                        entered_by:userName,
                        entered_date:tempDate
                    })
                    const lastData = await invoiceMasterModel.find({}).sort({_id:-1}).limit(1)
                    await invoiceDetailModel.create({
                        invoice_master_id:lastData[0]._id,
                        cust_id:custId,
                        invoice_number:invoiceNumber,
                        order_number:orderNumber,
                        invoice_date:invoiceDate,
                        product_id:productId,
                        product_code:product.product_code,
                        product_name:product.product_name,
                        product_qty:state.product_qty,
                        product_price:state.product_price,
                        product_total:state.product_qty * state.product_price,

                })
                responseReturn(res, 201, {message:'success'})
            }else{
                const checkItem = await invoiceDetailModel.find({
                    $and:[
                        {
                            invoice_number:{
                                $eq: invoiceNumber
                            }  
                        },
                        {
                            order_number:{
                                $eq: orderNumber
                            }  
                        },
                        {
                            product_id:{
                                $eq: productId
                            }
                        }
                    ]
                })
                if(checkItem.length>0){
                    responseReturn(res, 201, {error:'already added'})
                }else{
                    const lastData = await invoiceMasterModel.findOne({"invoice_number":invoiceNumber})
                    await invoiceDetailModel.create({
                        invoice_master_id:lastData._id,
                        cust_id:custId,
                        invoice_number:invoiceNumber,
                        order_number:orderNumber,
                        invoice_date:invoiceDate,
                        product_id:productId,
                        product_code:product.product_code,
                        product_name:product.product_name,
                        product_qty:state.product_qty,
                        product_price:state.product_price,
                        product_total:state.product_qty * state.product_price,


                })
                responseReturn(res, 201, {message:'success'})
                }          
            }
              
           } catch (error) {
            // responseReturn(res, 500, {error:'Internal server error'})
            console.log(error.message) 
       
           }
    }
    last_invoice_number_show = async(req, res)=>{
        try {
            const lastInvoiceNumberShow = await invoiceMasterModel.find({}).sort({_id:-1}).limit(1)
            responseReturn(res, 200, {lastInvoiceNumberShow})
        } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
        }
    }
    show_product_details = async(req, res)=>{
            const {invoiceNumber} = req.params
            try {
                const invoiceProductDetails = await invoiceDetailModel.find({
                   $and: [
                       {
                            invoice_number:{
                                $eq:invoiceNumber
                            }
                       }   
                   ],                     
                })
                const invoiceProductTotal = await invoiceDetailModel.aggregate([

                    {$match:{"invoice_number":invoiceNumber}},
                    {$group:{_id:"$invoice_number", total: {$sum: "$product_total"} }}
                ])
                responseReturn(res, 201, {invoiceProductDetails,invoiceProductTotal})
            } catch (error) {
                responseReturn(res, 500, {error:'Internal server error'})
            }
    }
    invoice_product_get = async(req, res)=>{
        const {searchValue} = req.query
        try{
           if(searchValue){
            const invoiceProducts = await invoiceMasterModel.aggregate([   
                { $match: { $text: { $search: "searchValue" }} }, 
               
                {
                    $lookup: {
                        from: "customers", // collection to join
                        localField: "cust_id",//field from the input documents
                        foreignField: "_id",//field from the documents of the "from" collection
                        as: "customer"// output array field
                    }
                }
            ])
            // const items = await itemModel.find({$text:{$search:searchValue}}).sort({createdAt: -1})
            const totalInvoice = await invoiceMasterModel.find({}).countDocuments()
            responseReturn(res, 200, {invoiceProducts,totalInvoice})
           }else{
            const invoiceProducts = await invoiceMasterModel.aggregate([
                {
                    $lookup: {
                        from: "customers", // collection to join
                        localField: "cust_id",//field from the input documents
                        foreignField: "_id",//field from the documents of the "from" collection
                        as: "customer"// output array field
                    }
                },
    
                { $sort: { "createdAt": -1 } },
            
            ])
            const totalInvoice = await invoiceMasterModel.find({}).countDocuments()
            responseReturn(res, 200, {invoiceProducts,totalInvoice})
           }

        }catch (error) {
            console.log(error.message) 
            // responseReturn(res, 500, {error:'Internal server error'})
        }
    }

    invoice_get_by_id =  async(req,res)=>{
        const {invoiceId} = req.params

        try {
            // const item = await itemModel.findById(itemId)
            const editProductInfo = await invoiceMasterModel.aggregate([
                {
                    $match: { $expr : { $eq: [ '$_id' , { $toObjectId: invoiceId } ] } }                
                },
                {
                    $lookup:{
                        from: 'customers',
                        localField: 'cust_id',
                        foreignField:"_id",
                        as:'customer'
                    }              
                },
                {
                    $lookup:{
                        from: 'terms',
                        localField: 'term_id',
                        foreignField:"_id",
                        as:'term'
                    }
                }              
            ])
            responseReturn(res, 200, {editProductInfo})
        } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
        }

    }
    invoice_view_by_id =  async(req,res)=>{
        const {invoiceId} = req.params
     
        try {
           
            const invoiceViewInfo = await invoiceMasterModel.aggregate([
                {
                    $match: { $expr : { $eq: [ '$_id' , { $toObjectId: invoiceId } ] } }                
                },
                {
                    $lookup:{
                        from: 'customers',
                        localField: 'cust_id',
                        foreignField:"_id",
                        as:'customer'
                    }              
                }             
            ])
            const invoiceProduct = await invoiceDetailModel.find({invoice_master_id:invoiceId})
            // console.log(invoiceProduct)
            const invoiceTotalAmount = await invoiceDetailModel.aggregate([
                {
                    $match: { $expr : { $eq: [ '$invoice_master_id' , { $toObjectId: invoiceId } ] } }                
                },
                {
                    $group:{
                        _id: null,
                        totalAmount:{$sum:"$product_total"}                       
                    }              
                }              
            ])
            // console.log(invoiceTotalAmount)
            responseReturn(res, 200, {invoiceViewInfo,invoiceTotalAmount,invoiceProduct})
        } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
        }

    }
    // get_invoice_for_update =  async(req,res)=>{
    //     const {invoiceNumber} = req.params
    //     try {
    //         // const item = await itemModel.findById(itemId)
    //         const editProductInfo = await invoiceMasterModel.aggregate([
    //             {
    //                 $match: { $expr : { $eq: [ '$invoice_number' , { $toObjectId: invoiceNumber } ] } }                
    //             },
    //             {
    //                 $lookup:{
    //                     from: 'customers',
    //                     localField: 'cust_id',
    //                     foreignField:"_id",
    //                     as:'customer'
    //                 }              
    //             },
    //             {
    //                 $lookup:{
    //                     from: 'terms',
    //                     localField: 'term_id',
    //                     foreignField:"_id",
    //                     as:'term'
    //                 }
    //             }              
    //         ])
    //         console.log(editProductInfo)
    //         responseReturn(res, 200, {editProductInfo})
    //     } catch (error) {
    //         responseReturn(res, 500, {error:'Internal server error'})
    //     }

    // }
    invoice_info_update = async(req, res)=>{
        let {invoice_date,invoice_due_date,term_id,cust_id,discount,adjustment,client_note,userName,invoiceId} = req.body;

        const tempDate = moment(Date.now()).format('LLL')
        try {
            await invoiceMasterModel.findByIdAndUpdate(invoiceId,{
                cust_id,
                invoice_date,
                invoice_due_date,
                discount,
                adjustment,
                client_note,
                term_id,
                updated_by:userName,
                updated_date:tempDate

            })
            // const item = await vendorModel.findById(vendorId)
            responseReturn(res, 200, {message:'update success'})
        } catch (error) {
            console.log(error.message) 
        }
    }

    invoice_delete = async(req, res)=>{
        const {invoiceId} = req.params     
        try {
            const checkDetailId = await invoiceDetailModel.find({
                $and:[
                    {
                        invoice_master_id:{
                            $eq:invoiceId
                        }
                    }
                ]
            })
            if(!checkDetailId.length>0){
                await invoiceMasterModel.findByIdAndDelete(invoiceId)
                responseReturn(res, 200, { message: 'Deleted success'})
            }else{
                responseReturn(res, 200, { error: 'Please delete detail data for this invoice!'})
            }       
        } catch (error) {
            console.log(error.message)
        }
    }

    product_details_item_delete=async(req, res)=>{
        const {invoiceId,productId} = req.params      
        try {
            const invoiceDetailId = await invoiceDetailModel.findOne({invoice_number:invoiceId,product_id:productId})
            await invoiceDetailModel.findByIdAndDelete(invoiceDetailId._id)
            responseReturn(res, 200, {
                message: 'Deleted success'
            })
        } catch (error) {
            console.log(error.message)
        }
    }
 

}

module.exports = new invoiceControllers(); 