import React, { useState,useEffect, forwardRef } from "react";
import { Link,useNavigate,useParams} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import { PropagateLoader } from 'react-spinners'
import {cssOverride} from '../../../utils/utils'
import { FaTrash } from "react-icons/fa";
import toast from 'react-hot-toast'
import {messageClear,expense_get_by_id,get_customer,get_expense_category,get_payment_mode,expense_update} from '../../../store/reducers/expenseReducer'
import Select from 'react-select'
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment';

const ExpenseEdit = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { expId } = useParams()
  // console.log(expId)
  const {loader,successMessage,errorMessage,expense,customers,expenseCategories,paymentModes,} = useSelector(state=>state.expense)
  const {userInfo} = useSelector(state=>state.auth)
  const [searchValue, setSearchValue] = useState("");
  const [state,setState] = useState({
    expense_name:'',
    expense_amount:''
  })
  const [selectedDate, setSelectedDate] = useState(Date.now("dd/MM/yyyy"));
  const [expCatId,setExpCatId] = useState('')
  const [payModeId,setPayModeId] = useState('')
  const [custId,setCustId] = useState('')

const inputHandle = (e)=>{
    setState({
        ...state,
        [e.target.name] : e.target.value
    })
}
useEffect(()=>{
  if(expId){
    dispatch(expense_get_by_id(expId))
  }
},[expId])
useEffect(()=>{
  dispatch(get_payment_mode())
  dispatch(get_customer())
  dispatch(get_expense_category({searchValue}))
},[searchValue])
useEffect(()=>{
 if(expense.length>0){
  setState({
    expense_name:expense[0].expense_name,
    expense_amount:expense[0].expense_amount,
  })
  setExpCatId(expense[0].category[0]._id)
  setPayModeId(expense[0].paymode[0]._id)
  setCustId(expense[0].customer[0]._id)
  setSelectedDate(expense[0].expense_date)
 }
},[expense])


const update = (e)=>{
  e.preventDefault()
  const obj = {
    expense_name:state.expense_name,
    expense_date:selectedDate,
    expense_category_id:expCatId,
    cust_id:custId,
    pay_mode_id:payModeId,
    expense_amount:state.expense_amount,
    expId:expId,
    userName:userInfo.name
  }
  dispatch(expense_update(obj))
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
const customStyles = {
  control: base => ({
    ...base,
    height: 32,
    minHeight: 32,
    background:'#D6E3EA',
    align:'center',
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
    <div className="mx-auto py-1 md:px-[2px] mt-[-22px]">
      <div className="flex flex-wrap w-[98%] mx-auto">
          <div className="w-full">
            <div className="bg-[#283046] text-[#d0d2d6] height-screen lg:min-h-[627px] px-3 p-3">
            <div className="flex justify-between items-center bg-[#283046] py-2 md:px-[2px] text-white">
                <div className="pl-2 font-bold text-2xl">Expense Edit</div>
                <div onClick={()=>navigate('/admin/dashboard/expense')} className="pr-2 font-bold text-sm cursor-pointer bg-[#3ab0d8] px-3 py-1 mr-3">Expense List</div>
            </div>
            <hr className="border-2 border-slate-500 w-[98%] mx-auto mb-5"/>
              <form onSubmit={update}> 
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
                          <label htmlFor='expense_date' className="text-xs text-white">Expense Date:</label>   
                            <div className="bg-[#FFFFFF] text-black px-[8px] py-[4px] rounded-[3px]">
                              <DatePicker                        
                                  selected={new Date(selectedDate)}
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
                                        value={expCatOptions.find(option=>option.value === expCatId)}
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
                                        value={payModeOptions.find(option=>option.value === payModeId)}
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
                    <div className='flex flex-col w-[23%] gap-1'>  
                              <label htmlFor='pay_mode_id' className="text-xs text-white">Expense Category:</label>                              
                                  <div style={{width:198,color:'black'}}>                 
                                        <Select
                                        options={customerOptions}
                                        value={customerOptions.find(option=>option.value === custId)}
                                        placeholder="Choose customer"
                                        onChange={(e)=>setCustId(e.value)}
                                        isSearchable
                                        noOptionsMessage={()=>"no type found.."}
                                        styles={customStyles}
                                        required
                                        />
                                  </div>
                            </div>
                    <div className='flex w-[25%]'>
                    <button disabled={loader?true:false} type="submit" className='bg-green-500 mt-[19px] w-[80px] py-[3px] text-white text-sm hover:shadow-green-500/50 hover:shadow-md font-bold rounded-md'>
                        {
                            loader? <PropagateLoader color='#fff' cssOverride={cssOverride}/>: 'Update'
                        }
                        
                    </button>
                    </div>
                    </div>

       
                <div className='mt-4'>
                </div>
              </form>
            </div>
          </div>       
      </div>
    </div>
  );
};

export default ExpenseEdit;
