const customerModel = require('../models/customerModel')
const paymentModeModel = require('../models/paymentModeModel')
const bankModel = require('../models/bankModel')
const agentModel = require('../models/agentModel')
const collectionModel = require('../models/collectionModel')

const { responseReturn } = require('../utils/response')
const moment = require('moment')
const { mongo: { ObjectId}} = require('mongoose')

class collectionControllers{
    get_all_payment_mode = async(req, res)=>{
        try {
            const payModes = await paymentModeModel.find({}).sort({createdAt: -1})
            responseReturn(res, 200, {payModes})
        } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
        }      
    }
    get_all_customers = async(req, res)=>{
        try {
            const customers = await customerModel.find({}).sort({createdAt: -1})
            responseReturn(res, 200, {customers})
        } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
        }      
    }
    get_banks = async(req, res)=>{
        try {
            const banks = await bankModel.find({}).sort({createdAt: -1})
            // console.log(banks)
            responseReturn(res, 200, {banks})
        } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
        }      
    }
    get_agents = async(req, res)=>{
        try {
            const agents = await agentModel.find({}).sort({createdAt: -1})
            // console.log(agents)
            responseReturn(res, 200, {agents})
        } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
        }      
    }
    // get_items = async(req, res)=>{
    //     try {
    //         const items = await itemModel.aggregate([
    //             {
    //                 $lookup:{
    //                     from: 'units',
    //                     localField: 'unit',
    //                     foreignField:"_id",
    //                     as:'unit'
    //                 }
    //             },{
    //                $sort:{
    //                 createdAt: 1
    //                } 
    //             }
                         
    //         ])
    //         responseReturn(res, 200, {items})
    //     } catch (error) {
    //         responseReturn(res, 500, {error:'Internal server error'})
    //     }      
    // }
    // get_item_info = async(req, res)=>{
    //     const {itemId} = req.params
    //     try {
    //         const itemInfo = await itemModel.aggregate([
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
    //             } 
                         
    //         ])
    //         responseReturn(res, 200, {itemInfo})
    //         // const unit = await unitModel.findById(itemId)
    //     } catch (error) {
    //         responseReturn(res, 500, {error:'Internal server error'})
    //     }      
    // }

    collection_add = async(req, res)=>{
        let {state,chequeDate,custId,payModeId,payReceiveId,bankId,payDate,userName} = req.body
        const tempDate = moment(Date.now()).format('LLL')
        state.cheque_no = state.cheque_no.trim()
     
           try {
            const checkedCheque = await collectionModel.findOne({'cheque_no':state.cheque_no})
            if(!checkedCheque){
                    await collectionModel.create({
                        cust_id:custId,
                        pay_mode_id:payModeId,
                        cheque_no:state.cheque_no,     
                        cheque_date:chequeDate,     
                        bank_id:bankId,     
                        pay_date:payDate,     
                        pay_receive_by:payReceiveId,     
                        pay_amount:state.pay_amount,     
                        pay_note:state.pay_note,     
                        entered_by:userName,
                        entered_date:tempDate
                    })
                responseReturn(res, 201, {message:'success'})
            }else{       
                responseReturn(res, 201, {error:'Cheque already Added!!'})  
            }
              
           } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
            // console.log(error.message) 
       
           }
    }
    // last_invoice_number = async(req, res)=>{
    //     try {
    //         const lastInvoiceNumber = await receiveMasterModel.find({}).sort({_id:-1}).limit(1)
    //         responseReturn(res, 200, {lastInvoiceNumber})
    //     } catch (error) {
    //         responseReturn(res, 500, {error:'Internal server error'})
    //     }
    // }
    // show_item_receive = async(req, res)=>{
    //         const {receiveId} = req.params
    //         try {
    //             const receiveDetails = await receiveDetailModel.find({
    //                $and: [
    //                    {
    //                         rec_invoice:{
    //                             $eq:receiveId
    //                         }
    //                    }   
    //                ],                     
    //             })
    //             const receiveTotal = await receiveDetailModel.aggregate([

    //                 {$match:{"rec_invoice":receiveId}},
    //                 {$group:{_id:"$rec_invoice", total: {$sum: "$item_total"} }}
    //             ])
    //             responseReturn(res, 201, {receiveDetails,receiveTotal})
    //         } catch (error) {
    //             responseReturn(res, 500, {error:'Internal server error'})
    //         }
    // }
    get_all_collection = async(req, res)=>{
        const {searchValue} = req.query
        try{
           if(searchValue){
            const collections = await collectionModel.aggregate([   
                { $match: { $text: { $search: "searchValue" }} },                
                {
                    $lookup: {
                        from: "customers",
                        localField: "cust_id",
                        foreignField: "_id",
                        as: "customer"
                    }
                },
                {
                    $lookup: {
                        from: "paymodes",
                        localField: "pay_mode_id",
                        foreignField: "_id",
                        as: "payMode"
                    }
                },
                {
                    $lookup: {
                        from: "banks",
                        localField: "bank_id",
                        foreignField: "_id",
                        as: "bank"
                    }
                },
                {
                    $lookup: {
                        from: "agents",
                        localField: "pay_receive_by",
                        foreignField: "_id",
                        as: "agent"
                    }
                }
            ])
            // const collections = await collectionModel.find({$text:{$search:searchValue}}).sort({createdAt: -1})
            const totalCollection = await collectionModel.find({}).countDocuments()
            responseReturn(res, 200, {collections,totalCollection})
           }else{
            const collections = await collectionModel.aggregate([
                {
                    $lookup: {
                        from: "customers",
                        localField: "cust_id",
                        foreignField: "_id",
                        as: "customer"
                    }
                },
                {
                    $lookup: {
                        from: "paymodes",
                        localField: "pay_mode_id",
                        foreignField: "_id",
                        as: "payMode"
                    }
                },
                {
                    $lookup: {
                        from: "banks",
                        localField: "bank_id",
                        foreignField: "_id",
                        as: "bank"
                    }
                },
                {
                    $lookup: {
                        from: "agents",
                        localField: "pay_receive_by",
                        foreignField: "_id",
                        as: "agent"
                    }
                },
                { $sort: { "createdAt": -1 } },
            
            ])
            const totalCollection = await collectionModel.find({}).countDocuments()
            responseReturn(res, 200, {collections,totalCollection})
           }
          
        }catch (error) {
            console.log(error.message) 
            // responseReturn(res, 500, {error:'Internal server error'})
        }
    }

    collection_get_by_id =  async(req,res)=>{
        const {collectionId} = req.params
        try {
            // const item = await itemModel.findById(itemId)
            const collection = await collectionModel.aggregate([
                {
                    $match: { $expr : { $eq: [ '$_id' , { $toObjectId: collectionId } ] } }                
                },
                {
                    $lookup: {
                        from: "customers",
                        localField: "cust_id",
                        foreignField: "_id",
                        as: "customer"
                    }
                },
                {
                    $lookup: {
                        from: "paymodes",
                        localField: "pay_mode_id",
                        foreignField: "_id",
                        as: "payMode"
                    }
                },
                {
                    $lookup: {
                        from: "banks",
                        localField: "bank_id",
                        foreignField: "_id",
                        as: "bank"
                    }
                },
                {
                    $lookup: {
                        from: "agents",
                        localField: "pay_receive_by",
                        foreignField: "_id",
                        as: "agent"
                    }
                },           
            ])

            responseReturn(res, 200, {collection})
        } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
        }

    }

    collection_update = async(req, res)=>{
        let {state,chequeDate,custId,payModeId,payReceiveId,bankId,payDate,collectionId,userName} = req.body;

        const tempDate = moment(Date.now()).format('LLL')
        try {
            await collectionModel.findByIdAndUpdate(collectionId,{
                cust_id:custId,
                pay_mode_id:payModeId,
                cheque_no:state.cheque_no,
                cheque_date:chequeDate,
                bank_id:bankId,
                pay_date:payDate,
                pay_receive_by:payReceiveId,
                pay_amount:state.pay_amount,
                pay_note:state.pay_note,
                updated_by:userName,
                updated_date:tempDate

            })
            responseReturn(res, 200, {message:'update success'})
        } catch (error) {
            console.log(error.message) 
        }
    }

    // receive_invoice_delete = async(req, res)=>{
    //     const {receiveId} = req.params     
    //     try {
    //         const checkDetailId = await receiveDetailModel.find({
    //             $and:[
    //                 {
    //                     rec_master_id:{
    //                         $eq:receiveId
    //                     }
    //                 }
    //             ]
    //         })
    //         if(!checkDetailId.length>0){
    //             await receiveMasterModel.findByIdAndDelete(receiveId)
    //             responseReturn(res, 200, { message: 'Deleted success'})
    //         }else{
    //             responseReturn(res, 200, { error: 'please delete detail data for this id'})
    //         }       
    //     } catch (error) {
    //         console.log(error.message)
    //     }
    // }

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

module.exports = new collectionControllers(); 