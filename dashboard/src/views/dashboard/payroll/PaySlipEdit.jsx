import React, { useState,useEffect, forwardRef } from "react";
import { Link,useNavigate,useParams} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import { PropagateLoader } from 'react-spinners'
import {cssOverride} from '../../../utils/utils'
import toast from 'react-hot-toast'
import {messageClear,get_pay_slip_edit_info_by_id,pay_slip_update} from '../../../store/reducers/payrollReducer'
import { FaEdit, FaTrash } from "react-icons/fa";
import { BsFillEyeFill } from "react-icons/bs";
import {FixedSizeList as List} from 'react-window'
import Search from '../../../components/Search'
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import Select from 'react-select'
import moment from 'moment';

function handleOnWheel({deltaY}){
  console.log('handleOnWheel',deltaY)
  }
  const outerElementType = forwardRef((props,ref)=>(
    <div ref={ref} onWheel={handleOnWheel} {...props} />
  ))
const PaySlipCreate = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { paySlipId } = useParams()
  const {loader,successMessage,errorMessage,errorValidation,payEmployees,paySlipEditInfo,paySlips} = useSelector(state=>state.payroll)
  const {userInfo} = useSelector(state=>state.auth)
  const [searchValue, setSearchValue] = useState("");

const [empId,setEmpId] = useState('')
const [name,setName] = useState('')
const [department,setDepartment] = useState('')
const [designation,setDesignation] = useState('')
const [basicSalary,setBasicSalary] = useState('')
const [grossSalary,setGrossSalary] = useState('')
const [payPeriod,setPayPeriod] = useState('')
const [salaryPaidBy,setSalaryPaidBy] = useState('')
const [da,setDa] = useState('')
const [ma,setMa] = useState('')
const [pf,setPf] = useState('')
const [tax,setTax] = useState('')
const [loan,setLoan] = useState('')
const [penalty,setPenalty] = useState('')
const [houseRent,setHouseRent] = useState('')
const [joiningDate, setJoiningDate] = useState(Date.now());
const [payDate, setPayDate] = useState(Date.now());


 const paySlipUpdate = (e)=>{
    e.preventDefault()
    const obj = {
        department,
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
        userName:userInfo.name
    }
    dispatch(pay_slip_update(obj))
 }
useEffect(()=>{
  dispatch(get_pay_slip_edit_info_by_id(paySlipId))
},[paySlipId])

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

useEffect(()=>{
    setEmpId(paySlipEditInfo?.emp_id)
    setName(paySlipEditInfo?.emp_name)
    setDepartment(paySlipEditInfo?.department)
    setDesignation(paySlipEditInfo?.designation)
    setBasicSalary(paySlipEditInfo?.basic_salary)
    setGrossSalary(paySlipEditInfo?.gross_salary)
    setHouseRent(paySlipEditInfo?.house_rent)
    setJoiningDate(paySlipEditInfo?.joining_date)
    setPayPeriod(paySlipEditInfo?.pay_period)
    setSalaryPaidBy(paySlipEditInfo?.salary_paid_by)
    setDa(paySlipEditInfo?.dearness_allowance)
    setMa(paySlipEditInfo?.medical_allowance)
    setPf(paySlipEditInfo?.provident_fund)
    setTax(paySlipEditInfo?.tax)
    setLoan(paySlipEditInfo?.loan)
    setPenalty(paySlipEditInfo?.penalty)
},[paySlipId,paySlipEditInfo])


