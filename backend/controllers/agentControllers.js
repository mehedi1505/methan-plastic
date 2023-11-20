const agentModel = require('../models/agentModel')
const { responseReturn } = require('../utils/response')
const moment = require('moment')

class agentControllers{

    agent_add= async(req, res)=>{
        const {state,userName} = req.body
        const tempDate = moment(Date.now()).format('LLL')
           try {
            const checkEmail = await agentModel.find({
                $and:[
                    {
                        agent_email:{
                            $eq: state.agent_email
                        }
                    }
                ]
            })

         if(!checkEmail.length>0){
            const agent = await agentModel.create({
                agent_fullname:state.agent_fullname,
                agent_address:state.agent_address,
                agent_contact:state.agent_contact,
                agent_email:state.agent_email,
                entered_by:userName,
                entered_date:tempDate
            })
                responseReturn(res, 201, {message:'successfully added'})
            }else{
                responseReturn(res, 201, {error:'Email already exist'})
            }
  
           } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
           }

    }

    agent_get = async(req, res)=>{
        const {searchValue} = req.query
        try{
           if(searchValue){
            const agents = await agentModel.find({$text:{$search:searchValue}}).sort({createdAt: -1})
            const totalAgent = await agentModel.find({ $text:{$search:searchValue}}).countDocuments()
            responseReturn(res, 200, {agents,totalAgent})
           }else{
            const agents = await agentModel.find({}).sort({createdAt: -1})
            const totalAgent = await agentModel.find({}).countDocuments()
            responseReturn(res, 200, {agents,totalAgent})
           }
        }catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
        }
    }
    get_agent_by_id = async(req,res)=>{
        const {agentId} = req.params
        try {
            const agent = await agentModel.findById(agentId)
            responseReturn(res, 200, {agent})
        } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
        }

    }
    agent_update = async(req, res)=>{
        let {agent_fullname,agent_address,agent_contact,agent_email,agentId,userName} = req.body;
        const tempDate = moment(Date.now()).format('LLL')
        // bank_name= bank_name.trim()
        // bank_short_name= bank_short_name.trim()
        try {
            await agentModel.findByIdAndUpdate(agentId,{
                agent_fullname,
                agent_address,
                agent_contact,
                agent_email,
                updated_by:userName,
                updated_date:tempDate

            })
            responseReturn(res, 200, {message:'update success'})
        } catch (error) {
            console.log(error.message) 
        }
    }
    agent_delete = async(req, res)=>{
        const {agent_id} = req.params
        try {
            await agentModel.findByIdAndDelete(agent_id)
            responseReturn(res, 200, {
                message: 'Deleted success'
            })
        } catch (error) {
            console.log(error.message)
        }
    }
 

}

module.exports = new agentControllers(); 