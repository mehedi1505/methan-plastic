import React, { useState,useEffect, forwardRef } from "react";
import {useParams, useNavigate } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { PropagateLoader } from 'react-spinners'
import {cssOverride} from '../../../utils/utils'
import { AiOutlineCloseCircle } from "react-icons/ai";
import toast from 'react-hot-toast'
import {messageClear,asset_type_update,asset_type_get_by_id} from '../../../store/reducers/assetReducer'

const AssetTypeEdit = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { typeId } = useParams()
  const {loader,successMessage,errorMessage,assetType} = useSelector(state=>state.asset)
  const {userInfo} = useSelector(state=>state.auth)
  const [state,setState] = useState({
    asset_type_name:'',
    asset_type_shortcode:'',
    asset_type_note:''
  })

  useEffect(()=>{
    dispatch(asset_type_get_by_id(typeId))
},[typeId])
const inputHandle = (e)=>{
    setState({
        ...state,
        [e.target.name] : e.target.value
    })
}

  const update= (e)=>{
      e.preventDefault()
      const obj = {
        asset_type_name: state.asset_type_name,
        asset_type_shortcode: state.asset_type_shortcode,
        asset_type_note: state.asset_type_note,
        typeId:typeId,
        userInfo:userInfo.name
      }
      dispatch(asset_type_update(obj))
  }
  useEffect(()=>{
    setState({
    asset_type_name:assetType.asset_type_name,
    asset_type_shortcode:assetType.asset_type_shortcode,
    asset_type_note:assetType.asset_type_note
    })
},[assetType])

  useEffect(()=>{
    if(successMessage){
      toast.success(successMessage) 
        navigate('/admin/dashboard/asset-type')
      dispatch(messageClear())
    }
    if(errorMessage){
      toast.error(errorMessage)
      dispatch(messageClear())
    }
 
  },[successMessage,errorMessage])


          
  return (
    <div className="px-2 py-3 md:px-[2px] w-[550px] h-[550px] mx-auto">
      <div className="flex flex-wrap w-full">
          <div className="w-full">
            <div className="bg-[#283046] text-[#d0d2d6] height-screen lg:height-auto rounded-lg px-7 pt-4 pb-[40px]">
             <div className='flex justify-between items-center bg-[#283046] px-2 py-2 mb-1 mt-3'>
                <div className='text-[#d0d2d6] font-bold'>
                  Asset Type Update
                </div>
                <div>
                  <button onClick={() => navigate(-1)} className="bg-[#283046] px-5 py-1 text-white border-2 border-slate-700 rounded-md">Go Back</button>
                </div>
             </div>
             <hr className='border-2 border-slate-500'/>
              <form onSubmit={update}>
                    <div className='flex flex-col mb-1 gap-2 w-full px-3 text-[#d0d2d6] mt-4'>
                        <div className='flex flex-col w-[100%] gap-1 text-xs'>
                        <label htmlFor="asset_type_name">Asset Type Name</label>
                            <input value={state.asset_type_name}  onChange={inputHandle} className="bg-[#FFFFFF] border border-slate-700 shadow-md px-4 py-3 focus:border-indigo-500 outline-none text-black rounded-md"
                              type="text"
                              id="asset_type_name"
                              name="asset_type_name"
                              placeholder="Enter type name" required
                            />
                        </div> 
                        <div className='flex flex-col w-[100%] gap-1 text-xs'>
                        <label htmlFor="asset_type_shortcode">Asset Type Shortcode</label>
                            <input value={state.asset_type_shortcode}  onChange={inputHandle} className="bg-[#FFFFFF] border border-slate-700 shadow-md px-4 py-3 focus:border-indigo-500 outline-none text-black rounded-md"
                              type="text"
                              id="asset_type_shortcode"
                              name="asset_type_shortcode"
                              placeholder="Enter type name"
                            />
                        </div>

        
                        <div className='flex flex-col w-[100%] gap-1 text-xs'>
                        <label htmlFor="asset_type_note">Asset Type Note</label>
                            <input value={state.asset_type_note}  onChange={inputHandle} className="bg-[#FFFFFF] border border-slate-700 shadow-md px-4 py-3 focus:border-indigo-500 outline-none text-black rounded-md"
                              type="text"
                              id="asset_type_note"
                              name="asset_type_note"
                              placeholder="Enter type note"
                            />
                        </div> 

                      <div className='flex w-[100%]'>
                        <button disabled={loader?true:false} type="submit" className='bg-green-500 mt-[19px] w-full py-[12px] text-black text-xs hover:shadow-green-500/50 hover:shadow-md font-bold rounded-md'>
                            {
                                loader? <PropagateLoader color='#fff' cssOverride={cssOverride}/>: 'UPDATE'
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

export default AssetTypeEdit;