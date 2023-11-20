import React, { useState,useEffect, forwardRef } from "react";
import { Link,useNavigate,useParams} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import { PropagateLoader } from 'react-spinners'
import {cssOverride} from '../../../utils/utils'
import { FaTrash } from "react-icons/fa";
import toast from 'react-hot-toast'
import {messageClear,get_receive_types,get_vendors,get_items,get_item_info,item_receive,show_item_details,receive_details_item_delete,receive_get_by_id,receive_info_update} from '../../../store/reducers/receiveReducer'
import Select from 'react-select'
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment';

const ItemReceiveEdit = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { receiveId } = useParams()
  const {loader,successMessage,errorMessage,types,vendors,items,itemInfo,receiveDetails,receiveItem,receiveTotalPerInvoice} = useSelector(state=>state.item_receive)
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
const [selectedDate, setSelectedDate] = useState(Date.now("dd/MM/yyyy"));
const [recTypeId,setRecTypeId] = useState('')
const [vendorId,setVendorId] = useState('')
const [itemId,setItemId] = useState('')

const inputHandle = (e)=>{
    setState({
        ...state,
        [e.target.name] : e.target.value
    })
}
useEffect(()=>{
  if(receiveId){
    dispatch(receive_get_by_id(receiveId))
  }
},[receiveId])

