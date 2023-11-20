import React, { useState,useEffect} from "react";
import { Link,useNavigate,useParams} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import { FaEdit, FaTrash } from "react-icons/fa";
import toast from 'react-hot-toast'
import {messageClear,get_customers,get_invoice,bill_add,bill_add_info,product_delete,get_bill_by_id,bill_info_update} from '../../../store/reducers/billReducer'

import Select from 'react-select'
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment';

// function handleOnWheel({deltaY}){
// console.log('handleOnWheel',deltaY)
// }
// const outerElementType = forwardRef((props,ref)=>(
//   <div ref={ref} onWheel={handleOnWheel} {...props} />
// ))

const BillEdit = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { billId } = useParams()
  const {loader,successMessage,errorMessage,invoices,lastBillNumberShow,billAddInfo,customers,editBillInfo} = useSelector(state=>state.bill)
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
},[])
useEffect(()=>{
  dispatch(get_bill_by_id(billId))
},[billId])

useEffect(()=>{
  dispatch(bill_add_info(billNumber))
},[billNumber])
useEffect(()=>{
  if(editBillInfo.length>0){
    setBillNumber(editBillInfo[0]?.bill_number)
    setCusId(editBillInfo[0]?.customer[0]?._id)
    setBillDate(editBillInfo[0]?.bill_date)
    setDiscount(editBillInfo[0]?.discount)
    setBillNote(editBillInfo[0]?.bill_note)
  }
 },[editBillInfo])
 const updateInfo = (e)=>{
  e.preventDefault()
  const obj = {
    bill_date:billDate,
    cus_id:cusId,
    discount:discount,
    bill_note:billNote,
    billId:billId,
    userName:userInfo.name
  }
  dispatch(bill_info_update(obj))
}
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
  return (
    <div className="mx-auto md:px-[2px] mt-[-20px]">
      <div className="flex flex-wrap w-[98%] mx-auto">
          <div className="w-full">
            <div className="bg-[#283046] text-[#d0d2d6] height-screen lg:height-auto px-2 py-1">
            <div className="flex justify-between items-center bg-[#283046] py-1 md:px-[10px] text-white">
                <div className="pl-2 font-bold text-3xl">Bill Edit:</div>
                <div onClick={()=>navigate('/admin/dashboard/bill-list')} className="pl-2 font-bold text-sm cursor-pointer border rounded-full  border-green-500 px-3 py-[3px] hover:bg-[#38425e]">Bill List</div>
            </div>
              <hr className="border-2 border-slate-500 w-[98%] mx-auto mb-5"/>
              <form onSubmit={Add}>
                    <div className='flex flex-col mb-1 md:flex-row gap-2 w-full px-3 text-[#d0d2d6] mt-1'>
                    <div className='flex flex-col w-[25%] gap-1 text-xs'>
                        <label htmlFor="bill_number">Bill Number: <span className='text-red-500'>{lastBillNumberShow[0]?.bill_number}</span></label>
                            <input onChange={(e)=>setBillNumber(e.target.value)} value={billNumber} className="bg-[#FFFFFF] border border-slate-700 shadow-md px-4 py-2 focus:border-indigo-500 outline-none text-black rounded-md"
                              type="text"
                              id="bill_number"
                              name="bill_number"
                              placeholder="Enter Bill number" required readOnly={true}
                            />
                      </div>
                      <div className='flex flex-col w-[25%] gap-1'>  
                          <label htmlFor='cust_id' className="text-xs text-white">Customer:</label>                              
                              <div style={{width:220,color:'black'}}>                 
                                    <Select
                                    options={customerOptions}
                                    value={customerOptions.find(option=>option.value === cusId)}
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
                                   selected={new Date(billDate)}
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
     
                    <div className='flex flex-col w-[75%] gap-1 text-xs'>
                        <label htmlFor="bill_note">Bill Note</label>
                            <input onChange={(e)=>setBillNote(e.target.value)} value={billNote} className="bg-[#FFFFFF] border border-slate-700 px-4 py-2 focus:border-indigo-500 outline-none text-black rounded-md"
                            type="text"
                            id="bill_note"
                            name="bill_note"
                            placeholder="Enter Note"
                            />
                    </div>
                    <div className='flex flex-col w-[23%] mt-5 gap-1'>
                        <button type="submit"  onClick={updateInfo} className='bg-blue-500 px-2 mb-3 py-[8px] rounded-[4px] text-white text-xs hover:shadow-blue-500/50 hover:shadow-md font-bold'> Update Info</button>
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
                      <div className='flex flex-col w-[23%] mt-5 gap-1'>
                          <button type="submit" className='bg-blue-500 px-2 mb-3 py-[8px] rounded-[4px] text-white text-xs hover:shadow-blue-500/50 hover:shadow-md font-bold'> Add </button>
                      </div>
                      </div>   
                <div className='mt-4'>
                <button onClick={()=>navigate('/admin/dashboard/bill-list')} className="flex bg-[#00593F] pl-2 font-bold text-sm items-center cursor-pointe px-3 py-[8px] hover:bg-[#469980]">Update & Go to List</button>
                </div>
              </form>
              

            </div>
          
            <div className='relative overflow-x-auto bg-[#283046] md:min-h-[300px]'>
            <table className='w-full text-xs text-[#d0d2d6] text-left'>
              <thead className='text-xs text-[#d0d2d6] border-b border-slate-700'>
                <tr>
                  <th scope='col' className='py-3 px-4'>Challan Number</th>
                  <th scope='col' className='py-3 px-4'>Product Code</th>
                  <th scope='col' className='py-3 px-4'>Product Name</th>
                  <th scope='col' className='py-3 px-4'>Product Qty</th>
                  <th scope='col' className='py-3 px-4'>Product Total</th>
                  <th scope='col' className='py-3 px-4'>Action</th>
                </tr>
              </thead>
              <tbody>
                  {
                   billAddInfo && billAddInfo.map((bill,i)=><tr key={i}>
                    <td scope='row' className='py-1 px-4 font-medium text-xs whitespace-nowrap'>{bill.invoice_number}</td>
                    <td scope='row' className='py-1 px-4 font-medium text-xs whitespace-nowrap'>{bill.product_code}</td>
                    <td scope='row' className='py-1 px-4 font-medium text-xs whitespace-nowrap'>{bill.product_name}</td>
                    <td scope='row' className='py-1 px-4 font-medium text-xs whitespace-nowrap'>{bill.product_qty}</td>
                    <td scope='row' className='py-1 px-4 font-medium text-xs whitespace-nowrap'>{bill.product_total.toFixed(2)}</td>
                    <td scope='row' className='py-1 px-4 font-medium text-xs'>
                      <button onClick={()=>dispatch(product_delete({billNumber:bill.bill_number,productId:bill._id}))} className="p-[5px] rounded bg-red-600 hover:shadow-lg shadow-red-600/50">
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                  )}
              </tbody>
            </table>
          </div>
          </div>     
      </div>
    </div>
  );
};

export default BillEdit;