const itemCategoryModel = require('../models/itemCategoryModel')
const { responseReturn } = require('../utils/response')
const moment = require('moment')

class itemCategoryControllers{

    add_item_category= async(req, res)=>{
        const {state,userName} = req.body
        const tempDate = moment(Date.now()).format('LLL')
           try {
               await itemCategoryModel.create({
                    item_category_name:state.item_category_name,
                    item_category_desc:state.item_category_desc,
                    entered_by:userName,
                    entered_date:tempDate
                })
                responseReturn(res, 201, {message:'Category add success'})
  
           } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
           }

    }

    item_category_get = async(req, res)=>{
        const {searchValue} = req.query
        try{
           if(searchValue){
            const itemCategories = await itemCategoryModel.find({$text:{$search:searchValue}}).sort({createdAt: -1})
            const totalItemCategory = await itemCategoryModel.find({ $text:{$search:searchValue}}).countDocuments()
            responseReturn(res, 200, {itemCategories,totalItemCategory})
           }else{
            const itemCategories = await itemCategoryModel.find({}).sort({createdAt: -1})
            const totalItemCategory = await itemCategoryModel.find({}).countDocuments()
            responseReturn(res, 200, {itemCategories,totalItemCategory})
           }
        }catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
        }
    }
    item_category_get_by_id = async(req,res)=>{
        const {itemCatId} = req.params
        try {
            const itemCategory = await itemCategoryModel.findById(itemCatId)
            responseReturn(res, 200, {itemCategory})
        } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
        }

    }
    item_category_update = async(req, res)=>{
        let {item_category_name,item_category_desc,itemCatId,userName} = req.body;
        const tempDate = moment(Date.now()).format('LLL')
        item_category_name= item_category_name.trim()
        try {
            await itemCategoryModel.findByIdAndUpdate(itemCatId,{
                item_category_name,
                item_category_desc,
                updated_by:userName,
                updated_date:tempDate

            })
            const itemCategory = await itemCategoryModel.findById(itemCatId)
            responseReturn(res, 200, {itemCategory, message:'update success'})
        } catch (error) {
            console.log(error.message) 
        }
    }
    item_category_delete = async(req, res)=>{
        const {category_id} = req.params
        try {
            await itemCategoryModel.findByIdAndDelete(category_id)
            responseReturn(res, 200, {
                message: 'Deleted success'
            })
        } catch (error) {
            console.log(error.message)
        }
    }
 

}

module.exports = new itemCategoryControllers(); 