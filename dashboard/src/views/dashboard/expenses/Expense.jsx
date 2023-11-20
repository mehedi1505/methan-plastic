import React, { useState,useEffect, forwardRef } from "react";
import { Link} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import { PropagateLoader } from 'react-spinners'
import {cssOverride} from '../../../utils/utils'
import { FaEdit, FaTrash } from "react-icons/fa";
import toast from 'react-hot-toast'
// import { GrClose } from "react-icons/gr";
// import { BsImage } from "react-icons/bs";
import {messageClear,get_customer,get_expense_category,get_payment_mode,expense_add,get_expense,expense_delete} from '../../../store/reducers/expenseReducer'
import Search from '../../../components/Search'
import {FixedSizeList as List} from 'react-window'
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
const Expense = () => {
  const dispatch = useDispatch()
  const {loader,successMessage,errorMessage,expenses,customers,expenseCategories,paymentModes,totalExpenses} = useSelector(state=>state.expense)
  const {userInfo} = useSelector(state=>state.auth)
  const [searchValue, setSearchValue] = useState("");

  const [state,setState] = useState({
    expense_name:'',
    expense_amount:''
  })

const [selectedDate, setSelectedDate] = useState(Date.now());
const [expCatId,setExpCatId] = useState('')
const [payModeId,setPayModeId] = useState('')
const [custId,setCustId] = useState('')

const inputHandle = (e)=>{
    setState({
        ...state,
        [e.target.name] : e.target.value
    })
}

const Add= (e)=>{
    e.preventDefault()
    dispatch(expense_add({
      state:state,
      selectedDate,
      expCatId,
      payModeId,
      custId,
      userName:userInfo.name
    }))
}
useEffect(()=>{
  dispatch(get_payment_mode())
  dispatch(get_customer())
  dispatch(get_expense_category({searchValue}))
},[searchValue])

  useEffect(()=>{
    dispatch(get_expense({searchValue}))
},[searchValue,successMessage,errorMessage])

  useEffect(()=>{
    if(successMessage){
      toast.success(successMessage)
      dispatch(messageClear())
      setState({
        expense_name:'',
        expenses_amount:''
      })
    }
    if(errorMessage){
      toast.error(errorMessage)
      dispatch(messageClear())
    }
  },[successMessage,errorMessage])
  const expCatOptions = expenseCategories && expenseCategories.map((cat)=>({
    "value" : cat._id,
    "label" : cat.expense_cat_name
    }))
    const customerOptions = customers && customers.map((customer)=>({
      "value" : customer._id,
      "label" : customer.cus_company
    }))
    const payModeOptions = paymentModes && paymentModes.map((pay)=>({
    "value" : pay._id,
    "label" : pay.pay_mode
    }))
  function AllRows({ index, style }) {
    return <div style={style} className='flex text-xs mt-2'>
      <div className='w-[5%] p-1 whitespace-nowrap'>{index + 1}</div>
      <div className='w-[20%] p-1 whitespace-nowrap'>{`${expenses[index]?.expense_name}`}</div>
      <div className='w-[20%] p-1 whitespace-nowrap'>{moment(`${expenses[index]?.expense_date}`).format('LLL')}</div>
      <div className='w-[10%] p-1 whitespace-nowrap'>{`${expenses[index]?.expense_amount}`}</div>
      <div className='w-[15%] p-1 whitespace-nowrap'>{`${expenses[index]?.category[0]?.expense_cat_name}`}</div>
      <div className='w-[15%] p-1 whitespace-nowrap'>{`${expenses[index]?.customer[0]?.cus_company}`}</div>
      <div className='w-[15%] p-1 whitespace-nowrap'>{`${expenses[index]?.paymode[0]?.pay_mode}`}</div>
      <div className="w-[10%] flex justify-center items-center gap-1">
        <Link to={`/admin/dashboard/edit-expense/${expenses[index]?._id}`} className="p-[5px] rounded bg-yellow-500 hover:shadow-lg shadow-yellow-500/50">
          <FaEdit />
        </Link>
        <button onClick = {()=>dispatch(expense_delete(`${expenses[index]._id}`))} className="p-[5px] rounded bg-red-600 hover:shadow-lg shadow-red-600/50">
          <FaTrash />
        </button>
      </div>
    </div>

  } 
  const customStyles = {
    control: base => ({
      ...base,
      height: 32,
      minHeight: 32,
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
    <div className="mx-auto md:px-[2px] mt-[-20px]">
      <div className="flex flex-wrap w-[98%] mx-auto">
          <div className="w-full">
            <div className="bg-[#283046] text-[#d0d2d6] height-screen lg:height-auto px-2 py-1">
            <div className="flex justify-between items-center bg-[#283046] py-1 md:px-[10px] text-white">
                <div className="pl-2 font-bold text-3xl">Expense Create</div>
            </div>
              <hr className="border-2 border-slate-500 w-[98%] mx-auto mb-5"/>
              <form onSubmit={Add}>
                    <div className='flex flex-col mb-1 md:flex-row gap-2 w-full px-3 text-[#d0d2d6] mt-1'>
                        <div className='flex flex-col w-[25%] gap-1 text-xs'>
                        <label htmlFor="expense_name">Expense Name</label>
                            <input value={state.expense_name}  onChange={inputHandle} className="bg-[#FFFFFF] border border-slate-700 shadow-md px-4 py-2 focus:border-indigo-500 outline-none text-black rounded-md"
                              type="text"
                              id="expense_name"
                              name="expense_name"
                              placeholder="Enter Agent name" required
                            />
                        </div>
                        <div className='flex flex-col w-[25%] gap-1'>
                          <label htmlFor='rec_date' className="text-xs text-white">Expense Date:</label>   
                            <div className="bg-[#FFFFFF] text-black text-xs px-[8px] py-[8px] rounded-[3px]">
                              <DatePicker                        
                                  selected={selectedDate}
                                  onChange={date=>setSelectedDate(date)}
                                  dateFormat="dd/MM/yyyy"
                                  filterDate={date=>date.getDay() !== 5}
                                  showYearDropdown
                                  scrollableMonthYearDropdown
                              />
                            </div>
                          </div> 
                          <div className='flex flex-col w-[25%] gap-1'>  
                              <label htmlFor='expense_category_id' className="text-xs text-white">Expense Category:</label>                              
                                  <div style={{width:215,color:'black'}}>                 
                                        <Select
                                        options={expCatOptions}
                                        defaultValue={expCatId}
                                        placeholder="Choose Category"
                                        onChange={(e)=>setExpCatId(e.value)}
                                        isSearchable
                                        noOptionsMessage={()=>"no type found.."}
                                        styles={customStyles}
                                        required
                                        />
                                  </div>
                            </div>
                            <div className='flex flex-col w-[25%] gap-1'>  
                              <label htmlFor='pay_mode_id' className="text-xs text-white">Payment Mode:</label>                              
                                  <div style={{width:215,color:'black'}}>                 
                                        <Select
                                        options={payModeOptions}
                                        defaultValue={payModeId}
                                        placeholder="Choose pay mode"
                                        onChange={(e)=>setPayModeId(e.value)}
                                        isSearchable
                                        noOptionsMessage={()=>"not found.."}
                                        styles={customStyles}
                                        required
                                        />
                                  </div>
                            </div>

                       

                    </div>
                 
                    <div className='flex flex-col my-5 md:flex-row px-3 text-[#d0d2d6] gap-2'>
                                          
                    <div className='flex flex-col w-[24%] gap-1 text-xs'>
                        <label htmlFor="expense_amount">Expense Amount</label>
                              <input value={state.expense_amount} onChange={inputHandle} className="bg-[#FFFFFF] border border-slate-700 px-4 py-2 focus:border-indigo-500 outline-none text-black rounded-md"
                                type="number"
                                id="expense_amount"
                                name="expense_amount"
                                min="0" step="any"
                                placeholder="Enter Amount" required
                              />
                        </div>
                    <div className='flex flex-col w-[24%] gap-1'>  
                              <label htmlFor='cust_id' className="text-xs text-white">Expense Customer:</label>                              
                                  <div style={{width:210,color:'black'}}>                 
                                        <Select
                                        options={customerOptions}
                                        defaultValue={custId}
                                        placeholder="Choose customer"
                                        onChange={(e)=>setCustId(e.value)}
                                        isSearchable
                                        noOptionsMessage={()=>"no type found.."}
                                        styles={customStyles}
                                        required
                                        />
                                  </div>
                            </div>
                    <div className='flex w-[10%]'>
                    <button disabled={loader?true:false} type="submit" className='bg-green-500 mt-[19px] w-[80px] py-[2px] text-white text-xs hover:shadow-green-500/50 hover:shadow-md font-bold rounded-md'>
                        {
                            loader? <PropagateLoader color='#fff' cssOverride={cssOverride}/>: 'Add'
                        }
                        
                    </button>
                    </div>
                    </div>

       
                <div className='mt-4'>
                </div>
              </form>
              <div className="w-full p-2 bg-[#283046] rounded-md">
            <div className='w-full flex justify-between items-center bg-[#283046] py-2'>
              <div className='text-white font-bold'>
                  Total Expense : {totalExpenses}
              </div>
              <Search searchValue={searchValue} setSearchValue={setSearchValue}/>
            </div> 
              <div className='w-full border border-slate-700 overflow-x-auto'>
                    <div className='flex bg-[#007DC3] uppercase font-bold text-xs min-w-[340px]  text-white'>
                        <div className='w-[5%] p-2'>No</div>
                        <div className='w-[20%] p-2'>Name</div>
                        <div className='w-[20%] p-2'>Date</div>
                        <div className='w-[10%] p-2'>Amount</div>
                        <div className='w-[15%] p-2'>Category</div>
                        <div className='w-[15%] p-2'>customer</div>
                        <div className='w-[15%] p-2'>Pay mode</div>
                        <div className='w-[10%] p-2'>Action</div>
                    </div>
                    {
                        <List 
                        style={{minWidth: '340px',overflowX:'hidden',color: 'white'}}
                        className='List'
                        height={300}
                        itemCount={expenses.length}
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
    </div>
  );
};

export default Expense;
