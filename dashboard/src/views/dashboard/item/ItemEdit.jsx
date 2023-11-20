import React, { useState,useEffect} from "react";
import { Link,useParams } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import { PropagateLoader } from 'react-spinners'
import {cssOverride} from '../../../utils/utils'
import { FaEdit} from "react-icons/fa";
import { AiOutlineCloseCircle } from "react-icons/ai";
import toast from 'react-hot-toast'
import {messageClear,items_get,item_get_by_id,item_update} from '../../../store/reducers/itemReducer'
import {get_item_category} from '../../../store/reducers/itemCategoryReducer'
import {get_term} from '../../../store/reducers/termReducer'
import {get_item_group} from '../../../store/reducers/itemGroupReducer'
import {get_item_unit} from '../../../store/reducers/unitReducer'

const ItemEdit = () => {
  const {userInfo} = useSelector(state=>state.auth)
  const { itemId } = useParams()
  const {loader,successMessage,errorMessage,item} = useSelector(state=>state.item)
  const {itemUnits} = useSelector(state=>state.unit)
  const {itemGroups} = useSelector(state=>state.itemGroup)
  const {terms} = useSelector(state=>state.term)
  const {itemCategories} = useSelector(state=>state.item_category)
  const [show, setShow] = useState(false);
  const [state,setState] = useState({
     item_name:'',
     item_code:'',
     desc:'',
     item_price:'',
     opening_stock:'',
     status:''
  })
  const [category, setCategory] = useState({
    category_name:'',
    category_value:''
  })
  const [unit, setUnit] = useState({
    unit_name:'',
    unit_value:''
  })
  const [group, setGroup] = useState({
    group_name:'',
    group_value:''
  })
  const [term, setTerm] = useState({
    term_name:'',
    term_value:''
  })
  const [cateShow, setCateShow] = useState(false)
  const [allCategory, setAllCategory] = useState([])
  const [allUnit, setAllUnit] = useState([])
  const [allGroup, setAllGroup] = useState([])
  const [allTerm, setAllTerm] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const dispatch = useDispatch()

  useEffect(()=>{
    if(itemId){
      dispatch(item_get_by_id(itemId))
    }
    
},[itemId])

useEffect(()=>{
  if(item){
    setState({
      item_name:item[0]?.item_name,
      item_code:item[0]?.item_code,
      desc:item[0]?.desc,
      item_price:item[0]?.item_price,
      opening_stock:item[0]?.opening_stock,
      status:item[0]?.status,
    })
    setCategory({
      category_name:item[0]?.category.item_category_name,
      category_value:item[0]?.category[0]?._id
    })
    setUnit({
      unit_name:item[0]?.unit.item_unit_name,
      unit_value:item[0]?.unit[0]?._id
    })
    setGroup({
      group_name:item[0]?.group.item_group_name,
      group_value:item[0]?.group[0]?._id
    })
    setTerm({
      term_name:item[0]?.term.term_name,
      term_value:item[0]?.term[0]?._id
    })
  }
},[item])
  useEffect(()=>{
    dispatch(get_item_category({searchValue}))
},[])
useEffect(()=>{
  dispatch(get_term({searchValue}))
},[])
useEffect(()=>{
  dispatch(get_item_group({searchValue}))
},[])
useEffect(()=>{
  dispatch(get_item_unit({searchValue}))
},[])
  useEffect(()=>{
    setAllCategory(itemCategories)
},[itemCategories])

useEffect(()=>{
  setAllUnit(itemUnits)
},[itemUnits])
useEffect(()=>{
  setAllGroup(itemGroups)
},[itemGroups])
useEffect(()=>{
  setAllTerm(terms)
},[terms])

  const itemUpdate = (e)=>{
      e.preventDefault()
      const obj = {
        name:state.name,
        code:state.code,
        desc:state.desc,
        price:state.price,
        opening_stock:state.opening_stock,
        category_id:category.category_value,
        unit_id:unit.unit_value,
        group_id:group.group_value,
        term_id:term.term_value,
        status:state.status,
        userName:userInfo.name,
        itemId:itemId
      }
      dispatch(item_update(obj))
  }

  useEffect(()=>{
    if(successMessage){
      toast.success(successMessage)
      dispatch(messageClear())
    }
    if(errorMessage){
      toast.error(errorMessage)
      dispatch(messageClear())
    }
  },[successMessage,errorMessage])

useEffect(()=>{
    dispatch(items_get({searchValue}))
},[searchValue,successMessage,errorMessage])

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
      <div className="flex flex-wrap w-full mt-[-22px]">
      <div className={`w-[320px] lg:w-6/12 translate-x-100 lg:relative lg:right-1 md:right-1 fixed ${
            show ? "right-0" : "-right-[340px]"
          } z-[9999] top-0 transition-all duration-500`}
        >
          <div className="w-full pl-[14px] mt-[-20px]">
            <div className="bg-[#283046] text-[#d0d2d6] height-screen w-[900px] md:height-auto rounded-lg px-3 py-2">
              <div className='flex justify-between items-center mb-1'>
                <h1 className="text-[#d0d2d6] font-semibold text-xl mx-auto">
                  Edit Item
                </h1>

                <div onClick={()=>setShow(false)} className='block lg:hidden cursor-pointer'>
                  <AiOutlineCloseCircle/>
                </div>
              </div>
              <hr className='border-2 border-slate-500 w-[500px] mx-auto'/>
             <div className='w-[500px] mx-auto mt-2'>
             <form onSubmit={itemUpdate}>
                <div className="flex flex-col gap-[3px] mb-1">
                  <label htmlFor="name" className='text-xs'>Item Name</label>
                  <input
                   value={state.item_name} onChange={(e)=>setState({...state,name: e.target.value})} className="bg-[#4E5B7C] border border-slate-700 px-4 py-[2px] focus:border-indigo-500 outline-none text-[#d0d2d6] rounded-md"
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter item name" required
                  />
                </div>
                <div className="flex flex-col w-full gap-[3px] mb-1">
                  <label htmlFor="item_code" className='text-xs'>Item Code</label>
                  <input
                   value={state.item_code} onChange={(e)=>setState({...state,code: e.target.value})} className="bg-[#4E5B7C] border border-slate-700 px-4 py-[2px] focus:border-indigo-500 outline-none text-[#d0d2d6] rounded-md"
                    type="text"
                    id="item_code"
                    name="item_code"
                    placeholder="Enter item code" required
                  />
                </div>
                <div className="flex flex-col w-full gap-[3px] mb-1">
                  <label htmlFor="item_desc" className='text-xs'>Item Description</label>
                  <input
                   value={state.desc} onChange={(e)=>setState({...state,desc: e.target.value})} className="bg-[#4E5B7C] border border-slate-700 px-4 py-[2px] focus:border-indigo-500 outline-none text-[#d0d2d6] rounded-md"
                    type="text"
                    id="item_desc"
                    name="item_desc"
                    placeholder="Enter item desc"
                  />
                </div>
                <div className="flex flex-col w-full gap-[3px] mb-1">
                  <label htmlFor="item_price" className='text-xs'>Item Price</label>
                  <input
                   value={state.item_price} onChange={(e)=>setState({...state,price: e.target.value})} className="bg-[#4E5B7C] border border-slate-700 px-4 py-[2px] focus:border-indigo-500 outline-none text-[#d0d2d6] rounded-md"
                    type="number"
                    id="item_price"
                    name="item_price"
                    placeholder="Enter item price" required
                  />
                </div>
                <div className='flex flex-col w-full gap-[3px]'>
                <label htmlFor='category' className='text-xs'>Item Category:</label>
                    <select className="text-[#d0d2d6] py-1 bg-[#4E5B7C] outline-none rounded-md" value={category.category_value} onChange={(e)=>setCategory({...category,category_value :e.target.value})} name="category" id="category" required>
                      <option value="" selected disabled>--select category--</option>
                      {allCategory.map(option => (
                        <option key={option._id} value={option._id} text={option.item_category_name}>
                          {option.item_category_name}
                        </option>
                      ))}
                    </select>
                 </div>
                <div className="flex flex-col w-full gap-[3px] mb-1">
                <label htmlFor='unit' className='text-xs'>Item Unit:</label>
                    <select className="text-[#d0d2d6] py-1 bg-[#4E5B7C] outline-none rounded-md" value={unit.unit_value} onChange={(e)=>setUnit({...unit,unit_value:e.target.value})} name="unit" id="unit" required>
                      <option value="" selected disabled>--select unit--</option>
                      {allUnit.map(option => (
                        <option key={option._id} value={option._id}>
                          {option.unit_name}
                        </option>
                      ))}
                    </select>
                </div>
                <div className="flex flex-col w-full gap-[3px] mb-1">
                <label htmlFor='unit' className='text-xs'>Item Group:</label>
                    <select className="text-[#d0d2d6] py-1 bg-[#4E5B7C] outline-none rounded-md" value={group.group_value} onChange={(e)=>setGroup({...group,group_value:e.target.value})} name="group" id="group" required>
                      <option value="" selected disabled>--select group--</option>
                      {allGroup.map(option => (
                        <option key={option._id} value={option._id}>
                          {option.item_group_name}
                        </option>
                      ))}
                    </select>
                </div>
                <div className="flex flex-col w-full gap-[3px] mb-1">
                <label htmlFor='term' className='text-xs'>Term & Condition:</label>
                    <select className="text-[#d0d2d6] py-1 bg-[#4E5B7C] outline-none rounded-md" value={term.term_value} onChange={(e)=>setTerm({...group,term_value:e.target.value})} name="term" id="term" required>
                      <option value="" selected disabled>--select term--</option>
                      {allTerm.map(option => (
                        <option key={option._id} value={option._id}>
                          {option.term_name}
                        </option>
                      ))}
                    </select>
                </div>
                <div className="flex flex-col w-full gap-[3px] mb-1">
                  <label htmlFor="opening_stock" className='text-xs'>Opening Stock</label>
                  <input
                   value={state.opening_stock} onChange={(e)=>setState({...state,opening_stock: e.target.value})} className="bg-[#4E5B7C] border border-slate-700 px-4 py-[2px] focus:border-indigo-500 outline-none text-[#d0d2d6] rounded-md"
                    type="number"
                    id="opening_stock"
                    name="opening_stock"
                    placeholder="Enter opening stock"
                  />
                </div>
                <div className='flex flex-col w-full gap-[3px]'>
                        <label htmlFor='status' className="text-xs">Status:</label>
                          <select className="text-white py-1 bg-[#4E5B7C] outline-none rounded-md" value={state.status} onChange={(e)=>setState({...state,status: e.target.value})} name="status" id="status">
                            {options.map(option => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>
       
                <div className='mt-2'>
                <button disabled={loader?true:false} type="submit" className='bg-blue-500 w-full px-5 py-[3px] rounded-md mb-2 text-white hover:shadow-blue-500/50 hover:shadow-md'>
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
    </div>
  );
};

export default ItemEdit;
