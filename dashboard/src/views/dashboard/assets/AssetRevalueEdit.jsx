import React, { useState,useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import { PropagateLoader } from 'react-spinners'
import {cssOverride} from '../../../utils/utils'
import toast from 'react-hot-toast'

import {messageClear,revalue_get_by_id,revalue_update} from '../../../store/reducers/assetReducer'
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'

import moment from 'moment';

function handleOnWheel({deltaY}){
console.log('handleOnWheel',deltaY)
}

const AssetRevalueEdit = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { revalueId } = useParams()
  const {loader,successMessage,errorMessage,assetRevalue,typeInfo} = useSelector(state=>state.asset)
  const {userInfo} = useSelector(state=>state.auth)

  const [state,setState] = useState({
    revalue_price:'',
    revalue_note:''
  })
const [selectedDate, setSelectedDate] = useState(Date.now());
const inputHandle = (e)=>{
    setState({
        ...state,
        [e.target.name] : e.target.value
    })
}
useEffect(()=>{
 if(revalueId){
  dispatch(revalue_get_by_id(revalueId))
 }
},[revalueId])
const Update= (e)=>{
    e.preventDefault()
    const obj = {
      state:state,
      selectedDate,
      asset_id:revalueId,
      userName:userInfo.name
    }
    dispatch(revalue_update(obj))
}
useEffect(()=>{
  if(assetRevalue.length>0){
   setState({
     revalue_price:assetRevalue[0].revalue_price,
     revalue_note:assetRevalue[0].revalue_note,

  })
  setSelectedDate(assetRevalue[0].revalue_date)
 }},[assetRevalue])

  useEffect(()=>{
    if(successMessage){
      toast.success(successMessage)
      dispatch(messageClear())
      setState({
        revalue_price:'',
        revalue_note:''
      })
      navigate('/admin/dashboard/asset-revalue')
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
                <div className="pl-2 font-bold text-2xl">Asset Revalue Update</div>
            </div>

              <form onSubmit={Update}>
                    <div className='flex flex-col md:flex-row gap-2 w-full px-3 text-[#d0d2d6] mt-6 mb-5'>
                    <div className='flex flex-col w-[31%] gap-[5px]'>
                     <p>Name: {assetRevalue[0]?.register[0]?.asset_name}</p> 
                    </div> 
                    <div className='flex flex-col w-[32%] gap-[5px]'>
                    <p>Type: {typeInfo?.asset_type_name}</p>
                    </div>
                     <div className='flex flex-col w-[32%] gap-[5px]'>
                     <p>Origin: {assetRevalue[0]?.register[0]?.asset_origin}</p> 
                    </div> 
                       
            
                    </div>
                    <hr className='border-2 border-slate-500 w-[97%] mx-auto'/> 
                    <div className='flex flex-col mb-1 md:flex-row gap-2 w-full px-3 text-[#d0d2d6] mt-6'>
                    <div className='flex flex-col w-[23%] gap-[5px]'>
                        <label htmlFor='revalue_date' className="text-xs text-white">Revalue Date:</label>   
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
                        <label htmlFor="revalue_price">Revalue Price</label>
                            <input value={state.revalue_price}  onChange={inputHandle} className="bg-[#FFFFFF] border border-slate-700 shadow-md px-4 py-2 focus:border-indigo-500 outline-none text-black rounded-md"
                              type="number"
                              id="revalue_price"
                              name="revalue_price"
                              min="0"
                              step="any"
                              placeholder="Enter price" required
                            />
                        </div>
                        <div className='flex flex-col w-[54%] gap-1 text-xs'>
                        <label htmlFor="revalue_note">Revalue Note</label>
                            <input value={state.revalue_note}  onChange={inputHandle} className="bg-[#FFFFFF] border border-slate-700 shadow-md px-4 py-2 focus:border-indigo-500 outline-none text-black rounded-md"
                              type="text"
                              id="revalue_note"
                              name="revalue_note"
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

export default AssetRevalueEdit;