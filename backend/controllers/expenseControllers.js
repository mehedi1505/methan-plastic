const expenseCategoryModel = require('../models/expenseCategoryModel')
const customerModel = require('../models/customerModel')
const paymentModeModel = require('../models/paymentModeModel')
const expenseModel = require('../models/expenseModel')
const { responseReturn } = require('../utils/response')
const moment = require('moment')

class expenseControllers{

    get_customer = async(req, res)=>{
       try {
        const customers = await customerModel.find({}).sort({createdAt:-1})
        responseReturn(res, 200, {customers})
       } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
       }
    }
    get_payment_mode = async(req, res)=>{
        try {
            const paymentModes = await paymentModeModel.find({}).sort({createdAt:-1})
            responseReturn(res, 200, {paymentModes})            
        } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
        }
     }
     get_expense_category = async(req, res)=>{
        const {searchValue} = req.query  
        try {
            if(searchValue !== ""){
                const expenseCategories = await expenseCategoryModel.find({$text:{$search:searchValue}}).sort({createdAt: -1})
                const totalCategory = await expenseCategoryModel.find({ $text:{$search:searchValue}}).countDocuments()
                responseReturn(res, 200, {expenseCategories,totalCategory})
            }else{
                const expenseCategories = await expenseCategoryModel.find({}).sort({createdAt:-1})
                const totalCategory = await expenseCategoryModel.find({}).countDocuments()
                console.log(expenseCategories)
                responseReturn(res, 200, {expenseCategories,totalCategory})
            }
         
        } catch (error) {
         responseReturn(res, 500, {error:'Internal server error'})
        }
     }

    expense_category_add = async(req, res)=>{
        let {state,userName} = req.body
        const tempDate = moment(Date.now()).format('LLL')
        state.expense_cat_name = state.expense_cat_name.trim()
           try {
                const checkCategory = await expenseCategoryModel.find({
                    $and:[
                      {
                        expense_cat_name:{
                            $eq:state.expense_cat_name
                        }
                      }
                    ]
                })
                if(!checkCategory.length>0){
                await expenseCategoryModel.create({
                expense_cat_name:state.expense_cat_name,
                expense_cat_note:state.expense_cat_note,
                entered_by:userName,
                entered_date:tempDate
                })  
                responseReturn(res, 201, {message:'Category Add success'})
                }else{
                    responseReturn(res, 201, {error:'Category Already exists'}) 
                }

  
           } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
           }

    }

    get_expense_category = async(req, res)=>{
        const {searchValue} = req.query
        try{
           if(searchValue !== ""){
            const expenseCategories = await expenseCategoryModel.find({$text:{$search:searchValue}}).sort({createdAt: -1})
            const totalCategory = await expenseCategoryModel.find({ $text:{$search:searchValue}}).countDocuments()
            responseReturn(res, 200, {expenseCategories,totalCategory})
           }else{
            const expenseCategories = await expenseCategoryModel.find({}).sort({createdAt: -1})
            const totalCategory = await expenseCategoryModel.find({}).countDocuments()
            responseReturn(res, 200, {expenseCategories,totalCategory})
           }
        }catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
        }
    }
    category_get_by_id =  async(req,res)=>{
        const {catId} = req.params
        try {
            const expenseCategory = await expenseCategoryModel.findById(catId)
            responseReturn(res, 200, {expenseCategory})
        } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
        }

    }
    expense_category_update = async(req, res)=>{
        let {expense_cat_name,expense_cat_note,catId,userName} = req.body;
        const tempDate = moment(Date.now()).format('LLL')
        expense_cat_name= expense_cat_name.trim()
        try {
            await expenseCategoryModel.findByIdAndUpdate(catId,{
                expense_cat_name,
                expense_cat_note,
                updated_by:userName,
                updated_date:tempDate

            })
            responseReturn(res, 200, {message:'update success'})
        } catch (error) {
            console.log(error.message) 
        }
    }
    expense_category_delete = async(req, res)=>{
        const {cat_id} = req.params
        try {
            await expenseCategoryModel.findByIdAndDelete(cat_id)
            responseReturn(res, 200, {
                message: 'Deleted success'
            })
        } catch (error) {
            console.log(error.message)
        }
    }

    expense_add =async(req, res)=>{
        let {state,selectedDate,expCatId,payModeId,custId,userName} = req.body
        const tempDate = moment(Date.now()).format('LLL')
       state.expense_name = state.expense_name.trim()
       try {
        await expenseModel.create({
            expense_name:state.expense_name,
            expense_category_id:expCatId,
            expense_date:selectedDate,
            expense_amount:state.expense_amount,
            cust_id:custId,
            pay_mode_id:payModeId,
            entered_by:userName,
            entered_date:tempDate

        })
        responseReturn(res, 200, {message: 'Add successful' })
       } catch (error) {
        console.log(error.message)
       }
    }
 
    get_expense =async(req, res)=>{
        const {searchValue} = req.query
        try{
            if(searchValue){
             const expenses = await expenseModel.aggregate([   
                 { $match: { $text: { $search: "searchValue" }} }, 
                
                 {
                     $lookup: {
                         from: "expensecategories", // collection to join
                         localField: "expense_category_id",
                         foreignField: "_id",//field from the documents of the "from" collection
                         as: "category"// output array field
                     }
                 },
                 {
                    $lookup: {
                        from: "customers", // collection to join
                        localField: "cust_id",
                        foreignField: "_id",//field from the documents of the "from" collection
                        as: "customer"// output array field
                    }
                },
                {
                    $lookup: {
                        from: "paymodes", // collection to join
                        localField: "pay_mode_id",
                        foreignField: "_id",//field from the documents of the "from" collection
                        as: "paymode"// output array field
                    }
                }
             ])
             // const items = await itemModel.find({$text:{$search:searchValue}}).sort({createdAt: -1})
             const totalExpenses = await expenseModel.find({}).countDocuments()
             responseReturn(res, 200, {expenses,totalExpenses})
            }else{
             const expenses = await expenseModel.aggregate([
                {
                    $lookup: {
                        from: "expensecategories", // collection to join
                        localField: "expense_category_id",
                        foreignField: "_id",//field from the documents of the "from" collection
                        as: "category"// output array field
                    }
                },
                {
                   $lookup: {
                       from: "customers", // collection to join
                       localField: "cust_id",
                       foreignField: "_id",//field from the documents of the "from" collection
                       as: "customer"// output array field
                   }
               },
               {
                   $lookup: {
                       from: "paymodes", // collection to join
                       localField: "pay_mode_id",
                       foreignField: "_id",//field from the documents of the "from" collection
                       as: "paymode"// output array field
                   }
               },
     
                 { $sort: { "createdAt": -1 } },
             
             ])
             const totalExpenses = await expenseModel.find({}).countDocuments()
             responseReturn(res, 200, {expenses,totalExpenses})
            }
 
         }catch (error) {
             responseReturn(res, 500, {error:'Internal server error'})
         }
    }
    expense_get_by_id =  async(req,res)=>{
        const {expId} = req.params
        try {
            // const item = await itemModel.findById(itemId)
            const expense = await expenseModel.aggregate([
                {
                    $match: { $expr : { $eq: [ '$_id' , { $toObjectId: expId } ] } }                
                },
                {
                    $lookup: {
                        from: "expensecategories", // collection to join
                        localField: "expense_category_id",
                        foreignField: "_id",//field from the documents of the "from" collection
                        as: "category"// output array field
                    }
                },
                {
                   $lookup: {
                       from: "customers", // collection to join
                       localField: "cust_id",
                       foreignField: "_id",//field from the documents of the "from" collection
                       as: "customer"// output array field
                   }
               },
               {
                   $lookup: {
                       from: "paymodes", // collection to join
                       localField: "pay_mode_id",
                       foreignField: "_id",//field from the documents of the "from" collection
                       as: "paymode"// output array field
                   }
               }             
            ])
            responseReturn(res, 200, {expense})
        } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
        }

    }
    expense_delete = async(req, res)=>{
        const {exp_id} = req.params
        try {
            await expenseModel.findByIdAndDelete(exp_id)
            responseReturn(res, 200, {
                message: 'Deleted success'
            })
        } catch (error) {
            console.log(error.message)
        }
    }
    expense_update = async(req, res)=>{
        let {expense_name,expense_date,expense_category_id,cust_id,pay_mode_id,expense_amount,userName,expId} = req.body;

        const tempDate = moment(Date.now()).format('LLL')
        try {
            await expenseModel.findByIdAndUpdate(expId,{
                expense_name,
                expense_date,
                expense_category_id,
                cust_id,
                pay_mode_id,
                expense_amount,
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

module.exports = new expenseControllers(); 