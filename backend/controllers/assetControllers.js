const assetTypeModel = require('../models/assetTypeModel')
const assetRegisterModel = require('../models/assetRegisterModel')
const assetRevalueModel = require('../models/assetRevalueModel')
const assetDepreciationModel = require('../models/assetDepreciationModel')
const assetClosureModel = require('../models/assetClosureModel')
const { responseReturn } = require('../utils/response')
const moment = require('moment')

class assetControllers{
    asset_type_add= async(req, res)=>{
        const {state,userName} = req.body
        const tempDate = moment(Date.now()).format('LLL')
           try {
               await assetTypeModel.create({
                    asset_type_name:state.asset_type_name,
                    asset_type_shortcode:state.asset_type_shortcode,
                    asset_type_note:state.asset_type_note,
                    entered_by:userName,
                    entered_date:tempDate
                })
                responseReturn(res, 201, {message:'Type add success'})
  
           } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
           }

    }

    asset_type_get = async(req, res)=>{
        const {searchValue} = req.query
        try{
           if(searchValue){
            const assetTypes = await assetTypeModel.find({$text:{$search:searchValue}}).sort({createdAt: -1})
            const totalType = await assetTypeModel.find({ $text:{$search:searchValue}}).countDocuments()
            responseReturn(res, 200, {assetTypes,totalType})
           }else{
            const assetTypes = await assetTypeModel.find({}).sort({createdAt: -1})
            const totalType = await assetTypeModel.find({}).countDocuments()
            responseReturn(res, 200, {assetTypes,totalType})
           }
        }catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
        }
    }
    asset_type_get_by_id = async(req,res)=>{
        const {typeId} = req.params
        try {
            const assetType = await assetTypeModel.findById(typeId)
            responseReturn(res, 200, {assetType})
        } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
        }

    }
    asset_type_update = async(req, res)=>{
        let {asset_type_name,asset_type_shortcode,asset_type_note,typeId,userName} = req.body;
        const tempDate = moment(Date.now()).format('LLL')
        asset_type_name= asset_type_name.trim()
        try {
            await assetTypeModel.findByIdAndUpdate(typeId,{
                asset_type_name,
                asset_type_shortcode,
                asset_type_note,
                updated_by:userName,
                updated_date:tempDate

            })
            responseReturn(res, 200, {message:'update success'})
        } catch (error) {
            console.log(error.message) 
        }
    }

