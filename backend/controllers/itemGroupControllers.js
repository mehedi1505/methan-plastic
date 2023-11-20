const itemGroupModel = require('../models/itemGroupModel')
const { responseReturn } = require('../utils/response')
const moment = require('moment')

class itemGroupControllers{

    add_item_group= async(req, res)=>{
        const {state,userName} = req.body
        const tempDate = moment(Date.now()).format('LLL')
           try {
               await itemGroupModel.create({
                    item_group_name:state.item_group_name,
                    item_group_desc:state.item_group_desc,
                    entered_by:userName,
                    entered_date:tempDate
                })
                responseReturn(res, 201, {message:'Group add success'})
  
           } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
           }

    }

    item_group_get = async(req, res)=>{
        const {searchValue} = req.query
        try{
           if(searchValue !==""){
            const itemGroups = await itemGroupModel.find({$text:{$search:searchValue}}).sort({createdAt: -1})
            const totalItemGroup = await itemGroupModel.find({ $text:{$search:searchValue}}).countDocuments()
            responseReturn(res, 200, {itemGroups,totalItemGroup})
           }else{
            const itemGroups = await itemGroupModel.find({}).sort({createdAt: -1})
            const totalItemGroup = await itemGroupModel.find({}).countDocuments()
            responseReturn(res, 200, {itemGroups,totalItemGroup})
           }
        }catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
        }
    }
    item_group_get_by_id = async(req,res)=>{
        const {groupId} = req.params
        try {
            const itemGroup = await itemGroupModel.findById(groupId)
            responseReturn(res, 200, {itemGroup})
        } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
        }

    }
    item_group_update = async(req, res)=>{
        let {item_group_name,item_group_desc,groupId,userName} = req.body;
        const tempDate = moment(Date.now()).format('LLL')
        item_group_name= item_group_name.trim()
        try {
            await itemGroupModel.findByIdAndUpdate(groupId,{
                item_group_name,
                item_group_desc,
                updated_by:userName,
                updated_date:tempDate

            })
            const itemGroup = await itemGroupModel.findById(groupId)
            responseReturn(res, 200, {itemGroup, message:'update success'})
        } catch (error) {
            console.log(error.message) 
        }
    }
    item_group_delete = async(req, res)=>{
        const { group_id } = req.params
        try {
            await itemGroupModel.findByIdAndDelete(group_id)
            responseReturn(res, 200, {
                message: 'Deleted success'
            })
        } catch (error) {
            console.log(error.message)
        }
    }
 

}

module.exports = new itemGroupControllers(); 