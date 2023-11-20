const bankModel = require('../models/bankModel')
const { responseReturn } = require('../utils/response')
const moment = require('moment')

class bankControllers{

    bank_add= async(req, res)=>{
        const {state,userName} = req.body
        const tempDate = moment(Date.now()).format('LLL')
           try {
               await bankModel.create({
                    bank_name:state.bank_name,
                    bank_short_name:state.bank_short_name,
                    entered_by:userName,
                    entered_date:tempDate
                })
                responseReturn(res, 201, {message:'successfully added'})
  
           } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
           }

    }

    bank_get = async(req, res)=>{
        const {searchValue} = req.query
        try{
           if(searchValue){
            const banks = await bankModel.find({$text:{$search:searchValue}}).sort({createdAt: -1})
            const totalBank = await bankModel.find({ $text:{$search:searchValue}}).countDocuments()
            responseReturn(res, 200, {banks,totalBank})
           }else{
            const banks = await bankModel.find({}).sort({createdAt: -1})
            const totalBank = await bankModel.find({}).countDocuments()
            responseReturn(res, 200, {banks,totalBank})
           }
        }catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
        }
    }
    get_bank_by_id = async(req,res)=>{
        const {bankId} = req.params
        try {
            const bank = await bankModel.findById(bankId)
            responseReturn(res, 200, {bank})
        } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
        }

    }
    bank_update = async(req, res)=>{
        let {bank_name,bank_short_name,bankId,userName} = req.body;
        const tempDate = moment(Date.now()).format('LLL')
        // bank_name= bank_name.trim()
        // bank_short_name= bank_short_name.trim()
        try {
            await bankModel.findByIdAndUpdate(bankId,{
                bank_name,
                bank_short_name,
                updated_by:userName,
                updated_date:tempDate

            })
            responseReturn(res, 200, {message:'update success'})
        } catch (error) {
            console.log(error.message) 
        }
    }
    bank_delete = async(req, res)=>{
        const {bank_id} = req.params
        try {
            await bankModel.findByIdAndDelete(bank_id)
            responseReturn(res, 200, {
                message: 'Deleted success'
            })
        } catch (error) {
            console.log(error.message)
        }
    }
 

}

module.exports = new bankControllers(); 