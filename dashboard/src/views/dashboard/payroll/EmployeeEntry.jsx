import React, { useState,useEffect, forwardRef } from "react";
import { Link,useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import { PropagateLoader } from 'react-spinners'
import {cssOverride} from '../../../utils/utils'
import toast from 'react-hot-toast'
import {messageClear,employee_add,get_all_employee} from '../../../store/reducers/payrollReducer'
import { FaEdit, FaTrash } from "react-icons/fa";
import {FixedSizeList as List} from 'react-window'
import Search from '../../../components/Search'
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment';

function handleOnWheel({deltaY}){
  console.log('handleOnWheel',deltaY)
  }
  const outerElementType = forwardRef((props,ref)=>(
    <div ref={ref} onWheel={handleOnWheel} {...props} />
  ))
const EmployeeEntry = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {loader,successMessage,errorMessage,errorValidation,employees,totalEmployee} = useSelector(state=>state.payroll)
  const {userInfo} = useSelector(state=>state.auth)
  const [searchValue, setSearchValue] = useState("");

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
    image:'' 
  })
  const [joiningDate, setJoiningDate] = useState(Date.now());

const inputHandle = (e)=>{
    setState({
        ...state,
        [e.target.name] : e.target.value
    })
}

const [showImage, setShowImage] = useState('')

