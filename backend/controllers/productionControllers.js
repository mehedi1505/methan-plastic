const productionModel = require('../models/productionModel')
const productModel = require('../models/productModel')
const bomDetailModel = require('../models/bomDetailModel')
const rmUsedModel = require('../models/rmUsedModel')
const itemModel = require('../models/itemModel')
const { responseReturn } = require('../utils/response')
const moment = require('moment')
const { mongo: { ObjectId}} = require('mongoose')

class productionControllers{
    get_products = async(req, res)=>{
        try {
            const products = await productModel.find({}).sort({createdAt: -1})
            responseReturn(res, 200, {products})
        } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
        }      
    }
    get_bom_items = async(req, res)=>{
        const {productId} = req.params
        try {
            const bomItems = await bomDetailModel.aggregate([
                {
                    $match: { $expr : { $eq: [ '$product_id' , { $toObjectId: productId } ] } }                
                },
                {
                    $lookup:{
                        from: 'items',
                        localField: 'item_id',
                        foreignField:"_id",
                        as:'item'
                    }
                },{
                   $sort:{
                    createdAt: 1
                   } 
                }
                         
            ])
            responseReturn(res, 200, {bomItems})
        } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
        }      
    }

    show_product_price_by_id = async(req,res)=>{
        const {productId} = req.params
        try {
           const showPrice = await productModel.findById(productId)
            responseReturn(res, 200, {showPrice})
        } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
        }
    }
    get_bom_by_id = async(req, res)=>{
        const {productId} = req.params
        try {
            const bomItems = await bomDetailModel.aggregate([
                {
                    $match: { $expr : { $eq: [ '$product_id' , { $toObjectId: productId } ] } }                
                },
                {
                    $lookup:{
                        from: 'items',
                        localField: 'item_id',
                        foreignField:"_id",
                        as:'item'
                    }
                } 
                         
            ])
            responseReturn(res, 200, {bomItems})
            // const unit = await unitModel.findById(itemId)
        } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
        }      
    }

    production_add = async(req, res)=>{
        let {state,batch,productId,userName,selectedDate} = req.body
        const tempDate = moment(Date.now()).format('LLL')
                batch = batch.trim()
     
           try {
            const product = await productModel.findById(productId)
            const checkedBatch = await productionModel.find({
                $and:[
                    {
                        batch_number:{
                            $eq: batch
                        }
                    }
                ]
            })
            if(!checkedBatch.length>0){
                await productionModel.create({
                    batch_number:batch,
                    production_date:selectedDate,
                    product_id:productId,     
                    product_name:product.product_name,     
                    product_qty:state.product_qty,     
                    product_price:state.product_price,     
                    entered_by:userName,
                    entered_date:tempDate
                })

                    const bomItems = await bomDetailModel.aggregate([
                        {
                            $match: { $expr : { $eq: [ '$product_id' , { $toObjectId: productId } ] } }                
                        },
                        {
                            $lookup:{
                                from: 'items',
                                localField: 'item_id',
                                foreignField:"_id",
                                as:'item'
                            }              
                        },

                    ])
                    if(bomItems.length>0){
                        for(let i=0; i<bomItems.length; i++){
                            await rmUsedModel.create({
                                batch_number:batch,
                                item_id:bomItems[i].item_id,
                                item_code:bomItems[i].item_code,
                                item_name:bomItems[i].item[0].item_name,
                                item_price:bomItems[i].item[0].item_price,
                                total_item_qty  :bomItems[i].total_used_qty * state.product_qty
                            })
                        }
                        responseReturn(res, 201, {message:'success'})
                    }

  
            }else{
                responseReturn(res, 201, {error:'Duplicate Batch not Allowed!'})         
            }
              
           } catch (error) {
            // responseReturn(res, 500, {error:'Internal server error'})
            console.log(error.message) 
       
           }
    }
    last_batch_number = async(req, res)=>{
        try {
            const lastBatchNumber = await productionModel.find({}).sort({_id:-1}).limit(1)
            responseReturn(res, 200, {lastBatchNumber})
        } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
        }
    }
    show_product_name_by_id = async(req, res)=>{
        const {productId} = req.params
        try {
            const productName = await productModel.findById(productId)
            responseReturn(res, 200, {productName})
        } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
        }      
    }
    get_all_production = async(req, res)=>{
        const {searchValue} = req.query
        try{
           if(searchValue !== ""){
            const allProductions = await productionModel.find({$text:{$search:searchValue}}).sort({createdAt: -1})
            const totalProduction = await productionModel.find({ $text:{$search:searchValue}}).countDocuments()
            responseReturn(res, 200, {allProductions,totalProduction})
           }else{
            const allProductions = await productionModel.find({}).sort({createdAt: -1})
            const totalProduction = await productionModel.find({}).countDocuments()
            responseReturn(res, 200, {allProductions,totalProduction})
           }
        }catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
        }
    }

    get_production_by_id =  async(req,res)=>{
        const {productionId} = req.params
        try {
            const production = await productionModel.findById(productionId)
            responseReturn(res, 200, {production})
        } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
        }

    }
    production_update = async(req, res)=>{
        let {batch_number,production_date,product_id,product_qty,product_price,userName,productionId} = req.body;

        const tempDate = moment(Date.now()).format('LLL')
        try {
            await productionModel.findByIdAndUpdate(productionId,{
                batch_number,
                production_date,
                product_id,
                product_qty,
                product_price,
                updated_by:userName,
                updated_date:tempDate

            })
            // const item = await vendorModel.findById(vendorId)
            responseReturn(res, 200, {message:'update success'})
        } catch (error) {
            console.log(error.message) 
        }
    }

    production_delete = async(req, res)=>{
        const {productionId} = req.params     
        try {
                await productionModel.findByIdAndDelete(productionId)
                responseReturn(res, 200, { message: 'Deleted success'})
    
        } catch (error) {
            console.log(error.message)
        }
    }

    // receive_details_item_delete=async(req, res)=>{
    //     const {invoiceId,itemId} = req.params      
    //     try {
    //         const recDetailId = await receiveDetailModel.findOne({rec_invoice:invoiceId,item_id:itemId})
    //         await receiveDetailModel.findByIdAndDelete(recDetailId._id)
    //         responseReturn(res, 200, {
    //             message: 'Deleted success'
    //         })
    //     } catch (error) {
    //         console.log(error.message)
    //     }
    // }
 

}

module.exports = new productionControllers(); 