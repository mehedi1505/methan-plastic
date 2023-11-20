import React, { useState,useEffect, forwardRef } from "react";
import { Link,useNavigate,useParams} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import { PropagateLoader } from 'react-spinners'
import {cssOverride} from '../../../utils/utils'
import { FaTrash } from "react-icons/fa";
import toast from 'react-hot-toast'
import {messageClear,get_customers,get_products,get_terms,get_product_info,show_product_details,product_details_item_delete,invoice_create,invoice_get_by_id,invoice_info_update} from '../../../store/reducers/invoiceReducer'
import Select from 'react-select'
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment';


const InvoiceEdit = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { invoiceId } = useParams()
  const {loader,successMessage,errorMessage,products,customers,terms,productInfo,invoiceProductDetails,lastInvoiceNumber,productTotalPerInvoice,editProductInfo} = useSelector(state=>state.invoice)
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
const updateInfo = (e)=>{
  e.preventDefault()
  const obj = {
    invoice_date:invoiceDate,
    invoice_due_date:invoiceDueDate,
    cust_id:custId,
    term_id:termId,
    discount:discount,
    adjustment:adjustment,
    client_note:clientNote,
    invoiceId:invoiceId,
    userName:userInfo.name
  }
  dispatch(invoice_info_update(obj))
}
useEffect(()=>{
    if(invoiceId){
      dispatch(invoice_get_by_id(invoiceId))
    }
  },[invoiceId])
 
useEffect(()=>{
  if(editProductInfo.length>0){
    setInvoiceNumber(editProductInfo[0]?.invoice_number)
    setCustId(editProductInfo[0]?.customer[0]?._id)
    setTermId(editProductInfo[0]?.term[0]?._id)
    setDiscount(editProductInfo[0]?.discount)
    setAdjustment(editProductInfo[0]?.adjustment)
    setClientNote(editProductInfo[0]?.client_note)
    setInvoiceDate(editProductInfo[0]?.invoice_date)
    setInvoiceDueDate(editProductInfo[0]?.invoice_due_date)
  }
 },[editProductInfo]) 
