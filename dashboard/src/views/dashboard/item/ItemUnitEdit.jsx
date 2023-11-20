import React, { useState,useEffect, forwardRef } from "react";
import {useParams, useNavigate } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { PropagateLoader } from 'react-spinners'
import {cssOverride} from '../../../utils/utils'
import { AiOutlineCloseCircle } from "react-icons/ai";
import toast from 'react-hot-toast'
import {messageClear,item_unit_update,get_item_unit_by_id} from '../../../store/reducers/unitReducer'

const ItemCategoryEdit = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { unitId } = useParams()
  const {loader,successMessage,errorMessage,itemUnit} = useSelector(state=>state.unit)
  const {userInfo} = useSelector(state=>state.auth)
  const [state,setState] = useState({
     unit_name:'',
     unit_desc:'',
  })

  useEffect(()=>{
    dispatch(get_item_unit_by_id(unitId))
},[unitId])
const inputHandle = (e)=>{
    setState({
        ...state,
        [e.target.name] : e.target.value
    })
}

  const update= (e)=>{
      e.preventDefault()
      const obj = {
        unit_name: state.unit_name,
        unit_desc: state.unit_desc,
        unitId:unitId,
        userInfo:userInfo.name
      }
      dispatch(item_unit_update(obj))
  }
  useEffect(()=>{
    setState({
      unit_name:itemUnit.unit_name,
      unit_desc:itemUnit.unit_desc,
    })
},[itemUnit])

  useEffect(()=>{
    if(successMessage){
      toast.success(successMessage) 
        navigate('/admin/dashboard/item-unit')
      dispatch(messageClear())
    }
    if(errorMessage){
      toast.error(errorMessage)
      dispatch(messageClear())
    }
 
  },[successMessage,errorMessage])


          
  return (
    <div className="px-2 py-3 md:px-[2px] w-[550px] mx-auto">
      <div className="flex flex-wrap w-full">
          <div className="w-full">
            <div className="bg-[#283046] text-[#d0d2d6] height-screen lg:height-auto rounded-lg px-7 py-2">
             <div className='flex justify-between items-center bg-[#54c6ec] px-2 py-2 mb-5 mt-3'>
                <div className='text-black font-bold'>
                  Item Unit Update Form
                </div>
                <div>
                  <button onClick={() => navigate(-1)} className="bg-[#7FD4F1] px-5 py-1 text-black rounded-md">Go Back</button>
                </div>
             </div>
              <form onSubmit={update}>
                <div className="flex flex-col w-full gap-1 mb-3">
                  <label htmlFor="name">Item Unit Name</label>
                  <input
                   value={state.unit_name}  onChange={inputHandle} className="bg-[#283046] border border-slate-700 px-4 py-1 focus:border-indigo-500 outline-none text-[#d0d2d6] rounded-md"
                    type="text"
                    id="unit_name"
                    name="unit_name"
                    placeholder="Enter Unit name" required
                  />
                </div>
                <div className="flex flex-col w-full gap-1 mb-3">
                <div className='flex flex-col w-full gap-1 text-[#d0d2d6] mb-4'>
                        <label htmlFor='unit_desc'>Description:</label>
                        <textarea  rows={10} onChange={inputHandle} value={state.unit_desc} name='unit_desc' id='unit_desc' className='bg-[#283046] px-4 py-1 border border-slate-700 rounded-sm outline-none focus:border-indigo-500 text-[#d0d2d6]' placeholder='Write here..' required></textarea>
                    </div>
                </div>
       
                <div className='mt-4'>
                <button disabled={loader?true:false} type="submit" className='bg-blue-500 w-full px-7 py-2 rounded-md mb-3 text-white hover:shadow-blue-500/50 hover:shadow-md'>
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
  );
};

export default ItemCategoryEdit;
