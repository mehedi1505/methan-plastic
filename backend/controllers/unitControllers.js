const unitModel = require('../models/unitModel')
const { responseReturn } = require('../utils/response')
const moment = require('moment')

class unitControllers{

    add_unit= async(req, res)=>{
        const {state,userName} = req.body
        const tempDate = moment(Date.now()).format('LLL')
           try {
               await unitModel.create({
                    unit_name:state.unit_name,
                    unit_desc:state.unit_desc,
                    entered_by:userName,
                    entered_date:tempDate
                })
                responseReturn(res, 201, {message:'Unit add success'})
  
           } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
           }

    }

    unit_get = async(req, res)=>{
        const {searchValue} = req.query
        try{
           if(searchValue !== ""){
            const itemUnits = await unitModel.find({$text:{$search:searchValue}}).sort({createdAt: -1})
            const totalItemUnit = await unitModel.find({ $text:{$search:searchValue}}).countDocuments()
            responseReturn(res, 200, {itemUnits,totalItemUnit})
           }else{
            const itemUnits = await unitModel.find({}).sort({createdAt: -1})
            const totalItemUnit = await unitModel.find({}).countDocuments()
            responseReturn(res, 200, {itemUnits,totalItemUnit})
           }
        }catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
        }
    }
    unit_get_by_id =  async(req,res)=>{
        const {unitId} = req.params
        try {
            const itemUnit = await unitModel.findById(unitId)
            responseReturn(res, 200, {itemUnit})
        } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
        }

    }
    unit_update = async(req, res)=>{
        let {unit_name,unit_desc,unitId,userName} = req.body;
        const tempDate = moment(Date.now()).format('LLL')
        unit_name= unit_name.trim()
        try {
            await unitModel.findByIdAndUpdate(unitId,{
                unit_name,
                unit_desc,
                updated_by:userName,
                updated_date:tempDate

            })
            const itemUnit = await unitModel.findById(unitId)
            responseReturn(res, 200, {itemUnit, message:'update success'})
        } catch (error) {
            console.log(error.message) 
        }
    }
    unit_delete = async(req, res)=>{
        const {unit_id} = req.params
        try {
            await unitModel.findByIdAndDelete(unit_id)
            responseReturn(res, 200, {
                message: 'Deleted success'
            })
        } catch (error) {
            console.log(error.message)
        }
    }


 
 

}

module.exports = new unitControllers(); 