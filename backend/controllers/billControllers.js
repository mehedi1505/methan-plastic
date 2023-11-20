const billMasterModel = require('../models/billMasterModel')
const billDetailModel = require('../models/billDetailModel')
const invoiceMasterModel = require('../models/invoiceMasterModel')
const invoiceDetailModel = require('../models/invoiceDetailModel')
const customerModel = require('../models/customerModel')
const collectionModel = require('../models/collectionModel')
const { responseReturn } = require('../utils/response')
const moment = require('moment')

class billControllers{

//     gate_pass_type_add= async(req, res)=>{
//         const {state,userName} = req.body
//         const tempDate = moment(Date.now()).format('LLL')
//            try {
//                await gatePassMasterModel.create({
//                     gp_type:state.gp_type,
//                     gp_note:state.gp_note,
//                     entered_by:userName,
//                     entered_date:tempDate
//                 })
//                 responseReturn(res, 201, {message:'successfully added'})
  
//            } catch (error) {
//             responseReturn(res, 500, {error:'Internal server error'})
//            }

//     }

//     get_all_gate_pass_type = async(req, res)=>{
//         const {searchValue} = req.query
//         try{
//            if(searchValue){
//             const gatePassTypes = await gatePassTypeModel.find({$text:{$search:searchValue}}).sort({createdAt: -1})
//             const totalGatePassType = await gatePassTypeModel.find({ $text:{$search:searchValue}}).countDocuments()
//             responseReturn(res, 200, {gatePassTypes,totalGatePassType})
//            }else{
//             const gatePassTypes = await gatePassTypeModel.find({}).sort({createdAt: -1})
//             const totalGatePassType = await gatePassTypeModel.find({}).countDocuments()
//             responseReturn(res, 200, {gatePassTypes,totalGatePassType})
//            }
//         }catch (error) {
//             responseReturn(res, 500, {error:'Internal server error'})
//         }
//     }
//     get_gate_pass_type_by_id = async(req,res)=>{
//         const {gatePassId} = req.params
//         try {
//             const gatePassType = await gatePassTypeModel.findById(gatePassId)
//             responseReturn(res, 200, {gatePassType})
//         } catch (error) {
//             responseReturn(res, 500, {error:'Internal server error'})
//         }

//     }
//     gate_pass_type_update = async(req, res)=>{
//         let {gp_type,gp_note,gatePassId,userName} = req.body;
//         const tempDate = moment(Date.now()).format('LLL')
//         gp_type= gp_type.trim()
//         try {
//             await gatePassTypeModel.findByIdAndUpdate(gatePassId,{
//                 gp_type,
//                 gp_note,
//                 updated_by:userName,
//                 updated_date:tempDate

//             })
//             responseReturn(res, 200, {message:'update success'})
//         } catch (error) {
//             console.log(error.message) 
//         }
//     }
//     gate_pass_type_delete = async(req, res)=>{
//         const {gatePassId} = req.params
//         try {
//             await gatePassTypeModel.findByIdAndDelete(gatePassId)
//             responseReturn(res, 200, {
//                 message: 'Deleted success'
//             })
//         } catch (error) {
//             console.log(error.message)
//         }
//     }
//     get_customers = async(req, res)=>{
//         try {
//          const customers = await customerModel.find({}).sort({createdAt:-1})
//          responseReturn(res, 200, {customers})
//         } catch (error) {
//              responseReturn(res, 500, {error:'Internal server error'})
//         }
//      }
     get_invoice = async(req, res)=>{
         try {
             const invoices = await invoiceMasterModel.find({}).sort({createdAt:-1})
             responseReturn(res, 200, {invoices})            
         } catch (error) {
             responseReturn(res, 500, {error:'Internal server error'})
         }
      }
      get_customers = async(req, res)=>{
        try {
            const customers = await customerModel.find({}).sort({createdAt: -1})
            responseReturn(res, 200, {customers})
        } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
        }      
    }
