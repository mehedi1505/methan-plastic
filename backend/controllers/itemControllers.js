const itemModel = require('../models/itemModel')
const { responseReturn } = require('../utils/response')
const moment = require('moment')
const { mongo: { ObjectId}} = require('mongoose')
class itemControllers{

    item_add= async(req, res)=>{
        const {state,category,unit,term,group,userName} = req.body
        const tempDate = moment(Date.now()).format('LLL')
           try {
               await itemModel.create({
                item_name:state.item_name.trim(),
                item_code:state.item_code.trim(),
                desc:state.desc,
                item_price:state.item_price,
                opening_stock:state.opening_stock,
                item_category:category,
                term,
                unit,
                group,       
                entered_by:userName,
                entered_date:tempDate
                })
                responseReturn(res, 201, {message:'success'})
  
           } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
            // console.log(error.message) 
           }

    }

    items_get = async(req, res)=>{
        const {searchValue} = req.query
        // console.log(typeof searchValue)
        try{
           if(searchValue){
            const items = await itemModel.aggregate([   
                { $match: { $text: { $search: "searchValue" }} },      
                {
                    $lookup: {
                        from: "units", // collection to join
                        localField: "unit",//field from the input documents
                        foreignField: "_id",//field from the documents of the "from" collection
                        as: "unit"// output array field
                    }
                }
            ])
            // const items = await itemModel.find({$text:{$search:searchValue}}).sort({createdAt: -1})
            const totalItems = await itemModel.aggregate([   
                { $match: { $text: { $search: "searchValue" } } },      
                {
                    $lookup: {
                        from: "units", // collection to join
                        localField: "unit",//field from the input documents
                        foreignField: "_id",//field from the documents of the "from" collection
                        as: "unit"// output array field
                    }
                }
            ]).countDocuments()
            responseReturn(res, 200, {items,totalItems})
           }else{
            const items = await itemModel.aggregate([
                {
                    $lookup: {
                        from: "units", // collection to join
                        localField: "unit",//field from the input documents
                        foreignField: "_id",//field from the documents of the "from" collection
                        as: "unit"// output array field
                    }
                },
                { $sort: { "createdAt": -1 } }
            ])
            const totalItems = await itemModel.find({}).countDocuments()
            responseReturn(res, 200, {items,totalItems})
           }

        }catch (error) {
            console.log(error.message) 
            // responseReturn(res, 500, {error:'Internal server error'})
        }
    }

    item_get_by_id =  async(req,res)=>{
        const {itemId} = req.params
        try {
            // const item = await itemModel.findById(itemId)
            const item = await itemModel.aggregate([
                {
                    $match: { $expr : { $eq: [ '$_id' , { $toObjectId: itemId } ] } }                
                },
                {
                    $lookup:{
                        from: 'units',
                        localField: 'unit',
                        foreignField:"_id",
                        as:'unit'
                    }
                },  
                {
                    $lookup:{
                        from: 'itemcategories',
                        localField: 'category',
                        foreignField:"_id",
                        as:'category'
                    }
                }, 
                {
                    $lookup:{
                        from: 'itemgroups',
                        localField: 'group',
                        foreignField:"_id",
                        as:'group'
                    }
                }, 
                {
                    $lookup:{
                        from: 'terms',
                        localField: 'term',
                        foreignField:"_id",
                        as:'term'
                    }
                },              
            ])
            responseReturn(res, 200, {item})
        } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
        }

    }
    item_update = async(req, res)=>{
        let {item_name,item_code,desc,item_price,category_id,unit_id,group_id,term_id,opening_stock,status,userName,itemId} = req.body;
        const tempDate = moment(Date.now()).format('LLL')
        // console.log(req.body)
        // vendor_name= vendor_name.trim()
        try {
            await itemModel.findByIdAndUpdate(itemId,{
                item_name,
                item_code,
                desc,
                item_price,
                item_category:category_id,
                unit:unit_id,
                group:group_id,
                term:term_id,
                opening_stock,
                status,
                updated_by:userName,
                updated_date:tempDate

            })
            // const item = await vendorModel.findById(vendorId)
            responseReturn(res, 200, {message:'update success'})
        } catch (error) {
            console.log(error.message) 
        }
    }
    // item_delete = async(req, res)=>{
    //     const {vendor_id} = req.params
    //     try {
    //         await termModel.findByIdAndDelete(vendor_id)
    //         responseReturn(res, 200, {
    //             message: 'Deleted success'
    //         })
    //     } catch (error) {
    //         console.log(error.message)
    //     }
    // }


 
 

}

module.exports = new itemControllers(); 