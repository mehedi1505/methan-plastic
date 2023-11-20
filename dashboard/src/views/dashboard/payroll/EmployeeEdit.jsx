import React, { useState,useEffect, forwardRef } from "react";
import { useNavigate,useParams} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import { PropagateLoader } from 'react-spinners'
import {cssOverride} from '../../../utils/utils'
import toast from 'react-hot-toast'
import {messageClear,employee_add,get_employee_by_id,employee_update} from '../../../store/reducers/payrollReducer'

import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'


const EmployeeEdit = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {empId} = useParams()
  const {loader,successMessage,errorMessage,errorValidation,employees,empEditInfo} = useSelector(state=>state.payroll)
  const {userInfo} = useSelector(state=>state.auth)

  const [state,setState] = useState({
    emp_id:'',
    emp_name:'',
    emp_email:'',
    contact_number:'',
    education:'',
    marital_status:'',
    gender:'',
    religion:'',
    blood_group:'',
    department:'',
    designation:'',
    basic_salary:'',
    gross_salary:'',
    da:'',
    house_rent:'',
    ma:'',
    pf:'',
    tax:'',
    experience:'',
    status:'',

  })
  const [joiningDate, setJoiningDate] = useState(Date.now());

const inputHandle = (e)=>{
    setState({
        ...state,
        [e.target.name] : e.target.value
    })
}


  const employeeEdit= (e)=>{
      e.preventDefault()
        const obj = {
          emp_id:state.emp_id,
          emp_name:state.emp_name,
          emp_email:state.emp_email,
          contact_number:state.contact_number,
          education:state.education,
          marital_status:state.marital_status,
          gender:state.gender,
          religion:state.religion,
          blood_group:state.blood_group,
          department:state.department,
          designation:state.designation,
          basic_salary:state.basic_salary,
          gross_salary:state.gross_salary,
          da:state.da,
          house_rent:state.house_rent,
          ma:state.ma,
          pf:state.pf,
          tax:state.tax,
          experience:state.experience,
          joining_date:joiningDate,
          status:state.status,
          empId:empId,
          userName:userInfo.name
        }
      dispatch(employee_update(obj))
  }

 useEffect(()=>{
    dispatch(get_employee_by_id(empId))
},[empId])

  useEffect(()=>{
    if(empEditInfo){
      setState({
        emp_id:empEditInfo.emp_id,
        emp_name:empEditInfo.emp_name,
        emp_email:empEditInfo.emp_email,
        contact_number:empEditInfo.contact_number,
        education:empEditInfo.education,
        marital_status:empEditInfo.marital_status,
        gender:empEditInfo.gender,
        religion:empEditInfo.religion,
        blood_group:empEditInfo.blood_group,
        department:empEditInfo.department,
        designation:empEditInfo.designation,
        basic_salary:empEditInfo.basic_salary,
        gross_salary:empEditInfo.gross_salary,
        da:empEditInfo.dearness_allowance,
        house_rent:empEditInfo.house_rent,
        ma:empEditInfo.medical_allowance,
        pf:empEditInfo.provident_fund,
        tax:empEditInfo.tax,
        experience:empEditInfo.experience,
        status:empEditInfo.status

      })
      setJoiningDate(empEditInfo.joining_date)
    }
},[empId,empEditInfo])

  useEffect(()=>{
    if(successMessage){
      toast.success(successMessage)
      dispatch(messageClear())
    }
    if(errorMessage){
      toast.error(errorMessage)
      dispatch(messageClear())
    }
  },[successMessage,errorMessage])   
  
  const options = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ];
  return (
    <div className="mx-auto md:px-[2px] w-[98%] mt-[-20px]">
      <div className="flex flex-wrap">
          <div className="w-full">
            <div className="bg-[#283046] text-[#d0d2d6] height-screen lg:height-auto px-3 py-1">
            <div className="flex justify-between items-center bg-[#283046] py-1 md:px-[2px] text-white">
                <div className="pl-1 font-bold text-2xl">Employee Information Edit</div>
                <div onClick={()=>navigate('/admin/dashboard/employee-entry')} className="pr-2 font-bold text-sm cursor-pointer bg-[#3ab0d8] px-3 py-1 mr-3">Employee List</div>
            </div>
              <hr className='border-2 border-slate-500 mb-5'/>
              <form onSubmit={employeeEdit}>
                    <div className='flex flex-col md:flex-row gap-1 w-full text-[#d0d2d6] mt-1'>
                        <div className='flex flex-col w-[20%] gap-1'>
                            <label htmlFor='emp_id' className="text-sm">Emp ID:</label>
                            <input className='bg-[#FFFFFF] px-2 py-1 border border-slate-700 rounded-sm outline-none focus:border-indigo-500 text-[#2A2D2E] text-xs' onChange={inputHandle} value={state.emp_id} type='text' placeholder='emp id' id='emp_id' name='emp_id'/>
                            <span className="text-red-500 text-xs">{errorValidation?.emp_id}</span>
                        </div>
                        <div className='flex flex-col w-[20%] gap-1'>
                            <label htmlFor='emp_name' className="text-sm">Name:</label>
                            <input className='bg-[#FFFFFF] px-2 py-1 border border-slate-700 rounded-sm outline-none focus:border-indigo-500 text-[#2A2D2E] text-xs' onChange={inputHandle} value={state.emp_name} type='text' placeholder='emp name' id='emp_name' name='emp_name'/>
                            <span className="text-red-500 text-xs">{errorValidation?.emp_name}</span>
                        </div>
                        <div className='flex flex-col w-[20%] gap-1'>
                            <label htmlFor='emp_email' className="text-sm">Email:</label>
                            <input className='bg-[#FFFFFF] px-2 py-1 border border-slate-700 rounded-sm outline-none focus:border-indigo-500 text-[#2A2D2E] text-xs' onChange={inputHandle} value={state.emp_email} type='text' placeholder='Email' id='emp_email' name='emp_email'/>
                            <span className="text-red-500 text-xs">{errorValidation?.emp_email}</span>
                        </div>
                        <div className='flex flex-col w-[20%] gap-1'>
                            <label htmlFor='contact_number' className="text-sm">Contact Number:</label>
                            <input className='bg-[#FFFFFF] px-2 py-1 border border-slate-700 rounded-sm outline-none focus:border-indigo-500 text-[#2A2D2E] text-xs' onChange={inputHandle} value={state.contact_number} type='text' placeholder='contact number' id='contact_number' name='contact_number'/>
                            <span className="text-red-500 text-xs">{errorValidation?.contact_number}</span>
                        </div>
                        <div className='flex flex-col w-[20%] gap-1'>
                            <label htmlFor='education' className="text-sm">Education:</label>
                            <input onChange={inputHandle} className='bg-[#FFFFFF] px-2 py-1 border border-slate-700 rounded-sm outline-none focus:border-indigo-500 text-[#2A2D2E] text-xs' value={state.education} type='text' placeholder='enter education' id='education' name='education'/>
                            <span className="text-red-500 text-xs">{errorValidation?.education}</span>
                        </div>

                      
                        </div>

                    <div className='flex flex-col mb-1 md:flex-row gap-1 w-full text-[#d0d2d6] mt-1'>
                        <div className='flex flex-col w-[20%] gap-1'>
                            <label htmlFor='marital_status' className="text-sm">Marital Status:</label>
                            <input onChange={inputHandle} className='bg-[#FFFFFF] px-2 py-1 border border-slate-700 rounded-sm outline-none focus:border-indigo-500 text-[#2A2D2E] text-xs' value={state.marital_status} type='text' placeholder='enter marital status' id='marital_status' name='marital_status'/>
                            <span className="text-red-500 text-xs">{errorValidation?.marital_status}</span>
                        </div>
                        <div className='flex flex-col w-[20%] gap-1'>
                            <label htmlFor='gender' className="text-sm">Gender:</label>
                            <input onChange={inputHandle} className='bg-[#FFFFFF] px-2 py-1 border border-slate-700 rounded-sm outline-none focus:border-indigo-500 text-[#2A2D2E] text-xs' value={state.gender} type='text' placeholder='enter gender' id='gender' name='gender'/>
                            <span className="text-red-500 text-xs">{errorValidation?.gender}</span>
                        </div>
                        <div className='flex flex-col w-[20%] gap-1'>
                            <label htmlFor='religion' className="text-sm">Religion: <span className="text-[#F92F51]"></span></label>
                            <input onChange={inputHandle} className='bg-[#FFFFFF] px-2 py-1 border border-slate-700 rounded-sm outline-none focus:border-indigo-500 text-[#2A2D2E] text-xs' value={state.religion} type='text' placeholder='website' id='religion' name='religion'/>
                            <span className="text-red-500 text-xs">{errorValidation?.religion}</span>
                        </div>
                        <div className='flex flex-col w-[20%] gap-1'>
                            <label htmlFor='blood_group' className="text-sm">Blood Group:</label>
                            <input onChange={inputHandle} className='bg-[#FFFFFF] px-2 py-1 border border-slate-700 rounded-sm outline-none focus:border-indigo-500 text-[#2A2D2E] text-xs' value={state.blood_group} type='text' placeholder='enter blood group' id='blood_group' name='blood_group'/>
                            <span className="text-red-500 text-xs">{errorValidation?.blood_group}</span>
                        </div>
                                      
                        <div className='flex flex-col w-[20%] gap-1'>
                            <label htmlFor='department' className="text-sm">Department:</label>
                            <input className='bg-[#FFFFFF] px-2 py-1 border border-slate-700 rounded-sm outline-none focus:border-indigo-500 text-[#2A2D2E] text-xs' onChange={inputHandle} value={state.department} type='text' placeholder='enter department' id='department' name='department'/>
                            <span className="text-red-500 text-xs">{errorValidation?.department}</span>
                        </div>             
                    </div>
                    <div className='flex flex-col mb-1 md:flex-row gap-1 w-full text-[#d0d2d6]'>
                    <div className='flex flex-col w-[20%] gap-1'>
                            <label htmlFor='designation' className="text-sm">Designation:</label>
                            <input className='bg-[#FFFFFF] px-2 py-1 border border-slate-700 rounded-sm outline-none focus:border-indigo-500 text-[#2A2D2E] text-xs' onChange={inputHandle} value={state.designation} type='text' placeholder='enter designation' id='designation' name='designation'/>
                            <span className="text-red-500 text-xs">{errorValidation?.designation}</span>
                        </div> 
                        <div className='flex flex-col w-[21%] gap-1'>
                          <label htmlFor='joining_date' className="text-sm text-white">Joining Date:</label>   
                            <div className="bg-[#FFFFFF] text-[#2A2D2E] text-xs px-[2px] py-[5px] rounded-[3px]">
                              <DatePicker                        
                                   selected={new Date(joiningDate)}
                                  onChange={date=>setJoiningDate(date)}
                                  dateFormat="dd/MM/yyyy"
                                  filterDate={date=>date.getDay() !== 5}
                                  showYearDropdown
                                  scrollableMonthYearDropdown
                              />
                            </div>
                          </div> 
                   
                   
                        <div className='flex flex-col w-[20%] gap-1'>
                            <label htmlFor='basic_salary' className="text-sm">Basic Salary: <span className="text-[#F92F51]"></span></label>
                            <input onChange={inputHandle} className='bg-[#FFFFFF] px-2 py-1 border border-slate-700 rounded-sm outline-none focus:border-indigo-500 text-[#2A2D2E] text-xs' value={state.basic_salary} type='number' min="0" step="any" placeholder='website' id='basic_salary' name='basic_salary'/>
                            <span className="text-red-500 text-xs">{errorValidation?.basic_salary}</span>
                        </div>
                        <div className='flex flex-col w-[20%] gap-1'>
                            <label htmlFor='gross_salary' className="text-sm">Gross Salary: <span className="text-[#F92F51]"></span></label>
                            <input onChange={inputHandle} className='bg-[#FFFFFF] px-2 py-1 border border-slate-700 rounded-sm outline-none focus:border-indigo-500 text-[#2A2D2E] text-xs' value={state.gross_salary} type='number' min="0" step="any" placeholder='Gross salary' id='gross_salary' name='gross_salary'/>
                            <span className="text-red-500 text-xs">{errorValidation?.gross_salary}</span>
                        </div>
                        <div className='flex flex-col w-[20%] gap-1'>
                            <label htmlFor='experience' className="text-sm">Experience:</label>
                            <input className='bg-[#FFFFFF] px-2 py-1 border border-slate-700 rounded-sm outline-none focus:border-indigo-500 text-[#2A2D2E] text-xs' onChange={inputHandle} value={state.experience} type='text' placeholder='enter experience' id='experience' name='experience'/>
                            <span className="text-red-500 text-xs">{errorValidation?.experience}</span>
                        </div> 
                    
                    </div>
                    <div className='flex flex-col mb-1 md:flex-row gap-1 w-full text-[#d0d2d6]'>
                    <div className='flex flex-col w-[20%] gap-1'>
                            <label htmlFor='da' className="text-sm">Dearness Allowance:</label>
                            <input className='bg-[#FFFFFF] px-2 py-1 border border-slate-700 rounded-sm outline-none focus:border-indigo-500 text-[#2A2D2E] text-xs' onChange={inputHandle} value={state.da} type='number' min="0" step="any" placeholder='enter DA' id='da' name='da'/>
                            <span className="text-red-500 text-xs">{errorValidation?.da}</span>
                        </div> 
                    <div className='flex flex-col w-[20%] gap-1'>
                            <label htmlFor='house_rent' className="text-sm">House Rent:</label>
                            <input className='bg-[#FFFFFF] px-2 py-1 border border-slate-700 rounded-sm outline-none focus:border-indigo-500 text-[#2A2D2E] text-xs' onChange={inputHandle} value={state.house_rent} type='number' min="0" step="any" placeholder='enter HRA' id='house_rent' name='house_rent'/>
                            <span className="text-red-500 text-xs">{errorValidation?.house_rent}</span>
                        </div> 
                   
                        <div className='flex flex-col w-[20%] gap-1'>
                            <label htmlFor='ma' className="text-sm">Medical Allowance: <span className="text-[#F92F51]"></span></label>
                            <input onChange={inputHandle} className='bg-[#FFFFFF] px-2 py-1 border border-slate-700 rounded-sm outline-none focus:border-indigo-500 text-[#2A2D2E] text-xs' value={state.ma} type='number' min="0" step="any" placeholder='MA' id='ma' name='ma'/>
                            <span className="text-red-500 text-xs">{errorValidation?.ma}</span>
                        </div>
                        <div className='flex flex-col w-[20%] gap-1'>
                            <label htmlFor='pf' className="text-sm">Provident Fund: <span className="text-[#F92F51]"></span></label>
                            <input onChange={inputHandle} className='bg-[#FFFFFF] px-2 py-1 border border-slate-700 rounded-sm outline-none focus:border-indigo-500 text-[#2A2D2E] text-xs' value={state.pf} type='number' min="0" step="any" placeholder='Provident Fund' id='pf' name='pf'/>
                            <span className="text-red-500 text-xs">{errorValidation?.pf}</span>
                        </div>
                        <div className='flex flex-col w-[20%] gap-1'>
                            <label htmlFor='tax' className="text-sm">TAX:</label>
                            <input className='bg-[#FFFFFF] px-2 py-1 border border-slate-700 rounded-sm outline-none focus:border-indigo-500 text-[#2A2D2E] text-xs' onChange={inputHandle} value={state.tax} type='number' min="0" step="any" placeholder='enter tax' id='tax' name='tax'/>
                            <span className="text-red-500 text-xs">{errorValidation?.tax}</span>
                        </div> 
                    
                    </div>
                    <div className='flex flex-col md:flex-row gap-1 text-[#d0d2d6]'>
                    <div className='flex flex-col w-[20%] gap-1'>
                        <label htmlFor='status'>Status:</label>
                          <select className="text-black py-[2px] bg-[#FFFFFF] outline-none rounded-md" value={state.status} onChange={(e)=>setState({...state,status: e.target.value})} name="status" id="status">
                            {options.map(option => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      <div className='flex w-[15%] gap-1'>
                      <button disabled={loader?true:false} type="submit" className='bg-green-500 mt-[30px] my-[29px] w-[200px] py-[5px] text-white text-xs hover:shadow-green-500/50 hover:shadow-md font-bold rounded-sm'>
                          {
                              loader? <PropagateLoader color='#fff' cssOverride={cssOverride}/>: 'Update'
                          }
                          
                      </button>
                      </div>
                    </div>

       
              </form>
            </div>
          </div>     
      </div>
    </div>
  );
};

export default EmployeeEdit;