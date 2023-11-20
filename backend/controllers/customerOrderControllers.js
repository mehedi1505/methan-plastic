const customerOrderMasterModel = require('../models/customerOrderMasterModel')
const customerOrderDetailModel = require('../models/customerOrderDetailModel')
const invoiceDetailModel = require('../models/invoiceDetailModel')
const productModel = require('../models/productModel')
const customerModel = require('../models/customerModel')

const { responseReturn } = require('../utils/response')
const moment = require('moment')
const { mongo: { ObjectId}} = require('mongoose')

class customerOrderControllers{

    // get_orders = async(req, res)=>{
    //     try {
    //         const orders = await customerOrderMasterModel.find({}).sort({createdAt: -1})
    //         responseReturn(res, 200, {orders})
    //     } catch (error) {
    //         responseReturn(res, 500, {error:'Internal server error'})
    //     }      
    // }
    get_order_products = async(req, res)=>{
        try {
            const products = await productModel.find({}).sort({createdAt: -1})
            responseReturn(res, 200, {products})
        } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
        }      
    }
    get_order_customers = async(req, res)=>{
        try {
            const customers = await customerModel.find({}).sort({createdAt: -1})
            responseReturn(res, 200, {customers})
        } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
        }      
    }
    get_order_product_info = async(req, res)=>{
        const {productId} = req.params
        try {
            const productInfo = await productModel.findOne({'_id':productId})
            responseReturn(res, 200, {productInfo})
            // const unit = await unitModel.findById(itemId)
        } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
        }      
    }

    order_create = async(req, res)=>{
        let {state,orderNumber,cusId,orderDate,deliveryDate,discount,orderNote,productId,userName} = req.body
        const tempDate = moment(Date.now()).format('LLL')
        orderNumber = orderNumber.trim()
           try {
            const product = await productModel.findById(productId)
            const checkedOrder = await customerOrderMasterModel.find({
                $and:[
                    {
                        order_number:{
                            $eq: orderNumber
                        }
                    }
                ]
            })
            if(!checkedOrder.length>0){
                    await customerOrderMasterModel.create({
                        cus_id:cusId,
                        order_number:orderNumber,
                        order_date:orderDate,
                        delivery_date:deliveryDate,    
                        discount:discount,    
                        order_note:orderNote,  
                        entered_by:userName,
                        entered_date:tempDate
                    })
                    const lastData = await customerOrderMasterModel.find({}).sort({_id:-1}).limit(1)
                    await customerOrderDetailModel.create({
                        order_master_id:lastData[0]._id,
                        cus_id:cusId,
                        order_number:orderNumber,
                        order_date:orderDate,
                        delivery_date:deliveryDate,
                        product_id:productId,
                        product_code:product.product_code,
                        product_name:product.product_name,
                        product_qty:state.product_qty,
                        product_price:state.product_price,
                        product_total:state.product_qty * state.product_price,

                })
                responseReturn(res, 201, {message:'success'})
            }else{
                const checkItem = await customerOrderDetailModel.find({
                    $and:[
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
                    const lastData = await customerOrderMasterModel.findOne({"order_number":orderNumber})
                    await customerOrderDetailModel.create({
                        order_master_id:lastData._id,
                        cus_id:cusId,
                        order_number:orderNumber,
                        order_date:orderDate,
                        delivery_date:deliveryDate,
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
    last_order_number_show = async(req, res)=>{
        try {
            const lastOrderNumberShow = await customerOrderMasterModel.find({}).sort({_id:-1}).limit(1)
            responseReturn(res, 200, {lastOrderNumberShow})
        } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
        }
    }
    show_order_details = async(req, res)=>{
            const {orderNumber} = req.params
            try {
                const orderProductDetails = await customerOrderDetailModel.find({
                   $and: [
                       {
                            order_number:{
                                $eq:orderNumber
                            }
                       }   
                   ],                     
                })
                const orderProductTotal = await customerOrderDetailModel.aggregate([

                    {$match:{"order_number":orderNumber}},
                    {$group:{_id:"$order_number", total: {$sum: "$product_total"} }}
                ])
                responseReturn(res, 201, {orderProductDetails,orderProductTotal})
            } catch (error) {
                responseReturn(res, 500, {error:'Internal server error'})
            }
    }
    order_product_get = async(req, res)=>{
        const {searchValue} = req.query
        try{
           if(searchValue){
            const orderProducts = await customerOrderMasterModel.aggregate([   
                { $match: { $text: { $search: "searchValue" }} }, 
               
                {
                    $lookup: {
                        from: "customers", // collection to join
                        localField: "cus_id",//field from the input documents
                        foreignField: "_id",//field from the documents of the "from" collection
                        as: "customer"// output array field
                    }
                }
            ])
            // const items = await itemModel.find({$text:{$search:searchValue}}).sort({createdAt: -1})
            const totalOrder = await customerOrderMasterModel.find({}).countDocuments()
            responseReturn(res, 200, {orderProducts,totalOrder})
           }else{
            const orderProducts = await customerOrderMasterModel.aggregate([
                {
                    $lookup: {
                        from: "customers", // collection to join
                        localField: "cus_id",//field from the input documents
                        foreignField: "_id",//field from the documents of the "from" collection
                        as: "customer"// output array field
                    }
                },
    
                { $sort: { "createdAt": -1 } },
            
            ])
            const totalOrder = await customerOrderMasterModel.find({}).countDocuments()
            responseReturn(res, 200, {orderProducts,totalOrder})
           }

        }catch (error) {
            console.log(error.message) 
            // responseReturn(res, 500, {error:'Internal server error'})
        }
    }

    order_get_by_id =  async(req,res)=>{
        const {orderId} = req.params

        try {
            // const item = await itemModel.findById(itemId)
            const editOrderInfo = await customerOrderMasterModel.aggregate([
                {
                    $match: { $expr : { $eq: [ '$_id' , { $toObjectId: orderId } ] } }                
                },
                {
                    $lookup:{
                        from: 'customers',
                        localField: 'cus_id',
                        foreignField:"_id",
                        as:'customer'
                    }              
                }              
            ])
            responseReturn(res, 200, {editOrderInfo})
        } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
        }

    }
    
    order_info_update = async(req, res)=>{
        let {order_date,delivery_date,cus_id,discount,order_note,status,userName,orderId} = req.body;
        const tempDate = moment(Date.now()).format('LLL')
        try {
            await customerOrderMasterModel.findByIdAndUpdate(orderId,{
                cus_id,
                order_date,
                delivery_date,
                discount,
                order_note,
                status,
                updated_by:userName,
                updated_date:tempDate

            })
            // const item = await vendorModel.findById(vendorId)
            responseReturn(res, 200, {message:'update success'})
        } catch (error) {
            console.log(error.message) 
        }
    }

    order_delete = async(req, res)=>{
        const {orderId} = req.params     
        try {
            const checkDetailId = await customerOrderDetailModel.find({
                $and:[
                    {
                        order_master_id:{
                            $eq:orderId
                        }
                    }
                ]
            })
            if(!checkDetailId.length>0){
                await customerOrderMasterModel.findByIdAndDelete(orderId)
                responseReturn(res, 200, { message: 'Deleted success'})
            }else{
                responseReturn(res, 200, { error: 'Please delete detail data!'})
            }       
        } catch (error) {
            console.log(error.message)
        }
    }

    order_details_item_delete=async(req, res)=>{
        const {orderId,productId} = req.params      
        try {
            const orderDetailId = await customerOrderDetailModel.findOne({order_number:orderId,product_id:productId})
            await customerOrderDetailModel.findByIdAndDelete(orderDetailId._id)
            responseReturn(res, 200, {
                message: 'Deleted success'
            })
        } catch (error) {
            console.log(error.message)
        }
    }
 
    total_sales = async(req, res)=>{
        try {
            const totalSales = await invoiceDetailModel.aggregate([
                {
                    $group:
                      {
                        _id: null,
                        totalAmount: { $sum: "$product_total" }
                      }
                  }
            ])
            // console.log(totalSales)
            responseReturn(res, 200, {totalSales})
        } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
        }      
    }
    today_sales = async(req, res)=>{
        // const date = Date.now() 
        // console.log(new Date(date))
        try {
           
            const todaySales =  await invoiceDetailModel.aggregate([
                {
                    $match: { invoice_date: { $gte : new Date(date), $lte : new Date(date) } }                   
                },
          
                {
                $group:{
                    "_id": null,
                    todayAmount: { $sum: "$product_total" }
                    }
                }
            ])
            // console.log(todaySales)
            responseReturn(res, 200, {todaySales})
        } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
        }      
    }
}

module.exports = new customerOrderControllers(); 