//asset register methods

    asset_register_add= async(req, res)=>{
        let {state,selectedDate,assetTypeId,userName} = req.body
        const tempDate = moment(Date.now()).format('LLL')
        state.asset_name = state.asset_name.trim()
           try {

            const checkAsset = await assetRegisterModel.find({
                $and:[
                    {
                        asset_name:{
                            $eq: state.asset_name
                        }
                    }
                ]
            })
            if(!checkAsset.length>0){
                await assetRegisterModel.create({
                    asset_name:state.asset_name,
                    asset_type_id:assetTypeId,
                    purchase_date:selectedDate,
                    asset_origin:state.asset_origin,
                    asset_price:state.asset_price,
                    asset_note:state.asset_note,
                    entered_by:userName,
                    entered_date:tempDate
                })
                responseReturn(res, 201, {message:'Register success'})
            }else{
                responseReturn(res, 201, {error:'Already Register!'}) 
            }
          
  
           } catch (error) {
            console.log(error.message)
            // responseReturn(res, 500, {error:'Internal server error'})
           }

    }
    asset_register_get = async(req, res)=>{
        const {searchValue} = req.query
        try{
           if(searchValue){
            const assetRegisters = await assetRegisterModel.aggregate([   
                { $match: { $text: { $search: "searchValue" }} }, 
               
                {
                    $lookup: {
                        from: "assettypes", // collection to join
                        localField: "asset_type_id",//field from the input documents
                        foreignField: "_id",//field from the documents of the "from" collection
                        as: "type"// output array field
                    }
                }
            ])
            // const items = await itemModel.find({$text:{$search:searchValue}}).sort({createdAt: -1})
            const totalRegister = await assetRegisterModel.find({}).countDocuments()
            responseReturn(res, 200, {assetRegisters,totalRegister})
           }else{
            const assetRegisters = await assetRegisterModel.aggregate([
                {
                    $lookup: {
                        from: "assettypes", // collection to join
                        localField: "asset_type_id",//field from the input documents
                        foreignField: "_id",//field from the documents of the "from" collection
                        as: "type"// output array field
                    },
                },
    
                { $sort: { "createdAt": -1 } },
            
            ])
            const totalRegister = await assetRegisterModel.find({}).countDocuments()
            responseReturn(res, 200, {assetRegisters,totalRegister})
           }

        }catch (error) {
            console.log(error.message) 
            // responseReturn(res, 500, {error:'Internal server error'})
        }
    }
    register_get_by_id =  async(req,res)=>{
        const {regId} = req.params
        try {
            // const item = await itemModel.findById(itemId)
            const assetRegister = await assetRegisterModel.aggregate([
                {
                    $match: { $expr : { $eq: [ '$_id' , { $toObjectId: regId } ] } }                
                },
                {
                    $lookup: {
                        from: "assettypes", // collection to join
                        localField: "asset_type_id",
                        foreignField: "_id",//field from the documents of the "from" collection
                        as: "type"// output array field
                    }
                },            
            ])
            responseReturn(res, 200, {assetRegister})
        } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
        }

    }
    register_update = async(req, res)=>{
        let {asset_name,purchase_date,asset_type_id,asset_origin,asset_price,asset_note,status,userName,regId} = req.body;
        asset_name = asset_name.trim()
        const tempDate = moment(Date.now()).format('LLL')
        try {
            await assetRegisterModel.findByIdAndUpdate(regId,{
                asset_name,
                purchase_date,
                asset_type_id,
                asset_origin,
                asset_price,
                asset_note,
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
    //asset revalue methods
    get_type_origin = async(req, res)=>{
        const {assetId} = req.params
           try {
                const register = await assetRegisterModel.findById(assetId)
                const type = await assetTypeModel.findById(register.asset_type_id)
                responseReturn(res, 201, {type,register}) 
           } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
           }
    }

    asset_register_item_get = async(req,res)=>{
        try {
            const registerItem = await assetRegisterModel.find({}).sort({createdAt:-1})
            responseReturn(res, 201, {registerItem}) 
       } catch (error) {
        responseReturn(res, 500, {error:'Internal server error'})
       }
    }

    asset_revalue_add= async(req, res)=>{
        const {state,selectedDate,assetId,userName} = req.body
        const tempDate = moment(Date.now()).format('LLL')
           try {
                await assetRevalueModel.create({
                    asset_id:assetId,
                    revalue_date:selectedDate,
                    revalue_price:state.revalue_price,
                    revalue_note:state.revalue_note,
                    entered_by:userName,
                    entered_date:tempDate
                })
                responseReturn(res, 201, {message:'Revalue Add success'}) 
           } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
           }

    }
    asset_revalue_get = async(req, res)=>{
        const {searchValue} = req.query
        try{
           if(searchValue){
            const assetRevalues = await assetRevalueModel.aggregate([   
                { $match: { $text: { $search: "searchValue" }} }, 
               
                {
                    $lookup: {
                        from: "assetregisters",
                        localField: "asset_id",
                        foreignField: "_id",
                        as: "register"
                    }
                }
            ])
            const totalRevalue = await assetRevalueModel.find({}).countDocuments()
            responseReturn(res, 200, {assetRevalues,totalRevalue})
           }else{
            const assetRevalues = await assetRevalueModel.aggregate([
                {
                    $lookup: {
                        from: "assetregisters", 
                        localField: "asset_id",
                        foreignField: "_id",
                        as: "register"
                    }
                },
    
                { $sort: { "createdAt": -1 } },
            
            ])
            const totalRevalue = await assetRevalueModel.find({}).countDocuments()
            responseReturn(res, 200, {assetRevalues,totalRevalue})
           }

        }catch (error) {
            console.log(error.message) 
            responseReturn(res, 500, {error:'Internal server error'})
        }
    }
    revalue_get_by_id =  async(req,res)=>{
        const {revalueId} = req.params
        try {
            const assetRevalue = await assetRevalueModel.aggregate([
                {
                    $match: { $expr : { $eq: [ '$asset_id' , { $toObjectId: revalueId } ] } }                
                },
                {
                    $lookup: {
                        from: "assetregisters", 
                        localField: "asset_id",
                        foreignField: "_id",
                        as: "register"//
                    }
                },            
            ])
            
            const type = await assetTypeModel.findById(`${assetRevalue[0].register[0].asset_type_id}`)
            responseReturn(res, 200, {assetRevalue,type})
        } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
        }

    }
    revalue_update = async(req, res)=>{
        let {selectedDate,state,userName,asset_id} = req.body;
        const tempDate = moment(Date.now()).format('LLL')
        try {
            const revalueData = await assetRevalueModel.findOne({asset_id:asset_id})
            const revalueId = revalueData._id
            await assetRevalueModel.findByIdAndUpdate(revalueId,{
                revalue_date:selectedDate,
                revalue_price:state.revalue_price,
                revalue_note:state.revalue_note,
                updated_by:userName,
                updated_date:tempDate

            })
            // const item = await vendorModel.findById(vendorId)
            responseReturn(res, 200, {message:'update success'})
        } catch (error) {
            console.log(error.message) 
        }
    }
    asset_depreciation_add= async(req, res)=>{
        const {state,selectedDate,assetId,userName} = req.body
        const tempDate = moment(Date.now()).format('LLL')
        // const check = await assetDepreciationModel.findOne({'asset_id':assetId})
           try {
            
                await assetDepreciationModel.create({
                    asset_id:assetId,
                    depreciation_date:selectedDate,
                    depreciation_price:state.depreciation_price,
                    depreciation_note:state.depreciation_note,
                    entered_by:userName,
                    entered_date:tempDate
                })
                responseReturn(res, 201, {message:'Depreciation Add success'}) 
            
               
           } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
           }

    }

    asset_depreciation_get = async(req, res)=>{
        const {searchValue} = req.query
        try{
           if(searchValue){
            const assetDepreciations = await assetDepreciationModel.aggregate([   
                { $match: { $text: { $search: "searchValue" }} }, 
               
                {
                    $lookup: {
                        from: "assetregisters",
                        localField: "asset_id",
                        foreignField: "_id",
                        as: "register"
                    }
                }
            ])
            const totalDepreciation = await assetDepreciationModel.find({}).countDocuments()
            responseReturn(res, 200, {assetDepreciations,totalDepreciation})
           }else{
            const assetDepreciations = await assetDepreciationModel.aggregate([
                {
                    $lookup: {
                        from: "assetregisters", 
                        localField: "asset_id",
                        foreignField: "_id",
                        as: "register"
                    }
                },
    
                { $sort: { "createdAt": -1 } },
            
            ])
            const totalDepreciation = await assetDepreciationModel.find({}).countDocuments()
            responseReturn(res, 200, {assetDepreciations,totalDepreciation})
           }

        }catch (error) {
            console.log(error.message) 
            responseReturn(res, 500, {error:'Internal server error'})
        }
    }

    depreciation_get_by_id =  async(req,res)=>{
        const {depreciationId} = req.params
        try {
            const assetDepreciation = await assetDepreciationModel.aggregate([
                {
                    $match: { $expr : { $eq: [ '$asset_id' , { $toObjectId: depreciationId } ] } }                
                },
                {
                    $lookup: {
                        from: "assetregisters", 
                        localField: "asset_id",
                        foreignField: "_id",
                        as: "register"
                    }
                },            
            ])
            
            const type = await assetTypeModel.findById(`${assetDepreciation[0].register[0].asset_type_id}`)
            responseReturn(res, 200, {assetDepreciation,type})
        } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
        }

    }
    depreciation_update = async(req, res)=>{
        let {selectedDate,state,userName,asset_id} = req.body;
        const tempDate = moment(Date.now()).format('LLL')
        try {
            const depreciationData = await assetDepreciationModel.findOne({asset_id:asset_id})
            const depreciationId = depreciationData._id
            await assetDepreciationModel.findByIdAndUpdate(depreciationId,{
                depreciation_date:selectedDate,
                depreciation_price:state.depreciation_price,
                depreciation_note:state.depreciation_note,
                updated_by:userName,
                updated_date:tempDate

            })
            // const item = await vendorModel.findById(vendorId)
            responseReturn(res, 200, {message:'update success'})
        } catch (error) {
            console.log(error.message) 
        }
    }
    asset_closure_add= async(req, res)=>{
        const {state,selectedDate,assetId,userName} = req.body
        const tempDate = moment(Date.now()).format('LLL')
           try {
                await assetClosureModel.create({
                    asset_id:assetId,
                    closure_date:selectedDate,
                    closure_reason:state.closure_reason,
                    closure_note:state.closure_note,
                    entered_by:userName,
                    entered_date:tempDate
                })
                responseReturn(res, 201, {message:'Closure Add success'}) 
           } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
           }

    }

    asset_closure_get = async(req, res)=>{
        const {searchValue} = req.query
        try{
           if(searchValue){
            const assetClosures = await assetClosureModel.aggregate([   
                { $match: { $text: { $search: "searchValue" }} }, 
               
                {
                    $lookup: {
                        from: "assetregisters",
                        localField: "asset_id",
                        foreignField: "_id",
                        as: "register"
                    }
                }
            ])
            const totalClosure = await assetClosureModel.find({}).countDocuments()
            responseReturn(res, 200, {assetClosures,totalClosure})
           }else{
            const assetClosures = await assetClosureModel.aggregate([
                {
                    $lookup: {
                        from: "assetregisters", 
                        localField: "asset_id",
                        foreignField: "_id",
                        as: "register"
                    }
                },
    
                { $sort: { "createdAt": -1 } },
            
            ])
            const totalClosure = await assetClosureModel.find({}).countDocuments()
            responseReturn(res, 200, {assetClosures,totalClosure})
           }

        }catch (error) {
            console.log(error.message) 
            responseReturn(res, 500, {error:'Internal server error'})
        }
    }
    closure_get_by_id =  async(req,res)=>{
        const {closureId} = req.params
        try {
            const assetClosure = await assetClosureModel.aggregate([
                {
                    $match: { $expr : { $eq: [ '$asset_id' , { $toObjectId: closureId } ] } }                
                },
                {
                    $lookup: {
                        from: "assetregisters", 
                        localField: "asset_id",
                        foreignField: "_id",
                        as: "register"
                    }
                },            
            ])
            
            const type = await assetTypeModel.findById(`${assetClosure[0].register[0].asset_type_id}`)
            responseReturn(res, 200, {assetClosure,type})
        } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
        }

    }
    closure_update = async(req, res)=>{
        let {selectedDate,state,userName,asset_id} = req.body;
        const tempDate = moment(Date.now()).format('LLL')
        try {
            const closureData = await assetClosureModel.findOne({asset_id:asset_id})
            const closureId = closureData._id
            await assetClosureModel.findByIdAndUpdate(closureId,{
                closure_date:selectedDate,
                closure_Reason:state.closure_Reason,
                closure_note:state.closure_note,
                updated_by:userName,
                updated_date:tempDate

            })
            // const item = await vendorModel.findById(vendorId)
            responseReturn(res, 200, {message:'update success'})
        } catch (error) {
            console.log(error.message) 
        }
    }
}

module.exports = new assetControllers(); 