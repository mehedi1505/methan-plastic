import React, { useState,useEffect, forwardRef } from "react";
import { Link } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import { PropagateLoader } from 'react-spinners'
import {cssOverride} from '../../../utils/utils'
import { FaEdit, FaTrash } from "react-icons/fa";
import { AiOutlineCloseCircle } from "react-icons/ai";
import toast from 'react-hot-toast'
import { GrClose } from "react-icons/gr";
import { BsImage } from "react-icons/bs";
import {item_add,messageClear,items_get} from '../../../store/reducers/itemReducer'
import {get_item_category} from '../../../store/reducers/itemCategoryReducer'
import {get_term} from '../../../store/reducers/termReducer'
import {get_item_group} from '../../../store/reducers/itemGroupReducer'
import {get_item_unit} from '../../../store/reducers/unitReducer'
import Search from '../../../components/Search'
import {FixedSizeList as List} from 'react-window'
function handleOnWheel({deltaY}){
console.log('handleOnWheel',deltaY)
}
const outerElementType = forwardRef((props,ref)=>(
  <div ref={ref} onWheel={handleOnWheel} {...props} />
))
const Items = () => {
  const {userInfo} = useSelector(state=>state.auth)
  const {loader,successMessage,errorMessage,items,totalItem} = useSelector(state=>state.item)
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
     opening_stock:''
  })
  const [unit, setUnit] = useState('')
  const [group, setGroup] = useState('')
  const [term, setTerm] = useState('')
  const [category, setCategory] = useState('')

  const [cateShow, setCateShow] = useState(false)
  const [allCategory, setAllCategory] = useState([])
  const [allUnit, setAllUnit] = useState([])
  const [allGroup, setAllGroup] = useState([])
  const [allTerm, setAllTerm] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const dispatch = useDispatch()

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

  const itemAdd = (e)=>{
      e.preventDefault()
      dispatch(item_add({
        state:state,
        unit,
        group,
        term,
        category,
        userName:userInfo.name
      }))
  }

  useEffect(()=>{
    if(successMessage){
      toast.success(successMessage)
      dispatch(messageClear())
      setState({
        item_name:'',
        item_code:'',
        desc:'',
        item_price:'',
        opening_stock:'',
      })
      setCategory('')
      setUnit('')
      setGroup('')
      setTerm('')
    }
    if(errorMessage){
      toast.error(errorMessage)
      dispatch(messageClear())
    }
  },[successMessage,errorMessage])

useEffect(()=>{
    dispatch(items_get({searchValue}))
},[searchValue,successMessage,errorMessage])

