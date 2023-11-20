import React, { useState,useEffect, forwardRef } from "react";
import { Link,useNavigate,useParams} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import { PropagateLoader } from 'react-spinners'
import {cssOverride} from '../../../utils/utils'
import { FaTrash } from "react-icons/fa";
import toast from 'react-hot-toast'
import {messageClear,get_all_payment_mode,get_all_customers,get_banks,get_agents,collection_get_by_id,collection_update} from '../../../store/reducers/collectionReducer'
import Select from 'react-select'
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment';

const CollectionEdit = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { collectionId } = useParams()
  const {loader,successMessage,errorMessage,customers,banks,agents,payModes,collection} = useSelector(state=>state.collection)
  const {userInfo} = useSelector(state=>state.auth)
  const [searchValue, setSearchValue] = useState("");

  const [state,setState] = useState({
    cheque_no:'',
    pay_amount:'',
    pay_note:''
  })

const [chequeDate, setChequeDate] = useState(Date.now());
const [custId,setCustId] = useState('')
const [payModeId,setPayModeId] = useState('')
const [payReceiveId,setPayReceiveId] = useState('')
const [bankId,setBankId] = useState('')
const [payDate, setPayDate] = useState(Date.now());

const inputHandle = (e)=>{
    setState({
        ...state,
        [e.target.name] : e.target.value
    })
}
useEffect(()=>{
  dispatch(collection_get_by_id(collectionId))
},[collectionId])
useEffect(()=>{
  if(collection.length>0){
   setState({
    cheque_no:collection[0].cheque_no,
    pay_amount:collection[0].pay_amount,
    pay_note:collection[0].pay_note,
   })
   setPayReceiveId(collection[0].agent[0]._id)
   setBankId(collection[0].bank[0]._id)
   setPayModeId(collection[0].payMode[0]._id)
   setCustId(collection[0].customer[0]._id)
   setChequeDate(collection[0].cheque_date)
   setPayDate(collection[0].pay_date)
  }
 },[collection])
const collectionUpdate = (e)=>{
  e.preventDefault()
  const obj = {
      state:state,
      chequeDate,
      custId,
      payModeId,
      payReceiveId,
      bankId,
      payDate,
      collectionId,
      userName:userInfo.name
  }
  dispatch(collection_update(obj))
} 