//     get_terms = async(req, res)=>{
//          try {
//              const terms = await termModel.find({}).sort({createdAt:-1})
//              responseReturn(res, 200, {terms})            
//          } catch (error) {
//              responseReturn(res, 500, {error:'Internal server error'})
//          }
//       }
//       get_gp_types = async(req, res)=>{
//         try {
//             const gpTypes = await gatePassTypeModel.find({}).sort({createdAt:-1})
//             responseReturn(res, 200, {gpTypes})            
//         } catch (error) {
//             responseReturn(res, 500, {error:'Internal server error'})
//         }
//      }
//      get_products = async(req, res)=>{
//         try {
//             const products = await productModel.find({}).sort({createdAt: -1})
//             responseReturn(res, 200, {products})
//         } catch (error) {
//             responseReturn(res, 500, {error:'Internal server error'})
//         }      
//     }
        all_bill_get = async(req, res)=>{
        const {searchValue} = req.query
        try{
           if(searchValue){
            const getBills = await billMasterModel.aggregate([   
                { $match: { $text: { $search: "searchValue" }} }, 
               
                {
                    $lookup: {
                        from: "invoicemasters",
                        localField: "invoice_id",
                        foreignField: "_id",
                        as: "invoice"
                    }
                },
               
            ])

            const totalBill = await billMasterModel.find({}).countDocuments()
            responseReturn(res, 200, {getBills,totalBill})
           }else{
            const getBills = await billMasterModel.aggregate([
                {
                    $lookup: {
                        from: "invoicemasters",
                        localField: "invoice_id",
                        foreignField: "_id",
                        as: "invoice"
                    }
                },
               
                { $sort: { "createdAt": -1 } },
            
            ])
            const totalBill = await billMasterModel.find({}).countDocuments()
            responseReturn(res, 200, {getBills,totalBill})
           }

        }catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
        }
    }
    last_bill_number_show = async(req, res)=>{
        try {
            const lastBillNumberShow = await billMasterModel.find({}).sort({_id:-1}).limit(1)
            responseReturn(res, 200, {lastBillNumberShow})
        } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
        }
    }

     bill_add= async(req, res)=>{

        let {billNumber,invoiceId,cusId,billDate,billNote,discount,userName} = req.body
        // console.log(req.body)
        const tempDate = moment(Date.now()).format('LLL')
        billNumber = billNumber.trim()
        try {
         const product = await invoiceDetailModel.find({"invoice_master_id":invoiceId})
         const checked = await billMasterModel.find({
             $and:[
                 {
                    bill_number:{
                         $eq: billNumber
                     }
                 }
             ]
         })
        //   console.log(invoiceProduct)
         if(!checked.length>0){
                 await billMasterModel.create({   
                     bill_number:billNumber,
                     bill_date:billDate,
                     cus_id:cusId,   
                     discount:discount,    
                     bill_note:billNote, 
                     entered_by:userName,
                     entered_date:tempDate
                 })
                 const lastData = await billMasterModel.find({}).sort({_id:-1}).limit(1)

                for(let i=0;i<product.length;i++){
                    await billDetailModel.create({
                        bill_master_id:lastData[0]._id,
                        cus_id:cusId,
                        bill_number:billNumber,
                        invoice_id:invoiceId,
                        invoice_number:product[i].invoice_number,
                        product_code:product[i].product_code,
                        product_name:product[i].product_name,
                        product_qty:product[i].product_qty,
                        product_price:product[i].product_price,
                        product_total:product[i].product_total,  
                        entered_by:userName,
                        entered_date:tempDate
                    })
                }

             responseReturn(res, 201, {message:'success'})             
        }else{
            const lastData = await billMasterModel.findOne({"bill_number":billNumber})
            for(let i=0;i<product.length;i++){
                await billDetailModel.create({
                    bill_master_id:lastData._id,
                    cus_id:cusId,
                    bill_number:billNumber,
                    invoice_id:invoiceId,
                    invoice_number:product[i].invoice_number,
                    product_code:product[i].product_code,
                    product_name:product[i].product_name,
                    product_qty:product[i].product_qty,
                    product_price:product[i].product_price,
                    product_total:product[i].product_total,  
                    entered_by:userName,
                    entered_date:tempDate, 
                })
            }
            responseReturn(res, 201, {message:'success'})    
            // responseReturn(res, 201, {error:'Bill already added!'})  
        }
        } catch (error) {       
            console.log(error.message)    
        }
    }

    bill_add_info = async(req, res)=>{
        const {billNumber} = req.params
        try {
            const billAddInfo = await billDetailModel.find({'bill_number':billNumber})
            responseReturn(res, 200, {billAddInfo})
       
        } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
        }      
    }
    product_delete = async(req, res)=>{
        const {billNumber,productId} = req.params      
        try {
            // const invoiceDetailId = await invoiceDetailModel.findOne({invoice_number:invoiceId,product_id:productId})
            await billDetailModel.findByIdAndDelete(productId)
            responseReturn(res, 200, {
                message: 'Deleted success'
            })
        } catch (error) {
            console.log(error.message)
        }
    }
    bill_view_by_id = async(req, res) =>{
        const { billId } = req.params
     
        try {
            const billViewInfo = await billMasterModel.aggregate([
                {
                    $match: { $expr : { $eq: [ '$_id' , { $toObjectId: billId } ] } }                
                },
                {
                    $lookup:{
                        from: 'customers',
                        localField: 'cus_id',
                        foreignField:"_id",
                        as:'customer'
                    }              
                }             
            ])
            
    
            
            const billDetailProduct = await billDetailModel.find({bill_master_id:billId})

    
            
            const billTotalAmount = await billDetailModel.aggregate([
                {
                    $match: { $expr : { $eq: [ '$bill_master_id' , { $toObjectId: billId } ] } }                
                },
                {
                    $group:{
                        _id: null,
                        totalAmount:{$sum:"$product_total"}                       
                    }              
                }              
            ])
            // console.log(billTotalAmount)
            responseReturn(res, 200, {billViewInfo,billTotalAmount,billDetailProduct})
        } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
        }
    }
    customer_due = async(req, res)=>{
        const {cusId} = req.params
        try {
            const billAmount = await billDetailModel.aggregate([
                {
                    $match: { $expr : { $eq: [ '$cus_id' , { $toObjectId: cusId } ] } }                
                },
                {
                    $group:{
                        _id: null,
                        totalBillAmount:{$sum:"$product_total"}        
                    }              
                }              
            ])
          
            const collectionAmount = await collectionModel.aggregate([
                {
                    $match: { $expr : { $eq: [ '$cust_id' , { $toObjectId: cusId } ] } }                
                },
                {
                    $group:{
                        _id: null,
                        totalCollectionAmount:{$sum:"$pay_amount"}                       
                    }              
                }              
            ])

            // const customerDue = billAmount[0].totalBillAmount - collectionAmount[0].totalCollectionAmount
            // console.log(typeof(customerDue))
            responseReturn(res, 200, {billAmount,collectionAmount})
           
        } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
        }
    }

