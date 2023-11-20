import React, { useState,useEffect, forwardRef } from "react";
import { Link,useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import { PropagateLoader } from 'react-spinners'
import {cssOverride} from '../../../utils/utils'
import { FaTrash } from "react-icons/fa";
import toast from 'react-hot-toast'
import {messageClear,last_invoice_number_show,get_customers,get_products,get_terms,get_product_info,show_product_details,product_details_item_delete,invoice_create,order_status} from '../../../store/reducers/invoiceReducer'
import Select from 'react-select'
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment';


const InvoiceCreate = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {loader,successMessage,errorMessage,products,customers,terms,productInfo,invoiceProductDetails,lastInvoiceNumberShow,productTotalPerInvoice,orderStatus} = useSelector(state=>state.invoice)
  const {userInfo} = useSelector(state=>state.auth)
  
  const [state,setState] = useState({
    product_name:'',
    product_qty:'',
    product_price:''
  })
const [invoiceNumber,setInvoiceNumber] = useState('')
const [custId,setCustId] = useState('')
const [invoiceDate, setInvoiceDate] = useState(Date.now());
const [invoiceDueDate, setInvoiceDueDate] = useState(Date.now());
const [discount,setDiscount] = useState('')
const [clientNote,setClientNote] = useState('')
const [adjustment,setAdjustment] = useState('')
const [termId,setTermId] = useState('')
const [productId,setProductId] = useState('')

const [orderNumber,setOrderNumber] = useState('')

const inputHandle = (e)=>{
    setState({
        ...state,
        [e.target.name] : e.target.value
    })
}

const invoiceCreate = (e)=>{
  e.preventDefault()
  dispatch(invoice_create({
    state,
    invoiceNumber,
    orderNumber,
    custId,
    invoiceDate,
    invoiceDueDate,
    discount,
    clientNote,
    adjustment,
    termId,
    productId,
    userName:userInfo.name
  }))
}

useEffect(()=>{
    dispatch(order_status({orderNumber}))
},[orderNumber])

useEffect(()=>{
  if(successMessage){
    toast.success(successMessage)
    dispatch(messageClear())
    setState({
      product_name:'',
      product_qty:'',
      product_price:''
    })
    dispatch(show_product_details(invoiceNumber))
  }
  if(errorMessage){
    toast.error(errorMessage)
    dispatch(messageClear())
  }
},[successMessage,errorMessage])

useEffect(()=>{
  dispatch(get_customers())
  dispatch(get_terms())
  dispatch(last_invoice_number_show())
},[])

useEffect(()=>{
  dispatch(get_products({orderNumber}))
},[orderNumber])
// useEffect(()=>{
// dispatch(get_invoice_for_update(invoiceNumber))
// },[invoiceNumber])
useEffect(()=>{
  if(productId){
    dispatch(get_product_info({productId,orderNumber}))
  }
},[productId])

useEffect(()=>{
    setState({
      product_price:productInfo?.product_price,
      product_qty:productInfo?.product_qty
    })
},[productId,productInfo])

useEffect(()=>{
  if(invoiceNumber){
      dispatch(show_product_details(invoiceNumber))
  }
},[invoiceNumber])


const termOptions = terms && terms.map((term)=>({
        "value" : term._id,
        "label" : term.term_name
    }))
const customerOptions = customers && customers.map((customer)=>({
      "value" : customer._id,
      "label" : customer.cus_company
  }))
  const productOptions =products && products.map((product)=>({
    "value" : product.product_id,
    "label" : product.product_code
}))
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
                <div className="pl-2 font-bold text-2xl">Invoice Create</div>
                <div onClick={()=>navigate('/admin/dashboard/invoice-list')} className="pr-2 text-white border-2 text-center border-green-700 rounded-full font-bold text-sm cursor-pointer bg-[#283046] px-3 py-1 mr-3">Invoice List</div>
            </div>
            <hr className='w-[100%] border-2 border-slate-500 mx-auto'/>
              <form onSubmit={invoiceCreate}> 
              <div className='flex flex-col mb-1 md:flex-row gap-1 w-full text-[#d0d2d6] mt-2'>
                <div className='flex flex-col w-[25%] gap-1'>
                    <label htmlFor='invoice_number' className="text-xs">Last Invoice: {lastInvoiceNumberShow[0]?.invoice_number}</label>
                    <input className='bg-[#FFFFFF]  px-2 py-1 border border-slate-700 rounded-[3px] outline-none focus:border-indigo-500 text-[#2A2D2E] text-xs' onChange={(e)=>setInvoiceNumber(e.target.value)} value={invoiceNumber} type='text' id='invoice_number' name='invoice_number' required/>
                </div>
                
                <div className='flex flex-col w-[25%] gap-1'>  
                <label htmlFor='cust_id' className="text-xs text-white">Customer:</label>                              
                    <div style={{width:220,color:'black'}}>                 
                          <Select
                          options={customerOptions}
                          defaultValue={custId}
                          placeholder="Choose Customer"
                          onChange={(e)=>setCustId(e.value)}
                          isSearchable
                          noOptionsMessage={()=>"no Customer found.."}
                          styles={customStyles}
                          required
                          />
                    </div>
                </div>

                <div className='flex flex-col w-[25%] gap-1'>
                <label htmlFor='invoice_date' className="text-xs text-white">Invoice Date:</label>   
                  <div className="bg-[#FFFFFF] text-black text-xs px-[8px] py-[5px] rounded-[3px]">
                    <DatePicker                        
                        selected={invoiceDate}
                        onChange={date=>setInvoiceDate(date)}
                        dateFormat="dd/MM/yyyy"
                        filterDate={date=>date.getDay() !== 5}
                        showYearDropdown
                        scrollableMonthYearDropdown
                    />
                  </div>
                </div>  
                <div className='flex flex-col w-[25%] gap-1'>
                <label htmlFor='invoice_due_date' className="text-xs text-white">Invoice Due Date:</label>   
                  <div className="bg-[#FFFFFF] text-black text-xs px-[8px] py-[5px] rounded-[3px]">
                    <DatePicker                        
                        selected={invoiceDueDate}
                        onChange={date=>setInvoiceDueDate(date)}
                        dateFormat="dd/MM/yyyy"
                        filterDate={date=>date.getDay() !== 5}
                        showYearDropdown
                        scrollableMonthYearDropdown
                    />
                  </div>
                </div> 
              </div>

              <div className='flex flex-col mb-1 md:flex-row gap-1 w-full text-[#d0d2d6] mt-2'>
                    <div className='flex flex-col w-[25%] gap-1'>
                        <label htmlFor='discount' className="text-xs">discount (optional):</label>
                        <input className='bg-[#FFFFFF]  px-4 py-1 border border-slate-700 rounded-[3px] outline-none focus:border-indigo-500 text-[#2A2D2E] text-xs' onChange={(e)=>setDiscount(e.target.value)} value={discount} type='number' min="0" step="any" id='discount' name='discount'/>
                    </div>
                    <div className='flex flex-col w-[25%] gap-1'>
                        <label htmlFor='adjustment' className="text-xs">Adjustment (optional):</label>
                        <input className='bg-[#FFFFFF] px-4 py-1 border border-slate-700 rounded-[3px] outline-none focus:border-indigo-500 text-[#2A2D2E] text-xs' onChange={(e)=>setAdjustment(e.target.value)} value={adjustment} type='number' min="0" step="any" id='adjustment' name='adjustment'/>
                    </div>
                    <div className='flex flex-col w-[25%] gap-1'>
                            <label htmlFor='client_note' className="text-xs">Client Note (optional):</label>
                            <input className='bg-[#FFFFFF] px-4 py-1 border border-slate-700 rounded-[3px] outline-none focus:border-indigo-500 text-[#2A2D2E] text-xs' onChange={(e)=>setClientNote(e.target.value)} value={clientNote} type='text' id='client_note' name='client_note'/>
                    </div>
                    <div className='flex flex-col w-[25%] gap-1'>  
                    <label htmlFor='term_id' className="text-xs text-white">Term:</label>                              
                        <div style={{width:220,color:'black'}}>                 
                              <Select
                              options={termOptions}
                              defaultValue={termId}
                              placeholder="Choose Term"
                              onChange={(e)=>setTermId(e.value)}
                              isSearchable
                              noOptionsMessage={()=>"no term found.."}
                              styles={customStyles}
                              required
                              />
                        </div>
                    </div>
              </div>

          
                    <div className='flex flex-col mb-1 md:flex-row gap-1 w-full text-[#d0d2d6] mt-2'>
                    <div className='flex flex-col w-[25%]  text-[#333] gap-1'>
                    <label htmlFor='order_number' className="text-xs text-white">Order Status: <span className='text-green-500'>{orderStatus && orderStatus.status}</span></label>
                    <input className='bg-[#FFFFFF]  px-4 py-1 border border-slate-700 rounded-[3px] outline-none focus:border-indigo-500 text-[#2A2D2E] text-xs' onChange={(e)=>setOrderNumber(e.target.value)} value={orderNumber} type='text' id='order_number' name='order_number' placeholder="Search order" required/>
                    </div>

                        <div className='flex flex-col w-[25%]  text-[#333] gap-1'>
                        <label htmlFor='product_code' className="text-xs text-white">Product Code:</label>
                        <div style={{width:220,color:'black'}}>
                        <Select
                          options={productOptions}
                          defaultValue={productId}
                          placeholder="Choose Product"
                          onChange={(e)=>setProductId(e.value)}
                          isSearchable
                          noOptionsMessage={()=>"no product found.."}
                          styles={customStyles}
                          required
                          />
                          </div>
                          <span className="text-sm text-white">{productInfo?.product_name}</span>
                        </div>
                        <div className='flex flex-col w-[25%] gap-1'>
                            <label htmlFor='product_qty' className="text-xs">Product Qty:</label>
                            <input className='bg-[#FFFFFF]  px-4 py-1 border border-slate-700 rounded-[3px] outline-none focus:border-indigo-500 text-[#2A2D2E] text-xs' onChange={inputHandle} value={state.product_qty} type='number' min="0" step="any" id='product_qty' name='product_qty' required/>
                        </div>
                        <div className='flex flex-col w-[25%] gap-1'>
                            <label htmlFor='product_price' className="text-xs">Product Price:</label>
                            <input className='bg-[#FFFFFF] px-4 py-1 border border-slate-700 rounded-[3px] outline-none focus:border-indigo-500 text-[#2A2D2E] text-xs' onChange={inputHandle} value={state.product_price} type='number' min="0" step="any" id='product_price' name='product_price' required/>
                        </div>
                        <div className='flex flex-col w-[25%] mt-5 gap-1'>
                        <button type="submit" className='bg-blue-500 px-2 mb-3 py-[5px] rounded-[4px] text-white text-xs hover:shadow-blue-500/50 hover:shadow-md font-bold'> Add </button>
                        </div>
                    </div>
                    <div>
                </div>      
              </form>
            </div>

            <div className='relative overflow-x-auto bg-[#283046] md:min-h-[365px]'>
            <table className='w-full text-xs text-[#d0d2d6] text-left'>
              <thead className='text-xs text-[#d0d2d6] border-b border-slate-700 uppercase'>
                <tr>
                  <th scope='col' className='py-3 px-4'>Order Number</th>
                  <th scope='col' className='py-3 px-4'>Product Code</th>
                  <th scope='col' className='py-3 px-4'>Product Name</th>
                  <th scope='col' className='py-3 px-4'>Product qty</th>
                  <th scope='col' className='py-3 px-4'>Product Price</th>
                  <th scope='col' className='py-3 px-4'>Total Amount</th>
                  <th scope='col' className='py-3 px-4'>Action</th>
                </tr>
              </thead>
              <tbody>
                  {
                   invoiceProductDetails && invoiceProductDetails.map((prod,i)=><tr key={i}>
                     <td scope='row' className='py-1 px-4 font-medium text-xs whitespace-nowrap'>{prod.order_number}</td>
                     <td scope='row' className='py-1 px-4 font-medium text-xs whitespace-nowrap'>{prod.product_code}</td>
                    <td scope='row' className='py-1 px-4 font-medium text-xs whitespace-nowrap'>{prod.product_name}</td>
                    <td scope='row' className='py-1 px-4 font-medium text-xs whitespace-nowrap'>{prod.product_qty}</td>
                    <td scope='row' className='py-1 px-4 font-medium text-xs whitespace-nowrap'>{prod.product_price.toFixed(2)}</td>
                    <td scope='row' className='py-1 px-4 font-medium text-xs whitespace-nowrap'>{prod.product_total.toFixed(2)}</td>
                    <td scope='row' className='py-1 px-4 font-medium text-xs'>
                      <button onClick={()=>dispatch(product_details_item_delete({invoiceId:prod.invoice_number,productId:prod.product_id}))} className="p-[5px] rounded bg-red-600 hover:shadow-lg shadow-red-600/50">
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
                <div>{productTotalPerInvoice[0]?.total.toFixed(2)}</div>
              </div>
          </div>

          </div>       
      </div>
    </div>
  );
};

export default InvoiceCreate;
