const termModel = require('../models/termModel')
const { responseReturn } = require('../utils/response')
const moment = require('moment')

class termControllers{

    add_term= async(req, res)=>{
        const {state,userName} = req.body
        const tempDate = moment(Date.now()).format('LLL')
           try {
               await termModel.create({
                    term_name:state.term_name,
                    term_desc:state.term_desc,
                    entered_by:userName,
                    entered_date:tempDate
                })
                responseReturn(res, 201, {message:'Term add success'})
  
           } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
           }

    }

    term_get = async(req, res)=>{
        const {searchValue} = req.query
        try{
           if(searchValue !== ""){
            const terms = await termModel.find({$text:{$search:searchValue}}).sort({createdAt: -1})
            const totalTerm = await termModel.find({ $text:{$search:searchValue}}).countDocuments()
            responseReturn(res, 200, {terms,totalTerm})
           }else{
            const terms = await termModel.find({}).sort({createdAt: -1})
            const totalTerm = await termModel.find({}).countDocuments()
            responseReturn(res, 200, {terms,totalTerm})
           }
        }catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
        }
    }
    term_get_by_id =  async(req,res)=>{
        const {termId} = req.params
        try {
            const term = await termModel.findById(termId)
            responseReturn(res, 200, {term})
        } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
        }

    }
    term_update = async(req, res)=>{
        let {term_name,term_desc,termId,userName} = req.body;
        const tempDate = moment(Date.now()).format('LLL')
        term_name= term_name.trim()
        try {
            await termModel.findByIdAndUpdate(termId,{
                term_name,
                term_desc,
                updated_by:userName,
                updated_date:tempDate

            })
            const term = await termModel.findById(termId)
            responseReturn(res, 200, {term, message:'update success'})
        } catch (error) {
            console.log(error.message) 
        }
    }
    term_delete = async(req, res)=>{
        const {term_id} = req.params
        try {
            await termModel.findByIdAndDelete(term_id)
            responseReturn(res, 200, {
                message: 'Deleted success'
            })
        } catch (error) {
            console.log(error.message)
        }
    }


 
 

}

module.exports = new termControllers(); 