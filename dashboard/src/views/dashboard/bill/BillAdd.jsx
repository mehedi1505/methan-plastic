import React, { useState,useEffect,forwardRef} from "react";
import { Link,useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import { FaEdit, FaTrash } from "react-icons/fa";
import toast from 'react-hot-toast'
import {messageClear,get_customers,get_invoice,last_bill_number_show,bill_add,bill_add_info,product_delete} from '../../../store/reducers/billReducer'
import {FixedSizeList as List} from 'react-window'
import Select from 'react-select'
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment';
import { FcPlus } from "react-icons/fc";

function handleOnWheel({deltaY}){
console.log('handleOnWheel',deltaY)
}
const outerElementType = forwardRef((props,ref)=>(
  <div ref={ref} onWheel={handleOnWheel} {...props} />
))

const BillAdd = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {loader,successMessage,errorMessage,invoices,lastBillNumberShow,billAddInfo,customers} = useSelector(state=>state.bill)
  const {userInfo} = useSelector(state=>state.auth)



const [billDate, setBillDate] = useState(Date.now());
const [cusId,setCusId] = useState('')
const [billNumber,setBillNumber] = useState('')
const [billNote,setBillNote] = useState('')
const [invoiceId,setInvoiceId] = useState('')
const [discount,setDiscount] = useState('')


const Add = (e)=>{
    e.preventDefault()
    dispatch(bill_add({
      billNumber,
      invoiceId,
      cusId,
      billDate,
      billNote,
      discount,
      userName:userInfo.name
    }))
}

useEffect(()=>{
  dispatch(get_customers())
  dispatch(get_invoice())
  dispatch(last_bill_number_show())
},[])

useEffect(()=>{
  dispatch(bill_add_info(billNumber))
},[billNumber])

  useEffect(()=>{
    if(successMessage){
      toast.success(successMessage)
      dispatch(messageClear())
      dispatch(bill_add_info(billNumber))
    }
    if(errorMessage){
      toast.error(errorMessage)
      dispatch(messageClear())
    }
  },[successMessage,errorMessage])

  const customerOptions = customers && customers.map((customer)=>({
    "value" : customer._id,
    "label" : customer.cus_company
}))
  const invoiceOptions = invoices && invoices.map((invoice)=>({
    "value" : invoice._id,
    "label" : invoice.invoice_number
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
  function AllRows({ index, style }) {
    return <div style={style} className='flex text-xs mt-2'>
      <div className='w-[10%] p-1 whitespace-nowrap text-center'>{index + 1}</div>
      <div className='w-[15%] p-1 whitespace-nowrap text-center'>{`${billAddInfo[index]?.invoice_number}`}</div>
      <div className='w-[15%] p-1 whitespace-nowrap text-center'>{`${billAddInfo[index]?.product_code}`}</div>
      <div className='w-[25%] p-1 whitespace-nowrap'>{`${billAddInfo[index]?.product_name}`}</div>
      <div className='w-[10%] p-1 whitespace-nowrap text-center'>{`${billAddInfo[index]?.product_qty}`}</div>
      <div className='w-[15%] p-1 whitespace-nowrap text-center'>{`${billAddInfo[index]?.product_total.toFixed(2)}`}</div>
      <div className="w-[10%] flex justify-center items-center gap-1">

        <button onClick={()=>dispatch(product_delete({billNumber:billAddInfo[index]?.bill_number,productId:billAddInfo[index]?._id}))} className="p-[5px] rounded bg-red-600 hover:shadow-lg shadow-red-600/50">
          <FaTrash />
        </button>
      </div>
    </div>

  }      
  return (
    <div className="mx-auto md:px-[2px] mt-[-20px]">
      <div className="flex flex-wrap w-[98%] mx-auto">
          <div className="w-full">
            <div className="bg-[#283046] text-[#d0d2d6] height-screen lg:height-auto px-2 py-1">
            <div className="flex justify-between items-center bg-[#283046] py-1 md:px-[10px] text-white">
                <div className="pl-2 font-bold text-3xl">Bill Create</div>
                <div onClick={()=>navigate('/admin/dashboard/bill-list')} className="pl-2 font-bold text-sm cursor-pointer border rounded-full  border-green-500 px-3 py-[3px] hover:bg-[#38425e]">Bill List</div>
            </div>
              <hr className="border-2 border-slate-500 w-[98%] mx-auto mb-5"/>
              <form onSubmit={Add}>
                    <div className='flex flex-col mb-1 md:flex-row gap-2 w-full px-3 text-[#d0d2d6] mt-1'>
                    <div className='flex flex-col w-[25%] gap-1 text-xs'>
                        <label htmlFor="bill_number">Last Bill Number: <span className='text-red-500'>{lastBillNumberShow[0]?.bill_number}</span></label>
                            <input onChange={(e)=>setBillNumber(e.target.value)} value={billNumber} className="bg-[#FFFFFF] border border-slate-700 shadow-md px-4 py-2 focus:border-indigo-500 outline-none text-black rounded-md"
                              type="text"
                              id="bill_number"
                              name="bill_number"
                              placeholder="Enter Bill number" required
                            />
                      </div>
                      <div className='flex flex-col w-[25%] gap-1'>  
                          <label htmlFor='cust_id' className="text-xs text-white">Customer:</label>                              
                              <div style={{width:220,color:'black'}}>                 
                                    <Select
                                    options={customerOptions}
                                    defaultValue={cusId}
                                    placeholder="Choose Customer"
                                    onChange={(e)=>setCusId(e.value)}
                                    isSearchable
                                    noOptionsMessage={()=>"no Customer found.."}
                                    styles={customStyles}
                                    required
                                    />
                              </div>
                          </div>
         

                        <div className='flex flex-col w-[25%] gap-1'>
                          <label htmlFor='rec_date' className="text-xs text-white">Bill Date:</label>   
                            <div className="bg-[#FFFFFF] text-black px-[8px] py-[4px] rounded-[3px]">
                              <DatePicker                        
                                  selected={billDate}
                                  onChange={date=>setBillDate(date)}
                                  dateFormat="dd/MM/yyyy"
                                  filterDate={date=>date.getDay() !== 5}
                                  showYearDropdown
                                  scrollableMonthYearDropdown
                              />
                            </div>
                          </div>
                          <div className='flex flex-col w-[24%] gap-1 text-xs'>
                        <label htmlFor="discount">Discount</label>
                            <input onChange={(e)=>setDiscount(e.target.value)} value={discount} className="bg-[#FFFFFF] border border-slate-700 px-4 py-2 focus:border-indigo-500 outline-none text-black rounded-md"
                            type="Number"
                            id="discount"
                            name="discount"
                            min="0"
                            step="any"
                            placeholder="Enter Discount"
                            />
                    </div> 

                    </div>
                    <div className='flex flex-col mb-1 md:flex-row gap-2 w-full px-3 text-[#d0d2d6] mt-1'>
                                                                                                 
       
                    <div className='flex flex-col w-[100%] gap-1 text-xs'>
                        <label htmlFor="bill_note">Bill Note</label>
                            <input onChange={(e)=>setBillNote(e.target.value)} value={billNote} className="bg-[#FFFFFF] border border-slate-700 px-4 py-2 focus:border-indigo-500 outline-none text-black rounded-md"
                            type="text"
                            id="bill_note"
                            name="bill_note"
                            placeholder="Enter Note"
                            />
                    </div>
                      </div>
   
                    <div className='flex flex-col mb-1 md:flex-row gap-2 w-full px-3 text-[#d0d2d6] mt-1'>
 
                    <div className='flex flex-col w-[24%] gap-1'>  
                        <label htmlFor='challan_number' className="text-xs text-white">Challan Number:</label>                              
                            <div style={{width:210,color:'black'}}>                 
                                  <Select
                                  options={invoiceOptions}
                                  defaultValue={invoiceId}
                                  placeholder="Select challan"
                                  onChange={(e)=>setInvoiceId(e.value)}
                                  isSearchable
                                  noOptionsMessage={()=>"no challan found.."}
                                  styles={customStyles}
                                  required
                                  />
                            </div>
                      </div>
                    <div className='flex flex-col w-[10%] mt-5 gap-2'>
                        <button type="submit" className='flex bg-blue-500 px-5 mb-3 py-[8px] rounded-[4px] items-center text-white text-xs hover:shadow-blue-500/50 hover:shadow-md font-bold'> <FcPlus/>Add </button>
                        </div>
                    </div>    
                <div className='mt-2 ml-3'>
                <button onClick={()=>navigate('/admin/dashboard/bill-list')} className="flex bg-[#00593F] pl-3 font-bold text-sm items-center cursor-pointe px-5 py-[8px] hover:bg-[#469980]">Save & Go to List</button>
                </div>
              </form>
              

            </div>
          
            <div className='w-full border bg-[#283046] border-slate-700 overflow-x-auto'>
                    <div className='flex bg-[#007DC3] w-[96%] mx-auto font-bold text-xs min-w-[340px] text-white'>
                        <div className='w-[10%] p-2 text-center text-xs'>No</div>
                        <div className='w-[15%] p-2 text-xs text-center'>Invoice Number</div>
                        <div className='w-[15%] p-2 text-xs text-center'>Product Code</div>
                        <div className='w-[25%] p-2 text-xs'>Product Name</div>
                        <div className='w-[10%] p-2 text-xs  text-center'>Product Qty</div>
                        <div className='w-[15%] p-2  text-center text-xs'>Product Total</div>
                        <div className='w-[10%] p-2 text-xs text-center'>Action</div>
                    </div>
                    {
                        <List 
                        style={{minWidth: '340px',overflowX:'hidden',color: 'white'}}
                        className='List'
                        height={280}
                        itemCount={billAddInfo && billAddInfo.length}
                        itemSize={30}
                        outerElementType={outerElementType}
                        >
                            {AllRows}
                        </List>
                    }
                </div>

          </div>     
      </div>
    </div>
  );
};

export default BillAdd;