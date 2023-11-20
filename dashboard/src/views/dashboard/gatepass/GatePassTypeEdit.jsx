import React, { useState,useEffect} from "react";
import { useNavigate,useParams} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import { PropagateLoader } from 'react-spinners'
import {cssOverride} from '../../../utils/utils'

import toast from 'react-hot-toast'
import {messageClear,get_gate_pass_type_by_id,gate_pass_type_update} from '../../../store/reducers/gatePassReducer'


const GatePassTypeEdit = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { gatePassTypeId } = useParams()
  // console.log(expId)
  const {loader,successMessage,errorMessage,gatePassType} = useSelector(state=>state.gatePass)
  const {userInfo} = useSelector(state=>state.auth)
  const [state,setState] = useState({
    gp_type:'',
    gp_note:''
  })


const inputHandle = (e)=>{
    setState({
        ...state,
        [e.target.name] : e.target.value
    })
}
useEffect(()=>{
  if(gatePassTypeId){
    dispatch(get_gate_pass_type_by_id(gatePassTypeId))
  }
},[gatePassTypeId])

useEffect(()=>{
 if(gatePassTypeId){
  setState({
    gp_type:gatePassType.gp_type,
    gp_note:gatePassType.gp_note,
  })
 }
},[gatePassType])


const Update = (e)=>{
  e.preventDefault()
  const obj = {
    gp_type:state.gp_type,
    gp_note:state.gp_note,
    gatePassId:gatePassTypeId,
    userName:userInfo.name
  }
  dispatch(gate_pass_type_update(obj))
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

  return (
    <div className="mx-auto py-1 md:px-[2px] mt-[-22px]">
      <div className="flex flex-wrap w-[98%] mx-auto">
          <div className="w-full">
            <div className="bg-[#283046] text-[#d0d2d6] height-screen lg:min-h-[627px] px-3 p-3">
            <div className="flex justify-between items-center bg-[#283046] py-5 md:px-[2px] text-white">
                <div className="pl-2 font-bold text-2xl">Gate Pass Edit</div>
                <div onClick={()=>navigate('/admin/dashboard/gate-pass-type')} className="pr-2 font-bold text-sm cursor-pointer bg-[#3ab0d8] px-3 py-1 mr-3">Gate Pass List</div>
            </div>
            <hr className="border-2 border-slate-500 w-[98%] mx-auto mb-5"/>
            <form onSubmit={Update}>
                    <div className='flex flex-col mb-1 md:flex-row gap-2 w-full px-3 text-[#d0d2d6] mt-1'>
                        <div className='flex flex-col w-[40%] gap-1 text-xs'>
                        <label htmlFor="gp_type">Gate Pass Type</label>
                            <input value={state.gp_type} onChange={inputHandle} className="bg-[#FFFFFF] border border-slate-700 shadow-md px-4 py-2 focus:border-indigo-500 outline-none text-black rounded-md"
                              type="text"
                              id="gp_type"
                              name="gp_type"
                              placeholder="Enter Type name" required
                            />
                        </div> 
                        <div className='flex flex-col w-[40%] gap-1 text-xs'>
                        <label htmlFor="gp_note">Type Note</label>
                            <input value={state.gp_note} onChange={inputHandle} className="bg-[#FFFFFF] border border-slate-700 shadow-md px-4 py-2 focus:border-indigo-500 outline-none text-black rounded-md"
                              type="text"
                              id="gp_note"
                              name="gp_note"
                              placeholder="Enter Note"
                            />
                        </div> 
                        <div className='flex w-[20%]'>
                    <button disabled={loader?true:false} type="submit" className='bg-green-500 mt-[19px] w-[180px] py-[2px] text-white text-xs hover:shadow-green-500/50 hover:shadow-md font-bold rounded-md'>
                        {
                            loader? <PropagateLoader color='#fff' cssOverride={cssOverride}/>: 'Update'
                        }
                        
                    </button>
                    </div>

                    </div>

       
                <div className='mt-4'>
                </div>
              </form>
            </div>
          </div>       
      </div>
    </div>
  );
};

export default GatePassTypeEdit;