const options = [
  { value: "cash", label: "Cash" },
  { value: "cheque", label: "Cheque" },
];
  const customStyles = {
    control: base => ({
      ...base,
      height: 25,
      minHeight: 25,
      background:'#FFFFFF',
      align:'center',
      fontSize: 12,
    }),
    valueContainer: (provided, state) => ({
      ...provided,
      height: '25px',
      padding: '0 6px'
    }),
  
    input: (provided, state) => ({
      ...provided,
      margin: '0px',
    }),
    indicatorSeparator: state => ({
      display: 'none',
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      height: '25px',
    }),
    
  }; 
  // console.log(empInfo) 
  return (
    <div className="mx-auto md:px-[2px] w-[98%] mt-[-20px]">
      <div className="flex flex-wrap">
          <div className="w-full">
            <div className="bg-[#283046] text-[#d0d2d6] height-screen lg:height-auto px-3 py-1">
            <div className="flex justify-between items-center bg-[#283046] py-1 md:px-[2px] text-white">
                <div className="pl-1 font-bold text-2xl">Pay Slip Edit</div>
                <div onClick={()=>navigate('admin/dashboard/pay-slip-create')} className="pr-2 font-bold text-sm cursor-pointer bg-[#3ab0d8] px-3 py-1 mr-3">Pay Slip List</div>
            </div>
              <hr/>
              <form onSubmit={paySlipUpdate}>
                    <div className='flex flex-col md:flex-row gap-1 w-full text-[#d0d2d6] mt-1'>
                    <div className='flex flex-col w-[20%] gap-1'>  
                        <label htmlFor='emp_id' className="text-xs text-white">Employee Id:</label>                              
                        <input className='text-xs font-semibold text-[#2A2D2E] py-[4px] outline-none px-2 ' type="text" value={empId} readonly={true}/>
                    </div>
                        <div className='flex flex-col w-[19%] gap-1'>
                            <label htmlFor='name' className="text-xs">Name:</label>
                            <input className='bg-[#FFFFFF] px-2 py-1 border border-slate-700 rounded-sm outline-none focus:border-indigo-500 text-[#2A2D2E] text-xs' value={name} type='text' placeholder='emp name' id='name' name='name' readonly={true}/>
                        </div>
                        <div className='flex flex-col w-[20%] gap-1'>
                            <label htmlFor='department' className="text-xs">Department:</label>
                            <input className='bg-[#FFFFFF] px-2 py-1 border border-slate-700 rounded-sm outline-none focus:border-indigo-500 text-[#2A2D2E] text-xs' onChange={(e)=>setDepartment(e.target.value)} value={department} type='text' placeholder='Email' id='department' name='department'/>
                            <span className="text-red-500 text-xs">{errorValidation?.department}</span>
                        </div>
                        <div className='flex flex-col w-[20%] gap-1'>
                            <label htmlFor='designation' className="text-xs">Designation:</label>
                            <input className='bg-[#FFFFFF] px-2 py-1 border border-slate-700 rounded-sm outline-none focus:border-indigo-500 text-[#2A2D2E] text-xs' onChange={(e)=>setDesignation(e.target.value)} value={designation} type='text' placeholder='designation' id='designation' name='designation'/>
                            <span className="text-red-500 text-xs">{errorValidation?.designation}</span>
                        </div>
                        <div className='flex flex-col w-[20%] gap-1'>
                            <label htmlFor='basicSalary' className="text-xs">Basic Salary:</label>
                            <input onChange={(e)=>setBasicSalary(e.target.value)} className='bg-[#FFFFFF] px-2 py-1 border border-slate-700 rounded-sm outline-none focus:border-indigo-500 text-[#2A2D2E] text-xs' value={basicSalary} type='text' placeholder='enter education' id='basicSalary' name='basicSalary'/>
                            <span className="text-red-500 text-xs">{errorValidation?.basicSalary}</span>
                        </div>

                      
                        </div>

                    
                    <div className='flex flex-col mb-1 md:flex-row gap-1 w-full text-[#d0d2d6]'>
                
                        <div className='flex flex-col w-[21%] gap-1'>
                          <label htmlFor='joining_date' className="text-xs text-white">Joining Date:</label>   
                    
                            <input onChange={(e)=>setJoiningDate(e.target.value)} className='bg-[#FFFFFF] px-2 py-1 border border-slate-700 rounded-sm outline-none focus:border-indigo-500 text-[#2A2D2E] text-xs' value={moment(joiningDate).format('LL')} type='text' placeholder='enter education' id='joining_date' name='joining_date' readonly={true}/>
                      
                          </div> 
                   
                   
                       
                        <div className='flex flex-col w-[20%] gap-1'>
                            <label htmlFor='gross_salary' className="text-xs">Gross Salary: <span className="text-[#F92F51]"></span></label>
                            <input onChange={(e)=>setGrossSalary(e.target.value)} className='bg-[#FFFFFF] px-2 py-1 border border-slate-700 rounded-sm outline-none focus:border-indigo-500 text-[#2A2D2E] text-xs' value={grossSalary} type='number' min="0" step="any" placeholder='Gross salary' id='gross_salary' name='gross_salary'/>
                            <span className="text-red-500 text-xs">{errorValidation?.gross_salary}</span>
                        </div>
                        <div className='flex flex-col w-[20%] gap-1'>
                            <label htmlFor='da' className="text-xs">Dearness Allowance:</label>
                            <input className='bg-[#FFFFFF] px-2 py-1 border border-slate-700 rounded-sm outline-none focus:border-indigo-500 text-[#2A2D2E] text-xs' onChange={(e)=>setDa(e.target.value)} value={da} type='number' min="0" step="any" placeholder='enter DA' id='da' name='da'/>
                            <span className="text-red-500 text-xs">{errorValidation?.da}</span>
                        </div> 
                        <div className='flex flex-col w-[20%] gap-1'>
                            <label htmlFor='ma' className="text-xs">Medical Allowance: <span className="text-[#F92F51]"></span></label>
                            <input onChange={(e)=>setMa(e.target.value)} className='bg-[#FFFFFF] px-2 py-1 border border-slate-700 rounded-sm outline-none focus:border-indigo-500 text-[#2A2D2E] text-xs' value={ma} type='number' min="0" step="any" placeholder='MA' id='ma' name='ma'/>
                            <span className="text-red-500 text-xs">{errorValidation?.ma}</span>
                        </div>
                        <div className='flex flex-col w-[20%] gap-1'>
                            <label htmlFor='pf' className="text-xs">Provident Fund: <span className="text-[#F92F51]"></span></label>
                            <input onChange={(e)=>setPf(e.target.value)} className='bg-[#FFFFFF] px-2 py-1 border border-slate-700 rounded-sm outline-none focus:border-indigo-500 text-[#2A2D2E] text-xs' value={pf} type='number' min="0" step="any" placeholder='Provident Fund' id='pf' name='pf'/>
                            <span className="text-red-500 text-xs">{errorValidation?.pf}</span>
                        </div>


                    </div>
                    <div className='flex flex-col mb-1 md:flex-row gap-1 w-full text-[#d0d2d6]'>
     
                    <div className='flex flex-col w-[20%] gap-1'>
                            <label htmlFor='house_rent' className="text-xs">House Rent:</label>
                            <input  onChange={(e)=>setHouseRent(e.target.value)}className='bg-[#FFFFFF] px-2 py-1 border border-slate-700 rounded-sm outline-none focus:border-indigo-500 text-[#2A2D2E] text-xs' value={houseRent} type='number' min="0" step="any" placeholder='enter HRA' id='house_rent' name='house_rent'/>
                            <span className="text-red-500 text-xs">{errorValidation?.house_rent}</span>
                        </div> 
                   
               
                        <div className='flex flex-col w-[20%] gap-1'>
                            <label htmlFor='tax' className="text-xs">Tax:</label>
                            <input  onChange={(e)=>setTax(e.target.value)} className='bg-[#FFFFFF] px-2 py-1 border border-slate-700 rounded-sm outline-none focus:border-indigo-500 text-[#2A2D2E] text-xs' value={tax} type='number' min="0" step="any" placeholder='enter tax' id='tax' name='tax'/>
                            <span className="text-red-500 text-xs">{errorValidation?.tax}</span>
                        </div>
                        <div className='flex flex-col w-[20%] gap-1'>
                            <label htmlFor='loan' className="text-xs">Loan:</label>
                            <input  onChange={(e)=>setLoan(e.target.value)} className='bg-[#FFFFFF] px-2 py-1 border border-slate-700 rounded-sm outline-none focus:border-indigo-500 text-[#2A2D2E] text-xs' value={loan} type='number' min="0" step="any" placeholder='enter loan' id='loan' name='loan'/>
                            <span className="text-red-500 text-xs">{errorValidation?.tax}</span>
                        </div>
                        <div className='flex flex-col w-[20%] gap-1'>
                            <label htmlFor='penalty' className="text-xs">Penalty:</label>
                            <input  onChange={(e)=>setPenalty(e.target.value)} className='bg-[#FFFFFF] px-2 py-1 border border-slate-700 rounded-sm outline-none focus:border-indigo-500 text-[#2A2D2E] text-xs' value={penalty} type='number' min="0" step="any" placeholder='enter penalty' id='penalty' name='penalty'/>
                            <span className="text-red-500 text-xs">{errorValidation?.tax}</span>
                        </div> 
                        <div className='flex flex-col w-[21%] gap-1'>
                          <label htmlFor='pay_date' className="text-xs text-green-500 font-bold">Pay Date:</label>   
                            <div className="bg-[#FFFFFF] text-black text-xs px-[2px] py-[4px] rounded-[3px]">
                              <DatePicker                        
                                  selected={new Date(payDate)}
                                  onChange={date=>setPayDate(date)}
                                  dateFormat="dd/MM/yyyy"
                                  filterDate={date=>date.getDay() !== 5}
                                  showYearDropdown
                                  scrollableMonthYearDropdown
                              />
                            </div>
                          </div> 

                        
                    </div>
                    <div className='flex flex-col mb-1 md:flex-row gap-1 w-full text-[#d0d2d6]'>
                    <div className='flex flex-col w-[20%] gap-1'>
                            <label htmlFor='pay_period' className="text-xs text-green-500 font-bold">Salary Period:</label>
                            <input className='bg-[#FFFFFF] px-2 py-1 border border-slate-700 rounded-sm outline-none focus:border-indigo-500 text-[#2A2D2E] text-xs' onChange={(e)=>setPayPeriod(e.target.value)} value={payPeriod} type='text' placeholder='salary period' id='pay_period' name='pay_period'/>
                            <span className="text-red-500 text-xs">{errorValidation?.pay_period}</span>
                        </div>
                        <div className='flex flex-col w-[20%] gap-1'>
                        <label htmlFor='salary_paid_by' className="text-xs text-green-500 font-bold">Pay Mood:</label>
                          <select className="text-[#2A2D2E] py-[3px] bg-[#FFFFFF] outline-none rounded-sm text-xs" value={salaryPaidBy} onChange={(e)=>setSalaryPaidBy(e.target.value)} name="salary_paid_by" id="salary_paid_by">
                            <option className='text-[#2A2D2E]' value="">--select mood--</option>
                            {options.map(option => (
                              <option className='text-[#2A2D2E]' key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>
                    

                      <div className='flex w-[20%] gap-1'>
                      <button disabled={loader?true:false} type="submit" className='bg-green-500 my-[6px] w-[175px] py-[8px] text-white text-xs hover:shadow-green-500/50 hover:shadow-md font-bold rounded-sm'>
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

export default PaySlipCreate;