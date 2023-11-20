const productModel = require('../models/productModel')
const { responseReturn } = require('../utils/response')
const moment = require('moment')

class productControllers{

    product_add= async(req, res)=>{
        let {state,userName} = req.body
        state.product_code = state.product_code.trim()
        const tempDate = moment(Date.now()).format('LLL')
           try {
            const checkProduct = await productModel.find({
                $and:[
                    {
                        product_code:{
                            $eq: state.product_code
                        }  
                    }
                ]
            })
            if(!checkProduct.length>0){
                await productModel.create({
                    product_name:state.product_name,
                    product_code:state.product_code,
                    price:state.price,
                    opening_stock:state.opening_stock,
                    entered_by:userName,
                    entered_date:tempDate
                })
                responseReturn(res, 201, {message:'Product add success'})
            }else{
                responseReturn(res, 201, {error:'Product code already exist'})
            }
          
  
           } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
           }

    }

    products_get = async(req, res)=>{
        const {searchValue} = req.query
        try{
           if(searchValue){
            const products = await productModel.find({$text:{$search:searchValue}}).sort({createdAt: -1})
            const totalProduct = await productModel.find({ $text:{$search:searchValue}}).countDocuments()
            responseReturn(res, 200, {products,totalProduct})
           }else{
            const products = await productModel.find({}).sort({createdAt: -1})
            const totalProduct = await productModel.find({}).countDocuments()
            responseReturn(res, 200, {products,totalProduct})
           }
        }catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
        }
    }
    product_get_by_id = async(req,res)=>{
        const {productId} = req.params
        try {
            const product = await productModel.findById(productId)
            responseReturn(res, 200, {product})
        } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
        }

    }
    product_update = async(req, res)=>{
        let {product_name,product_code,price,opening_stock,status,productId,userName} = req.body;
        const tempDate = moment(Date.now()).format('LLL')
        product_name= product_name.trim()
        product_code = product_code.trim()
        try {
            await productModel.findByIdAndUpdate(productId,{
                product_name,
                product_code,
                price,
                opening_stock,
                status,
                updated_by:userName,
                updated_date:tempDate

            })
            const product = await productModel.findById(productId)
            responseReturn(res, 200, {product, message:'update success'})
        } catch (error) {
            console.log(error.message) 
        }
    }
 

}

module.exports = new productControllers(); 