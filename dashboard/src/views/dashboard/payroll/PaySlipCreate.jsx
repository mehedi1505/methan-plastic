import React, { useState,useEffect, forwardRef } from "react";
import { Link,useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import { PropagateLoader } from 'react-spinners'
import {cssOverride} from '../../../utils/utils'
import toast from 'react-hot-toast'
import {messageClear,get_pay_employees,pay_slip_create,get_emp_info_by_id,get_all_pay_slip,pay_slip_delete} from '../../../store/reducers/payrollReducer'
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
  const {loader,successMessage,errorMessage,errorValidation,payEmployees,empInfo,paySlips} = useSelector(state=>state.payroll)
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

  const paySlipAdd= (e)=>{
      e.preventDefault()
        dispatch(pay_slip_create({
          empId,
          name,
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
          userName:userInfo.name
      }))
  }

  useEffect(()=>{
    dispatch(get_pay_employees())
  },[])

  useEffect(()=>{
    dispatch(get_all_pay_slip({searchValue}))
},[searchValue,successMessage,errorMessage])

useEffect(()=>{
  dispatch(get_emp_info_by_id(empId))
},[empId,empInfo])

useEffect(()=>{
  if(successMessage){
    toast.success(successMessage)
    dispatch(messageClear())
    setEmpId('')
    setJoiningDate('')
    dispatch(get_all_pay_slip({searchValue}))
  }
  if(errorMessage){
    toast.error(errorMessage)
    dispatch(messageClear())
  }
},[successMessage,errorMessage])

useEffect(()=>{
    setName(empInfo?.emp_name)
    setDepartment(empInfo?.department)
    setDesignation(empInfo?.designation)
    setBasicSalary(empInfo?.basic_salary)
    setGrossSalary(empInfo?.gross_salary)
    setHouseRent(empInfo?.house_rent)
    setJoiningDate(empInfo?.joining_date)
    setDa(empInfo?.dearness_allowance)
    setMa(empInfo?.medical_allowance)
    setPf(empInfo?.provident_fund)
    setTax(empInfo?.tax)
},[empId,empInfo])

  function AllRows({ index, style }) {
    return <div style={style} className='flex text-xs mt-2'>
      <div className='w-[5%] p-1 whitespace-nowrap'>{index + 1}</div>
      <div className='w-[10%] p-1 whitespace-nowrap'>{`${paySlips[index].emp_id}`}</div>
      <div className='w-[20%] p-1 whitespace-nowrap'>{`${paySlips[index].emp_name}`}</div>
      <div className='w-[15%] p-1 whitespace-nowrap'>{`${paySlips[index].department}`}</div>
      <div className='w-[15%] p-1 whitespace-nowrap'>{`${paySlips[index].designation}`}</div>
      <div className='w-[15%] p-1 whitespace-nowrap'>{moment(`${paySlips[index]?.pay_date}`).format('LL')}</div>
      <div className='w-[10%] p-1 whitespace-nowrap'>{`${paySlips[index]?.pay_period}`}</div>
      <div className="w-[10%] flex justify-center items-center gap-1">
        <Link to={`/admin/dashboard/pay-slip-edit/${paySlips[index]._id}`} className="p-[5px] rounded bg-yellow-500 hover:shadow-lg shadow-yellow-500/50">
          <FaEdit />
        </Link>
          <Link to={`/admin/dashboard/pay-slip-view/${paySlips[index]?._id}`} className="p-[5px] rounded bg-cyan-500 hover:shadow-lg shadow-cyan-500/50">
          <BsFillEyeFill />
        </Link>
        <button onClick = {()=>dispatch(pay_slip_delete(`${paySlips[index]._id}`))} className="p-[5px] rounded bg-red-600 hover:shadow-lg shadow-red-600/50">
          <FaTrash />
        </button>
      </div>
    </div>;
  } 

const employeeOptions = payEmployees && payEmployees.map((employee)=>({
    "value" : employee.emp_id,
    "label" : employee.emp_name
}))
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
                <div className="pl-1 font-bold text-2xl">Pay Slip Create</div>
                {/* <div onClick={()=>navigate('/admin/dashboard/vendor/list')} className="pr-2 font-bold text-sm cursor-pointer bg-[#3ab0d8] px-3 py-1 mr-3">Vendor List</div> */}
            </div>
              <hr/>
              <form onSubmit={paySlipAdd}>
                    <div className='flex flex-col md:flex-row gap-1 w-full text-[#d0d2d6] mt-1'>
                    <div className='flex flex-col w-[20%] gap-1'>  
                        <label htmlFor='emp_id' className="text-xs text-white">Employee:</label>                              
                            <div style={{width:180,color:'black'}}>                 
                                <Select
                                options={employeeOptions}
                                placeholder="Choose Employee"
                                onChange={(e)=>setEmpId(e.value)}
                                isSearchable
                                noOptionsMessage={()=>"no Employee found.."}
                                styles={customStyles}
                                required
                                />
                            </div>
                    </div>
                        <div className='flex flex-col w-[19%] gap-1'>
                            <label htmlFor='name' className="text-xs">Name:</label>
                            <input className='bg-[#FFFFFF] px-2 py-1 border border-slate-700 rounded-sm outline-none focus:border-indigo-500 text-[#2A2D2E] text-xs' onChange={(e)=>setName(e.target.value)} value={name} type='text' placeholder='emp name' id='name' name='name'/>
                            <span className="text-red-500 text-xs">{errorValidation?.name}</span>
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
                            <input className='bg-[#FFFFFF] px-2 py-1 border border-slate-700 rounded-sm outline-none focus:border-indigo-500 text-[#2A2D2E] text-xs' onChange={(e)=>setHouseRent(e.target.value)} value={houseRent} type='number' min="0" step="any" placeholder='enter HRA' id='house_rent' name='house_rent'/>
                            <span className="text-red-500 text-xs">{errorValidation?.house_rent}</span>
                        </div> 
                   
               
                        <div className='flex flex-col w-[20%] gap-1'>
                            <label htmlFor='tax' className="text-xs">Tax:</label>
                            <input className='bg-[#FFFFFF] px-2 py-1 border border-slate-700 rounded-sm outline-none focus:border-indigo-500 text-[#2A2D2E] text-xs' onChange={(e)=>setTax(e.target.value)} value={tax} type='number' min="0" step="any" placeholder='enter tax' id='tax' name='tax'/>
                            <span className="text-red-500 text-xs">{errorValidation?.tax}</span>
                        </div> 
                        <div className='flex flex-col w-[20%] gap-1'>
                            <label htmlFor='loan' className="text-xs">Loan:</label>
                            <input className='bg-[#FFFFFF] px-2 py-1 border border-slate-700 rounded-sm outline-none focus:border-indigo-500 text-[#2A2D2E] text-xs' onChange={(e)=>setLoan(e.target.value)} value={loan} type='number' min="0" step="any" placeholder='enter loan' id='loan' name='loan'/>
                            <span className="text-red-500 text-xs">{errorValidation?.tax}</span>
                        </div>
                        <div className='flex flex-col w-[20%] gap-1'>
                            <label htmlFor='penalty' className="text-xs">Penalty:</label>
                            <input className='bg-[#FFFFFF] px-2 py-1 border border-slate-700 rounded-sm outline-none focus:border-indigo-500 text-[#2A2D2E] text-xs' onChange={(e)=>setPenalty(e.target.value)} value={penalty} type='number' min="0" step="any" placeholder='enter penalty' id='penalty' name='penalty'/>
                            <span className="text-red-500 text-xs">{errorValidation?.tax}</span>
                        </div>
                        <div className='flex flex-col w-[21%] gap-1'>
                          <label htmlFor='pay_date' className="text-xs text-green-500 font-bold">Pay Date:</label>   
                            <div className="bg-[#FFFFFF] text-black text-xs px-[2px] py-[4px] rounded-[3px]">
                              <DatePicker                        
                                  selected={payDate}
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
                      <button disabled={loader?true:false} type="submit" className='bg-green-500 mt-[20px] my-[6px] w-[175px] py-[4px] text-white text-xs hover:shadow-green-500/50 hover:shadow-md font-bold rounded-sm'>
                          {
                              loader? <PropagateLoader color='#fff' cssOverride={cssOverride}/>: 'Add'
                          }
                          
                      </button>
                      </div>
                    </div>

       
              </form>
            </div>
          
            <div className="w-full p-2 bg-[#283046] rounded-sm mt-2">
            <div className='w-full flex justify-between items-center bg-[#283046] p-2'>
              <div className='text-white font-bold'>
                  Pay Slip List :
              </div>
              {/* <div className="flex justify-between items-center bg-[#4dc4ec]">
                  <button onClick={()=>navigate('/admin/dashboard/vendor/add')} className="px-3 py-1">Vendor Add</button>
              </div> */}

              <Search searchValue={searchValue} setSearchValue={setSearchValue}/>
            </div> 
              <div className='w-full overflow-x-auto'>
                    <div className='flex bg-[#007DC3] font-bold text-xs min-w-[340px] text-white'>
                        <div className='w-[5%] p-1'>No</div>
                        <div className='w-[10%] p-1'>Id</div>
                        <div className='w-[20%] p-1'>Name</div>
                        <div className='w-[15%] p-1'>Department</div>
                        <div className='w-[15%] p-1'>Designation</div>
                        <div className='w-[15%] p-1'>Pay date</div>
                        <div className='w-[10%] p-1'>Salary period</div>
                        <div className='w-[10%] p-1'>Action</div>
                    </div>
                    {
                        <List 
                        style={{minWidth: '340px',overflowX:'hidden',color: 'white'}}
                        className='List'
                        height={260}
                        itemCount={paySlips.length}
                        itemSize={28}
                        outerElementType={outerElementType}
                        >
                            {AllRows}
                        </List>
                    }
                </div>

            </div>
          </div>     
      </div>
    </div>
  );
};

export default PaySlipCreate;