const bomMasterModel = require('../models/bomMasterModel')
const bomDetailModel = require('../models/bomDetailModel')
const productModel = require('../models/productModel')
const itemModel = require('../models/itemModel')
const unitModel = require('../models/unitModel')

const { responseReturn } = require('../utils/response')
const moment = require('moment')
const { mongo: { ObjectId}} = require('mongoose')
class bomControllers{
    get_product = async(req, res)=>{
        try {
            const products = await productModel.find({}).sort({createdAt: -1})
            responseReturn(res, 200, {products})
        } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
        }      
    }
    get_product_name_by_id = async(req, res)=>{
        const {productId} = req.params
        try {
            const productName = await productModel.findById(productId)
            responseReturn(res, 200, {productName})
        } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
        }      
    }
    get_items = async(req, res)=>{
        try {
            const items = await itemModel.find({}).sort({createdAt: -1})
            responseReturn(res, 200, {items})
        } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
        }      
    }
    get_unit_item_name = async(req, res)=>{
        const {itemId} = req.params
        try {
            const itemUnit = await itemModel.aggregate([
                {
                    $match: { $expr : { $eq: [ '$_id' , { $toObjectId: itemId } ] } }                
                },
                {
                    $lookup:{
                        from: 'units',
                        localField: 'unit',
                        foreignField:"_id",
                        as:'unit'
                    }
                } 
                         
            ])
            const itemName = await itemModel.findById(itemId)
            responseReturn(res, 200, {itemUnit,itemName})
            // const unit = await unitModel.findById(itemId)
        } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
        }      
    }
    bom_add= async(req, res)=>{
        const {state,productId,itemId,userName} = req.body
        const tempDate = moment(Date.now()).format('LLL')
        const item_used_qty = parseFloat(state.item_used_qty)
     
           try { 
            const item = await itemModel.findById(itemId)  
            const product = await productModel.findById(productId)
            const checkedProduct = await bomMasterModel.find({
                $and:[
                    {
                        product_id:{
                            $eq: productId
                        }
                    }
                ]
            })
            if(!checkedProduct.length>0){
                await bomMasterModel.create({
                        product_id:productId,
                        product_code:product.product_code,
                        product_name:product.product_name,     
                        entered_by:userName,
                        entered_date:tempDate
                    })
                    await bomDetailModel.create({
                        product_id:productId,
                        item_id:itemId,
                        item_code:item.item_code,
                        item_used_qty:state.item_used_qty,
                        item_unit:state.item_unit,
                        wastage_qty:state.wastage_qty,
                        total_used_qty:item_used_qty + item_used_qty * (state.wastage_qty/100)

                })
                responseReturn(res, 201, {message:'success'})
            }else{
                const checkItem = await bomDetailModel.find({
                    $and:[
                        {
                            product_id:{
                                $eq: productId
                            }  
                        },
                        {
                            item_id:{
                                $eq:itemId
                            }
                        }
                    ]
                })
                if(checkItem.length>0){
                    responseReturn(res, 201, {error:'already added'})
                }else{
                    await bomDetailModel.create({
                        product_id:productId,
                        item_id:itemId,
                        item_code:item.item_code,
                        item_used_qty:state.item_used_qty,
                        item_unit:state.item_unit,
                        wastage_qty:state.wastage_qty,
                        total_used_qty:item_used_qty + item_used_qty * (state.wastage_qty/100)
                })
                responseReturn(res, 201, {message:'success'})
                }          
            }
            
  
           } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
       
           }

    }
    bom_details_get = async(req, res)=>{
            const {productId} = req.params
            try {
                const bomDetails = await bomDetailModel.aggregate([
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
                responseReturn(res, 201, {bomDetails})
            } catch (error) {
                responseReturn(res, 500, {error:'Internal server error'})
            }
    }
    boms_get = async(req, res)=>{
        const {searchValue} = req.query
        try{
           if(searchValue !== ""){
            const boms = await bomMasterModel.find({$text:{$search:searchValue}}).sort({createdAt: -1})
            const totalBom = await bomMasterModel.find({ $text:{$search:searchValue}}).countDocuments()
            responseReturn(res, 200, {boms,totalBom})
           }else{
            const boms = await bomMasterModel.find({}).sort({createdAt: -1})
            const totalBom = await bomMasterModel.find({}).countDocuments()
            responseReturn(res, 200, {boms,totalBom})
           }
       
        }catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
        }
    }

    // bom_get_by_id =  async(req,res)=>{
    //     const {itemId} = req.params
    //     try {
    //         // const item = await itemModel.findById(itemId)
    //         const item = await itemModel.aggregate([
    //             {
    //                 $match: { $expr : { $eq: [ '$_id' , { $toObjectId: itemId } ] } }                
    //             },
    //             {
    //                 $lookup:{
    //                     from: 'units',
    //                     localField: 'unit',
    //                     foreignField:"_id",
    //                     as:'unit'
    //                 }
    //             },  
    //             {
    //                 $lookup:{
    //                     from: 'itemcategories',
    //                     localField: 'category',
    //                     foreignField:"_id",
    //                     as:'category'
    //                 }
    //             }, 
    //             {
    //                 $lookup:{
    //                     from: 'itemgroups',
    //                     localField: 'group',
    //                     foreignField:"_id",
    //                     as:'group'
    //                 }
    //             }, 
    //             {
    //                 $lookup:{
    //                     from: 'terms',
    //                     localField: 'term',
    //                     foreignField:"_id",
    //                     as:'term'
    //                 }
    //             },              
    //         ])
    //         responseReturn(res, 200, {item})
    //     } catch (error) {
    //         responseReturn(res, 500, {error:'Internal server error'})
    //     }

    // }
    // bom_update = async(req, res)=>{
    //     let {name,code,desc,price,category_id,unit_id,group_id,term_id,opening_stock,status,userName,itemId} = req.body;
    //     const tempDate = moment(Date.now()).format('LLL')
    //     // console.log(req.body)
    //     // vendor_name= vendor_name.trim()
    //     try {
    //         await itemModel.findByIdAndUpdate(itemId,{
    //             name,
    //             code,
    //             desc,
    //             price,
    //             category:category_id,
    //             unit:unit_id,
    //             group:group_id,
    //             term:term_id,
    //             opening_stock,
    //             status,
    //             updated_by:userName,
    //             updated_date:tempDate

    //         })
    //         // const item = await vendorModel.findById(vendorId)
    //         responseReturn(res, 200, {message:'update success'})
    //     } catch (error) {
    //         console.log(error.message) 
    //     }
    // }
    bom_delete = async(req, res)=>{
        const {productId} = req.params
        try {
            const bomMasterId = await bomMasterModel.findOne({product_id:productId})
            await bomMasterModel.findByIdAndDelete(bomMasterId)
            await bomDetailModel.deleteMany({product_id:productId})
            responseReturn(res, 200, {
                message: 'Deleted success'
            })
        } catch (error) {
            console.log(error.message)
        }
    }


    bom_details_item_delete=async(req, res)=>{
        const {productId,itemId} = req.params      
        try {
            const bomDetailId = await bomDetailModel.findOne({product_id:productId,item_id:itemId})
            await bomDetailModel.findByIdAndDelete(bomDetailId._id)
            responseReturn(res, 200, {
                message: 'Deleted success'
            })
        } catch (error) {
            console.log(error.message)
        }
    }
    spl_product_add =async(req, res)=>{
        let {state,userName} = req.body
        state.product_code = state.product_code.trim()
        const tempDate = moment(Date.now()).format('LLL')
           try {
            const checkSplProduct = await productModel.find({
                $and:[
                    {
                        product_code:{
                            $eq: state.product_code
                        }  
                    }
                ]
            })
            if(!checkSplProduct.length>0){
                await productModel.create({
                    product_name:state.product_name,
                    product_code:state.product_code,
                    price:state.price,
                    entered_by:userName,
                    entered_date:tempDate
                })
                responseReturn(res, 201, {message:'Product add success'})
            }else{
                responseReturn(res, 201, {error:'Product code already exist'})
            }

  
           } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
           }


    }
 

}

module.exports = new bomControllers(); 