const Row = ({index,style})=>{
    return(
      <div style={style} className='flex text-xs text-white'>
          <div className='w-[10%] p-2 whitespace-nowrap'>{index+1}</div>
          <div className='w-[30%] p-2 whitespace-nowrap'>{`${items[index]?.item_name}`}</div>
          <div className='w-[15%] p-2 whitespace-nowrap text-center'>{`${items[index]?.item_code}`}</div>
          <div className='w-[15%] p-2 whitespace-nowrap text-center'>{`${items[index]?.item_price.toFixed(2)}`}</div>
          <div className='w-[10%] p-2 whitespace-nowrap text-center'>{`${items[index]?.unit[0].unit_name}`}</div>
          <div className='w-[10%] p-2 whitespace-nowrap text-center'>{`${items[index]?.status}`}</div>
          <div className="w-[10%] flex justify-center items-center">
            <Link to= {`/admin/dashboard/item-edit/${items[index]?._id}`} className="p-[5px] rounded bg-yellow-500 hover:shadow-lg shadow-yellow-500/50">
              <FaEdit />
            </Link>
        </div>
      </div>
  )
}

  return (
    <div className="px-2 py-1 md:px-[2px] md:py-[2px] w-[100%]">
{/* 
      <div className='lg:hidden flex justify-between items-center mb-5 p-3 bg-[#283046] rounded-sm'>
           <h1 className='text-[#d0d2d6] font-semibold text-lg'>Items</h1> 
          <button onClick={()=>setShow(true)} className='bg-indigo-500 px-3 py-1 rounded-sm text-white shadow-md hover:shadow-indigo-500/50'>Add</button>
      </div> */}
      <div className="flex flex-wrap w-full mt-[-22px]">
      <div className="w-full">
          <div className="w-[98%] mx-auto">
            <div className="bg-[#283046] text-[#d0d2d6] lg:height-auto rounded-t-md px-3 py-2">
              <div className='flex justify-between items-center mb-1'>
                <h1 className="text-[#d0d2d6] font-semibold text-xl ml-[15px]">
                  Add Item
                </h1>
              </div>
              <hr className="border-2 border-slate-500 w-[98%] mx-auto mb-5"/>
              <form onSubmit={itemAdd}>
              <div className='flex flex-col mb-1 md:flex-row gap-2 w-[100%] px-3 text-[#d0d2d6] mt-1'>
              <div className='flex flex-col w-[25%] gap-1 text-xs'>
                  <label htmlFor="item_name" className='text-xs'>Item Name</label>
                  <input
                   value={state.item_name} onChange={(e)=>setState({...state,item_name: e.target.value})} className="bg-[#4E5B7C] border border-slate-700 px-4 py-[5px] focus:border-indigo-500 outline-none text-[#d0d2d6] rounded-md"
                    type="text"
                    id="item_name"
                    name="item_name"
                    placeholder="Enter item name" required
                  />
                </div>
                <div className='flex flex-col w-[25%] gap-1 text-xs'>
                  <label htmlFor="item_code" className='text-xs'>Item Code</label>
                  <input
                   value={state.item_code} onChange={(e)=>setState({...state,item_code: e.target.value})} className="bg-[#4E5B7C] border border-slate-700 px-4 py-[5px] focus:border-indigo-500 outline-none text-[#d0d2d6] rounded-md"
                    type="text"
                    id="item_code"
                    name="item_code"
                    placeholder="Enter item code" required
                  />
                </div>
                <div className='flex flex-col w-[25%] gap-1 text-xs'>
                  <label htmlFor="desc" className='text-xs'>Item Description</label>
                  <input
                   value={state.desc} onChange={(e)=>setState({...state,desc: e.target.value})} className="bg-[#4E5B7C] border border-slate-700 px-4 py-[5px] focus:border-indigo-500 outline-none text-[#d0d2d6] rounded-md"
                    type="text"
                    id="desc"
                    name="desc"
                    placeholder="Enter item desc"
                  />
                </div>
                <div className='flex flex-col w-[25%] gap-1 text-xs'>
                  <label htmlFor="price" className='text-xs'>Item Price</label>
                  <input
                   value={state.item_price} onChange={(e)=>setState({...state,item_price: e.target.value})} className="bg-[#4E5B7C] border border-slate-700 px-4 py-[5px] focus:border-indigo-500 outline-none text-[#d0d2d6] rounded-md"
                    type="number"
                    id="item_price"
                    name="item_price"
                    min="0"
                    step="any"
                    placeholder="Enter item price" required
                  />
                </div>
                </div>
                <div className='flex flex-col mb-1 md:flex-row gap-2 w-full px-3 text-[#d0d2d6] mt-1'>
                <div className='flex flex-col w-[25%] gap-1 text-xs'>
                <label htmlFor='category' className='text-xs'>Item Category:</label>
                    <select className="text-[#d0d2d6] py-1 bg-[#4E5B7C] outline-none rounded-md" value={category} onChange={(e)=>setCategory(e.target.value)} name="category" id="category" required>
                      <option value="" selected disabled>--select category--</option>
                      {allCategory.map(option => (
                        <option key={option._id} value={option._id}>
                          {option.item_category_name}
                        </option>
                      ))}
                    </select>
                 </div>
                 <div className='flex flex-col w-[25%] gap-1 text-xs'>
                <label htmlFor='unit' className='text-xs'>Item Unit:</label>
                    <select className="text-[#d0d2d6] py-1 bg-[#4E5B7C] outline-none rounded-md" value={unit} onChange={(e)=>setUnit(e.target.value)} name="unit" id="unit" required>
                      <option value="" selected disabled>--select unit--</option>
                      {allUnit.map(option => (
                        <option key={option._id} value={option._id}>
                          {option.unit_name}
                        </option>
                      ))}
                    </select>
                </div>
                <div className='flex flex-col w-[25%] gap-1 text-xs'>
                <label htmlFor='unit' className='text-xs'>Item Group:</label>
                    <select className="text-[#d0d2d6] py-1 bg-[#4E5B7C] outline-none rounded-md" value={group} onChange={(e)=>setGroup(e.target.value)} name="group" id="group" required>
                      <option value="" selected disabled>--select group--</option>
                      {allGroup.map(option => (
                        <option key={option._id} value={option._id}>
                          {option.item_group_name}
                        </option>
                      ))}
                    </select>
                </div>
                <div className='flex flex-col w-[25%] gap-1 text-xs'>
                <label htmlFor='term' className='text-xs'>Term & Condition:</label>
                    <select className="text-[#d0d2d6] py-1 bg-[#4E5B7C] outline-none rounded-md" value={term} onChange={(e)=>setTerm(e.target.value)} name="term" id="term" required>
                      <option value="" selected disabled>--select term--</option>
                      {allTerm.map(option => (
                        <option key={option._id} value={option._id}>
                          {option.term_name}
                        </option>
                      ))}
                    </select>
                </div>
                </div>
                <div className='flex flex-col mb-1 md:flex-row gap-2 w-full px-3 text-[#d0d2d6] mt-1'>
                <div className='flex flex-col w-[25%] gap-1 text-xs'>
                  <label htmlFor="opening_stock" className='text-xs'>Opening Stock</label>
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
       
                <div className='mt-5'>
                <button disabled={loader?true:false} type="submit" className='bg-blue-500 w-full px-5 py-[2px] rounded-sm mb-3 text-white hover:shadow-blue-500/50 hover:shadow-md'>
              {
                loader? <PropagateLoader color='#fff' cssOverride={cssOverride}/>: 'Add Item'
              }
             
            </button>
                </div>
                </div>
              </form>
            </div>
          </div>
          <hr className="border-2 border-slate-500 w-[98%] mx-auto"/>
          <div className="w-full">
          <div className="w-full p-2 bg-[#283046]  md:min-h-[325px] md:w-[98%] mx-auto rounded-b-md">

            <div className='w-full flex justify-between items-center bg-[#283046] px-4'>
              <div className='text-white font-bold'>
                  Total Item : {totalItem}
              </div>

              <Search searchValue={searchValue} setSearchValue={setSearchValue}/>
            </div>
            <div className="w-full p-2 bg-[#283046] rounded-md mt-1">
              <div className='w-full overflow-x-auto'>
                    <div className='flex bg-[#161d31] uppercase min-w-[340px] text-white text-[9px] font-bold'>
                        <div className='w-[10%] p-2 text-xs'>No</div>
                        <div className='w-[30%] p-2 text-xs'>Name</div>
                        <div className='w-[15%] p-2 text-xs text-center'>Code</div>
                        <div className='w-[15%] p-2 text-xs text-center'>Price</div>
                        <div className='w-[10%] p-2 text-xs'>Unit</div>
                        <div className='w-[10%] p-2 text-xs'>Status</div>
                        <div className='w-[10%] p-2 text-xs'>Action</div>
                    </div>
                    {
                        <List 
                        style={{minWidth: '340px',overflowX:'hidden'}}
                        className='List'
                        height={275}
                        itemCount={items.length}
                        itemSize={28}
                        outerElementType={outerElementType}
                        >
                            {Row}
                        </List>
                    }
                </div>

            </div>
          </div>
        </div>
        </div>
        
        
      </div>
    </div>
  );
};

export default Items;
