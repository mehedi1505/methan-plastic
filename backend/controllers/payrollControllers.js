const employeeTypeModel = require('../models/employeeTypeModel')
const employeeEntryModel = require('../models/employeeEntryModel')
const employeeLeaveModel = require('../models/employeeLeaveModel')
const salaryPaySlipModel = require('../models/salaryPaySlipModel')
const customerModel = require('../models/customerModel')
const paymentModeModel = require('../models/paymentModeModel')
const expenseModel = require('../models/expenseModel')
const { responseReturn } = require('../utils/response')
const moment = require('moment')
const formidable = require('formidable')
const validator = require('validator')
const fs = require("fs");

class payrollControllers{

    // get_customer = async(req, res)=>{
    //    try {
    //     const customers = await customerModel.find({}).sort({createdAt:-1})
    //     responseReturn(res, 200, {customers})
    //    } catch (error) {
    //         responseReturn(res, 500, {error:'Internal server error'})
    //    }
    // }
    // get_payment_mode = async(req, res)=>{
    //     try {
    //         const paymentModes = await paymentModeModel.find({}).sort({createdAt:-1})
    //         responseReturn(res, 200, {paymentModes})            
    //     } catch (error) {
    //         responseReturn(res, 500, {error:'Internal server error'})
    //     }
    //  }
    //  get_expense_category = async(req, res)=>{
    //     const {searchValue} = req.query  
    //     try {
    //         if(searchValue !== ""){
    //             const expenseCategories = await expenseCategoryModel.find({$text:{$search:searchValue}}).sort({createdAt: -1})
    //             const totalCategory = await expenseCategoryModel.find({ $text:{$search:searchValue}}).countDocuments()
    //             responseReturn(res, 200, {expenseCategories,totalCategory})
    //         }else{
    //             const expenseCategories = await expenseCategoryModel.find({}).sort({createdAt:-1})
    //             const totalCategory = await expenseCategoryModel.find({}).countDocuments()
    //             console.log(expenseCategories)
    //             responseReturn(res, 200, {expenseCategories,totalCategory})
    //         }
         
    //     } catch (error) {
    //      responseReturn(res, 500, {error:'Internal server error'})
    //     }
    //  }

    emp_type_add = async(req, res)=>{
        let {state,userName} = req.body
        const tempDate = moment(Date.now()).format('LLL')
        state.emp_type_name = state.emp_type_name.trim()
           try {
                const checkType = await employeeTypeModel.find({
                    $and:[
                      {
                        emp_type_name:{
                            $eq:state.emp_type_name
                        }
                      }
                    ]
                })
                if(!checkType.length>0){
                await employeeTypeModel.create({
                    emp_type_name:state.emp_type_name,
                    type_description:state.type_description,
                    entered_by:userName,
                    entered_date:tempDate
                })  
                responseReturn(res, 201, {message:'successfully added'})
                }else{
                    responseReturn(res, 201, {error:'Type Already exists'}) 
                }

  
           } catch (error) {
            // console.log(error.message) 
            responseReturn(res, 500, {error:'Internal server error'})
           }

    }

