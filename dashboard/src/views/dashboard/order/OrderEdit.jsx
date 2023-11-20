import React, { useState,useEffect, forwardRef } from "react";
import { Link,useNavigate,useParams} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import { PropagateLoader } from 'react-spinners'
import {cssOverride} from '../../../utils/utils'
import { FaTrash } from "react-icons/fa";
import toast from 'react-hot-toast'
import {messageClear,get_order_customers,get_order_products,get_order_product_info,order_create,show_order_details,order_details_item_delete,order_get_by_id,order_info_update} from '../../../store/reducers/orderReducer'
import Select from 'react-select'
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment';


const OrderEdit = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { orderId } = useParams()

  const {loader,successMessage,errorMessage,products,customers,productInfo,lastOrderNumberShow,orderProductDetails,productTotalPerOrder,editOrderInfo} = useSelector(state=>state.order)
  const {userInfo} = useSelector(state=>state.auth)
  
  const [state,setState] = useState({
    product_name:'',
    product_qty:'',
    product_price:'',
  })
const [orderNumber,setOrderNumber] = useState('')
const [cusId,setCusId] = useState('')
const [orderDate, setOrderDate] = useState(Date.now());
const [deliveryDate, setDeliveryDate] = useState(Date.now());
const [discount,setDiscount] = useState('')
const [orderNote,setOrderNote] = useState('')
const [productId,setProductId] = useState('')
const [status,setStatus] = useState('')
const inputHandle = (e)=>{
    setState({
        ...state,
        [e.target.name] : e.target.value
    })
}

const orderCreate = (e)=>{
  e.preventDefault()
  dispatch(order_create({
    state,
    orderNumber,
    cusId,
    orderDate,
    deliveryDate,
    discount,
    orderNote,
    productId,
    userName:userInfo.name
  }))
}

const updateInfo = (e)=>{
  e.preventDefault()
  const obj = {
    order_date:orderDate,
    delivery_date:deliveryDate,
    cus_id:cusId,
    discount:discount,
    order_note:orderNote,
    status:status,
    orderId:orderId,
    userName:userInfo.name
  }
  dispatch(order_info_update(obj))
}

useEffect(()=>{
  if(orderId){
    dispatch(order_get_by_id(orderId))
  }
},[orderId])

useEffect(()=>{
  if(editOrderInfo.length>0){
    setOrderNumber(editOrderInfo[0]?.order_number)
    setCusId(editOrderInfo[0]?.customer[0]?._id)
    setOrderDate(editOrderInfo[0]?.order_date)
    setDeliveryDate(editOrderInfo[0]?.delivery_date)
    setDiscount(editOrderInfo[0]?.discount)
    setOrderNote(editOrderInfo[0]?.order_note)
    setStatus(editOrderInfo[0]?.status)
  }
 },[editOrderInfo]) 

useEffect(()=>{
  if(successMessage){
    toast.success(successMessage)
    dispatch(messageClear())
    setState({
      product_name:'',
      product_qty:'',
      product_price:''
    })
    setProductId("")
    dispatch(show_order_details(orderNumber))
  }
  if(errorMessage){
    toast.error(errorMessage)
    dispatch(messageClear())
  }
},[successMessage,errorMessage,orderNumber])

useEffect(()=>{
  dispatch(get_order_customers())
  dispatch(get_order_products())
},[])
// useEffect(()=>{
// dispatch(get_invoice_for_update(invoiceNumber))
// },[invoiceNumber])
useEffect(()=>{
  if(productId){
    dispatch(get_order_product_info(productId))
  }
},[productId])

useEffect(()=>{
  if(productInfo){
    setState({
      product_price:productInfo?.price
    })
  }
},[productInfo,productId])


useEffect(()=>{
  if(orderNumber){
      dispatch(show_order_details(orderNumber))
  }
},[orderNumber])