useEffect(()=>{
  if(successMessage){
    toast.success(successMessage)
    dispatch(messageClear())
    setState({
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
},[])

useEffect(()=>{
  dispatch(get_products({orderNumber}))
},[orderNumber])

useEffect(()=>{
  if(productId){
    dispatch(get_product_info({productId,orderNumber}))
  }
},[productId])
useEffect(()=>{
  if(productInfo){
    setState({
      product_price:productInfo?.product_price,
      product_qty:productInfo?.product_qty
    })
  }
},[productInfo,productId])

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
                <div className="pl-2 font-bold text-2xl">Invoice Edit</div>
                <div onClick={()=>navigate('/admin/dashboard/invoice-list')} className="pr-2 text-white font-bold text-sm cursor-pointer bg-[#283046] px-3 py-1 mr-3">Invoice List</div>
            </div>
            <hr className='w-[100%] border-2 border-slate-500 mx-auto'/>
              <form onSubmit={invoiceCreate}> 
              <div className='flex flex-col mb-1 md:flex-row gap-1 w-full text-[#d0d2d6] mt-2'>
                <div className='flex flex-col w-[15%] gap-1'>
                    <label htmlFor='invoice_number' className="text-xs">Invoice Number:</label>
                    <input className='bg-[#FFFFFF]  px-2 py-1 border border-slate-700 rounded-[3px] outline-none focus:border-indigo-500 text-[#2A2D2E] text-xs' onChange={(e)=>setInvoiceNumber(e.target.value)} value={invoiceNumber} type='text' id='invoice_number' name='invoice_number' required readOnly={true}/>
                </div>
                
                <div className='flex flex-col w-[25%] gap-1'>  
                <label htmlFor='cust_id' className="text-xs text-white">Customer:</label>                              
                    <div style={{width:220,color:'black'}}>                 
                          <Select
                          options={customerOptions}
                          value={customerOptions.find(option=>option.value === custId)}  
                          placeholder="Choose Customer"
                          onChange={(e)=>setCustId(e.value)}
                          isSearchable
                          noOptionsMessage={()=>"no Customer found.."}
                          styles={customStyles}
                          required
                          />
                    </div>
                </div>

                <div className='flex flex-col w-[21%] gap-1'>
                <label htmlFor='invoice_date' className="text-xs text-white">Invoice Date:</label>   
                  <div className="bg-[#FFFFFF] text-black px-[3px] py-[1px] rounded-[3px]">
                    <DatePicker                        
                        selected={new Date(invoiceDate)}
                        onChange={date=>setInvoiceDate(date)}
                        dateFormat="dd/MM/yyyy"
                        filterDate={date=>date.getDay() !== 5}
                        showYearDropdown
                        scrollableMonthYearDropdown
                    />
                  </div>
                </div>  
                <div className='flex flex-col w-[21%] gap-1'>
                <label htmlFor='invoice_due_date' className="text-xs text-white">Invoice Due Date:</label>   
                  <div className="bg-[#FFFFFF] text-black px-[3px] py-[1px] rounded-[3px]">
                    <DatePicker                        
                        selected={new Date(invoiceDueDate)}
                        onChange={date=>setInvoiceDueDate(date)}
                        dateFormat="dd/MM/yyyy"
                        filterDate={date=>date.getDay() !== 5}
                        showYearDropdown
                        scrollableMonthYearDropdown
                    />
                  </div>
                </div> 
                <div className='flex flex-col w-[16%] gap-1'>
                        <label htmlFor='discount' className="text-xs">discount (optional):</label>
                        <input className='bg-[#FFFFFF]  px-4 py-1 border border-slate-700 rounded-[3px] outline-none focus:border-indigo-500 text-[#2A2D2E] text-xs' onChange={(e)=>setDiscount(e.target.value)} value={discount} type='number' min="0" step="any" id='discount' name='discount'/>
                    </div>

              </div>

              <div className='flex flex-col mb-1 md:flex-row gap-1 w-full text-[#d0d2d6] mt-2'>
          
                    <div className='flex flex-col w-[15%] gap-1'>
                        <label htmlFor='adjustment' className="text-xs">Adjustment (optional):</label>
                        <input className='bg-[#FFFFFF] px-4 py-1 border border-slate-700 rounded-[3px] outline-none focus:border-indigo-500 text-[#2A2D2E] text-xs' onChange={(e)=>setAdjustment(e.target.value)} value={adjustment} type='number' min="0" step="any" id='adjustment' name='adjustment'/>
                    </div>
                    <div className='flex flex-col w-[25%] gap-1'>  
                    <label htmlFor='term_id' className="text-xs text-white">Term (optional):</label>                              
                        <div style={{width:220,color:'black'}}>                 
                              <Select
                              options={termOptions}
                              value={termOptions.find(option=>option.value === termId)} 
                              placeholder="Choose Term"
                              onChange={(e)=>setTermId(e.value)}
                              isSearchable
                              noOptionsMessage={()=>"no term found.."}
                              styles={customStyles}
                              />
                        </div>
                    </div>
                    <div className='flex flex-col w-[42%] gap-1'>
                            <label htmlFor='client_note' className="text-xs">Client Note (optional):</label>
                            <input className='bg-[#FFFFFF] px-4 py-1 border border-slate-700 rounded-[3px] outline-none focus:border-indigo-500 text-[#2A2D2E] text-xs' onChange={(e)=>setClientNote(e.target.value)} value={clientNote} type='text' id='client_note' name='client_note'/>
                    </div>
                    <div className='flex flex-col mt-[22px] w-[140px] gap-[1px]'>
                        <button type="submit" onClick={updateInfo} className='bg-blue-500 text-xs px-2 py-1 mb-3 text-white hover:shadow-blue-500/50 hover:shadow-md font-bold rounded-sm'> Update </button>
                    </div>

              </div>

          
                    <div className='flex flex-col mb-1 md:flex-row gap-1 w-full text-[#d0d2d6] mt-2'>
                    <div className='flex flex-col w-[20%]  text-[#333] gap-1'>
                    <label htmlFor='order_number' className="text-xs text-white">Order Number:</label>
                    <input className='bg-[#FFFFFF]  px-4 py-1 border border-slate-700 rounded-[3px] outline-none focus:border-indigo-500 text-[#2A2D2E] text-xs' onChange={(e)=>setOrderNumber(e.target.value)} value={orderNumber} type='text' id='order_number' name='order_number' required/>
                    </div>
                        <div className='flex flex-col w-[20%]  text-[#333] gap-1'>
                        <label htmlFor='product_code' className="text-xs text-white">Product Code:</label>
                        <div style={{width:180,color:'black'}}>
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
                        <div className='flex flex-col w-[20%] gap-1'>
                            <label htmlFor='product_qty' className="text-xs">Product Qty:</label>
                            <input className='bg-[#FFFFFF]  px-4 py-1 border border-slate-700 rounded-[3px] outline-none focus:border-indigo-500 text-[#2A2D2E] text-xs' onChange={inputHandle} value={state.product_qty} type='number' min="0" step="any" id='product_qty' name='product_qty' required/>
                        </div>
                        <div className='flex flex-col w-[20%] gap-1'>
                            <label htmlFor='product_price' className="text-xs">Product Price:</label>
                            <input className='bg-[#FFFFFF] px-4 py-1 border border-slate-700 rounded-[3px] outline-none focus:border-indigo-500 text-[#2A2D2E] text-xs' onChange={inputHandle} value={state.product_price} type='number' min="0" step="any" id='product_price' name='product_price' required/>
                        </div>
                        <div className='flex flex-col w-[20%] mt-5 gap-1'>
                        <button type="submit" className='bg-blue-500 px-2 mb-3 py-[5px] rounded-[4px] text-white text-xs hover:shadow-blue-500/50 hover:shadow-md font-bold'> Add </button>
                        </div>
                    </div>
                    <div>
                </div>      
              </form>
            </div>

            <div className='relative overflow-x-auto bg-[#283046] md:min-h-[355px]'>
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
            <div className="flex justify-between text-white items-center pl-4 pr-[150px] mb-5">
                <div>Total Amount :</div>
                <div>{productTotalPerInvoice[0]?.total.toFixed(2)}</div>
              </div>
          </div>

          </div>       
      </div>
    </div>
  );
};

export default InvoiceEdit;
