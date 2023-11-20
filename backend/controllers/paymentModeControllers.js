const paymentModeModel = require('../models/paymentModeModel')
const { responseReturn } = require('../utils/response')
const moment = require('moment')

class paymentModeControllers{

    pay_mode_add = async(req, res)=>{
        const {state,userName} = req.body
        const tempDate = moment(Date.now()).format('LLL')
           try {
               await paymentModeModel.create({
                    pay_mode:state.pay_mode,
                    pay_number:state.pay_number,
                    pay_note:state.pay_note,
                    entered_by:userName,
                    entered_date:tempDate
                })
                responseReturn(res, 201, {message:'successfully added'})
  
           } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
           }

    }

    pay_mode_get = async(req, res)=>{
        const {searchValue} = req.query
        try{
           if(searchValue){
            const paymodes = await paymentModeModel.find({$text:{$search:searchValue}}).sort({createdAt: -1})
            const totalPmode = await paymentModeModel.find({ $text:{$search:searchValue}}).countDocuments()
            responseReturn(res, 200, {paymodes,totalPmode})
           }else{
            const paymodes = await paymentModeModel.find({}).sort({createdAt: -1})
            const totalPmode = await paymentModeModel.find({}).countDocuments()
            responseReturn(res, 200, {paymodes,totalPmode})
           }
        }catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
        }
    }
    get_pay_mode_by_id = async(req,res)=>{
        const {pmodeId} = req.params
        try {
            const paymode = await paymentModeModel.findById(pmodeId)
            responseReturn(res, 200, {paymode})
        } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
        }

    }
    pay_mode_update = async(req, res)=>{
        let {pay_mode,pay_number,pay_note,pmodeId,userName} = req.body;
        const tempDate = moment(Date.now()).format('LLL')
        // bank_name= bank_name.trim()
        // bank_short_name= bank_short_name.trim()
        try {
            await paymentModeModel.findByIdAndUpdate(pmodeId,{
                pay_mode,
                pay_number,
                pay_note,
                updated_by:userName,
                updated_date:tempDate

            })
            responseReturn(res, 200, {message:'update success'})
        } catch (error) {
            console.log(error.message) 
        }
    }
    pay_mode_delete = async(req, res)=>{
        const {pmode_id} = req.params
        try {
            await paymentModeModel.findByIdAndDelete(pmode_id)
            responseReturn(res, 200, {
                message: 'Deleted success'
            })
        } catch (error) {
            console.log(error.message)
        }
    }
 

}

module.exports = new paymentModeControllers(); 