useEffect(()=>{
  dispatch(get_all_payment_mode())
  dispatch(get_all_customers())
  dispatch(get_banks())
  dispatch(get_agents())
},[searchValue])


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

  const bankOptions = banks && banks.map((bank)=>({
    "value" : bank._id,
    "label" : bank.bank_name
    }))
    const agentOptions = agents && agents.map((agent)=>({
      "value" : agent._id,
      "label" : agent.agent_fullname
      }))
    const customerOptions = customers && customers.map((customer)=>({
      "value" : customer._id,
      "label" : customer.cus_company
    }))
    const payModeOptions = payModes && payModes.map((pay)=>({
    "value" : pay._id,
    "label" : pay.pay_mode
    }))

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
    <div className="mx-auto py-1 md:px-[2px] mt-[-24px]">
      <div className="flex flex-wrap w-[98%] mx-auto">
          <div className="w-full">
            <div className="bg-[#283046] text-[#d0d2d6] height-screen lg:min-h-[630px] px-3 p-3">
            <div className="flex justify-between items-center bg-[#283046] py-2 md:px-[2px] text-white">
                <div className="pl-2 font-bold text-2xl">Collection Edit</div>
                <div onClick={()=>navigate('/admin/dashboard/collection-add')} className="pr-2 font-bold text-sm cursor-pointer bg-[#3ab0d8] px-3 py-1 mr-3">Collection List</div>
            </div>

            <form onSubmit={collectionUpdate}>
                    <div className='flex flex-col mb-1 md:flex-row gap-2 w-full px-3 text-[#d0d2d6] mt-1'>
                            <div className='flex flex-col w-[25%] gap-2'>  
                              <label htmlFor='cust_id' className="text-xs text-white">Choose Customer:</label>                              
                                  <div style={{width:215,color:'black'}}>                 
                                        <Select
                                        options={customerOptions}
                                        value={customerOptions.find(option=>option.value === custId)}
                                        placeholder="Choose customer"
                                        onChange={(e)=>setCustId(e.value)}
                                        isSearchable
                                        noOptionsMessage={()=>"no customer found.."}
                                        styles={customStyles}
                                        />
                                  </div>
                            </div>
                            <div className='flex flex-col w-[25%] gap-2'>  
                              <label htmlFor='pay_mode' className="text-xs text-white">Choose Pay mode:</label>                              
                                  <div style={{width:215,color:'black'}}>                 
                                        <Select
                                        options={payModeOptions}
                                        value={payModeOptions.find(option=>option.value === payModeId)}
                                        placeholder="Choose pay mode"
                                        onChange={(e)=>setPayModeId(e.value)}
                                        isSearchable
                                        noOptionsMessage={()=>"no pay mode found.."}
                                        styles={customStyles}
                                        />
                                  </div>
                            </div>
                            <div className='flex flex-col w-[25%] gap-2'>  
                              <label htmlFor='bank_id' className="text-xs text-white">Choose bank:</label>                              
                                  <div style={{width:215,color:'black'}}>                 
                                        <Select
                                        options={bankOptions}
                                        value={bankOptions.find(option=>option.value === bankId)}
                                        placeholder="Choose bank"
                                        onChange={(e)=>setBankId(e.value)}
                                        isSearchable
                                        noOptionsMessage={()=>"no bank found.."}
                                        styles={customStyles}
                                        />
                                  </div>
                            </div>

                
                            <div className='flex flex-col w-[25%] gap-2'>  
                              <label htmlFor='agent_id' className="text-xs text-white">Received by:</label>                              
                                  <div style={{width:215,color:'black'}}>                 
                                        <Select
                                        options={agentOptions}
                                        value={agentOptions.find(option=>option.value === payReceiveId)}
                                        placeholder="Choose pay mode"
                                        onChange={(e)=>setPayReceiveId(e.value)}
                                        isSearchable
                                        noOptionsMessage={()=>"not found.."}
                                        styles={customStyles}
                                        />
                                  </div>
                            </div>

                       

                    </div>
                 
                    <div className='flex flex-col mb-1 md:flex-row px-3 text-[#d0d2d6] gap-2'>
                    <div className='flex flex-col w-[25%] gap-2'>
                          <label htmlFor='pay_date' className="text-xs text-white">Cheque Date:</label>   
                            <div className="bg-[#FFFFFF] text-black px-[8px] py-[4px] rounded-[3px]">
                              <DatePicker                        
                                  selected={new Date(chequeDate)}
                                  onChange={date=>setChequeDate(date)}
                                  dateFormat="dd/MM/yyyy"
                                  filterDate={date=>date.getDay() !== 5}
                                  showYearDropdown
                                  scrollableMonthYearDropdown
                              />
                            </div>
                          </div> 
                    <div className='flex flex-col w-[25%] gap-2'>
                          <label htmlFor='pay_date' className="text-xs text-white">Payment Date:</label>   
                            <div className="bg-[#FFFFFF] text-black px-[8px] py-[4px] rounded-[3px]">
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
                    <div className='flex flex-col w-[24%] gap-2 text-xs'>
                        <label htmlFor="cheque_no">Cheque Number</label>
                              <input value={state.cheque_no} onChange={inputHandle} className="bg-[#FFFFFF] border border-slate-700 px-4 py-2 focus:border-indigo-500 outline-none text-black rounded-md"
                                type="text"
                                id="cheque_no"
                                name="cheque_no"
                                placeholder="Enter check no" required
                              />
                        </div>                    
                    <div className='flex flex-col w-[24%] gap-2 text-xs'>
                        <label htmlFor="pay_amount">Pay Amount</label>
                              <input value={state.pay_amount} onChange={inputHandle} className="bg-[#FFFFFF] border border-slate-700 px-4 py-2 focus:border-indigo-500 outline-none text-black rounded-md"
                                type="number"
                                id="pay_amount"
                                name="pay_amount"
                                min="0" step="any"
                                placeholder="Enter Amount" required
                              />
                        </div>
                  
                    </div>

                    <div className='flex flex-col mb-1 md:flex-row px-3 text-[#d0d2d6] gap-2'>
                    <div className='flex flex-col w-[80%] gap-1 text-xs'>
                        <label htmlFor="pay_note">Pay Note</label>
                              <input value={state.pay_note} onChange={inputHandle} className="bg-[#FFFFFF] border border-slate-700 px-4 py-2 focus:border-indigo-500 outline-none text-black rounded-md"
                                type="text"
                                id="pay_note"
                                name="pay_note"
                                placeholder="Enter pay note" required
                              />
                        </div> 
                    <div className='flex w-[25%]'>
                    <button disabled={loader?true:false} type="submit" className='bg-green-500 mt-[19px] w-[80px] py-[2px] text-white text-xs hover:shadow-green-500/50 hover:shadow-md font-bold rounded-md'>
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

export default CollectionEdit;