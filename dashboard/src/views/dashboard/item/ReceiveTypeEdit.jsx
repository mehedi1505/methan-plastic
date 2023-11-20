import React, { useState,useEffect, forwardRef } from "react";
import {useParams, useNavigate } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { PropagateLoader } from 'react-spinners'
import {cssOverride} from '../../../utils/utils'
import { AiOutlineCloseCircle } from "react-icons/ai";
import toast from 'react-hot-toast'
import {messageClear,rec_type_get_by_id,rec_type_update} from '../../../store/reducers/recTypeReducer'

const ReceiveTypeEdit = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {recTypeId} = useParams()
  const {loader,successMessage,errorMessage,type} = useSelector(state=>state.rec_type)
  const {userInfo} = useSelector(state=>state.auth)
  const [state,setState] = useState({
    rec_type_name:'',
    rec_type_desc:'',
  })

const inputHandle = (e)=>{
    setState({
        ...state,
        [e.target.name] : e.target.value
    })
}

  const update= (e)=>{
      e.preventDefault()
      const obj = {
        rec_type_name: state.rec_type_name,
        rec_type_desc: state.rec_type_desc,
        recTypeId:recTypeId,
        userName:userInfo.name
      }
      dispatch(rec_type_update(obj))
  }
  useEffect(()=>{
    dispatch(rec_type_get_by_id(recTypeId))
},[recTypeId])

  useEffect(()=>{
    setState({
      rec_type_name:type.rec_type_name,
      rec_type_desc:type.rec_type_desc,
    })
},[type])

  useEffect(()=>{
    if(successMessage){
      toast.success(successMessage) 
        navigate('/admin/dashboard/receive-type')
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
                  Receive Type Update
                </div>
                <div>
                  <button onClick={() => navigate(-1)} className="bg-[#7FD4F1] px-5 py-1 text-black rounded-md">Go Back</button>
                </div>
             </div>
              <form onSubmit={update}>
                <div className="flex flex-col w-full gap-1 mb-3">
                  <label htmlFor="rec_type_name">Receive Type Name</label>
                  <input
                   value={state.rec_type_name}  onChange={inputHandle} className="bg-[#283046] border border-slate-700 px-4 py-1 focus:border-indigo-500 outline-none text-[#d0d2d6] rounded-md"
                    type="text"
                    id="rec_type_name"
                    name="rec_type_name"
                    placeholder="Enter type name" required
                  />
                </div>
                <div className="flex flex-col w-full gap-1 mb-3">
                <div className='flex flex-col w-full gap-1 text-[#d0d2d6] mb-4'>
                        <label htmlFor='rec_type_desc'>Description:</label>
                        <textarea  rows={10} onChange={inputHandle} value={state.rec_type_desc} name='rec_type_desc' id='rec_type_desc' className='bg-[#283046] px-4 py-1 border border-slate-700 rounded-sm outline-none focus:border-indigo-500 text-[#d0d2d6]' placeholder='Write here..' required></textarea>
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

export default ReceiveTypeEdit;
