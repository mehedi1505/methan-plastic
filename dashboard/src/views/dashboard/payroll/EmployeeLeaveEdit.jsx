import React, { useState,useEffect, forwardRef } from "react";
import { Link,useNavigate,useParams } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import { PropagateLoader } from 'react-spinners'
import {cssOverride} from '../../../utils/utils'
import toast from 'react-hot-toast'
import {messageClear,get_leave_edit_by_id,leave_update} from '../../../store/reducers/payrollReducer'
import { FaEdit, FaTrash } from "react-icons/fa";
import {FixedSizeList as List} from 'react-window'
import Search from '../../../components/Search'
import Select from 'react-select'
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment';
function handleOnWheel({deltaY}){
  console.log('handleOnWheel',deltaY)
  }
  const outerElementType = forwardRef((props,ref)=>(
    <div ref={ref} onWheel={handleOnWheel} {...props} />
  ))

const EmployeeLeaveEdit = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {empLeaveId} = useParams()
  const {successMessage,errorMessage,leaveEmployees,empLeaveEditInfo} = useSelector(state=>state.payroll)
  const {userInfo} = useSelector(state=>state.auth)

const [name,setName] = useState('')
const [leaveStartDate, setLeaveStartDate] = useState(Date.now());
const [leaveEndDate, setLeaveEndDate] = useState(Date.now());
const [leaveType,setLeaveType] = useState('')
const [leaveNote,setLeaveNote] = useState('')


const leaveUpdate = (e)=>{
  e.preventDefault()
  const obj = {
    empLeaveId,
    leaveStartDate,
    leaveEndDate,
    leaveType,
    leaveNote,
    userName:userInfo.name
  }
  dispatch(leave_update(obj))
}

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
  if(empLeaveId){
    dispatch(get_leave_edit_by_id(empLeaveId))
  }
},[empLeaveId])

useEffect(()=>{
  if(empLeaveEditInfo){
   setName(empLeaveEditInfo.emp_name)
   setLeaveStartDate(empLeaveEditInfo.leave_start)
   setLeaveEndDate(empLeaveEditInfo.leave_end)
   setLeaveType(empLeaveEditInfo.leave_type)
   setLeaveNote(empLeaveEditInfo.leave_note)
  }
},[empLeaveEditInfo])


// const employeeOptions = leaveEmployees && leaveEmployees.map((employee)=>({
//     "value" : employee.emp_id,
//     "label" : employee.emp_name
// }))
const leaveOptions = [
  { value: "casual", label: "Casual" },
  { value: "sick", label: "Sick" },
  { value: "others", label: "Others" },
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

  return (
    <div className="mx-auto py-1 md:px-[2px]">
      <div className="flex flex-wrap w-[99%]">
          <div className="w-full pl-2 mt-[-25px]">
            <div className="bg-[#283046] text-[#d0d2d6] height-screen md:height-auto px-3 p-3">
            <div className="flex justify-between items-center bg-[#283046] py-2 md:px-[2px] text-white">
                <div className="font-bold text-2xl">Leave Edit</div>
                <div onClick={()=>navigate('/admin/dashboard/employee-leave')} className="pr-2 text-white border-2 text-center border-green-700 rounded-full font-bold text-sm cursor-pointer bg-[#283046] px-3 py-1 mr-3">Leave List</div>
            </div>
            <hr className='w-[100%] border-2 border-slate-500 mx-auto'/>
            <div className='w-[55%]'>  
                      <h1 className='text-3xl font-semibold mb-5'>Employee Name: {name}</h1>
                </div>
              <form onSubmit={leaveUpdate}> 
              <div className='flex flex-col mb-1 md:flex-row gap-1 w-full text-[#d0d2d6] mt-2'>                
                <div className='flex flex-col w-[22%] gap-1'>
                <label htmlFor='start_date' className="text-xs text-white">Start Date:</label>   
                  <div className="bg-[#FFFFFF] text-black px-[8px] py-[1px] rounded-[3px]">
                    <DatePicker                        
                        selected={new Date(leaveStartDate)}
                        onChange={date=>setLeaveStartDate(date)}
                        dateFormat="dd/MM/yyyy"
                        filterDate={date=>date.getDay() !== 5}
                        showYearDropdown
                        scrollableMonthYearDropdown
                    />
                  </div>
                </div>  
                <div className='flex flex-col w-[22%] gap-1'>
                <label htmlFor='end_date' className="text-xs text-white">End Date:</label>   
                <div className="bg-[#FFFFFF] text-black px-[8px] py-[1px] rounded-[3px]">
                    <DatePicker  
                        selected={new Date(leaveEndDate)}
                        onChange={date=>setLeaveEndDate(date)}
                        dateFormat="dd/MM/yyyy"
                        filterDate={date=>date.getDay() !== 5}
                        showYearDropdown
                        scrollableMonthYearDropdown
                    />
                  </div>
                </div> 
                <div className='flex flex-col w-[50%] gap-1'>
                        <label htmlFor='leave_type' className="text-xs">Leave Type:</label>
                          <select className="text-black py-[2px] bg-[#FFFFFF] rounded-sm outline-none" value={leaveType} onChange={(e)=>setLeaveType(e.target.value)} name="leave_type" id="leave_type">
                          <option value="">--select option--</option>
                            {leaveOptions.map(option => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>
              </div>
              <div className='flex flex-col mb-1 md:flex-row gap-1 w-full text-[#d0d2d6] mt-2'>
              <div className='flex flex-col w-[95%] gap-1'>
                            <label htmlFor='leave_note' className="text-xs">Leave note (optional):</label>
                            <input className='bg-[#FFFFFF] px-4 py-[6px] border border-slate-700 rounded-[3px] outline-none focus:border-indigo-500 text-[#2A2D2E] text-xs' onChange={(e)=>setLeaveNote(e.target.value)} value={leaveNote} type='text' id='leave_note' name='leave_note'/>
                    </div>

              </div>
              <div className='flex flex-col w-[25%] mt-5 gap-1'>
                        <button type="submit" className='bg-blue-500 px-2 py-[3px] mb-2 rounded-[4px] text-white hover:shadow-blue-500/50 hover:shadow-md font-bold'> Leave Update </button>
                        </div>
                    <div>
                </div>      
              </form>
            </div>

          </div>       
      </div>
    </div>
  );
};

export default EmployeeLeaveEdit;