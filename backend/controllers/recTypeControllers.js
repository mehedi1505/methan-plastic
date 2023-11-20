const receiveTypeModel = require('../models/receiveTypeModel')
const { responseReturn } = require('../utils/response')
const moment = require('moment')

class recTypeControllers{

    add_rec_type= async(req, res)=>{
        const {state,userName} = req.body
        const tempDate = moment(Date.now()).format('LLL')
           try {
               await receiveTypeModel.create({
                    rec_type_name:state.rec_type_name,
                    rec_type_desc:state.rec_type_desc,
                    entered_by:userName,
                    entered_date:tempDate
                })
                responseReturn(res, 201, {message:'Type add success'})
  
           } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
           }

    }

    rec_type_get = async(req, res)=>{
        const {searchValue} = req.query
        try{
           if(searchValue){
            const types = await receiveTypeModel.find({$text:{$search:searchValue}}).sort({createdAt: -1})
            const totalType = await receiveTypeModel.find({ $text:{$search:searchValue}}).countDocuments()
            responseReturn(res, 200, {types,totalType})
           }else{
            const types = await receiveTypeModel.find({}).sort({createdAt: -1})
            const totalType = await receiveTypeModel.find({}).countDocuments()
            responseReturn(res, 200, {types,totalType})
           }
        }catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
        }
    }
    rec_type_get_by_id = async(req,res)=>{
        const {recTypeId} = req.params
        try {
            const recType = await receiveTypeModel.findById(recTypeId)
            responseReturn(res, 200, {recType})
        } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
        }

    }
    rec_type_update = async(req, res)=>{
        let {rec_type_name,rec_type_desc,recTypeId,userName} = req.body;
        const tempDate = moment(Date.now()).format('LLL')
        rec_type_name= rec_type_name.trim()
        try {
            await receiveTypeModel.findByIdAndUpdate(recTypeId,{
                rec_type_name,
                rec_type_desc,
                updated_by:userName,
                updated_date:tempDate

            })
            const recType = await receiveTypeModel.findById(recTypeId)
            responseReturn(res, 200, {recType, message:'update success'})
        } catch (error) {
            console.log(error.message) 
        }
    }
    // item_category_delete = async(req, res)=>{
    //     const {category_id} = req.params
    //     try {
    //         await receiveTypeModel.findByIdAndDelete(category_id)
    //         responseReturn(res, 200, {
    //             message: 'Deleted success'
    //         })
    //     } catch (error) {
    //         console.log(error.message)
    //     }
    // }
 

}

module.exports = new recTypeControllers(); 