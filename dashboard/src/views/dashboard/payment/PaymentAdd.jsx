import React, { useState,useEffect, forwardRef } from "react";
import { Link} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import { PropagateLoader } from 'react-spinners'
import {cssOverride} from '../../../utils/utils'
import { FaEdit, FaTrash } from "react-icons/fa";
import toast from 'react-hot-toast'
// import { GrClose } from "react-icons/gr";
// import { BsImage } from "react-icons/bs";
import {get_all_payment_mode,get_banks} from '../../../store/reducers/collectionReducer'
import {messageClear,get_all_vendors,payment_add,get_all_payment} from '../../../store/reducers/paymentReducer'
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
const PaymentAdd = () => {
  const dispatch = useDispatch()
  const {banks,payModes} = useSelector(state=>state.collection)
  const {loader,successMessage,errorMessage,vendors,payments,totalPayment} = useSelector(state=>state.payment)
  const {userInfo} = useSelector(state=>state.auth)
  const [searchValue, setSearchValue] = useState("");

  const [state,setState] = useState({
    cheque_no:'',
    pay_amount:'',
    pay_note:''
  })

const [chequeDate, setChequeDate] = useState(Date.now());
const [vendorId,setVendorId] = useState('')
const [payModeId,setPayModeId] = useState('')
const [bankId,setBankId] = useState('')
const [payDate, setPayDate] = useState(Date.now());

const inputHandle = (e)=>{
    setState({
        ...state,
        [e.target.name] : e.target.value
    })
}

const paymentAdd= (e)=>{
    e.preventDefault()
    dispatch(payment_add({
      state:state,
      chequeDate,
      vendorId,
      payModeId,
      bankId,
      payDate,
      userName:userInfo.name
    }))
}
useEffect(()=>{
  dispatch(get_all_payment_mode())
  dispatch(get_all_vendors())
  dispatch(get_banks())
  dispatch(get_all_payment({searchValue}))
},[searchValue])

  useEffect(()=>{
    dispatch(get_all_payment({searchValue}))
},[searchValue,successMessage,errorMessage])

  useEffect(()=>{
    if(successMessage){
      toast.success(successMessage)
      dispatch(messageClear())
      setState({
        cheque_no:'',
        pay_amount:'',
        pay_note:''
      })
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
    const vendorOptions = vendors && vendors.map((vendor)=>({
      "value" : vendor._id,
      "label" : vendor.vendor_company
    }))
    const payModeOptions = payModes && payModes.map((pay)=>({
    "value" : pay._id,
    "label" : pay.pay_mode
    }))

  function AllRows({ index, style }) {
    return <div style={style} className='flex text-[11px] mt-2'>
      <div className='w-[5%] p-1 whitespace-nowrap'>{index + 1}</div>
      <div className='w-[15%] p-1 whitespace-nowrap'>{`${payments[index]?.vendor[0]?.vendor_company}`}</div>
      <div className='w-[12%] p-1 whitespace-nowrap'>{`${payments[index]?.payMode[0]?.pay_mode}`}</div>
      <div className='w-[12%] p-1 whitespace-nowrap'>{`${payments[index]?.cheque_no}`}</div>
      <div className='w-[12%] p-1 whitespace-nowrap'>{moment(`${payments[index]?.cheque_date}`).format('LL')}</div>
      <div className='w-[10%] p-1 whitespace-nowrap'>{`${payments[index]?.bank[0].bank_short_name}`}</div>
      <div className='w-[12%] p-1 whitespace-nowrap'>{moment(`${payments[index]?.pay_date}`).format('LL')}</div>
      <div className='w-[12%] p-1 whitespace-nowrap'>{`${payments[index]?.pay_amount.toFixed(2)}`}</div>

      <div className="w-[10%] flex justify-center items-center gap-1">
        <Link to={`/admin/dashboard/edit-payment/${payments[index]?._id}`} className="p-[5px] rounded bg-yellow-500 hover:shadow-lg shadow-yellow-500/50">
          <FaEdit />
        </Link>
        {/* <button onClick = {()=>dispatch(collection_delete(`${collections[index]._id}`))} className="p-[5px] rounded bg-red-600 hover:shadow-lg shadow-red-600/50">
          <FaTrash />
        </button> */}
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
                <div className="pl-2 font-bold text-2xl">Payment Create</div>
            </div>
              <hr/>
              <form onSubmit={paymentAdd}>
                    <div className='flex flex-col mb-1 md:flex-row gap-2 w-full px-3 text-[#d0d2d6] mt-1'>
                            <div className='flex flex-col w-[25%] gap-1'>  
                              <label htmlFor='vendor_id' className="text-xs text-white">Choose Vendor:</label>                              
                                  <div style={{width:215,color:'black'}}>                 
                                        <Select
                                        options={vendorOptions}
                                        defaultValue={vendorId}
                                        placeholder="Choose vendor"
                                        onChange={(e)=>setVendorId(e.value)}
                                        isSearchable
                                        noOptionsMessage={()=>"no vendor found.."}
                                        styles={customStyles}
                                        required
                                        />
                                  </div>
                            </div>
                            <div className='flex flex-col w-[25%] gap-1'>  
                              <label htmlFor='pay_mode' className="text-xs text-white">Choose Pay mode:</label>                              
                                  <div style={{width:215,color:'black'}}>                 
                                        <Select
                                        options={payModeOptions}
                                        defaultValue={payModeId}
                                        placeholder="Choose pay mode"
                                        onChange={(e)=>setPayModeId(e.value)}
                                        isSearchable
                                        noOptionsMessage={()=>"no pay mode found.."}
                                        styles={customStyles}
                                        required
                                        />
                                  </div>
                            </div>
                            <div className='flex flex-col w-[25%] gap-1'>  
                              <label htmlFor='bank_id' className="text-xs text-white">Choose bank:</label>                              
                                  <div style={{width:215,color:'black'}}>                 
                                        <Select
                                        options={bankOptions}
                                        defaultValue={bankId}
                                        placeholder="Choose bank"
                                        onChange={(e)=>setBankId(e.value)}
                                        isSearchable
                                        noOptionsMessage={()=>"no bank found.."}
                                        styles={customStyles}
                                        required
                                        />
                                  </div>
                            </div>
                            <div className='flex flex-col w-[25%] gap-1'>
                          <label htmlFor='pay_date' className="text-xs text-white">Cheque Date:</label>   
                            <div className="bg-[#FFFFFF] text-black px-[8px] py-[4px] rounded-[3px]">
                              <DatePicker                        
                                  selected={chequeDate}
                                  onChange={date=>setChequeDate(date)}
                                  dateFormat="dd/MM/yyyy"
                                  filterDate={date=>date.getDay() !== 5}
                                  showYearDropdown
                                  scrollableMonthYearDropdown
                              />
                            </div>
                          </div>
                       

                    </div>
                 
                    <div className='flex flex-col mb-1 md:flex-row px-3 text-[#d0d2d6] gap-2'>
 
                    <div className='flex flex-col w-[25%] gap-1'>
                          <label htmlFor='pay_date' className="text-xs text-white">Payment Date:</label>   
                            <div className="bg-[#FFFFFF] text-black px-[8px] py-[4px] rounded-[3px]">
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
                    <div className='flex flex-col w-[50%] gap-1 text-xs'>
                        <label htmlFor="cheque_no">Cheque Number</label>
                              <input value={state.cheque_no} onChange={inputHandle} className="bg-[#FFFFFF] border border-slate-700 px-4 py-2 focus:border-indigo-500 outline-none text-black rounded-md"
                                type="text"
                                id="cheque_no"
                                name="cheque_no"
                                placeholder="Enter check no" required
                              />
                        </div>                    
                    <div className='flex flex-col w-[23%] gap-1 text-xs'>
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
                    <div className='flex flex-col w-[100%] gap-1 text-xs'>
                        <label htmlFor="pay_note">Pay Note</label>
                              <input value={state.pay_note} onChange={inputHandle} className="bg-[#FFFFFF] border border-slate-700 px-4 py-2 focus:border-indigo-500 outline-none text-black rounded-md"
                                type="text"
                                id="pay_note"
                                name="pay_note"
                                placeholder="Enter pay note" required
                              />
                        </div> 
           
                      </div>
                      <div className='flex flex-col mb-1 md:flex-row px-3 text-[#d0d2d6] gap-2'>
                      <div className='flex w-[25%]'>
                    <button disabled={loader?true:false} type="submit" className='bg-green-500 mt-[12px] w-[130px] py-[8px] text-white text-xs hover:shadow-green-500/50 hover:shadow-md font-bold rounded-md'>
                        {
                            loader? <PropagateLoader color='#fff' cssOverride={cssOverride}/>: 'Add'
                        }
                        
                    </button>
                    </div>
                      </div>
              </form>
              <div className="w-full p-2 bg-[#283046] rounded-md">
            <div className='w-full flex justify-between items-center bg-[#283046] py-2'>
              <div className='text-white font-bold'>
                  Total Payment : {totalPayment}
              </div>
              <Search searchValue={searchValue} setSearchValue={setSearchValue}/>
            </div> 
              <div className='w-full border border-slate-700 overflow-x-auto'>
                    <div className='flex bg-[#007DC3] uppercase font-bold text-xs min-w-[340px]  text-white'>
                        <div className='w-[5%] p-2'>No</div>
                        <div className='w-[15%] p-2'>Vendor</div>
                        <div className='w-[12%] p-2'>Pay Mode</div>
                        <div className='w-[12%] p-2'>Cheque</div>
                        <div className='w-[12%] p-2'>Cheque Date</div>
                        <div className='w-[10%] p-2'>Bank</div>
                        <div className='w-[12%] p-2'>Pay date</div>
                        <div className='w-[12%] p-2'>Amount</div>
                        <div className='w-[10%] p-2'>Action</div>
                    </div>
                    {
                        <List 
                        style={{minWidth: '340px',overflowX:'hidden',color: 'white'}}
                        className='List'
                        height={250}
                        itemCount={payments.length}
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

export default PaymentAdd;