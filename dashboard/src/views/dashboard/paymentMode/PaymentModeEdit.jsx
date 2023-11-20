import React, { useState,useEffect, forwardRef } from "react";
import { Link, useParams,useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import { PropagateLoader } from 'react-spinners'
import {cssOverride} from '../../../utils/utils'
import toast from 'react-hot-toast'
import {messageClear,get_pay_mode_by_id,pay_mode_update} from '../../../store/reducers/paymentModeReducer'

const PaymentModeEdit = () => {
  const dispatch = useDispatch()
  const { pmodeId } = useParams()
  const navigate = useNavigate()
  const {loader,successMessage,errorMessage,paymode} = useSelector(state=>state.pay_mode)
  const {userInfo} = useSelector(state=>state.auth)
  const [state,setState] = useState({
    pay_mode:'',
    pay_number:'',
    pay_note:''
  })
  useEffect(()=>{
    dispatch(get_pay_mode_by_id(pmodeId))
},[pmodeId])
const inputHandle = (e)=>{
    setState({
        ...state,
        [e.target.name] : e.target.value
    })
}
useEffect(()=>{
    setState({
      pay_mode:paymode.pay_mode,
      pay_number:paymode.pay_number,
      pay_note:paymode.pay_note
    })
},[paymode])

  const update= (e)=>{
      e.preventDefault()
      const obj = {
        pay_mode:state.pay_mode,
        pay_number:state.pay_number,
        pay_note:state.pay_note,
        pmodeId:pmodeId,
        userName:userInfo.name
      }
      dispatch(pay_mode_update(obj))
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
    <div className="px-2 py-3 md:px-[2px] w-[550px] mx-auto">
      <div className="flex flex-wrap w-full">
          <div className="w-full">
            <div className="bg-[#283046] text-[#d0d2d6] height-screen lg:height-auto rounded-lg px-7 py-2">
             <div className='flex justify-between items-center bg-[#283046] px-2 py-2 mb-5 mt-3'>
                <div className='text-white font-bold text-2xl'>
                  Payment Mode Update
                </div>
                <div>
                  <button onClick={() => navigate(-1)} className="bg-[#323b55] px-5 py-1 text-white rounded-md">Go Back</button>
                </div>
             </div>
             <hr/>
              <form onSubmit={update}>
              <div className="flex flex-col w-full gap-1 mb-3">
                  <label htmlFor="pay_mode">Payment Mode</label>
                  <input value={state.pay_mode} onChange={inputHandle} className="bg-[#283046] border border-slate-700 px-4 py-1 focus:border-indigo-500 outline-none text-[#d0d2d6] rounded-md"
                    type="text"
                    id="pay_mode"
                    name="pay_mode"
                    placeholder="Enter pay mode" required
                  />
                </div>
                <div className="flex flex-col w-full gap-1 mb-3">
                <div className='flex flex-col w-full gap-1 text-[#d0d2d6] mb-4'>
                  <label htmlFor='pay_number'>Payment Number:</label>
                    <input value={state.pay_number} onChange={inputHandle} className="bg-[#283046] border border-slate-700 px-4 py-1 focus:border-indigo-500 outline-none text-[#d0d2d6] rounded-md"
                    type="text"
                    id="pay_number"
                    name="pay_number"
                    placeholder="Enter pay number"
                  />
                </div>
                <div className='flex flex-col w-full gap-1 text-[#d0d2d6] mb-4'>
                    <label htmlFor='pay_note'>Payment Note:</label>
                    <input value={state.pay_note} onChange={inputHandle} className="bg-[#283046] border border-slate-700 px-4 py-1 focus:border-indigo-500 outline-none text-[#d0d2d6] rounded-md"
                    type="text"
                    id="pay_note"
                    name="pay_note"
                    placeholder="Enter pay note"
                  />
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

export default PaymentModeEdit;
