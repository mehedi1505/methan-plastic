const adminModel = require('../models/adminModel')
const subAdminModel = require('../models/subAdminModel')
const bcrypt = require('bcrypt')
const formidable = require('formidable')
// const cloudinary = require('cloudinary').v2
const { responseReturn } = require('../utils/response')
const { createToken } = require('../utils/tokenCreate')
const jwt = require('jsonwebtoken')

class authControllers{
    admin_login = async(req, res)=>{
                const { email, password } = req.body
        try {
            const checkAdmin = await adminModel.findOne({email}).select('+password')
           if(checkAdmin != null){
                const match = await bcrypt.compare( password, checkAdmin.password)
                if(match){
                   const token = await createToken({
                    id: checkAdmin._id,
                    role: checkAdmin.role
                   })
                   res.cookie('accessToken',token,{
                    expires: new Date(Date.now() + process.env.COOKIE_EXP * 24 * 60 * 60 * 1000)
                   })
                   responseReturn(res, 200, { token, success: 'Login Success' })

                }else{
                    responseReturn(res,404,{ error:'Password Wrong!' })  
                }
           }else{
            responseReturn(res,404,{ error:'Email not found!' })
           }
        } catch (error) {
            responseReturn(res,500,{ error:error.message })
        }
    }

    admin_logout = async(req,res)=>{
        try {
            res.cookie('accessToken',null,{
                expires: new Date(Date.now())
            })
            responseReturn(res, 200, {success: 'Logout Success' })    
        } catch (error) {
            responseReturn(res,500,{ error:error.message }) 
        }
    }

    sub_admin_login = async(req, res)=>{
        const { email, password } = req.body
        try {
            const checkSeller = await subAdminModel.findOne({email}).select('+password')
           if(checkSeller){
                const match = await bcrypt.compare( password, checkSeller.password)
                if(match){
                   const token = await createToken({
                    id: checkSeller._id,
                    role: checkSeller.role
                   })
                   res.cookie('accessToken',token,{
                    expires: new Date(Date.now() + process.env.COOKIE_EXP * 24 * 60 * 60 * 1000)
                   })
                   responseReturn(res, 200, { token, success: 'Login Success' })

                }else{
                    responseReturn(res,404,{ error:'Password Wrong!' })  
                }
           }else{
            responseReturn(res,404,{ error:'Email not found!' })
           }
        } catch (error) {
            responseReturn(res,500,{ error:error.message })
        }
    }

    sub_admin_register = async(req, res)=>{
        const {name, email, password } = req.body
        try {
            const getUser = await subAdminModel.findOne({email})
            if(getUser){
                responseReturn(res, 404, { error: 'Email already exists' }) 
            }else{
                const seller = await subAdminModel.create({
                    name,
                    email,
                    password: await bcrypt.hash(password,10)
                })
                const token = await createToken({id:seller.id,role:seller.role})
                res.cookie('accessToken',token,{
                    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                })
                responseReturn(res,201,{token, success:'Register Success'})

            }
        } catch (error) {
            responseReturn(res, 500, { error: 'Internal server error' }) 
        }
    }
    get_user_info = async(req, res)=>{
        const { id, role } = req

        try {
            if(role == 'admin'){
                const user = await adminModel.findById(id)
                responseReturn(res,200,{userInfo: user })
            }else{
                const subadmin = await subAdminModel.findById(id)
                responseReturn(res, 200,{ userInfo: subadmin })
            }
        } catch (error) {
            responseReturn(res, 500, { error: 'Internal server error' }) 
        }
    }

    // profile_image_upload = async(req, res)=>{
    //     const {id} = req
    //     const form = formidable({multiples:true})
    //     form.parse(req,async(err,_,files)=>{
    //         const {image} = files
    //         cloudinary.config({
    //             cloud_name:process.env.cloud_name,
    //             api_key:process.env.api_key,
    //             api_secret:process.env.api_secret,
    //             secure:true 
    //         })
    //         try {
    //             const result= await cloudinary.uploader.upload(image.filepath,{folder : 'profile'}) 
    //             if(result){
    //                 await subAdminModel.findByIdAndUpdate(id,{
    //                     image: result.url
    //                 })
    //                 const userInfo = await subAdminModel.findById(id)
    //                 responseReturn(res,201,{userInfo,success:'image upload success'})
    //             }else{
    //                 responseReturn(res, 404, {error:'image upload failed'})
    //             }
    //         } catch (error) {
    //             responseReturn(res, 404, {error: error.message})
    //         }
    //     })
    // }


 
 

}

module.exports = new authControllers(); 