useEffect(()=>{
 if(receiveItem.length>0){
  setInvoice(receiveItem[0].rec_invoice)
  setRecTypeId(receiveItem[0].receivetype[0]._id)
  setVendorId(receiveItem[0].vendor[0]._id)
  setDiscount(receiveItem[0].discount)
  setAdjustment(receiveItem[0].adjustment_qty)
  setReceiveby(receiveItem[0].rec_by)
  setNote(receiveItem[0].rec_note)
  setSelectedDate(receiveItem[0].rec_date)
 }
},[receiveItem])

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
const updateInfo = (e)=>{
  e.preventDefault()
  const obj = {
    rec_date:selectedDate,
    rec_type_id:recTypeId,
    vendor_id:vendorId,
    discount:discount,
    adjustment_qty:adjustment_qty,
    rec_by:rec_by,
    rec_note:rec_note,
    receiveId:receiveId,
    userName:userInfo.name
  }
  dispatch(receive_info_update(obj))
}
useEffect(()=>{
  if(itemInfo.length>0){
    setState({
      item_unit:itemInfo[0]?.unit[0]?.unit_name,
      item_price:itemInfo[0]?.price
    })
  }
},[itemId,itemInfo])

  useEffect(()=>{
    if(successMessage){
      toast.success(successMessage)
      dispatch(messageClear())
      setState({
        item_qty:'',
        item_unit:'',
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


const typeOptions = types.map((type)=>({
        "value" : type._id,
        "label" : type.rec_type_name
    }))
const vendorOptions = vendors && vendors.map((vendor)=>({
      "value" : vendor._id,
      "label" : vendor.vendor_company
  }))
  const itemOptions = items && items.map((item)=>({
    "value" : item._id,
    "label" : item.code
}))
const customStyles = {
  control: base => ({
    ...base,
    height: 25,
    minHeight: 25,
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
    <div className="mx-auto py-1 md:px-[2px]">
          <div className="pl-2 w-[930px] mt-[-25px]">
            <div className="bg-[#283046] text-[#d0d2d6] height-screen lg:height-auto px-3 p-3">
            <div className="flex justify-between items-center bg-[#283046] py-2 md:px-[2px] text-white">
                <div className="pl-2 font-bold text-2xl">Item Receive Edit</div>
                <div onClick={()=>navigate('/admin/dashboard/item-receive-list')} className="pr-2 font-bold text-sm cursor-pointer bg-[#3ab0d8] px-3 py-1 mr-3">Item Receive List</div>
            </div>
            <hr className='border-2 border-slate-500 w-[100%] mx-auto'/>
              <form onSubmit={itemReceive}> 
              <div className='flex flex-col mb-2 md:flex-row gap-2 w-full text-[#d0d2d6] mt-2'>
                <div className='flex flex-col w-[24%] gap-[1px]'>
                    <label htmlFor='rec_invoice' className="text-sm">Receive Invoice:</label>
                    <input className='bg-[#D6E3EA] text-xs px-4 py-1 border border-slate-700 rounded-md outline-none focus:border-indigo-500 text-[#2A2D2E]' onChange={(e)=>setInvoice(e.target.value)} value={rec_invoice} type='text' id='rec_invoice' name='rec_invoice' required readOnly={true}/>
                </div>

                <div className='flex flex-col w-[24%] gap-[1px]'>
                <label htmlFor='rec_date' className="text-sm text-white mb-[1px]">Receive Date:</label>   
                  <div className="bg-[#D6E3EA] text-black text-xs px-[10px] py-[4px] rounded-md">
                    <DatePicker                        
                        selected={new Date(selectedDate)}
                        onChange={date=>setSelectedDate(date)}
                        dateFormat="dd/MM/yyyy"
                        filterDate={date=>date.getDay() !== 5}
                        showYearDropdown
                        scrollableMonthYearDropdown
                        // style={{ 
                        //   backgroundColor: '#D6E3EA',
                        //   color: '#333',
                        //   borderRadius: '4px',
                        //   padding: '2px',
                        //   fontSize: '16px',
                        //   height:'35px'
                        // }}
                    />
                  </div>
                </div>  

                <div className='flex flex-col text-xs  w-[24%] gap-[1px]'>  
                <label htmlFor='rec_type_id' className="text-sm text-white">Receive Type:</label>                              
                    <div style={{width:218,color:'black'}}> 
                                  
                          <Select
                          options={typeOptions}
                          value={typeOptions.find(option=>option.value === recTypeId)}                        
                          onChange={(e)=>setRecTypeId(e.value)}
                          isSearchable
                          noOptionsMessage={()=>"no type found.."}
                          styles={customStyles}
                          />
                    </div>
                </div>


                <div className='flex flex-col text-xs  w-[24%] gap-[1px]'>  
                <label htmlFor='rec_type_id' className="text-sm text-white">Vendor:</label>                              
                    <div style={{width:218,color:'black'}}>                 
                          <Select
                          options={vendorOptions}
                          value={vendorOptions.find(option=>option.value === vendorId)}
                          onChange={(e)=>setVendorId(e.value)}
                          isSearchable
                          noOptionsMessage={()=>"no vendor found.."}
                          styles={customStyles}
                          />
                    </div>
                </div>

              </div>

              <div className='flex flex-col mb-2 md:flex-row gap-1 w-full text-[#d0d2d6] mt-2'>
                    <div className='flex flex-col w-[11%] gap-[1px]'>
                        <label htmlFor='discount' className="text-sm">Discount:</label>
                        <input className='bg-[#D6E3EA] text-xs px-4 py-1 border border-slate-700 outline-none focus:border-indigo-500 text-[#2A2D2E] rounded-md' onChange={(e)=>setDiscount(e.target.value)} value={discount} type='number' min="0" id='discount' name='discount'/>
                    </div>
                    <div className='flex flex-col w-[12%] gap-[1px] rounded-md'>
                        <label htmlFor='adjustment_qty' className="text-sm">Adjust Qty:</label>
                        <input className='bg-[#D6E3EA] text-xs px-4 py-1 border border-slate-700 outline-none focus:border-indigo-500 text-[#2A2D2E] rounded-md' onChange={(e)=>setAdjustment(e.target.value)} value={adjustment_qty} type='number' min="0" id='adjustment_qty' name='adjustment_qty'/>
                    </div>
                    <div className='flex flex-col w-[25%] gap-[1px]'>
                            <label htmlFor='rec_by' className="text-sm">Receive by:</label>
                            <input className='bg-[#D6E3EA] text-xs px-4 py-1 border border-slate-700 outline-none focus:border-indigo-500 text-[#2A2D2E] rounded-md' onChange={(e)=>setReceiveby(e.target.value)} value={rec_by} type='text' id='rec_by' name='rec_by'/>
                    </div>
                    <div className='flex flex-col w-[40%] gap-[1px]'>
                            <label htmlFor='rec_note' className="text-sm">Receive note:</label>
                            <input className='bg-[#D6E3EA] text-xs px-4 py-1 border border-slate-700 outline-none focus:border-indigo-500 text-[#2A2D2E] rounded-md' onChange={(e)=>setNote(e.target.value)} value={rec_note} type='text' id='rec_note' name='rec_note'/>
                    </div>
                    <div className='flex flex-col mt-[22px] w-[72px] gap-[1px]'>
                        <button type="submit" onClick={updateInfo} className='bg-blue-500 text-xs px-2 py-1 mb-3 text-white hover:shadow-blue-500/50 hover:shadow-md font-bold rounded-md'> Update </button>
                    </div>
                </div>
                <hr className='border-2 border-slate-500 w-[100%] mx-auto'/>
          
                    <div className='flex flex-col mb-2 md:flex-row gap-2 w-full text-[#d0d2d6] mt-2'>
                        <div className='flex flex-col w-[25%] text-xs text-[#333] gap-[1px]'>
                        <label htmlFor='item_code' className="text-sm text-[#d0d2d6] ">Item Code:</label>
                        <Select
                          options={itemOptions}
                          defaultValue={itemId || ''}
                          placeholder="Choose Item"
                          onChange={(e)=>setItemId(e.value)}
                          isSearchable
                          noOptionsMessage={()=>"no item found.."}
                          styles={customStyles}
                          />
                          <span className="text-sm text-white">{itemInfo[0]?.name}</span>
                        </div>
                        <div className='flex flex-col w-[20%] gap-[1px]'>
                            <label htmlFor='item_qty' className="text-sm">Item qty:</label>
                            <input className='bg-[#D6E3EA] text-xs px-4 py-1 border border-slate-700 outline-none focus:border-indigo-500 rounded-md text-[#2A2D2E]' onChange={inputHandle} value={state.item_qty} type='number' min="0" step="any" id='item_qty' name='item_qty' required/>
                        </div>
                        <div className='flex flex-col w-[20%] gap-[1px]'>
                            <label htmlFor='item_unit' className="text-sm">Item unit:</label>
                            <input className='bg-[#D6E3EA] text-xs px-4 py-1 border border-slate-700 rounded-md outline-none focus:border-indigo-500 text-[#2A2D2E]' onChange={inputHandle} value={state.item_unit || ''} type='text' id='item_unit' name='item_unit' required/>
                        </div>
                        <div className='flex flex-col w-[20%] gap-[1px]'>
                            <label htmlFor='price' className="text-sm">Price:</label>
                            <input className='bg-[#D6E3EA] text-xs px-4 py-1 border border-slate-700 rounded-md outline-none focus:border-indigo-500 text-[#2A2D2E]' onChange={inputHandle} value={state.item_price || ''} type='number' min="0" step="any" id='item_price' name='item_price' required/>
                        </div>
                        <div className='flex flex-col w-[10%] mt-[22px] gap-[1px]'>
                        <button type="submit" className='bg-blue-500 rounded-md text-xs px-2 py-1 mb-3 text-white hover:shadow-blue-500/50 hover:shadow-md font-bold'> Add </button>
                        </div>
                    </div>
                    <div>
                </div>      
                <div className='mt-2'>
                </div>
              </form>
              <div className="flex flex-wrap w-[910px]">
            <div className='relative overflow-x-auto bg-[#283046] w-full min-h-[340px] '>
            <table className='text-xs text-[#d0d2d6] text-left mb-[10px] w-full'>
              <thead className='text-xs text-[#d0d2d6] border-b border-slate-700 uppercase'>
                <tr>
                  <th scope='col' className='py-3 px-4'>Item Name</th>
                  <th scope='col' className='py-3 px-4'>Unit</th>
                  <th scope='col' className='py-3 px-4'>Receive qty</th>
                  <th scope='col' className='py-3 px-4'>Price</th>
                  <th scope='col' className='py-3 px-4'>Total Amount</th>
                  <th scope='col' className='py-3 px-4'>Action</th>
                </tr>
              </thead>
              <tbody>
                  {
                    receiveDetails.map((rec,i)=><tr key={i}>
                    <td scope='row' className='py-1 px-4 font-medium text-xs whitespace-nowrap'>{rec.item_name}</td>
                    <td scope='row' className='py-1 px-4 font-medium text-xs whitespace-nowrap'>{rec.item_unit}</td>
                    <td scope='row' className='py-1 px-4 font-medium text-xs whitespace-nowrap'>{rec.item_qty.toFixed(2)}</td>
                    <td scope='row' className='py-1 px-4 font-medium text-xs whitespace-nowrap'>{rec.item_price.toFixed(2)}</td>
                    <td scope='row' className='py-1 px-4 font-medium text-xs whitespace-nowrap'>{rec.item_total.toFixed(2)}</td>
                    <td scope='row' className='py-1 px-4 font-medium'>
                      <button onClick={()=>dispatch(receive_details_item_delete({invoiceId:rec.rec_invoice,itemId:rec.item_id}))} className="p-[5px] rounded bg-red-600 hover:shadow-lg shadow-red-600/50">
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                  )}
              </tbody>
       

            </table>
            <hr className='border-1 border-slate-500 w-[100%] mx-auto'/>
            <div className="flex justify-between text-white items-center pl-3 pr-[245px] mb-5">
                <div>Total Amount :</div>
                <div>{receiveTotalPerInvoice[0]?.total.toFixed(2)}</div>
              </div>
          </div>

          </div> 
            </div>

           
      </div>
    </div>
  );
};

export default ItemReceiveEdit;
