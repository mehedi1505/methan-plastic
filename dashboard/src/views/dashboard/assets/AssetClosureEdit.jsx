import React, { useState,useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import { PropagateLoader } from 'react-spinners'
import {cssOverride} from '../../../utils/utils'
import toast from 'react-hot-toast'

import {messageClear,closure_get_by_id,closure_update} from '../../../store/reducers/assetReducer'
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'

import moment from 'moment';

function handleOnWheel({deltaY}){
console.log('handleOnWheel',deltaY)
}

const AssetClosureEdit = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { closureId } = useParams()
  const {loader,successMessage,errorMessage,assetClosure,typeInfo} = useSelector(state=>state.asset)
  const {userInfo} = useSelector(state=>state.auth)

  const [state,setState] = useState({
    closure_reason:'',
    closure_note:''
  })
const [selectedDate, setSelectedDate] = useState(Date.now());
const inputHandle = (e)=>{
    setState({
        ...state,
        [e.target.name] : e.target.value
    })
}
useEffect(()=>{
 if(closureId){
  dispatch(closure_get_by_id(closureId))
 }
},[closureId])

const Update= (e)=>{
    e.preventDefault()
    const obj = {
      state:state,
      selectedDate,
      asset_id:closureId,
      userName:userInfo.name
    }
    dispatch(closure_update(obj))
}
useEffect(()=>{
  if(assetClosure.length>0){
   setState({
    closure_reason:assetClosure[0].closure_reason,
    closure_note:assetClosure[0].closure_note,

  })
  setSelectedDate(assetClosure[0].closure_date)
 }},[assetClosure])

  useEffect(()=>{
    if(successMessage){
      toast.success(successMessage)
      dispatch(messageClear())
      setState({
        closure_reason:'',
        closure_note:''
      })
      navigate('/admin/dashboard/asset-closure')
    }
    if(errorMessage){
      toast.error(errorMessage)
      dispatch(messageClear())
    }
  },[successMessage,errorMessage])

 
  return (
    <div className="mx-auto md:px-[2px]">
      <div className="flex flex-wrap w-[930px]">
          <div className="w-full pl-2">
            <div className="bg-[#283046] text-[#d0d2d6] height-screen lg:min-h-[550px] px-2 py-5">
            <div className="flex justify-between items-center bg-[#283046] py-1 md:px-[10px] text-white">
                <div className="pl-2 font-bold text-2xl">Asset Closure Update</div>
            </div>

              <form onSubmit={Update}>
                    <div className='flex flex-col md:flex-row gap-2 w-full px-3 text-[#d0d2d6] mt-6 mb-5'>
                    <div className='flex flex-col w-[31%] gap-[5px]'>
                     <p>Name: {assetClosure[0]?.register[0]?.asset_name}</p> 
                    </div> 
                    <div className='flex flex-col w-[32%] gap-[5px]'>
                    <p>Type: {typeInfo?.asset_type_name}</p>
                    </div>
                     <div className='flex flex-col w-[32%] gap-[5px]'>
                     <p>Origin: {assetClosure[0]?.register[0]?.asset_origin}</p> 
                    </div> 
                       
            
                    </div>
                    <hr className='border-2 border-slate-500 w-[97%] mx-auto'/> 
                    <div className='flex flex-col mb-1 md:flex-row gap-2 w-full px-3 text-[#d0d2d6] mt-6'>
                    <div className='flex flex-col w-[23%] gap-[5px]'>
                        <label htmlFor='depreciation_date' className="text-xs text-white">Depreciation Date:</label>   
                        <div className="bg-[#FFFFFF] text-black px-[8px] py-[4px] rounded-[3px]">
                          <DatePicker                        
                              selected={new Date(selectedDate)}
                              onChange={date=>setSelectedDate(date)}
                              dateFormat="dd/MM/yyyy"
                              filterDate={date=>date.getDay() !== 5}
                              showYearDropdown
                              scrollableMonthYearDropdown
                          />
                        </div>
                    </div> 
                        <div className='flex flex-col w-[23%] gap-1 text-xs'>
                        <label htmlFor="closure_reason">Closure Reason</label>
                            <input value={state.closure_reason}  onChange={inputHandle} className="bg-[#FFFFFF] border border-slate-700 shadow-md px-4 py-2 focus:border-indigo-500 outline-none text-black rounded-md"
                              type="text"
                              id="closure_reason"
                              name="closure_reason"
                              placeholder="Enter price" required
                            />
                        </div>
                        <div className='flex flex-col w-[54%] gap-1 text-xs'>
                        <label htmlFor="closure_note">Closure Note</label>
                            <input value={state.closure_note}  onChange={inputHandle} className="bg-[#FFFFFF] border border-slate-700 shadow-md px-4 py-2 focus:border-indigo-500 outline-none text-black rounded-md"
                              type="text"
                              id="closure_note"
                              name="closure_note"
                              placeholder="Enter note"
                            />
                        </div> 
                        
                    </div>
                    <div className='flex flex-col mb-1 md:flex-row gap-2 w-full px-3 text-[#d0d2d6] mt-2'>

                      <div className='flex w-[15%]'>
                        <button disabled={loader?true:false} type="submit" className='bg-green-500 mt-[19px] w-[130px] py-[8px] text-white text-xs hover:shadow-green-500/50 hover:shadow-md font-bold rounded-md'>
                            {
                                loader? <PropagateLoader color='#fff' cssOverride={cssOverride}/>: 'Update'
                            }
                            
                        </button>
                    </div>

                    </div>

              </form>
             

            </div>
          
            
          </div>     
      </div>
    </div>
  );
};

export default AssetClosureEdit;