import React, { useState,useEffect, forwardRef } from "react";
import { Link,useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import { PropagateLoader } from 'react-spinners'
import {cssOverride} from '../../../utils/utils'
import { FaTrash } from "react-icons/fa";
import toast from 'react-hot-toast'
import {messageClear,bom_add,get_product,get_items,get_unit_item_name,bom_details_get,bom_details_item_delete,get_product_name_by_id,spl_product_add} from '../../../store/reducers/bomReducer';
import Select from 'react-select'

const SpecialBomCreate = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {loader,successMessage,errorMessage,products,items,itemUnit,itemName,bomDetails,productName} = useSelector(state=>state.bom)
  const {userInfo} = useSelector(state=>state.auth)
  const [state,setState] = useState({
    item_used_qty:'',
    item_unit:'',
    wastage_qty:''
  })
  
useEffect(()=>{
  setProductId('')
},[])

const [productId,setProductId] = useState('')
const [itemId,setItemId] = useState('')

const inputHandle = (e)=>{
    setState({
        ...state,
        [e.target.name] : e.target.value
    })
}

  const bomAdd= (e)=>{
      e.preventDefault()
      dispatch(bom_add({
        state:state,
        productId,
        itemId,
        userName:userInfo.name
      }))
  }
  useEffect(()=>{
    setState({
      item_used_qty:'',
      wastage_qty:''
    })
    setProductId(0)
    setItemId(0)
  },[])
  const splProductAdd = (e) => {
    e.preventDefault();
    dispatch(
      spl_product_add({
        state: state,
        userName: userInfo.name,
      })
    );
  };

useEffect(()=>{
  dispatch(get_unit_item_name(itemId))
},[itemId])

useEffect(()=>{
  if(itemUnit?.length>0){
    setState({
      item_unit:itemUnit[0]?.unit[0]?.unit_name
    })
  }
},[itemId,itemUnit])




  useEffect(()=>{
    if(successMessage){
      toast.success(successMessage)
      dispatch(messageClear())
      setState({
        item_used_qty:'',
        item_unit:'',
        wastage_qty:'',
        product_name: "",
        product_code: "",
        price: "",
      })
      setItemId('')
      dispatch(bom_details_get(productId))
      dispatch(get_product())
    }
    if(errorMessage){
      toast.error(errorMessage)
      dispatch(messageClear())
    }
  },[successMessage,errorMessage,itemId])

  useEffect(()=>{
   if(productId){
    dispatch(bom_details_get(productId))
   }
    },[productId])

useEffect(()=>{
dispatch(get_product())
},[])

useEffect(()=>{
  dispatch(get_product_name_by_id(productId))
  },[productId])

useEffect(()=>{
  dispatch(get_items())
  },[])

const options = products.map((product)=>({
        "value" : product._id,
        "label" : product.product_code
    }))
const itemOptions = items.map((item)=>({
      "value" : item._id,
      "label" : item.item_code
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
    
  }

  return (
    <div className="mx-auto py-1 md:px-[2px] mt-[-23px]">
      <div className="flex flex-wrap w-[98%] mx-auto">
          <div className="w-full">
            <div className="bg-[#283046] text-[#d0d2d6] height-screen lg:height-auto px-3 p-5">
            <div className="flex justify-between items-center bg-[#283046] py-2 md:px-[2px] text-white">
                <div className="pl-2 font-bold text-2xl">Spl Bom Create & Update</div>
                <div onClick={()=>navigate('/admin/dashboard/bom-list')} className="font-bold text-sm cursor-pointer bg-[#283046] hover:bg-[#242c41] border-2 border-slate-700 rounded-full px-5 py-1 mr-3 text-center">Bom List</div>
            </div>

            <form onSubmit={splProductAdd}>
            <div className='flex flex-col mb-2 md:flex-row gap-1 w-full text-[#d0d2d6] mt-2'>
                  <div className='flex flex-col w-[300px] gap-1'>
                  <label htmlFor="product_name">Product Name</label>
                    <input
                      value={state.product_name}
                      onChange={inputHandle}
                      className="bg-[#4E5B7C] border border-slate-700 px-4 py-1 focus:border-indigo-500 outline-none text-[#d0d2d6] rounded-md"
                      type="text"
                      id="product_name"
                      name="product_name"
                      placeholder="Enter product name"
                      required
                    />
                  </div>
                  
                  <div className='flex flex-col w-[250px] gap-1'>
                  <label htmlFor="product_code">Product Code</label>
                    <input
                      value={state.product_code}
                      onChange={inputHandle}
                      className="bg-[#4E5B7C] border border-slate-700 px-4 py-1 focus:border-indigo-500 outline-none text-[#d0d2d6] rounded-md"
                      type="text"
                      id="product_code"
                      name="product_code"
                      placeholder="Enter product code"
                      required
                    />
                  </div>
                  <div className='flex flex-col w-[150px] gap-1'>
                  <label htmlFor="price">Price</label>
                    <input
                    value={state.price} onChange={(e)=>setState({...state,price: e.target.value})} className="bg-[#4E5B7C] border border-slate-700 px-4 py-1 focus:border-indigo-500 outline-none text-[#d0d2d6] rounded-md"
                      type="number"
                      id="price"
                      name="price"
                      min="0"
                      step="any"
                      placeholder="Enter price" required
                    />
                  </div>


                  <div className='flex flex-col w-[150px] gap-1 mt-7'>
                  <button type="submit" className='bg-blue-500 px-2 py-1 mb-3 rounded-md text-white hover:shadow-blue-500/50 hover:shadow-md font-bold'> Add </button>
               </div>
               
               </div>

            </form>
            <hr className="border-2 border-slate-500 w-[100%] mx-auto mb-5"/>
              <form onSubmit={bomAdd}> 
              <div className='flex flex-col mb-2 md:flex-row gap-1 w-full text-[#d0d2d6] mt-2'>
                  <div className='flex flex-col w-[350px] gap-1'>
                  <label htmlFor='product_id' className="text-sm text-white">Product search:</label>                                
                        <div style={{margin:5,width:330,color:'black'}}>                   
                              <Select
                                options={options}
                                defaultValue={productId}
                                placeholder="Choose Product"
                                onChange={(e)=>setProductId(e.value)}
                                isSearchable
                                noOptionsMessage={()=>"no product found.."}
                                styles={customStyles}
                              />
                        </div>
                  </div>
                  <div className='text-white mt-7'>Product Name:{productName?.product_name}</div>
                </div>


                    <div className='flex flex-col mb-2 md:flex-row gap-1 w-full text-[#d0d2d6] mt-2'>
                        <div className='flex flex-col w-[40%] gap-1'>
                        <label htmlFor='item_code' className="text-xs">Item Code:</label>                       
                        <div style={{margin:5,width:330,color:'black'}}>
                        <Select
                            options={itemOptions}
                            defaultValue={itemId}
                            placeholder="Choose Item"
                            onChange={(e)=>setItemId(e.value)}
                            isSearchable
                            noOptionsMessage={()=>"no item found.."}
                            styles={customStyles}
                          />
                          </div>
                          <span className="text-sm">Item Name: {itemName?.item_name}</span>
                        </div>
                        <div className='flex flex-col w-[20%] gap-1'>
                            <label htmlFor='item_used_qty' className="text-sm">Item used qty:</label>
                            <input className='bg-[#D6E3EA]  px-4 py-1 border border-slate-700 rounded-md outline-none focus:border-indigo-500 text-[#2A2D2E]' onChange={inputHandle} value={state.item_used_qty || ''} type='number' min="0" step="any" id='item_used_qty' name='item_used_qty' required/>
                        </div>
                        <div className='flex flex-col w-[15%] gap-1'>
                            <label htmlFor='item_unit' className="text-sm">Item unit:</label>
                            <input className='bg-[#D6E3EA] px-4 py-1 border border-slate-700 rounded-md outline-none focus:border-indigo-500 text-[#2A2D2E]' onChange={inputHandle} value={state.item_unit || ''} type='text' id='item_unit' name='item_unit'/>
                        </div>
                        <div className='flex flex-col w-[15%] gap-1'>
                            <label htmlFor='wastage_qty' className="text-sm">Wastage qty(%):</label>
                            <input className='bg-[#D6E3EA] px-4 py-1 border border-slate-700 rounded-md outline-none focus:border-indigo-500 text-[#2A2D2E]' onChange={inputHandle} value={state.wastage_qty || ''} type='number'  min="0" step="any" id='wastage_qty' name='wastage_qty' required/>
                        </div>
                        <div className='flex flex-col w-[10%] mt-6 gap-1'>
                        <button type="submit" className='bg-blue-500 px-2 py-1 mb-3 text-white hover:shadow-blue-500/50 hover:shadow-md font-bold rounded-md'> Add </button>
                        </div>
                    </div>
                    <div>
                </div>
       
                <div className='mt-4'>
                </div>
              </form>
            </div>

            <div className='relative bg-[#283046] min-h-[245px] overflow-x-auto'>
            <table className='w-full text-sm text-[#d0d2d6] text-left'>
              <thead className='text-xs text-[#d0d2d6] border-b border-slate-700 uppercase'>
                <tr>
                  <th scope='col' className='py-3 px-4'>Item Name</th>
                  <th scope='col' className='py-3 px-4'>Used item qty</th>
                  <th scope='col' className='py-3 px-4'>Unit</th>
                  <th scope='col' className='py-3 px-4'>wastage</th>
                  <th scope='col' className='py-3 px-4'>Total used qty</th>
                  <th scope='col' className='py-3 px-4'>Action</th>
                </tr>
              </thead>
              <tbody>
                  {
                    bomDetails.map((bom,i)=><tr key={i}>
                    <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>{bom?.item[0]?.item_name}</td>
                    <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>{bom?.item_used_qty}<span></span></td>
                    <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>{bom?.item_unit}</td>
                    <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>{bom?.wastage_qty}</td>
                    <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>{bom?.total_used_qty.toFixed(4)}</td>
                    <td scope='row' className='py-1 px-4 font-medium'>
                      <button onClick={()=>dispatch(bom_details_item_delete({productId:bom.product_id,itemId:bom.item_id}))} className="p-[5px] rounded bg-red-600 hover:shadow-lg shadow-red-600/50">
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

export default SpecialBomCreate;