//     show_gate_pass_product_details = async(req, res)=>{
//         const {gpNumber} = req.params
//         try {
//             const gatePassProductDetails = await gatePassDetailModel.find({
//                $and: [
//                    {
//                         gp_number:{
//                             $eq:gpNumber
//                         }
//                    }   
//                ],                     
//             })
//             const productTotalPerGatePass = await gatePassDetailModel.aggregate([

//                 {$match:{"gp_number":gpNumber}},
//                 {$group:{ _id:"$gp_number", totalGatePassAmount: {$sum: "$product_total"}}}
//             ])
//             responseReturn(res, 201, {gatePassProductDetails,productTotalPerGatePass})
//         } catch (error) {
//             responseReturn(res, 500, {error:'Internal server error'})
//         }
// }
// g_pass_product_details_item_delete=async(req, res)=>{
//     const {gpId,productId} = req.params      
//     try {
//         const gpDetailId = await gatePassDetailModel.findOne({gp_number:gpId,product_id:productId})
//         await gatePassDetailModel.findByIdAndDelete(gpDetailId._id)
//         responseReturn(res, 200, {
//             message: 'Deleted success'
//         })
//     } catch (error) {
//         console.log(error.message)
//     }
// }
get_bill_by_id = async(req,res)=>{
    const {billId} = req.params
    try {
        const editBillInfo = await billMasterModel.aggregate([
            {
                $match: { $expr : { $eq: [ '$_id' , { $toObjectId: billId } ] } }                
            },
            {
                $lookup: {
                    from: "customers",
                    localField: "cus_id",
                    foreignField: "_id",
                    as: "customer"
                }
            },
        ])
        responseReturn(res, 200, {editBillInfo})
    } catch (error) {
        responseReturn(res, 500, {error:'Internal server error'}) 
    }

}
bill_info_update = async(req, res)=>{

    let {bill_date,cus_id,discount,bill_note,userName,billId} = req.body;

    const tempDate = moment(Date.now()).format('LLL')

    try {
        await billMasterModel.findByIdAndUpdate(billId,{
            cus_id,
            bill_date,
            discount,
            bill_note,
            updated_by:userName,
            updated_date:tempDate

        })
        responseReturn(res, 200, {message:'update success'})
    } catch (error) {
        console.log(error.message) 
    }
}
 

}

module.exports = new billControllers(); 