const customerOptions = customers && customers.map((customer)=>({
      "value" : customer._id,
      "label" : customer.cus_company
  }))
  const productOptions =products && products.map((product)=>({
    "value" : product._id,
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
const options = [
  { value: "pending", label: "Pending" },
  { value: "delivered", label: "Delivered" },
  { value: "partial-delivered", label: "Partial delivered" },
];
  return (
    <div className="mx-auto py-1 md:px-[2px]">
      <div className="flex flex-wrap w-[99%]">
          <div className="w-full pl-2 mt-[-25px]">
            <div className="bg-[#283046] text-[#d0d2d6] height-screen md:height-auto px-3 p-3">
            <div className="flex justify-between items-center bg-[#283046] py-2 md:px-[2px] text-white">
                <div className="pl-2 font-bold text-2xl">Order Edit</div>
                <div onClick={()=>navigate('/admin/dashboard/order-list')} className="pr-2 text-white border-2 text-center border-green-700 rounded-full font-bold text-sm cursor-pointer bg-[#283046] px-3 py-1 mr-3">Order List</div>
            </div>
            <hr className='w-[100%] border-2 border-slate-500 mx-auto'/>
              <form onSubmit={orderCreate}> 
              <div className='flex flex-col mb-1 md:flex-row gap-1 w-full text-[#d0d2d6] mt-2'>
                <div className='flex flex-col w-[25%] gap-1'>
                    <label htmlFor='order_number' className="text-xs">Last Order: {lastOrderNumberShow[0]?.order_number}</label>
                    <input className='bg-[#FFFFFF]  px-2 py-1 border border-slate-700 rounded-[3px] outline-none focus:border-indigo-500 text-[#2A2D2E] text-xs' onChange={(e)=>setOrderNumber(e.target.value)} value={orderNumber} type='text' id='order_number' name='order_number' required readOnly={true}/>
                </div>
                
                <div className='flex flex-col w-[25%] gap-1'>  
                <label htmlFor='cus_id' className="text-xs text-black">Customer:</label>                              
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
                <label htmlFor='order_date' className="text-xs text-white">Order Date:</label>   
                  <div className="bg-[#FFFFFF] text-black px-[8px] py-[1px] rounded-[3px]">
                    <DatePicker                        
                       selected={new Date(orderDate)}
                        onChange={date=>setOrderDate(date)}
                        dateFormat="dd/MM/yyyy"
                        filterDate={date=>date.getDay() !== 5}
                        showYearDropdown
                        scrollableMonthYearDropdown
                    />
                  </div>
                </div>  
                <div className='flex flex-col w-[25%] gap-1'>
                <label htmlFor='delivery_date' className="text-xs text-white">Delivery Date:</label>   
                  <div className="bg-[#FFFFFF] text-black px-[8px] py-[1px] rounded-[3px]">
                    <DatePicker                        
                        selected={new Date(deliveryDate)}
                        onChange={date=>setDeliveryDate(date)}
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
                    <div className='flex flex-col w-[52%] gap-1'>
                            <label htmlFor='order_note' className="text-xs">Order Note (optional):</label>
                            <input className='bg-[#FFFFFF] px-4 py-1 border border-slate-700 rounded-[3px] outline-none focus:border-indigo-500 text-[#2A2D2E] text-xs' onChange={(e)=>setOrderNote(e.target.value)} value={orderNote} type='text' id='order_note' name='order_note'/>
                    </div>
                    <div className='flex flex-col w-[17%] gap-[5px]'>
                        <label htmlFor='status' className="text-xs text-black">Status:</label>
                        <div style={{width:140,color:'black'}}>   
                        <Select
                          options={options}
                          value={options.find(option=>option.value === status)}
                          placeholder="Choose options"
                          onChange={(e)=>setStatus(e.value)}
                          styles={customStyles}
                          required
                          />
                          </div>
                        </div>
                    <div className='flex flex-col mt-[22px] w-[8%] gap-[1px]'>
                        <button type="submit" onClick={updateInfo} className='bg-blue-500 text-xs px-2 py-1 mb-3 text-white hover:shadow-blue-500/50 hover:shadow-md font-bold rounded-sm'> Update </button>
                    </div>
              </div>
              <hr className='w-[100%] border border-slate-500 mx-auto'/>
          
                    <div className='flex flex-col mb-1 md:flex-row gap-1 w-full text-[#d0d2d6] mt-2'>
                        <div className='flex flex-col w-[25%]  text-[#333] gap-1'>
                        <label htmlFor='product_code' className="text-xs text-white">Product Code:</label>
                        <div style={{width:220,color:'black'}}>
                        <Select
                          options={productOptions}
                          placeholder="Choose Product"
                          onChange={(e)=>setProductId(e.value)}
                          isSearchable
                          noOptionsMessage={()=>"no product found.."}
                          styles={customStyles}
                          required
                          />
                          </div>
                          <span className="text-sm text-white font-semibold">{productInfo?.product_name}</span>
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
                  <th scope='col' className='py-3 px-4'>Product Name</th>
                  <th scope='col' className='py-3 px-4'>Product qty</th>
                  <th scope='col' className='py-3 px-4'>Product Price</th>
                  <th scope='col' className='py-3 px-4'>Total Amount</th>
                  <th scope='col' className='py-3 px-4'>Action</th>
                </tr>
              </thead>
              <tbody>
                  {
                   orderProductDetails && orderProductDetails.map((ord,i)=><tr key={i}>
                    <td scope='row' className='py-1 px-4 font-medium text-xs whitespace-nowrap'>{ord.product_name}</td>
                    <td scope='row' className='py-1 px-4 font-medium text-xs whitespace-nowrap'>{ord.product_qty}</td>
                    <td scope='row' className='py-1 px-4 font-medium text-xs whitespace-nowrap'>{ord.product_price.toFixed(2)}</td>
                    <td scope='row' className='py-1 px-4 font-medium text-xs whitespace-nowrap'>{ord.product_total.toFixed(2)}</td>
                    <td scope='row' className='py-1 px-4 font-medium text-xs'>
                    <button onClick={()=>dispatch(order_details_item_delete({orderId:ord.order_number,productId:ord.product_id}))} className="p-[5px] rounded bg-red-600 hover:shadow-lg shadow-red-600/50">
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
                <div>{productTotalPerOrder[0]?.total.toFixed(2)}</div>
              </div>
<button  onClick={()=>navigate('/admin/dashboard/order-list')} className="bg-[#4ac25e] ml-3 px-3 py-1 rounded-sm font-semibold">Save & Go to Order list</button>
          </div>
          </div>       
      </div>
    </div>
  );
};

export default OrderEdit;