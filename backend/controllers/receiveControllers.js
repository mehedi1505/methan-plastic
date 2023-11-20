const receiveMasterModel = require('../models/receiveMasterModel')
const receiveDetailModel = require('../models/receiveDetailModel')
const productModel = require('../models/productModel')
const itemModel = require('../models/itemModel')
const receiveTypeModel = require('../models/receiveTypeModel')
const vendorModel = require('../models/vendorModel')

const { responseReturn } = require('../utils/response')
const moment = require('moment')
const { mongo: { ObjectId}} = require('mongoose')
class receiveControllers{
    get_receive_types = async(req, res)=>{
        try {
            const types = await receiveTypeModel.find({}).sort({createdAt: -1})
            responseReturn(res, 200, {types})
        } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
        }      
    }
    get_vendors = async(req, res)=>{
        try {
            const vendors = await vendorModel.find({}).sort({createdAt: -1})
            responseReturn(res, 200, {vendors})
        } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
        }      
    }
    get_items = async(req, res)=>{
        try {
            const items = await itemModel.aggregate([
                {
                    $lookup:{
                        from: 'units',
                        localField: 'unit',
                        foreignField:"_id",
                        as:'unit'
                    }
                },{
                   $sort:{
                    createdAt: 1
                   } 
                }
                         
            ])
            responseReturn(res, 200, {items})
        } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
        }      
    }
    get_item_info = async(req, res)=>{
        const {itemId} = req.params
        try {
            const itemInfo = await itemModel.aggregate([
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
            responseReturn(res, 200, {itemInfo})
            // const unit = await unitModel.findById(itemId)
        } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
        }      
    }

    item_receive = async(req, res)=>{
        let {state,rec_invoice,discount,rec_note,adjustment_qty,rec_by,selectedDate,recTypeId,vendorId,itemId,userName} = req.body
        const tempDate = moment(Date.now()).format('LLL')
        selectedDate = new Date(selectedDate)
        rec_invoice = rec_invoice.trim()
     
           try {
            const item = await itemModel.findById(itemId)
            const checkedInvoice = await receiveMasterModel.find({
                $and:[
                    {
                        rec_invoice:{
                            $eq: rec_invoice
                        }
                    }
                ]
            })
            if(!checkedInvoice.length>0){
                    await receiveMasterModel.create({
                        rec_invoice:rec_invoice,
                        rec_date:selectedDate,
                        rec_type_id:recTypeId,     
                        vendor_id:vendorId,     
                        discount:discount,     
                        adjustment_qty:adjustment_qty,     
                        rec_by:rec_by,     
                        rec_note:rec_note,     
                        entered_by:userName,
                        entered_date:tempDate
                    })
                    const lastData = await receiveMasterModel.find({}).sort({_id:-1}).limit(1)
                    await receiveDetailModel.create({
                        rec_master_id:lastData[0]._id,
                        vendor_id:vendorId,
                        rec_date:selectedDate,
                        rec_invoice:rec_invoice,
                        item_id:itemId,
                        item_name:item.item_name,
                        item_code:item.item_code,
                        item_qty:state.item_qty,
                        item_unit:state.item_unit,
                        item_price:state.item_price,
                        item_total:state.item_qty * state.item_price,

                })
                responseReturn(res, 201, {message:'success'})
            }else{
                const checkItem = await receiveDetailModel.find({
                    $and:[
                        {
                            rec_invoice:{
                                $eq: rec_invoice
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
                    const lastData = await receiveMasterModel.findOne({"rec_invoice":rec_invoice})
                    await receiveDetailModel.create({
                        rec_master_id:lastData._id,
                        vendor_id:vendorId,
                        rec_date:selectedDate,
                        rec_invoice:rec_invoice,
                        item_id:itemId,
                        item_name:item.item_name,
                        item_code:item.item_code,
                        item_qty:state.item_qty,
                        item_unit:state.item_unit,
                        item_price:state.item_price,
                        item_total:state.item_qty * state.item_price,

                })
                responseReturn(res, 201, {message:'success'})
                }          
            }
              
           } catch (error) {
            // responseReturn(res, 500, {error:'Internal server error'})
            console.log(error.message) 
       
           }
    }
    last_invoice_number = async(req, res)=>{
        try {
            const lastInvoiceNumber = await receiveMasterModel.find({}).sort({_id:-1}).limit(1)
            responseReturn(res, 200, {lastInvoiceNumber})
        } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
        }
    }
    show_item_receive = async(req, res)=>{
            const {receiveId} = req.params
            try {
                const receiveDetails = await receiveDetailModel.find({
                   $and: [
                       {
                            rec_invoice:{
                                $eq:receiveId
                            }
                       }   
                   ],                     
                })
                const receiveTotal = await receiveDetailModel.aggregate([

                    {$match:{"rec_invoice":receiveId}},
                    {$group:{_id:"$rec_invoice", total: {$sum: "$item_total"} }}
                ])
                responseReturn(res, 201, {receiveDetails,receiveTotal})
            } catch (error) {
                responseReturn(res, 500, {error:'Internal server error'})
            }
    }
    receive_items_get = async(req, res)=>{
        const {searchValue} = req.query
        try{
           if(searchValue){
            const receiveItems = await receiveMasterModel.aggregate([   
                { $match: { $text: { $search: "searchValue" }} }, 
               
                {
                    $lookup: {
                        from: "vendors", // collection to join
                        localField: "vendor_id",//field from the input documents
                        foreignField: "_id",//field from the documents of the "from" collection
                        as: "vendor"// output array field
                    }
                }
            ])
            // const items = await itemModel.find({$text:{$search:searchValue}}).sort({createdAt: -1})
            const totalReceiveItem = await receiveMasterModel.find({}).countDocuments()
            responseReturn(res, 200, {receiveItems,totalReceiveItem})
           }else{
            const receiveItems = await receiveMasterModel.aggregate([
                {
                    $lookup: {
                        from: "vendors",
                        localField: "vendor_id",
                        foreignField: "_id",
                        as: "vendor"
                    },
                },
    
                { $sort: { "createdAt": -1 } },
            
            ])
            const totalReceiveItem = await receiveMasterModel.find({}).countDocuments()
            responseReturn(res, 200, {receiveItems,totalReceiveItem})
           }

        }catch (error) {
            console.log(error.message) 
            // responseReturn(res, 500, {error:'Internal server error'})
        }
    }

    receive_get_by_id =  async(req,res)=>{
        const {receiveId} = req.params
        try {
            // const item = await itemModel.findById(itemId)
            const receiveItem = await receiveMasterModel.aggregate([
                {
                    $match: { $expr : { $eq: [ '$_id' , { $toObjectId: receiveId } ] } }                
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
                        from: 'receivetypes',
                        localField: 'rec_type_id',
                        foreignField:"_id",
                        as:'receivetype'
                    }
                }              
            ])
            // console.log(receiveItem)
            responseReturn(res, 200, {receiveItem})
        } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
        }

    }
    receive_info_update = async(req, res)=>{
        let {rec_date,rec_type_id,vendor_id,discount,adjustment_qty,rec_by,rec_note,userName,receiveId} = req.body;

        const tempDate = moment(Date.now()).format('LLL')
        try {
            await receiveMasterModel.findByIdAndUpdate(receiveId,{
                rec_date,
                rec_type_id,
                vendor_id,
                discount,
                adjustment_qty,
                rec_by,
                rec_note,
                updated_by:userName,
                updated_date:tempDate

            })
            // const item = await vendorModel.findById(vendorId)
            responseReturn(res, 200, {message:'update success'})
        } catch (error) {
            console.log(error.message) 
        }
    }

    receive_invoice_delete = async(req, res)=>{
        const {receiveId} = req.params     
        try {
            const checkDetailId = await receiveDetailModel.find({
                $and:[
                    {
                        rec_master_id:{
                            $eq:receiveId
                        }
                    }
                ]
            })
            if(!checkDetailId.length>0){
                await receiveMasterModel.findByIdAndDelete(receiveId)
                responseReturn(res, 200, { message: 'Deleted success'})
            }else{
                responseReturn(res, 200, { error: 'please delete detail data for this id'})
            }       
        } catch (error) {
            console.log(error.message)
        }
    }

    receive_details_item_delete=async(req, res)=>{
        const {invoiceId,itemId} = req.params      
        try {
            const recDetailId = await receiveDetailModel.findOne({rec_invoice:invoiceId,item_id:itemId})
            await receiveDetailModel.findByIdAndDelete(recDetailId._id)
            responseReturn(res, 200, {
                message: 'Deleted success'
            })
        } catch (error) {
            console.log(error.message)
        }
    }
 

}

module.exports = new receiveControllers(); 