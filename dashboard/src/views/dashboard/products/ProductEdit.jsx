import React, { useState,useEffect} from "react";
import { Link,useParams,useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import { PropagateLoader } from 'react-spinners'
import {cssOverride} from '../../../utils/utils'
import { FaEdit} from "react-icons/fa";
import { AiOutlineCloseCircle } from "react-icons/ai";
import toast from 'react-hot-toast'
import {messageClear,get_product_by_id,product_update} from '../../../store/reducers/productReducer'

const ProductEdit = () => {
  const {userInfo} = useSelector(state=>state.auth)
  const { productId } = useParams()
  const {loader,successMessage,errorMessage,product} = useSelector(state=>state.product)
  const [show, setShow] = useState(false);
  const [state,setState] = useState({
      product_name:'',
      product_code:'',
      price:'',
      opening_stock:'',
      status:''
  })

  const [cateShow, setCateShow] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(()=>{
    if(productId){
      dispatch(get_product_by_id(productId))
    }
    
},[productId])

useEffect(()=>{
  if(product){
    setState({
      product_name:product.product_name,
      product_code:product.product_code,
      price:product.price,
      opening_stock:product.opening_stock,
      status:product.status,
    })
  }
},[product])

  const productUpdate = (e)=>{
      e.preventDefault()
      const obj = {
        product_name:state.product_name,
        product_code:state.product_code,
        price:state.price,
        opening_stock:state.opening_stock,
        status:state.status,
        userName:userInfo.name,
        productId:productId
      }
      dispatch(product_update(obj))
  }

  useEffect(()=>{
    if(successMessage){
      toast.success(successMessage)
      dispatch(messageClear())
      navigate('/admin/dashboard/product-list')
    }
    if(errorMessage){
      toast.error(errorMessage)
      dispatch(messageClear())
    }
  },[successMessage,errorMessage])

const options = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

  return (
    <div className="px-2 py-1 md:px-[2px] md:py-[2px]">

      <div className='lg:hidden flex justify-between items-center mb-5 p-3 bg-[#283046] rounded-sm'>
           <h1 className='text-[#d0d2d6] font-semibold text-lg'>Items</h1> 
          <button onClick={()=>setShow(true)} className='bg-indigo-500 px-3 py-1 rounded-sm text-white shadow-md hover:shadow-indigo-500/50'>Add</button>
      </div>
      <div className="flex flex-wrap w-full">
      <div className={`w-[320px] lg:w-6/12 translate-x-100 lg:relative lg:right-1 md:right-1 fixed ${
            show ? "right-0" : "-right-[340px]"
          } z-[9999] top-0 transition-all duration-500`}
        >
          <div className="w-full pl-5">
            <div className="bg-[#283046] text-[#d0d2d6] height-screen lg:height-auto rounded-l-lg px-3 py-2">
              <div className='flex justify-between items-center mb-1 border-b-2 border-slate-700'>
                <h1 className="text-[#d0d2d6] font-semibold text-xl">
                  Edit Product
                </h1>
              </div>
              <form onSubmit={productUpdate}>
                <div className="flex flex-col w-full gap-1 mb-1">
                  <label htmlFor="product_name">ProductName</label>
                  <input
                   value={state.product_name} onChange={(e)=>setState({...state,product_name: e.target.value})} className="bg-[#4E5B7C] border border-slate-700 px-4 py-[5px] focus:border-indigo-500 outline-none text-[#d0d2d6] rounded-md"
                    type="text"
                    id="product_name"
                    name="product_name"
                    placeholder="Enter product name" required
                  />
                </div>
                <div className="flex flex-col w-full gap-1 mb-1">
                  <label htmlFor="product_code">Product Code</label>
                  <input
                   value={state.product_code} onChange={(e)=>setState({...state,product_code: e.target.value})} className="bg-[#4E5B7C] border border-slate-700 px-4 py-[5px] focus:border-indigo-500 outline-none text-[#d0d2d6] rounded-md"
                    type="text"
                    id="product_code"
                    name="product_code"
                    placeholder="Enter product code" required
                  />
                </div>
                <div className="flex flex-col w-full gap-1 mb-1">
                  <label htmlFor="price">Price</label>
                  <input
                   value={state.price} onChange={(e)=>setState({...state,price: e.target.value})} className="bg-[#4E5B7C] border border-slate-700 px-4 py-[5px] focus:border-indigo-500 outline-none text-[#d0d2d6] rounded-md"
                    type="text"
                    id="price"
                    name="price"
                    placeholder="Enter product price" required
                  />
                </div>
                <div className="flex flex-col w-full gap-1 mb-1">
                  <label htmlFor="opening_stock">Opening Stock</label>
                  <input
                   value={state.opening_stock} onChange={(e)=>setState({...state,opening_stock: e.target.value})} className="bg-[#4E5B7C] border border-slate-700 px-4 py-[5px] focus:border-indigo-500 outline-none text-[#d0d2d6] rounded-md"
                    type="number"
                    id="opening_stock"
                    name="opening_stock"
                    min="0"
                    step="any"
                    placeholder="Enter opening stock"
                  />
                </div>
                <div className='flex flex-col w-full gap-1'>
                        <label htmlFor='status'>Status:</label>
                          <select className="text-white py-[5px] bg-[#4E5B7C] outline-none rounded-md" value={state.status} onChange={(e)=>setState({...state,status: e.target.value})} name="status" id="status">
                            {options.map(option => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>
       
                <div className='mt-5'>
                <button disabled={loader?true:false} type="submit" className='bg-blue-500 w-full px-5 py-[5px] rounded-full mb-3 text-white hover:shadow-blue-500/50 hover:shadow-md'>
              {
                loader? <PropagateLoader color='#fff' cssOverride={cssOverride}/>: 'Update'
              }
             
            </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        
        
      </div>
    </div>
  );
};

export default ProductEdit;
