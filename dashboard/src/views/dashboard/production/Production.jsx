import React, { useState, useEffect, forwardRef } from "react";
import { Link,useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import { PropagateLoader } from 'react-spinners'
import {cssOverride} from '../../../utils/utils'
import { FaTrash } from "react-icons/fa";
import toast from 'react-hot-toast'
import Select from 'react-select'
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import {messageClear,get_products,get_bom_items,last_batch_number,show_product_price_by_id,get_bom_by_id,show_product_name_by_id,production_add} from '../../../store/reducers/productionReducer'

const Production = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {loader,successMessage,errorMessage,products,lastBatchNumber,bomItems,showPrice,productName} = useSelector(state=>state.production)
  const {userInfo} = useSelector(state=>state.auth)
  const [state,setState] = useState({
    product_qty:'',
    product_price:''
  })
  const [productId,setProductId] = useState('')
  // const [itemId,setItemId] = useState('')
  const [batch,setBatch] = useState('')
  const [selectedDate, setSelectedDate] = useState(Date.now());

const productAdd = (e)=>{
    e.preventDefault();
    dispatch(production_add({
      state:state,
      productId,
      selectedDate,
      batch,
      userName:userInfo.name
    }))
}

  useEffect(()=>{
    dispatch(get_products())
  },[])
  useEffect(()=>{
    dispatch(show_product_price_by_id(productId))
    setState({...state,product_price:showPrice?.price})
    dispatch(get_bom_items(productId))
  },[productId])

  useEffect(()=>{
    setState({...state,product_price:showPrice?.price})
  },[productId,showPrice])


  useEffect(()=>{
    dispatch(get_bom_by_id(productId))
  },[productId])
  useEffect(()=>{
    dispatch(last_batch_number())
  },[])

  useEffect(()=>{
    dispatch(show_product_name_by_id(productId))
    },[productId])
    useEffect(() => {
      if (successMessage) {
        toast.success(successMessage);
        dispatch(messageClear());
        setState({
          product_qty:'',
          product_price:''
        });
        setBatch('')
        dispatch(last_batch_number())
      }
      if (errorMessage) {
        toast.error(errorMessage);
        dispatch(messageClear());
      }
    }, [successMessage, errorMessage]);
  const productOptions = products && products.map((product)=>({
    "value" : product._id,
    "label" : product.product_code
  }))

  const customStyles = {
    control: base => ({
      ...base,
      height: 25,
      minHeight: 25,
      background:'#edf0f1',
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
    <div className='mx-auto w-[98%] mt-[-22px]'>

      <div className="bg-[#283046] w-[100%] mx-auto pt-4">
      <div className="flex justify-between mx-auto items-center bg-[#283046] text-white px-3 py-[16px]">
          <div className="text-2xl p-2 font-bold">Production Create</div>
          <div onClick={()=>navigate('/admin/dashboard/production-list')} className="border border-slate-500 py-1 px-4 rounded-full cursor-pointer">Production List</div>
      </div>
      </div>
      <form onSubmit={productAdd}>
      <div className="bg-[#283046] w-[100%] mx-auto pt-4">
      <table className="bg-[#283046] text-white border-collapse w-[98%] mx-auto">
          <tr className='text-sm'>
            <th class="border-2 border-slate-600 w-[15%] text-left px-2 py-2">Last Batch:{lastBatchNumber[0]?.batch_number}</th>
            <th class="border-2 border-slate-600 w-[25%] text-left px-2 py-2">Search Product Code</th>
            <th class="border-2 border-slate-600 w-[13%] text-left px-2 py-2">Production Date</th>
            <th class="border-2 border-slate-600 w-[10%] text-left px-2 py-2">Product Qty</th>
            <th class="border-2 border-slate-600 w-[12%] text-left px-2 py-2">Product Price</th>
            <th class="border-2 border-slate-600 w-[20%] text-left px-2 py-2">Total Price</th>
          </tr>
          <tr>
            <td class="border-2 border-slate-600 px-2 py-1">
                <input onChange={(e)=>setBatch(e.target.value)} value={batch} className='bg-[#edf0f1] w-[130px] px-2 py-1 border border-slate-100 rounded-[3px] outline-none focus:border-indigo-500 text-[#2A2D2E] text-xs' type='text' id='batch_number' name='batch_number' required/>
            </td>
            <td class="border-2 border-slate-600 px-2 py-1">
                <div style={{width:200,color:'black'}}>                 
                    <Select
                    options={productOptions}
                    defaultValue={productId}
                    placeholder="Choose Product"
                    onChange={(e)=>setProductId(e.value)}
                    isSearchable
                    noOptionsMessage={()=>"no vendor found.."}
                    styles={customStyles}
                    required
                    />
              </div>
              
            </td>
            <td class="border-2 border-slate-600 px-2 py-1">
            <div className="bg-[#edf0f1] text-black text-xs px-[8px] py-[5px] rounded-[3px]">
                    <DatePicker                        
                        selected={selectedDate}
                        onChange={date=>setSelectedDate(date)}
                        dateFormat="dd/MM/yyyy"
                        filterDate={date=>date.getDay() !== 5}
                        showYearDropdown
                        scrollableMonthYearDropdown
                    />
                  </div>
            </td>
            <td class="border-2 border-slate-600 px-2 py-1">
            <input onChange={(e)=>setState({...state,product_qty: e.target.value})} value={state.product_qty} className='bg-[#edf0f1] px-2 py-1 w-[80px] border border-slate-100 rounded-[3px] outline-none focus:border-indigo-500 text-[#2A2D2E] text-xs' type='text' id='product_qty' name='product_qty'/>
            </td>
            <td class="border-2 border-slate-600 px-2 py-1">
            <input onChange={(e)=>setState({...state,product_price: e.target.value})} value={state.product_price} className='bg-[#edf0f1] px-2 py-1 w-[100px] border border-slate-100 rounded-[3px] outline-none focus:border-indigo-500 text-[#2A2D2E] text-xs' type='text' id='batch_number' name='batch_number'/>
            </td>
            <td class="border-2 border-slate-600 w-[150px] text-xs px-2 py-1">{state.product_price?(state.product_qty * state.product_price).toFixed(2):'0.00'}</td>
          </tr>

        </table>



        <div className="bg-[#283046] w-[100%] mx-auto">
        <div className="flex ml-[160px]">
           {
            productName ? <span className='text-white text-xs'>Name: {productName?.product_name}</span>:''
          }
        </div>
        <div className="mt-2 pl-[10px]">
          <button type="submit" className="bg-green-500 w-[150px] px-8 py-1 rounded-sm text-white font-bold">Save</button>
        </div>
     
        </div>
      </div>
        
      </form>

    <div className="bg-[#283046] min-h-[378px] w-[100%] mx-auto pt-6">
      <p className='text-white ml-3 font-semibold'>Bill of Material info:</p>
    <table className="bg-[#283046] border-collapse text-white w-[98%] mx-auto py-4">
          <tr>
            <th class="border border-slate-600 w-[25%] text-left text-xs px-2 py-2">Item Name</th>
            <th class="border border-slate-600 w-[10%] text-left text-xs px-2 py-2">Qty</th>
            <th class="border border-slate-600 w-[10%] text-left text-xs px-2 py-2">Unit</th>
            <th class="border border-slate-600 w-[10%] text-left text-xs px-2 py-2">Price</th>
            <th class="border border-slate-600 w-[15%] text-left text-xs px-2 py-2">Total RM Qty</th>
            <th class="border border-slate-600 w-[20%] text-left text-xs px-2 py-2">Total Wastage</th>
          </tr>
  {
    bomItems && bomItems.map((item)=><tr>
    <td class="border border-slate-600 px-2 py-2 text-xs">{item.item[0]?.item_name}</td>
    <td class="border border-slate-600 px-2 py-2 text-xs">{item.item_used_qty.toFixed(4)}</td>
    <td class="border border-slate-600 px-2 py-2 text-xs">{item.item_unit}</td>
    <td class="border border-slate-600 px-2 py-2 text-xs">{item.item[0]?.item_price}</td>
    <td class="border border-slate-600 px-2 py-2 text-xs">{((item.item_used_qty + item.item_used_qty * (item.wastage_qty/100)) * state.product_qty).toFixed(4)}</td>
    <td class="border border-slate-600 px-2 py-2 text-xs">{(item.item_used_qty * (item.wastage_qty/100) * state.product_qty).toFixed(4)}</td>
  </tr>)
  }

        </table>
    </div>

      </div>
  )
}

export default Production