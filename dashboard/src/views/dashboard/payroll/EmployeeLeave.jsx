import React, { useState,useEffect, forwardRef } from "react";
import { Link,useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import { PropagateLoader } from 'react-spinners'
import {cssOverride} from '../../../utils/utils'
import toast from 'react-hot-toast'
import {messageClear,leave_create,get_leave_employees,get_employee_name_by_id,get_all_leave,leave_delete} from '../../../store/reducers/payrollReducer'
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

const EmployeeLeave = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {loader,successMessage,errorMessage,leaveEmployees,errorValidation,empLeaves,empName,leaves} = useSelector(state=>state.payroll)
  const {userInfo} = useSelector(state=>state.auth)
  const [searchValue, setSearchValue] = useState("");

const [empId,setEmpId] = useState('')
const [name,setName] = useState('')
const [leaveStartDate, setLeaveStartDate] = useState(Date.now());
const [leaveEndDate, setLeaveEndDate] = useState(Date.now());
const [leaveType,setLeaveType] = useState('')
const [leaveNote,setLeaveNote] = useState('')

useEffect(()=>{
  setName(empName?.emp_name)
},[empName,empId])

const leaveCreate = (e)=>{
  e.preventDefault()
  dispatch(leave_create({
    empId,
    name,
    leaveStartDate,
    leaveEndDate,
    leaveType,
    leaveNote,
    userName:userInfo.name
  }))
}

useEffect(()=>{
  if(successMessage){
    toast.success(successMessage)
    dispatch(get_all_leave({searchValue}))
    dispatch(messageClear())
    setEmpId('')
    setLeaveType('')
    setLeaveNote('')
  }
  if(errorMessage){
    toast.error(errorMessage)
    dispatch(messageClear())
  }
},[successMessage,errorMessage])

useEffect(()=>{
  dispatch(get_leave_employees())
},[])
useEffect(()=>{
  dispatch(get_all_leave({searchValue}))
},[searchValue,successMessage,errorMessage])

useEffect(()=>{
  if(empId){
    dispatch(get_employee_name_by_id(empId))
  }
},[empName,empId])


const employeeOptions = leaveEmployees && leaveEmployees.map((employee)=>({
    "value" : employee.emp_id,
    "label" : employee.emp_name
}))
const leaveOptions = [
  { value: "casual", label: "Casual" },
  { value: "sick", label: "Sick" },
  { value: "others", label: "Others" },
];
const customStyles = {
  control: base => ({
    ...base,
    height: 28,
    minHeight: 28,
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
function AllRows({ index, style }) {
  return <div style={style} className='flex text-xs mt-2'>
    <div className='w-[10%] p-1 whitespace-nowrap'>{index + 1}</div>
    <div className='w-[15%] p-1 whitespace-nowrap'>{`${leaves[index].emp_id}`}</div>
    <div className='w-[25%] p-1 whitespace-nowrap'>{`${leaves[index].emp_name}`}</div>
    <div className='w-[15%] p-1 whitespace-nowrap'> {moment(`${leaves[index]?.leave_start}`).format('LL')}</div>
    <div className='w-[15%] p-1 whitespace-nowrap'> {moment(`${leaves[index]?.leave_end}`).format('LL')}</div>
    <div className='w-[10%] p-1 whitespace-nowrap'>{`${leaves[index].leave_type}`}</div>
    <div className="w-[10%] flex justify-center items-center gap-1">
      <Link to={`/admin/dashboard/leave-edit/${leaves[index]._id}`} className="p-[5px] rounded bg-yellow-500 hover:shadow-lg shadow-yellow-500/50">
        <FaEdit />
      </Link>
      <button onClick = {()=>dispatch(leave_delete(`${leaves[index]._id}`))} className="p-[5px] rounded bg-red-600 hover:shadow-lg shadow-red-600/50">
        <FaTrash />
      </button>
    </div>
  </div>;

} 
  return (
    <div className="mx-auto py-1 md:px-[2px]">
      <div className="flex flex-wrap w-[99%]">
          <div className="w-full pl-2 mt-[-25px]">
            <div className="bg-[#283046] text-[#d0d2d6] height-screen md:height-auto px-3 p-3">
            <div className="flex justify-between items-center bg-[#283046] py-2 md:px-[2px] text-white">
                <div className="pl-2 font-bold text-2xl">Leave Create</div>
                {/* <div onClick={()=>navigate('/admin/dashboard/leave-list')} className="pr-2 text-white border-2 text-center border-green-700 rounded-full font-bold text-sm cursor-pointer bg-[#283046] px-3 py-1 mr-3">Invoice List</div> */}
            </div>
            <hr className='w-[100%] border-2 border-slate-500 mx-auto'/>
              <form onSubmit={leaveCreate}> 
              <div className='flex flex-col mb-1 md:flex-row gap-1 w-full text-[#d0d2d6] mt-2'>                
                <div className='flex flex-col w-[25%] gap-1'>  
                <label htmlFor='emp_id' className="text-xs text-white">Employee:</label>                              
                    <div style={{width:220,color:'black'}}>                 
                          <Select
                          options={employeeOptions}
                          defaultValue={empId}
                          placeholder="Choose Employee"
                          onChange={(e)=>setEmpId(e.value)}
                          isSearchable
                          noOptionsMessage={()=>"no Employee found.."}
                          styles={customStyles}
                          required
                          />
                    </div>
                </div>

                <div className='flex flex-col w-[25%] gap-1'>
                <label htmlFor='start_date' className="text-xs text-white">Start Date:</label>   
                  <div className="bg-[#FFFFFF] text-black text-xs px-[8px] py-[6px] rounded-[3px]">
                    <DatePicker                        
                        selected={leaveStartDate}
                        onChange={date=>setLeaveStartDate(date)}
                        dateFormat="dd/MM/yyyy"
                        filterDate={date=>date.getDay() !== 5}
                        showYearDropdown
                        scrollableMonthYearDropdown
                    />
                  </div>
                </div>  
                <div className='flex flex-col w-[25%] gap-1'>
                <label htmlFor='end_date' className="text-xs text-white">End Date:</label>   
                <div className="bg-[#FFFFFF] text-black text-xs px-[8px] py-[6px] rounded-[3px]">
                    <DatePicker                        
                        selected={leaveEndDate}
                        onChange={date=>setLeaveEndDate(date)}
                        dateFormat="dd/MM/yyyy"
                        filterDate={date=>date.getDay() !== 5}
                        showYearDropdown
                        scrollableMonthYearDropdown
                    />
                  </div>
                </div> 
                <div className='flex flex-col w-[25%] gap-1'>
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
              <div className='flex flex-col w-[75%] gap-1'>
                            <label htmlFor='leave_note' className="text-xs">Leave note (optional):</label>
                            <input className='bg-[#FFFFFF] px-4 py-[6px] border border-slate-700 rounded-[3px] outline-none focus:border-indigo-500 text-[#2A2D2E] text-xs' onChange={(e)=>setLeaveNote(e.target.value)} value={leaveNote} type='text' id='leave_note' name='leave_note'/>
                    </div>
                    <div className='flex flex-col w-[25%] mt-5 gap-1'>
                        <button type="submit" className='bg-blue-500 px-2 py-[3px] mb-2 rounded-[4px] text-white hover:shadow-blue-500/50 hover:shadow-md font-bold'> Leave Add </button>
                        </div>
              </div>

                    <div>
                </div>      
              </form>
            </div>
            <div className="w-full p-2 bg-[#283046] rounded-sm mt-2">
            <div className='w-full flex justify-between items-center bg-[#283046] p-2'>
              <div className='text-white font-bold'>
                  Leave List:
              </div>
              {/* <div className="flex justify-between items-center bg-[#4dc4ec]">
                  <button onClick={()=>navigate('/admin/dashboard/vendor/add')} className="px-3 py-1">Vendor Add</button>
              </div> */}

              <Search searchValue={searchValue} setSearchValue={setSearchValue}/>
            </div> 
              <div className='w-full overflow-x-auto'>
                    <div className='flex bg-[#007DC3] uppercase font-bold min-w-[340px] text-white'>
                        <div className='w-[10%] p-2 text-xs'>No</div>
                        <div className='w-[15%] p-2 text-xs'>Employee Id</div>
                        <div className='w-[25%] p-2 text-xs'>Name</div>
                        <div className='w-[15%] p-2 text-xs'>Leave Start</div>
                        <div className='w-[15%] p-2 text-xs'>Leave End</div>
                        <div className='w-[10%] p-2 text-xs'>Type</div>
                        <div className='w-[10%] p-2 text-xs'>Action</div>
                    </div>
                    {
                        <List 
                        style={{minWidth: '340px',overflowX:'hidden',color: 'white'}}
                        className='List'
                        height={310}
                        itemCount={leaves.length}
                        itemSize={32}
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

export default EmployeeLeave;