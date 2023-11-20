import React, { useState,useEffect, forwardRef } from "react";
import { Link,useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import { PropagateLoader } from 'react-spinners'
import {cssOverride} from '../../../utils/utils'
import { FaTrash } from "react-icons/fa";
import toast from 'react-hot-toast'
import {messageClear,last_invoice_number,get_receive_types,get_vendors,get_items,get_item_info,item_receive,show_item_details,receive_details_item_delete} from '../../../store/reducers/receiveReducer'
import Select from 'react-select'
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment';
const ItemReceive = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {loader,successMessage,errorMessage,types,vendors,items,itemInfo,receiveDetails,lastInvoiceNumber,receiveTotalPerInvoice} = useSelector(state=>state.item_receive)
  const {userInfo} = useSelector(state=>state.auth)
  
  const [state,setState] = useState({
    item_qty:'',
    item_unit:'',
    item_price:''
  })
const [rec_invoice,setInvoice] = useState('')
const [discount,setDiscount] = useState('')
const [rec_note,setNote] = useState('')
const [adjustment_qty,setAdjustment] = useState('')
const [rec_by,setReceiveby] = useState('')
const [selectedDate, setSelectedDate] = useState(Date.now());
const [recTypeId,setRecTypeId] = useState('')
const [vendorId,setVendorId] = useState('')
const [itemId,setItemId] = useState('')
const inputHandle = (e)=>{
    setState({
        ...state,
        [e.target.name] : e.target.value
    })
}

const itemReceive = (e)=>{
  e.preventDefault()
  dispatch(item_receive({
    state,
    rec_invoice,
    discount,
    rec_note,
    adjustment_qty,
    rec_by,
    selectedDate,
    recTypeId,
    vendorId,
    itemId,
    userName:userInfo.name
  }))
}

useEffect(()=>{
  dispatch(last_invoice_number())
},[])

useEffect(()=>{
  if(itemInfo.length>0){
    setState({
      item_unit:itemInfo[0].unit[0].unit_name,
      item_price:itemInfo[0].item_price
    })
  }
},[itemId,itemInfo])

useEffect(()=>{
  if(successMessage){
    toast.success(successMessage)
    dispatch(messageClear())
    setState({
      item_qty:'',
      // item_unit:'',
      item_price:''
    })
    dispatch(show_item_details(rec_invoice))
  }
  if(errorMessage){
    toast.error(errorMessage)
    dispatch(messageClear())
  }
},[successMessage,errorMessage])

useEffect(()=>{
  if(itemId){
    dispatch(get_item_info(itemId))
  }
},[itemId])

useEffect(()=>{
  dispatch(get_receive_types())
},[])

useEffect(()=>{
  dispatch(get_vendors())
},[])

useEffect(()=>{
  dispatch(get_items())
},[])

useEffect(()=>{
  if(rec_invoice){
      dispatch(show_item_details(rec_invoice))
  }
},[rec_invoice])


const typeOptions = types && types.map((type)=>({
        "value" : type._id,
        "label" : type.rec_type_name
    }))
const vendorOptions = vendors && vendors.map((vendor)=>({
      "value" : vendor._id,
      "label" : vendor.vendor_company
  }))
  const itemOptions =items && items.map((item)=>({
    "value" : item._id,
    "label" : item.item_code
}))
const customStyles = {
  control: base => ({
    ...base,
    height: 25,
    minHeight: 25,
    background:'#D6E3EA',
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
                <div className="pl-2 font-bold text-2xl">Item Receive Create</div>
                <div onClick={()=>navigate('/admin/dashboard/item-receive-list')} className="pr-2 text-white font-bold text-sm cursor-pointer bg-[#283046] px-3 py-1 mr-3">Item Receive List</div>
            </div>
            <hr className='w-[100%] border-2 border-slate-500 mx-auto'/>
              <form onSubmit={itemReceive}> 
              <div className='flex flex-col mb-1 md:flex-row gap-1 w-full text-[#d0d2d6] mt-2'>
                <div className='flex flex-col w-[25%] gap-1'>
                    <label htmlFor='rec_invoice' className="text-xs">Last Invoice: {lastInvoiceNumber[0]?.rec_invoice}</label>
                    <input className='bg-[#D6E3EA]  px-2 py-1 border border-slate-700 rounded-[3px] outline-none focus:border-indigo-500 text-[#2A2D2E] text-xs' onChange={(e)=>setInvoice(e.target.value)} value={rec_invoice} type='text' id='rec_invoice' name='rec_invoice' required/>
                </div>

                <div className='flex flex-col w-[25%] gap-1'>
                <label htmlFor='rec_date' className="text-xs text-white">Receive Date:</label>   
                  <div className="bg-[#D6E3EA] text-black px-[8px] py-[1px] rounded-[3px]">
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
                <label htmlFor='rec_type_id' className="text-xs text-white">Receive Type:</label>                              
                    <div style={{width:220,color:'black'}}>                 
                          <Select
                          options={typeOptions}
                          defaultValue={recTypeId}
                          placeholder="Choose Type"
                          onChange={(e)=>setRecTypeId(e.value)}
                          isSearchable
                          noOptionsMessage={()=>"no type found.."}
                          styles={customStyles}
                          required
                          />
                    </div>
                </div>


                <div className='flex flex-col w-[25%] gap-1'>  
                <label htmlFor='rec_type_id' className="text-xs text-white">Vendor:</label>                              
                    <div style={{width:220,color:'black'}}>                 
                          <Select
                          options={vendorOptions}
                          defaultValue={vendorId}
                          placeholder="Choose Vendor"
                          onChange={(e)=>setVendorId(e.value)}
                          isSearchable
                          noOptionsMessage={()=>"no vendor found.."}
                          styles={customStyles}
                          required
                          />
                    </div>
                </div>

              </div>

              <div className='flex flex-col mb-1 md:flex-row gap-1 w-full text-[#d0d2d6] mt-2'>
                    <div className='flex flex-col w-[25%] gap-1'>
                        <label htmlFor='discount' className="text-xs">discount (optional):</label>
                        <input className='bg-[#D6E3EA]  px-4 py-1 border border-slate-700 rounded-[3px] outline-none focus:border-indigo-500 text-[#2A2D2E] text-xs' onChange={(e)=>setDiscount(e.target.value)} value={discount} type='number' min="0" step="any" id='discount' name='discount'/>
                    </div>
                    <div className='flex flex-col w-[25%] gap-1'>
                        <label htmlFor='adjustment_qty' className="text-xs">Adjust Qty (optional):</label>
                        <input className='bg-[#D6E3EA] px-4 py-1 border border-slate-700 rounded-[3px] outline-none focus:border-indigo-500 text-[#2A2D2E] text-xs' onChange={(e)=>setAdjustment(e.target.value)} value={adjustment_qty} type='number' min="0" step="any" id='adjustment_qty' name='adjustment_qty'/>
                    </div>
                    <div className='flex flex-col w-[25%] gap-1'>
                            <label htmlFor='rec_by' className="text-xs">Receive by:</label>
                            <input className='bg-[#D6E3EA] px-4 py-1 border border-slate-700 rounded-[3px] outline-none focus:border-indigo-500 text-[#2A2D2E] text-xs' onChange={(e)=>setReceiveby(e.target.value)} value={rec_by} type='text' id='rec_by' name='rec_by' required/>
                    </div>
                    <div className='flex flex-col w-[25%] gap-1'>
                            <label htmlFor='rec_note' className="text-xs">Receive note (optional):</label>
                            <input className='bg-[#D6E3EA] px-4 py-1 border border-slate-700 rounded-[3px] outline-none focus:border-indigo-500 text-[#2A2D2E] text-xs' onChange={(e)=>setNote(e.target.value)} value={rec_note} type='text' id='rec_note' name='rec_note'/>
                    </div>
              </div>

          
                    <div className='flex flex-col mb-1 md:flex-row gap-1 w-full text-[#d0d2d6] mt-2'>
                        <div className='flex flex-col w-[25%]  text-[#333] gap-1'>
                        <label htmlFor='item_code' className="text-xs text-white">Item Code:</label>
                        <Select
                          options={itemOptions}
                          defaultValue={itemId}
                          placeholder="Choose Item"
                          onChange={(e)=>setItemId(e.value)}
                          isSearchable
                          noOptionsMessage={()=>"no item found.."}
                          styles={customStyles}
                          required
                          />
                          <span className="text-sm text-white">{itemInfo[0]?.item_name}</span>
                        </div>
                        <div className='flex flex-col w-[20%] gap-1'>
                            <label htmlFor='item_qty' className="text-xs">Item qty:</label>
                            <input className='bg-[#D6E3EA]  px-4 py-1 border border-slate-700 rounded-[3px] outline-none focus:border-indigo-500 text-[#2A2D2E] text-xs' onChange={inputHandle} value={state.item_qty} type='number' min="0" step="any" id='item_qty' name='item_qty' required/>
                        </div>
                        <div className='flex flex-col w-[20%] gap-1'>
                            <label htmlFor='item_unit' className="text-xs">Item unit:</label>
                            <input className='bg-[#D6E3EA] px-4 py-1 border border-slate-700 rounded-[3px] outline-none focus:border-indigo-500 text-[#2A2D2E] text-xs' onChange={inputHandle} value={state.item_unit} type='text' id='item_unit' name='item_unit' required/>
                        </div>
                        <div className='flex flex-col w-[20%] gap-1'>
                            <label htmlFor='price' className="text-xs">Price:</label>
                            <input className='bg-[#D6E3EA] px-4 py-1 border border-slate-700 rounded-[3px] outline-none focus:border-indigo-500 text-[#2A2D2E] text-xs' onChange={inputHandle} value={state.item_price} type='number' min="0" step="any" id='item_price' name='item_price' required/>
                        </div>
                        <div className='flex flex-col w-[14%] mt-5 gap-1'>
                        <button type="submit" className='bg-blue-500 px-2 mb-3 rounded-[4px] text-white hover:shadow-blue-500/50 hover:shadow-md font-bold'> Add </button>
                        </div>
                    </div>
                    <div>
                </div>      
                <div className='mt-4'>
                </div>
              </form>
            </div>

            <div className='relative overflow-x-auto bg-[#283046] md:min-h-[345px]'>
            <table className='w-full text-sm text-[#d0d2d6] text-left'>
              <thead className='text-xs text-[#d0d2d6] border-b border-slate-700 uppercase'>
                <tr>
                  <th scope='col' className='py-3 px-4'>Item Name</th>
                  <th scope='col' className='py-3 px-4'>Receive qty</th>
                  <th scope='col' className='py-3 px-4'>Unit</th>
                  <th scope='col' className='py-3 px-4'>Price</th>
                  <th scope='col' className='py-3 px-4'>Total Amount</th>
                  <th scope='col' className='py-3 px-4'>Action</th>
                </tr>
              </thead>
              <tbody>
                  {
                   receiveDetails && receiveDetails.map((rec,i)=><tr key={i}>
                    <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>{rec.item_name}</td>
                    <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>{rec.item_qty}</td>
                    <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>{rec.item_unit}</td>
                    <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>{rec.item_price.toFixed(2)}</td>
                    <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>{rec.item_total.toFixed(2)}</td>
                    <td scope='row' className='py-1 px-4 font-medium'>
                      <button onClick={()=>dispatch(receive_details_item_delete({invoiceId:rec.rec_invoice,itemId:rec.item_id}))} className="p-[5px] rounded bg-red-600 hover:shadow-lg shadow-red-600/50">
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                  )}
              </tbody>
            </table>
            <hr className='w-[97%] border-2 border-slate-500 mx-auto'/>
            <div className="flex justify-between text-white items-center pl-4 pr-[240px] mb-5">
                <div>Total Amount :</div>
                <div>{receiveTotalPerInvoice[0]?.total.toFixed(2)}</div>
              </div>
          </div>

          </div>       
      </div>
    </div>
  );
};

export default ItemReceive;
