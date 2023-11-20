const vendorModel = require('../models/vendorModel')
const paymentModel = require('../models/paymentModel')

const { responseReturn } = require('../utils/response')
const moment = require('moment')
const { mongo: { ObjectId}} = require('mongoose')

class paymentControllers{

    get_all_vendors = async(req, res)=>{
        try {
            const vendors = await vendorModel.find({}).sort({createdAt: -1})
            responseReturn(res, 200, {vendors})
        } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
        }      
    }

    

    payment_add = async(req, res)=>{
        let {state,chequeDate,vendorId,payModeId,bankId,payDate,userName} = req.body
        const tempDate = moment(Date.now()).format('LLL')
        state.cheque_no = state.cheque_no.trim()
     
           try {
            const checkedCheque = await paymentModel.findOne({'cheque_no':state.cheque_no})
            if(!checkedCheque){
                    await paymentModel.create({
                        vendor_id:vendorId,
                        pay_mode_id:payModeId,
                        cheque_no:state.cheque_no,     
                        cheque_date:chequeDate,     
                        bank_id:bankId,     
                        pay_date:payDate,     
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
 
    get_all_payment = async(req, res)=>{
        const {searchValue} = req.query
        try{
           if(searchValue){
            const payments = await paymentModel.aggregate([   
                { $match: { $text: { $search: "searchValue" }} },                
                {
                    $lookup: {
                        from: "vendors",
                        localField: "vendor_id",
                        foreignField: "_id",
                        as: "vendor"
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
            ])
            // const collections = await collectionModel.find({$text:{$search:searchValue}}).sort({createdAt: -1})
            const totalPayment = await paymentModel.find({}).countDocuments()
            responseReturn(res, 200, {payments,totalPayment})
           }else{
            const payments = await paymentModel.aggregate([
                {
                    $lookup: {
                        from: "vendors",
                        localField: "vendor_id",
                        foreignField: "_id",
                        as: "vendor"
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
                { $sort: { "createdAt": -1 } },
            
            ])
            const totalPayment = await paymentModel.find({}).countDocuments()
            responseReturn(res, 200, {payments,totalPayment})
           }
          
        }catch (error) {
            console.log(error.message) 
            // responseReturn(res, 500, {error:'Internal server error'})
        }
    }

    payment_get_by_id =  async(req,res)=>{
        const {paymentId} = req.params
        try {
            // const item = await itemModel.findById(itemId)
            const payment = await paymentModel.aggregate([
                {
                    $match: { $expr : { $eq: [ '$_id' , { $toObjectId: paymentId } ] } }                
                },
                {
                    $lookup: {
                        from: "vendors",
                        localField: "vendor_id",
                        foreignField: "_id",
                        as: "vendor"
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
                }           
            ])

            responseReturn(res, 200, {payment})
        } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
        }

    }

    payment_update = async(req, res)=>{
        let {state,chequeDate,vendorId,payModeId,bankId,payDate,paymentId,userName} = req.body;

        const tempDate = moment(Date.now()).format('LLL')
        try {
            await paymentModel.findByIdAndUpdate(paymentId,{
                vendor_id:vendorId,
                pay_mode_id:payModeId,
                cheque_no:state.cheque_no,
                cheque_date:chequeDate,
                bank_id:bankId,
                pay_date:payDate,
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

module.exports = new paymentControllers(); 