    employee_type_get = async(req, res)=>{
        const {searchValue} = req.query
        try{
           if(searchValue !== ""){
            const empTypes = await employeeTypeModel.find({$text:{$search:searchValue}}).sort({createdAt: -1})
            const totalType = await employeeTypeModel.find({ $text:{$search:searchValue}}).countDocuments()
            responseReturn(res, 200, {empTypes,totalType})
           }else{
            const empTypes = await employeeTypeModel.find({}).sort({createdAt: -1})
            const totalType = await employeeTypeModel.find({}).countDocuments()
            responseReturn(res, 200, {empTypes,totalType})
           }
        }catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
        }
    }
    get_emp_type_by_id =  async(req,res)=>{
        const {empTypeId} = req.params
        try {
            const empType = await employeeTypeModel.findById(empTypeId)
            responseReturn(res, 200, {empType})
        } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
        }

    }
    emp_type_update = async(req, res)=>{
        let {state,empTypeId,userName} = req.body;
        const tempDate = moment(Date.now()).format('LLL')
        // emp_type_name = emp_type_name.trim()
        try {
            await employeeTypeModel.findByIdAndUpdate(empTypeId,{
                emp_type_name:state.emp_type_name,
                type_description:state.type_description,
                updated_by:userName,
                updated_date:tempDate

            })
            responseReturn(res, 200, {message:'update success'})
        } catch (error) {
            console.log(error.message) 
        }
    }
    emp_update = async(req, res)=>{
    let {emp_id,emp_name,emp_email,contact_number,education,marital_status,gender,religion,blood_group,department,designation,basic_salary,gross_salary,        da,
        house_rent,ma,pf,tax,experience,joining_date,status,userName,empId} = req.body;
        const tempDate = moment(Date.now()).format('LLL')
        const errorData={}
        if(!emp_id){
         errorData.emp_id = 'Please provide employee id'
        }
        if(!emp_name){
         errorData.emp_name = 'Please provide employee name'
        }
        if(!emp_email){
         errorData.emp_email = 'Please provide email'
        }
        if(emp_email && !validator.isEmail(emp_email)){
         errorData.emp_email = 'Please provide valid Email'
        }
        if(!contact_number){
         errorData.contact_number = 'Please provide contact number'
        }
        if(!education){
         errorData.education = 'Please provide your education'
        }
        if(!marital_status){
         errorData.marital_status = 'Please provide marital status'
        }
        if(!gender){
         errorData.gender = 'Please provide gender'
        }
        if(!religion){
         errorData.religion = 'Please provide religion'
        }
        if(!blood_group){
         errorData.blood_group = 'Please provide your blood group'
        }
        if(!department){
         errorData.department = 'Please provide department'
        }
        if(!designation){
         errorData.designation = 'Please provide designation'
        }
        if(!basic_salary){
         errorData.basic_salary = 'Please provide basic salary'
        }
        if(!da){
         errorData.da = 'Please provide Dearness Allowance'
        }
        if(!house_rent){
         errorData.house_rent = 'Please provide House rent'
        }
        if(!ma){
         errorData.ma = 'Please provide Medical Allowance'
        }
        if(!experience){
         errorData.experience = 'Please provide experience'
        }
if(Object.keys(errorData).length === 0){
    try {
        await employeeEntryModel.findByIdAndUpdate(empId,{
            emp_id,
            emp_name,
            emp_email,
            contact_number,
            education,
            marital_status,
            gender,
            religion,
            blood_group,
            department,
            designation,
            basic_salary,
            gross_salary,
            dearness_allowance:da,
            house_rent,
            medical_allowance:ma,
            provident_fund:pf,
            tax,
            experience,
            joining_date,
            status,
            updated_by:userName,
            updated_date:tempDate

        })
        responseReturn(res, 200, {message:'update success'})
    } catch (error) {
        console.log(error.message) 
    }
}else{
    responseReturn(res, 500, {error: errorData})
}
       
    }
    employee_add = async(req, res)=>{
        const formData = formidable()

        formData.parse(req,(err,fields,files)=>{
            if(err){
                responseReturn(res, 500, {error:'Form data parse failed!'})
            }else{
               const {emp_id,emp_name,emp_email,contact_number,education,marital_status,gender,religion,blood_group,department,designation,joining_date,basic_salary,gross_salary,da,house_rent,ma,pf,tax,experience,userName} = fields
               const imageInfo = files
               
               const errorData={}
               if(!emp_id){
                errorData.emp_id = 'Please provide employee id'
               }
               if(!emp_name){
                errorData.emp_name = 'Please provide employee name'
               }
               if(!emp_email){
                errorData.emp_email = 'Please provide email'
               }
               if(emp_email && !validator.isEmail(emp_email)){
                errorData.emp_email = 'Please provide valid Email'
               }
               if(!contact_number){
                errorData.contact_number = 'Please provide contact number'
               }
               if(!education){
                errorData.education = 'Please provide your education'
               }
               if(!marital_status){
                errorData.marital_status = 'Please provide marital status'
               }
               if(!gender){
                errorData.gender = 'Please provide gender'
               }
               if(!religion){
                errorData.religion = 'Please provide religion'
               }
               if(!blood_group){
                errorData.blood_group = 'Please provide your blood group'
               }
               if(!department){
                errorData.department = 'Please provide department'
               }
               if(!designation){
                errorData.designation = 'Please provide designation'
               }
               if(!basic_salary){
                errorData.basic_salary = 'Please provide basic salary'
               }
               if(!da){
                errorData.da = 'Please provide Dearness Allowance'
               }
               if(!house_rent){
                errorData.house_rent = 'Please provide House rent'
               }
               if(!ma){
                errorData.ma = 'Please provide Medical Allowance'
               }
               if(!experience){
                errorData.experience = 'Please provide experience'
               }
               if(Object.keys(files).length === 0){
                errorData.image = 'Please provide your image'
               }

               if(Object.keys(errorData).length === 0){
                const imageName = Date.now() + imageInfo.image.originalFilename;
                const desPath = __dirname + `../../dashboard/public/profileImages/${imageName}`;
                try {
                    fs.copyFile(imageInfo.image.filepath, desPath, async (err) => {
                        if(!err){
                            const tempDate = moment(Date.now()).format('LLL')
                            const createEmployee = await employeeEntryModel.create({
                                emp_id,
                                emp_name,
                                emp_email,
                                contact_number,
                                education,
                                marital_status,
                                gender,
                                religion,
                                blood_group,
                                department,
                                designation,
                                joining_date,
                                basic_salary,
                                gross_salary,
                                dearness_allowance:da,
                                house_rent,
                                medical_allowance:ma,
                                provident_fund:pf,
                                tax:tax,
                                experience,
                                image: `http://localhost:3000/profileImage/${imageName}`,
                                entered_by:userName,
                                entered_date:tempDate
                              })
                              responseReturn(res, 200, {message:'add success'})
                        }
                    })
                } catch (error) {
                    // console.log(error.message)
                    responseReturn(res, 500, {error:'Internal server error'})
                }
               }else{
                responseReturn(res, 500, {error: errorData})
               }
            }
        })
    }

    pay_slip_create =  async(req, res)=>{

               let { empId,name,department,designation,basicSalary,grossSalary,payPeriod,salaryPaidBy,da,ma,pf,tax,loan,penalty,houseRent,joiningDate,payDate,userName} = req.body
                    empId = empId.trim()
               const errorData={}
               if(!empId){
                errorData.emp_id = 'Please provide employee id'
               }
               if(!name){
                errorData.emp_name = 'Please provide employee name'
               }        
               if(!department){
                errorData.department = 'Please provide department'
               }
               if(!designation){
                errorData.designation = 'Please provide designation'
               }
               if(!basicSalary){
                errorData.basic_salary = 'Please provide basic salary'
               }
               if(!payPeriod){
                errorData.pay_period = 'Please provide pay period'
               }
               if(!salaryPaidBy){
                errorData.salary_paid_by = 'Please provide pay mood'
               }
               if(!da){
                errorData.da = 'Please provide Dearness Allowance'
               }
               if(!houseRent){
                errorData.houseRent = 'Please provide House rent'
               }
               if(!ma){
                errorData.ma = 'Please provide Medical Allowance'
               }

               if(Object.keys(errorData).length ===0){
                try{              
                    const tempDate = moment(Date.now()).format('LLL')
                 
                    await salaryPaySlipModel.create({
                        emp_id:empId,
                        emp_name:name,
                        department,
                        designation,
                        joining_date:joiningDate,
                        pay_period:payPeriod,
                        pay_date:payDate,
                        salary_paid_by:salaryPaidBy,
                        basic_salary:basicSalary,
                        gross_salary:grossSalary,
                        dearness_allowance:da,
                        house_rent:houseRent,
                        medical_allowance:ma,
                        provident_fund:pf,
                        tax:tax,
                        loan:loan,
                        penalty:penalty,
                        entered_by:userName,
                        entered_date:tempDate
                      })
                      responseReturn(res, 200, {message:'add success'})
                

        } catch (error) {
            console.log(error.message)
            // responseReturn(res, 500, {error:'Internal server error'})
        }
               }else{
                responseReturn(res, 500, {error: errorData})
               }

              
            }
        
    

    leave_create = async(req, res)=>{
        const {empId,name,leaveStartDate,leaveEndDate,leaveType,leaveNote,userName}=req.body
        const tempDate = moment(Date.now()).format('LLL')
        try {
            await employeeLeaveModel.create({
                emp_id:empId,
                emp_name:name,
                leave_start:leaveStartDate,
                leave_end:leaveEndDate,
                leave_type:leaveType,
                leave_note:leaveNote,
                entered_by:userName,
                entered_date:tempDate
            })
            responseReturn(res, 200, {message: 'Added success'})
        } catch (error) {
            console.log(error.message)
        }
    }
    // expense_category_delete = async(req, res)=>{
    //     const {cat_id} = req.params
    //     try {
    //         await expenseCategoryModel.findByIdAndDelete(cat_id)
    //         responseReturn(res, 200, {
    //             message: 'Deleted success'
    //         })
    //     } catch (error) {
    //         console.log(error.message)
    //     }
    // }

    get_all_leave =async(req, res)=>{
        const {searchValue} = req.query
        try{
            if(searchValue){
                const leaves = await employeeLeaveModel.find({$text:{$search:searchValue}}).sort({createdAt: -1})
                responseReturn(res, 200, {leaves})
            }else{
                const leaves = await employeeLeaveModel.find({}).sort({createdAt: -1})
                responseReturn(res, 200, {leaves})
            }
 
         }catch (error) {
             responseReturn(res, 500, {error:'Internal server error'})
         }
    }
 
    get_all_employee =async(req, res)=>{
        const {searchValue} = req.query
        try{
            if(searchValue){
                const employees = await employeeEntryModel.find({$text:{$search:searchValue}}).sort({createdAt: -1})
                const totalEmployee = await employeeEntryModel.find({ $text:{$search:searchValue}}).countDocuments()
                responseReturn(res, 200, {employees,totalEmployee})
            }else{
                const employees = await employeeEntryModel.find({}).sort({createdAt: -1})
                const totalEmployee = await employeeEntryModel.find({}).countDocuments()
                responseReturn(res, 200, {employees,totalEmployee})
            }
 
         }catch (error) {
             responseReturn(res, 500, {error:'Internal server error'})
         }
    }
    get_all_pay_slip =async(req, res)=>{
        const {searchValue} = req.query
        try{
            if(searchValue){
                const paySlips = await salaryPaySlipModel.find({$text:{$search:searchValue}}).sort({createdAt: -1})
                const totalPaySlip = await salaryPaySlipModel.find({ $text:{$search:searchValue}}).countDocuments()
                responseReturn(res, 200, {paySlips,totalPaySlip})
            }else{
                const paySlips = await salaryPaySlipModel.find({}).sort({createdAt: -1})
                const totalPaySlip = await salaryPaySlipModel.find({}).countDocuments()
                responseReturn(res, 200, {paySlips,totalPaySlip})

            }
 
         }catch (error) {
             responseReturn(res, 500, {error:'Internal server error'})
         }
    }
    get_leave_employees =async(req, res)=>{
        try{
                const leaveEmployees = await employeeEntryModel.find({}).sort({createdAt: -1})
                responseReturn(res, 200, {leaveEmployees}) 
         }catch (error) {
             responseReturn(res, 500, {error:'Internal server error'})
         }
    }
    get_pay_employees =async(req, res)=>{
        try{
                const payEmployees = await employeeEntryModel.find({}).sort({createdAt: -1})
                responseReturn(res, 200, {payEmployees}) 
         }catch (error) {
             responseReturn(res, 500, {error:'Internal server error'})
         }
    }
    get_employee_name_by_id =  async(req,res)=>{
        const {empId} = req.params
        try {
            // const item = await itemModel.findById(itemId)
            const empName = await employeeEntryModel.findOne({"emp_id":empId})
            responseReturn(res, 200, {empName})
        } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
        }

    }
    get_employee_by_id =  async(req,res)=>{
        const {empId} = req.params
        try {
            // const item = await itemModel.findById(itemId)
            const empEditInfo = await employeeEntryModel.findOne({"_id":empId})
            responseReturn(res, 200, {empEditInfo})
        } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
        }

    }
    get_leave_by_id =  async(req,res)=>{
        const {empLeaveId} = req.params
        try {
            // const item = await itemModel.findById(itemId)
            const empLeaveEditInfo = await employeeLeaveModel.findOne({"_id":empLeaveId})
            responseReturn(res, 200, {empLeaveEditInfo})
        } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
        }

    }
    get_emp_info_by_id =  async(req,res)=>{
        const {empId} = req.params
        try {
            // const item = await itemModel.findById(itemId)
            const empInfo = await employeeEntryModel.findOne({"emp_id":empId})
            console.log(empInfo)
            responseReturn(res, 200, {empInfo})
        } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
        }

    }
    pay_slip_view_by_id =  async(req,res)=>{
        const {paySlipId} = req.params
        try {
            // const item = await itemModel.findById(itemId)
            const paySlipInfo = await salaryPaySlipModel.findOne({"_id":paySlipId})
            responseReturn(res, 200, {paySlipInfo})
        } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
        }

    }
    get_pay_slip_edit_info_by_id =  async(req,res)=>{
        const {paySlipId} = req.params
        try {
            // const item = await itemModel.findById(itemId)
            const paySlipEditInfo = await salaryPaySlipModel.findOne({"_id":paySlipId})
            responseReturn(res, 200, {paySlipEditInfo})
        } catch (error) {
            responseReturn(res, 500, {error:'Internal server error'})
        }

    }
    pay_slip_delete = async(req, res)=>{
        const {paySlipId} = req.params
        try {
            await salaryPaySlipModel.findByIdAndDelete(paySlipId)
            responseReturn(res, 200, {
                message: 'Deleted success'
            })
        } catch (error) {
            console.log(error.message)
        }
    }
    leave_delete = async(req, res)=>{
        const {leaveId} = req.params
        try {
            await employeeLeaveModel.findByIdAndDelete(leaveId)
            responseReturn(res, 200, {
                message: 'Deleted success'
            })
        } catch (error) {
            console.log(error.message)
        }
    }
    leave_update = async(req, res)=>{
        let {leaveStartDate,leaveEndDate,leaveType,leaveNote,userName,empLeaveId} = req.body;

        const tempDate = moment(Date.now()).format('LLL')
        try {
            await employeeLeaveModel.findByIdAndUpdate(empLeaveId,{
                leave_start:leaveStartDate,
                leave_end:leaveEndDate,
                leave_type:leaveType,
                leave_note:leaveNote,
                updated_by:userName,
                updated_date:tempDate

            })
            // const item = await vendorModel.findById(vendorId)
            responseReturn(res, 200, {message:'update success'})
        } catch (error) {
            console.log(error.message) 
        }
    }
    pay_slip_update = async(req, res)=>{
        let { department,
            designation,
            basicSalary,
            grossSalary,
            payPeriod,
            salaryPaidBy,
            da,
            ma,
            pf,
            tax,
            loan,
            penalty,
            houseRent,
            joiningDate,
            payDate,
            paySlipId,
            userName} = req.body;

        const tempDate = moment(Date.now()).format('LLL')
        try {
            await salaryPaySlipModel.findByIdAndUpdate(paySlipId,{
                department,
                designation,
                basic_salary:basicSalary,
                gross_salary:grossSalary,
                pay_period:payPeriod,
                dearness_allowance:da,
                medical_allowance:ma,
                provident_fund:pf,
                tax:tax,
                pay_date:payDate,
                salary_paid_by:salaryPaidBy,
                house_rent:houseRent,
                joining_date:joiningDate,
                loan,
                penalty,
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

module.exports = new payrollControllers(); 