const handleImage = (e)=>{
    if(e.target.files.length !== 0){
      setState({
        ...state,
        image: e.target.files[0]
      })
      const rander = new FileReader()
      rander.onload = ()=>{
        setShowImage(rander.result)
      }

      rander.readAsDataURL(e.target.files[0])
    }
}

  const employeeAdd= (e)=>{
      e.preventDefault()
      const formData = new FormData()
      formData.append('emp_id',state.emp_id)
      formData.append('emp_name',state.emp_name)
      formData.append('emp_email',state.emp_email)
      formData.append('contact_number',state.contact_number)
      formData.append('education',state.education)
      formData.append('marital_status',state.marital_status)
      formData.append('gender',state.gender)
      formData.append('religion',state.religion)
      formData.append('blood_group',state.blood_group)
      formData.append('department',state.department)
      formData.append('designation',state.designation)
      formData.append('joining_date',joiningDate)
      formData.append('basic_salary',state.basic_salary)
      formData.append('gross_salary',state.gross_salary)
      formData.append('da',state.da)
      formData.append('house_rent',state.house_rent)
      formData.append('ma',state.ma)
      formData.append('pf',state.pf)
      formData.append('tax',state.tax)
      formData.append('experience',state.experience)
      formData.append('image',state.image)
      formData.append('userName',userInfo.name      
      )
      dispatch(employee_add(formData))
  }
  useEffect(()=>{
    dispatch(get_all_employee({searchValue}))
},[searchValue,successMessage,errorMessage])
  useEffect(()=>{
    if(successMessage){
      toast.success(successMessage)
      dispatch(messageClear())
      setState({
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
        experience:'',
        da:'',
        house_rent:'',
        ma:'',
        pf:'',
        tax:''
      })
      setShowImage('')
    }
    if(errorMessage){
      toast.error(errorMessage)
      dispatch(messageClear())
    }
  },[successMessage,errorMessage])
  function AllRows({ index, style }) {
    return <div style={style} className='flex text-xs mt-2'>
      <div className='w-[10%] p-1 whitespace-nowrap'>{index + 1}</div>
      <div className='w-[10%] p-1 whitespace-nowrap'>{`${employees[index].emp_id}`}</div>
      <div className='w-[15%] p-1 whitespace-nowrap'>{`${employees[index].emp_name}`}</div>
      <div className='w-[15%] p-1 whitespace-nowrap'>{`${employees[index].department}`}</div>
      <div className='w-[15%] p-1 whitespace-nowrap'>{`${employees[index].designation}`}</div>
      <div className='w-[15%] p-1 whitespace-nowrap'>{moment(`${employees[index]?.joining_date}`).format('LL')}</div>
      <div className='w-[10%] p-1 whitespace-nowrap'><span className='bg-[#258a74] border border-green-500 rounded-full py-[1px] px-2'>{`${employees[index].status}`}</span></div>
      <div className="w-[10%] flex justify-center items-center gap-1">
        <Link to={`/admin/dashboard/employee-edit/${employees[index]._id}`} className="p-[5px] rounded bg-yellow-500 hover:shadow-lg shadow-yellow-500/50">
          <FaEdit />
        </Link>
        {/* <button onClick = {()=>dispatch(vendor_delete(`${employees[index]._id}`))} className="p-[5px] rounded bg-red-600 hover:shadow-lg shadow-red-600/50">
          <FaTrash />
        </button> */}
      </div>
    </div>;

  } 
  
  return (
    <div className="mx-auto md:px-[2px] w-[98%] mt-[-20px]">
      <div className="flex flex-wrap">
          <div className="w-full">
            <div className="bg-[#283046] text-[#d0d2d6] height-screen lg:height-auto px-3 py-1">
            <div className="flex justify-between items-center bg-[#283046] py-1 md:px-[2px] text-white">
                <div className="pl-1 font-bold text-2xl">Employee Information Add</div>
                {/* <div onClick={()=>navigate('/admin/dashboard/vendor/list')} className="pr-2 font-bold text-sm cursor-pointer bg-[#3ab0d8] px-3 py-1 mr-3">Vendor List</div> */}
            </div>
              <hr/>
              <form onSubmit={employeeAdd}>
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
                                  selected={joiningDate}
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
                            <input className='bg-[#FFFFFF] px-2 py-1 border border-slate-700 rounded-sm outline-none focus:border-indigo-500 text-[#2A2D2E] text-xs' onChange={inputHandle} value={state.hra} type='number' min="0" step="any" placeholder='enter HRA' id='house_rent' name='house_rent'/>
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
                    <div className='flex flex-col md:flex-row gap-1 w-full text-[#d0d2d6]'>
                        <div className='flex flex-col w-[50%] gap-1'>
                            <label htmlFor='emp-image' className="text-sm">Profile Image:</label>
                            <input hidden onChange={handleImage} className='bg-[#FFFFFF] px-2 py-1 border border-slate-700 rounded-sm outline-none focus:border-indigo-500 text-[#2A2D2E] text-xs' value={state.nid_no} type='file' id='emp-image' name='image'/>
                            <div className="flex items-center gap-1">
                                <div className="w-[45px] h-[45px] rounded-full overflow-hidden bg-[#FFFFFF]">
                                  {
                                    showImage && <img src={`${showImage}`} alt="profile Image"/>
                                  }
                                </div>
                                <div className="flex justify-between bg-[#FFFFFF] items-center">
                                  <div className="w-[250px] text-black pl-1 text-xs">
                                        {state.image && state.image.name}
                                  </div>
                                  <label className="py-[4px] w-[150px] bg-[#6f8be6] text-center font-semibold" htmlFor="emp-image">Image Browser</label>
                                </div>
                                {/* <span className="text-red-500 text-xs">{errorValidation?.image}</span> */}
                            </div>
                        </div>

                      <div className='flex w-[15%] gap-1'>
                      <button disabled={loader?true:false} type="submit" className='bg-green-500 my-[31px] w-[150px] py-[8px] text-white text-xs hover:shadow-green-500/50 hover:shadow-md font-bold rounded-sm'>
                          {
                              loader? <PropagateLoader color='#fff' cssOverride={cssOverride}/>: 'Add'
                          }
                          
                      </button>
                      </div>
                    </div>

       
              </form>
            </div>
          
            <div className="w-full p-2 bg-[#283046] rounded-sm mt-1">
            <div className='w-full flex justify-between items-center bg-[#283046] p-2'>
              <div className='text-white font-bold'>
                  Total Employee : {totalEmployee}
              </div>
              {/* <div className="flex justify-between items-center bg-[#4dc4ec]">
                  <button onClick={()=>navigate('/admin/dashboard/vendor/add')} className="px-3 py-1">Vendor Add</button>
              </div> */}

              <Search searchValue={searchValue} setSearchValue={setSearchValue}/>
            </div> 
              <div className='w-full overflow-x-auto'>
                    <div className='flex bg-[#007DC3] uppercase font-bold text-xs min-w-[340px] text-white'>
                        <div className='w-[10%] p-1'>No</div>
                        <div className='w-[10%] p-1'>Id</div>
                        <div className='w-[15%] p-1'>Name</div>
                        <div className='w-[15%] p-1'>Department</div>
                        <div className='w-[15%] p-1'>Designation</div>
                        <div className='w-[15%] p-1'>Joining Date</div>
                        <div className='w-[10%] p-1'>Status</div>
                        <div className='w-[10%] p-1'>Action</div>
                    </div>
                    {
                        <List 
                        style={{minWidth: '340px',overflowX:'hidden',color: 'white'}}
                        className='List'
                        height={150}
                        itemCount={employees.length}
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

export default EmployeeEntry;