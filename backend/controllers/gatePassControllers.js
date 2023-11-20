const gatePassMasterModel = require('../models/gatePassMasterModel')
const gatePassDetailModel = require('../models/gatePassDetailModel')
const gatePassTypeModel = require('../models/gatePassTypeModel')
const agentModel = require('../models/agentModel')
const customerModel = require('../models/customerModel')
const termModel = require('../models/termModel')
const productModel = require('../models/productModel')
const { responseReturn } = require('../utils/response')
const moment = require('moment')

class gatePassControllers{

    gate_pass_type_add= async(req, res)=>{
        const {state,userName} = req.body
        const tempDate = moment(Date.now()).format('LLL')
           try {
               await gatePassTypeModel.create({
                    gp_type:state.gp_type,
                    gp_note:state.gp_note,
                    entered_by:userName,
                    entered_date:tempDate
                })
                responseReturn(res, 201, {message:'successfully added'})
  
           } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
           }

    }

    get_all_gate_pass_type = async(req, res)=>{
        const {searchValue} = req.query
        try{
           if(searchValue){
            const gatePassTypes = await gatePassTypeModel.find({$text:{$search:searchValue}}).sort({createdAt: -1})
            const totalGatePassType = await gatePassTypeModel.find({ $text:{$search:searchValue}}).countDocuments()
            responseReturn(res, 200, {gatePassTypes,totalGatePassType})
           }else{
            const gatePassTypes = await gatePassTypeModel.find({}).sort({createdAt: -1})
            const totalGatePassType = await gatePassTypeModel.find({}).countDocuments()
            responseReturn(res, 200, {gatePassTypes,totalGatePassType})
           }
        }catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
        }
    }
    get_gate_pass_type_by_id = async(req,res)=>{
        const {gatePassId} = req.params
        try {
            const gatePassType = await gatePassTypeModel.findById(gatePassId)
            responseReturn(res, 200, {gatePassType})
        } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
        }

    }
    gate_pass_type_update = async(req, res)=>{
        let {gp_type,gp_note,gatePassId,userName} = req.body;
        const tempDate = moment(Date.now()).format('LLL')
        gp_type= gp_type.trim()
        try {
            await gatePassTypeModel.findByIdAndUpdate(gatePassId,{
                gp_type,
                gp_note,
                updated_by:userName,
                updated_date:tempDate

            })
            responseReturn(res, 200, {message:'update success'})
        } catch (error) {
            console.log(error.message) 
        }
    }
    gate_pass_type_delete = async(req, res)=>{
        const {gatePassId} = req.params
        try {
            await gatePassTypeModel.findByIdAndDelete(gatePassId)
            responseReturn(res, 200, {
                message: 'Deleted success'
            })
        } catch (error) {
            console.log(error.message)
        }
    }
    get_customers = async(req, res)=>{
        try {
         const customers = await customerModel.find({}).sort({createdAt:-1})
         responseReturn(res, 200, {customers})
        } catch (error) {
             responseReturn(res, 500, {error:'Internal server error'})
        }
     }
     get_agents = async(req, res)=>{
         try {
             const agents = await agentModel.find({}).sort({createdAt:-1})
             responseReturn(res, 200, {agents})            
         } catch (error) {
             responseReturn(res, 500, {error:'Internal server error'})
         }
      }
    get_terms = async(req, res)=>{
         try {
             const terms = await termModel.find({}).sort({createdAt:-1})
             responseReturn(res, 200, {terms})            
         } catch (error) {
             responseReturn(res, 500, {error:'Internal server error'})
         }
      }
      get_gp_types = async(req, res)=>{
        try {
            const gpTypes = await gatePassTypeModel.find({}).sort({createdAt:-1})
            responseReturn(res, 200, {gpTypes})            
        } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
        }
     }
     get_products = async(req, res)=>{
        try {
            const products = await productModel.find({}).sort({createdAt: -1})
            responseReturn(res, 200, {products})
        } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
        }      
    }
    gate_pass_products_get = async(req, res)=>{
        const {searchValue} = req.query
        try{
           if(searchValue){
            const gatePassProducts = await gatePassMasterModel.aggregate([   
                { $match: { $text: { $search: "searchValue" }} }, 
               
                {
                    $lookup: {
                        from: "customers",
                        localField: "cus_id",
                        foreignField: "_id",
                        as: "customer"
                    }
                },
                {
                    $lookup: {
                        from: "gptypes",
                        localField: "gp_type_id",
                        foreignField: "_id",
                        as: "type"
                    }
                },
                {
                    $lookup: {
                        from: "agents",
                        localField: "sale_agent_id",
                        foreignField: "_id",
                        as: "agent"
                    }
                },
                {
                    $lookup: {
                        from: "terms",
                        localField: "term_id",
                        foreignField: "_id",
                        as: "term"
                    }
                }
            ])
            // const items = await itemModel.find({$text:{$search:searchValue}}).sort({createdAt: -1})
            const totalGatePass = await gatePassMasterModel.find({}).countDocuments()
            responseReturn(res, 200, {gatePassProducts,totalGatePass})
           }else{
            const gatePassProducts = await gatePassMasterModel.aggregate([
                {
                    $lookup: {
                        from: "customers",
                        localField: "cus_id",
                        foreignField: "_id",
                        as: "customer"
                    }
                },
                {
                    $lookup: {
                        from: "gptypes",
                        localField: "gp_type_id",
                        foreignField: "_id",
                        as: "type"
                    }
                },
                {
                    $lookup: {
                        from: "agents",
                        localField: "sale_agent_id",
                        foreignField: "_id",
                        as: "agent"
                    }
                },
                {
                    $lookup: {
                        from: "terms",
                        localField: "term_id",
                        foreignField: "_id",
                        as: "term"
                    }
                },
                { $sort: { "createdAt": -1 } },
            
            ])
            const totalGatePass = await gatePassMasterModel.find({}).countDocuments()
            responseReturn(res, 200, {gatePassProducts,totalGatePass})
           }

        }catch (error) {
            console.log(error.message) 
            // responseReturn(res, 500, {error:'Internal server error'})
        }
    }
    last_gate_pass_number_show = async(req, res)=>{
        try {
            const lastGatePassNumberShow = await gatePassMasterModel.find({}).sort({_id:-1}).limit(1)
            responseReturn(res, 200, {lastGatePassNumberShow})
        } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
        }
    }
     gate_pass_add= async(req, res)=>{
        let {state,gpNumber,clientNote,gpDate,gpReturnDate,saleAgentId,gpTypeId,gpTermId,cusId,productId,userName} = req.body
        // console.log(req.body)
        const tempDate = moment(Date.now()).format('LLL')
        gpNumber = gpNumber.trim()
        try {
         const product = await productModel.findById(productId)
         const checked = await gatePassMasterModel.find({
             $and:[
                 {
                     gp_number:{
                         $eq: gpNumber
                     }
                 }
             ]
         })
         if(!checked.length>0){
                 await gatePassMasterModel.create({
                     cus_id:cusId,
                     gp_type_id:gpTypeId,
                     gp_number:gpNumber,
                     gp_date:gpDate,
                     gp_return_date:gpReturnDate,    
                     sale_agent_id:saleAgentId,    
                     client_note:clientNote,
                     term_id:gpTermId,  
                     entered_by:userName,
                     entered_date:tempDate
                 })
                 const lastData = await gatePassMasterModel.find({}).sort({_id:-1}).limit(1)
                 await gatePassDetailModel.create({
                     gp_master_id:lastData[0]._id,
                     gp_number:gpNumber,
                     product_id:productId,
                     product_code:product.product_code,
                     product_name:product.product_name,
                     product_qty:state.product_qty,
                     product_price:state.product_price,
                     product_total:state.product_qty * state.product_price,

             })
             responseReturn(res, 201, {message:'success'})
         }else{
             const checkItem = await gatePassDetailModel.find({
                 $and:[
                     {
                         gp_number:{
                             $eq: gpNumber
                         }  
                     },
                     {
                         product_id:{
                             $eq: productId
                         }
                     }
                 ]
             })
             if(checkItem.length>0){
                 responseReturn(res, 201, {error:'already added'})
             }else{
                 const lastData = await gatePassMasterModel.findOne({"gp_number":gpNumber})
                 await gatePassDetailModel.create({
                        gp_master_id:lastData._id,
                        gp_number:gpNumber,
                        product_id:productId,
                        product_code:product.product_code,
                        product_name:product.product_name,
                        product_qty:state.product_qty,
                        product_price:state.product_price,
                        product_total:state.product_qty * state.product_price,
             })
             responseReturn(res, 201, {message:'success'})
             }          
         }
           
        } catch (error) {
         // responseReturn(res, 500, {error:'Internal server error'})
         console.log(error.message) 
    
        }

    }
    get_product_info = async(req, res)=>{
        const {productId} = req.params
        try {
            const productInfo = await productModel.findOne({'_id':productId})
            responseReturn(res, 200, {productInfo})
            // const unit = await unitModel.findById(itemId)
        } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
        }      
    }
    show_gate_pass_product_details = async(req, res)=>{
        const {gpNumber} = req.params
        try {
            const gatePassProductDetails = await gatePassDetailModel.find({
               $and: [
                   {
                        gp_number:{
                            $eq:gpNumber
                        }
                   }   
               ],                     
            })
            const productTotalPerGatePass = await gatePassDetailModel.aggregate([

                {$match:{"gp_number":gpNumber}},
                {$group:{ _id:"$gp_number", totalGatePassAmount: {$sum: "$product_total"}}}
            ])
            responseReturn(res, 201, {gatePassProductDetails,productTotalPerGatePass})
        } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
        }
}
g_pass_product_details_item_delete=async(req, res)=>{
    const {gpId,productId} = req.params      
    try {
        const gpDetailId = await gatePassDetailModel.findOne({gp_number:gpId,product_id:productId})
        await gatePassDetailModel.findByIdAndDelete(gpDetailId._id)
        responseReturn(res, 200, {
            message: 'Deleted success'
        })
    } catch (error) {
        console.log(error.message)
    }
}
gp_get_by_id = async(req,res)=>{
    const {gatePassId} = req.params
    try {
        const editGpInfo = await gatePassMasterModel.aggregate([
            {
                $match: { $expr : { $eq: [ '$_id' , { $toObjectId: gatePassId } ] } }                
            },
            {
                $lookup: {
                    from: "customers",
                    localField: "cus_id",
                    foreignField: "_id",
                    as: "customer"
                }
            },
            {
                $lookup: {
                    from: "gptypes",
                    localField: "gp_type_id",
                    foreignField: "_id",
                    as: "type"
                }
            },
            {
                $lookup: {
                    from: "agents",
                    localField: "sale_agent_id",
                    foreignField: "_id",
                    as: "agent"
                }
            },
            {
                $lookup: {
                    from: "terms",
                    localField: "term_id",
                    foreignField: "_id",
                    as: "term"
                }
            }
        ])
        responseReturn(res, 200, {editGpInfo})
    } catch (error) {
        responseReturn(res, 500, {error:'Internal server error'}) 
    }

}
gp_info_update = async(req, res)=>{
    let {gp_date,gp_return_date,sale_agent_id,gp_type_id,term_id,cus_id,client_note,userName,gatePassId} = req.body;

    const tempDate = moment(Date.now()).format('LLL')

    try {
        await gatePassMasterModel.findByIdAndUpdate(gatePassId,{
            cus_id,
            gp_date,
            gp_return_date,
            sale_agent_id,
            gp_type_id,
            client_note,
            term_id,
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

module.exports = new gatePassControllers(); 