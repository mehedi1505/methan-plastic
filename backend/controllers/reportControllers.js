const receiveDetailModel = require('../models/receiveDetailModel')
const receiveMasterModel = require('../models/receiveMasterModel')
const rmUsedModel = require('../models/rmUsedModel')
const invoiceDetailModel = require('../models/invoiceDetailModel')
const vendorModel = require('../models/vendorModel')
const customerModel = require('../models/customerModel')
const itemModel = require('../models/itemModel')
const productModel = require('../models/productModel')
const productionModel = require('../models/productionModel')
const paymentModel = require('../models/paymentModel')
const collectionModel = require('../models/collectionModel')
const expenseModel = require('../models/expenseModel')
const gatePassMasterModel = require('../models/gatePassMasterModel')
const { responseReturn } = require('../utils/response')
const moment = require('moment')

class reportControllers{

    get_received_material_data= async(req, res)=>{
        let { vendorId,startDate,endDate } = req.body
        startDate = new Date(startDate)
        endDate = new Date(endDate)

           try {
                if(!vendorId){
                   if(startDate === '' || endDate === ''){
                    responseReturn(res, 200, {error:'Select your Start and End Date'})
                   }else{
                    const receiveData = await receiveDetailModel.aggregate([
                        {
                            $match: { rec_date: { $gte: new Date(startDate), $lte: new Date(endDate) } }                
                        },
                        {
                            $lookup:{
                                from: "receivemasters",
                                localField: 'rec_master_id',
                                foreignField:"_id",
                                as:'master'
                            }
                        },
                        {
                            $lookup:{
                                from: 'vendors',
                                localField: 'vendor_id',
                                foreignField:"_id",
                                as:'vendor'
                            }
                        }
                                
                    ])
                    responseReturn(res, 200, {receiveData})
                   }
                }else{
                    const receiveData = await receiveDetailModel.aggregate([
                        {
                            $match: { $expr : { $eq: [ '$vendor_id' , { $toObjectId: vendorId } ] }, rec_date: { $gte: new Date(startDate), $lte: new Date(endDate) } }                
                        },
                        {
                            $lookup:{
                                from: 'receivemasters',
                                localField: 'rec_master_id',
                                foreignField:"_id",
                                as:'master'
                            }
                        },
                        {
                            $lookup:{
                                from: 'vendors',
                                localField: 'vendor_id',
                                foreignField:"_id",
                                as:'vendor'
                            }
                        }
                                
                    ])
                    responseReturn(res, 200, {receiveData})
                   
                }
      
            // const receiveData = await receiveMasterModel.find({rec_date : {$lte : new Date(endDate), $gte: new Date(startDate)}})

  
           } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
           }

    } 
    get_production_report_data= async(req, res)=>{
        let {startDate,endDate } = req.body
            try{

                if(startDate !== null || endDate !== null){
                    const productionData = await productionModel.aggregate([
                        {
                            $match: { production_date: { $gte: new Date(startDate), $lte: new Date(endDate) } }                
                        }                                
                    ])
                    // console.log(productionData)
                    responseReturn(res, 200, {productionData})
                   
                   }else{
                    const productionData = await productionModel.find({}).sort({createdAt:-1})
                //    console.log(productionData)
                   responseReturn(res, 200, {productionData})
                   }
            }catch(error){
                // console.log(error.message)
                responseReturn(res, 500, {error:'Internal server error'})
            }

             

        }
        get_payment_report_data= async(req, res)=>{
        let {startDate,endDate } = req.body
            try{

                if(startDate !== null || endDate !== null){
                    const paymentData = await paymentModel.aggregate([
                        {
                            $match: { pay_date: { $gte: new Date(startDate), $lte: new Date(endDate) } }                
                        },
                        {
                            $lookup:{
                                from: 'vendors',
                                localField: 'vendor_id',
                                foreignField:"_id",
                                as:'vendor'
                            } 
                        },
                        {
                            $lookup:{
                                from: 'paymodes',
                                localField: 'pay_mode_id',
                                foreignField:"_id",
                                as:'pmode'
                            } 
                        },
                        {
                            $lookup:{
                                from: 'banks',
                                localField: 'bank_id',
                                foreignField:"_id",
                                as:'bank'
                            } 
                        }                               
                    ])
                    // console.log(paymentData)
                    responseReturn(res, 200, {paymentData})
                   
                   }else{
                    const paymentData = await paymentModel.aggregate([
                        {
                            $lookup:{
                                from: 'vendors',
                                localField: 'vendor_id',
                                foreignField:"_id",
                                as:'vendor'
                            } 
                        },
                        {
                            $lookup:{
                                from: 'paymodes',
                                localField: 'pay_mode_id',
                                foreignField:"_id",
                                as:'pmode'
                            } 
                        },
                        {
                            $lookup:{
                                from: 'banks',
                                localField: 'bank_id',
                                foreignField:"_id",
                                as:'bank'
                            } 
                        } 
                    ])
                //    console.log(paymentData)
                   responseReturn(res, 200, {paymentData})
                   }
            }catch(error){
                // console.log(error.message)
                responseReturn(res, 500, {error:'Internal server error'})
            }

             

        }
        get_collection_report_data= async(req, res)=>{
        let {startDate,endDate } = req.body
            try{

                if(startDate !== null || endDate !== null){
                    const collectionData = await collectionModel.aggregate([
                        {
                            $match: { pay_date: { $gte: new Date(startDate), $lte: new Date(endDate) } }                
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
                                from: 'paymodes',
                                localField: 'pay_mode_id',
                                foreignField:"_id",
                                as:'pmode'
                            } 
                        },
                        {
                            $lookup:{
                                from: 'banks',
                                localField: 'bank_id',
                                foreignField:"_id",
                                as:'bank'
                            } 
                        }                               
                    ])
                    // console.log(collectionData)
                    responseReturn(res, 200, {collectionData})
                   
                   }else{
                    const collectionData = await collectionModel.aggregate([
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
                                from: 'paymodes',
                                localField: 'pay_mode_id',
                                foreignField:"_id",
                                as:'pmode'
                            } 
                        },
                        {
                            $lookup:{
                                from: 'banks',
                                localField: 'bank_id',
                                foreignField:"_id",
                                as:'bank'
                            } 
                        } 
                    ])
                //    console.log(collectionData)
                   responseReturn(res, 200, {collectionData})
                   }
            }catch(error){
                // console.log(error.message)
                responseReturn(res, 500, {error:'Internal server error'})
            }

             

        }
        get_expenses_report_data= async(req, res)=>{
        let {startDate,endDate } = req.body
            try{

                if(startDate !== null || endDate !== null){
                    const expensesData = await expenseModel.aggregate([
                        {
                            $match: { expense_date: { $gte: new Date(startDate), $lte: new Date(endDate) } }                
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
                                from: 'paymodes',
                                localField: 'pay_mode_id',
                                foreignField:"_id",
                                as:'pmode'
                            } 
                        },
                        {
                            $lookup:{
                                from: 'expensecategories',
                                localField: 'expense_category_id',
                                foreignField:"_id",
                                as:'expcat'
                            } 
                        }                               
                    ])
                    // console.log(expensesData)
                    responseReturn(res, 200, {expensesData})
                   
                   }else{
                    const expensesData = await expenseModel.aggregate([
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
                                from: 'paymodes',
                                localField: 'pay_mode_id',
                                foreignField:"_id",
                                as:'pmode'
                            } 
                        },
                        {
                            $lookup:{
                                from: 'expensecategories',
                                localField: 'expense_category_id',
                                foreignField:"_id",
                                as:'expcat'
                            } 
                        }         
                    ])
                //    console.log(collectionData)
                   responseReturn(res, 200, {expensesData})
                   }
            }catch(error){
                // console.log(error.message)
                responseReturn(res, 500, {error:'Internal server error'})
            }

             

        }
        get_gp_report_data= async(req, res)=>{
        let {startDate,endDate } = req.body
            try{

                if(startDate !== null || endDate !== null){
                    const gpData = await gatePassMasterModel.aggregate([
                        {
                            $match: { gp_date: { $gte: new Date(startDate), $lte: new Date(endDate) } }                
                        },
                        {
                            $lookup:{
                                from: 'customers',
                                localField: 'cus_id',
                                foreignField:"_id",
                                as:'customer'
                            } 
                        },
                        {
                            $lookup:{
                                from: 'gptypes',
                                localField: 'gp_type_id',
                                foreignField:"_id",
                                as:'gptype'
                            } 
                        },
                        {
                            $lookup:{
                                from: 'gpdetails',
                                localField: '_id',
                                foreignField:"gp_master_id",
                                as:'gpdetail'
                            } 
                        }                               
                    ])
                    // console.log(gpData)
                    responseReturn(res, 200, {gpData})
                   
                   }else{
                    const gpData = await gatePassMasterModel.aggregate([
                        {
                            $lookup:{
                                from: 'customers',
                                localField: 'cus_id',
                                foreignField:"_id",
                                as:'customer'
                            } 
                        },
                        {
                            $lookup:{
                                from: 'gptypes',
                                localField: 'gp_type_id',
                                foreignField:"_id",
                                as:'gptype'
                            } 
                        },
                        {
                            $lookup:{
                                from: 'gpdetails',
                                localField: '_id',
                                foreignField:"gp_master_id",
                                as:'gpdetail'
                            } 
                        }           
                    ])
                //    console.log(collectionData)
                   responseReturn(res, 200, {gpData})
                   }
            }catch(error){
                // console.log(error.message)
                responseReturn(res, 500, {error:'Internal server error'})
            }

             

        }
    
    get_challan_data= async(req, res)=>{
        let { cusId,startDate,endDate } = req.body
        startDate = new Date(startDate)
        endDate = new Date(endDate)
           try {
                if(!cusId){
                   if(startDate === '' || endDate === ''){
                    responseReturn(res, 200, {error:'Select your Start and End Date'})
                   }else{
                    const challanData = await invoiceDetailModel.aggregate([
                        {
                            $match: { invoice_date: { $gte: new Date(startDate), $lte: new Date(endDate) } } 
                            // $match: { rec_date: { $gte: new Date(startDate), $lte: new Date(endDate) }}                
                        },
                        {
                            $lookup:{
                                from: 'invoicemasters',
                                localField: 'invoice_master_id',
                                foreignField:"_id",
                                as:'master'
                            }
                        },
                        {
                            "$unwind":"$master"
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
                            "$unwind":"$customer"
                        },
                        {
                            $group:{
                                "_id": "$invoice_number",
                                totalQuantity:{$sum: "$product_qty"},
                                totalAmount:{$sum: "$product_total"},
                                master: { $push: '$master' },
                                customer: { $push: '$customer' }
                            }
                        }
                                
                    ])
                    responseReturn(res, 200, {challanData})
                   }
                }else{
                    const challanData = await invoiceDetailModel.aggregate([
                        {
                            $match: { $expr : { $eq: [ '$cust_id' , { $toObjectId: cusId } ] }, invoice_date: { $gte: new Date(startDate), $lte: new Date(endDate) } }                
                        },
                        {
                            $lookup:{
                                from: 'invoicemasters',
                                localField: 'invoice_master_id',
                                foreignField:"_id",
                                as:'master'
                            }
                        },
                        {
                            "$unwind":"$master"
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
                            "$unwind":"$customer"
                        },
                        {
                            $group:{
                                "_id": "$invoice_number",
                                totalQuantity:{$sum: "$product_qty"},
                                totalAmount:{$sum: "$product_total"},
                                master: { $push: '$master'},
                                customer: { $push: '$customer' }
                            }
                            
                        }
                                
                                
                    ])
                    responseReturn(res, 200, {challanData})
                   
                }
      
            // const receiveData = await receiveMasterModel.find({rec_date : {$lte : new Date(endDate), $gte: new Date(startDate)}})

  
           } catch (error) {
            // console.log(error.message)
            responseReturn(res, 500, {error:'Internal server error'})
           }

    } 
    get_all_vendor = async(req, res)=>{
        try {
            const allVendors = await vendorModel.find({}).sort({createdAt: -1})
            responseReturn(res, 200, {allVendors})
        } catch (error) {
            // console.log(error.message)
            responseReturn(res, 500, {error:'Internal server error'})
        }      
    }
    get_all_material_for_stock = async(req, res)=>{
        try {
            const allItems = await itemModel.find({}).sort({createdAt: -1})
            responseReturn(res, 200, {allItems})
        } catch (error) {
            // console.log(error.message)
            responseReturn(res, 500, {error:'Internal server error'})
        }      
    }
    get_all_product_for_stock = async(req, res)=>{
        try {
            const allProducts = await productModel.find({}).sort({createdAt: -1})
            responseReturn(res, 200, {allProducts})
        } catch (error) {
            // console.log(error.message)
            responseReturn(res, 500, {error:'Internal server error'})
        }      
    }
    get_single_item_stock = async(req, res)=>{
        const { itemId } = req.params
        try {
            const itemInfo = await itemModel.findOne({"_id":itemId})

            const recTotal = await receiveDetailModel.aggregate([
                {
                    $match: { $expr : { $eq: [ '$item_id' , { $toObjectId: itemId } ] } }
                },
               {
                $group:{
                    _id:"null",
                    totalRecQty:{$sum: "$item_qty"},
                }
               },
            ])
            const rmUsedTotal = await rmUsedModel.aggregate([
                {
                    $match: { $expr : { $eq: [ '$item_id' , { $toObjectId: itemId } ] } }
                },
               {

                $group:{
                    _id:"null",
                    totalRmQty:{$sum: "$total_item_qty"},

                }
               },
            ])
            responseReturn(res, 200, {itemInfo,recTotal,rmUsedTotal})
        } catch (error) {
            // console.log(error.message)
            responseReturn(res, 500, {error:'Internal server error'})
        }      
    }
    get_single_product_stock = async(req, res)=>{
        const { productId } = req.params
        try {
            const productInfo = await productModel.findOne({"_id":productId})

            const totalProduction = await productionModel.aggregate([
                {
                    $match: { $expr : { $eq: [ '$product_id' , { $toObjectId: productId } ] } }
                },
               {
                $group:{
                    _id:"null",
                    totalProductionQty:{$sum: "$product_qty"},
                }
               },
            ])
            console.log(totalProduction)
            const totalSale = await invoiceDetailModel.aggregate([
                {
                    $match: { $expr : { $eq: [ '$product_id' , { $toObjectId: productId } ] } }
                },
               {

                $group:{
                    _id:"null",
                    totalProductSaleQty:{$sum: "$product_qty"},

                }
               },
            ])
            responseReturn(res, 200, {productInfo,totalProduction,totalSale})
        } catch (error) {
            // console.log(error.message)
            responseReturn(res, 500, {error:'Internal server error'})
        }      
    }
    customers_get = async(req, res)=>{
        try {
            const allCustomers = await customerModel.find({}).sort({createdAt: -1})
            responseReturn(res, 200, {allCustomers})
        } catch (error) {
            // console.log(error.message)
            responseReturn(res, 500, {error:'Internal server error'})
        }      
    }
    material_stock_data = async(req, res)=>{
        try {
            const materialStockData = await itemModel.aggregate([
                {
                    $lookup:{
                        from: "receivedetails",
                        localField: "_id",
                        foreignField:"item_id",
                        as:"rec"
                    }
                },              
                {
                    $lookup:{
                        from: "rmuses",
                        localField: "_id",
                        foreignField:"item_id",
                        as:"rm"
                    }
                },
                {
               $unwind: { path: "$rec", preserveNullAndEmptyArrays: true },
                },
                {
                 $unwind: { path: "$rm", preserveNullAndEmptyArrays: true },
                },
                {
                    $group:{
                        "_id": {code:"$item_code",name:"$item_name"}, 
                        "opnStock":{"$sum":"$opening_stock"},                                 
                        "totalRecQty":{"$sum": "$rec.item_qty"},
                        "totalRmQuantity":{"$sum": "$rm.total_item_qty"}                    
                    }
                    
                },
            ])
            responseReturn(res, 200, {materialStockData})
        } catch (error) {
            // console.log(error.message)
            responseReturn(res, 500, {error:'Internal server error'})
        }      
    }
    product_stock_data = async(req, res)=>{
        try {
            const productStockData = await productModel.aggregate([
                {
                    $lookup:{
                        from: "productions",
                        localField: "_id",
                        foreignField:"product_id",
                        as:"prod"
                    }
                },              
                {
                    $lookup:{
                        from: "invoicedetails",
                        localField: "_id",
                        foreignField:"product_id",
                        as:"sale"
                    }
                },
                {
               $unwind: { path: "$prod", preserveNullAndEmptyArrays: true },
                },
                {
                 $unwind: { path: "$sale", preserveNullAndEmptyArrays: true },
                },
                {
                    $group:{
                        "_id": {code:"$product_code",name:"$product_name"}, 
                        "opnStock":{"$sum":"$opening_stock"},                                 
                        "totalProdQty":{"$sum": "$prod.product_qty"},
                        "totalSlQuantity":{"$sum": "$sale.product_qty"}                    
                    }
                    
                },
            ])
            responseReturn(res, 200, {productStockData})
        } catch (error) {
            // console.log(error.message)
            responseReturn(res, 500, {error:'Internal server error'})
        }      
    }

}

module.exports = new reportControllers(); 