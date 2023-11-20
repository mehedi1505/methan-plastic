import React, { useState,useEffect, forwardRef } from "react";
import { Link, useParams,useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import { PropagateLoader } from 'react-spinners'
import {cssOverride} from '../../../utils/utils'
import toast from 'react-hot-toast'
import {messageClear,vendor_get_by_id,vendor_update} from '../../../store/reducers/vendorReducer'

const VendorEdit = () => {
  const dispatch = useDispatch()
  const { vendorId } = useParams()
  const navigate = useNavigate()
  const {loader,successMessage,errorMessage,vendor} = useSelector(state=>state.vendor)
  const {userInfo} = useSelector(state=>state.auth)
  const [state,setState] = useState({
    vendor_name:'',
    vendor_company:'',
    vendor_contact_number:'',
    vendor_vat_number:'',
    vendor_country:'',
    vendor_district:'',
    vendor_city:'',
    vendor_street:'',
    vendor_zip:'',
    vendor_website:'',
    vendor_email:''
  })
  useEffect(()=>{
    dispatch(vendor_get_by_id(vendorId))
},[vendorId])
const inputHandle = (e)=>{
    setState({
        ...state,
        [e.target.name] : e.target.value
    })
}
useEffect(()=>{
    setState({
        vendor_name:vendor.vendor_name,
        vendor_company:vendor.vendor_company,
        vendor_contact_number:vendor.vendor_contact_number,
        vendor_vat_number:vendor.vendor_vat_number,
        vendor_country:vendor.vendor_country,
        vendor_district:vendor.vendor_district,
        vendor_city:vendor.vendor_city,
        vendor_street:vendor.vendor_street,
        vendor_zip:vendor.vendor_zip,
        vendor_website:vendor.vendor_website,
        vendor_email:vendor.vendor_email
    })
},[vendor])

  const vendorUpdate= (e)=>{
      e.preventDefault()
      const obj = {
        vendor_name:state.vendor_name,
        vendor_company:state.vendor_company,
        vendor_contact_number:state.vendor_contact_number,
        vendor_vat_number:state.vendor_vat_number,
        vendor_country:state.vendor_country,
        vendor_district:state.vendor_district,
        vendor_city:state.vendor_city,
        vendor_street:state.vendor_street,
        vendor_zip:state.vendor_zip,
        vendor_website:state.vendor_website,
        vendor_email:state.vendor_email,
        vendorId:vendorId,
        userName:userInfo.name
      }
      dispatch(vendor_update(obj))
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
    <div className="mx-auto py-5 md:px-[2px]">
      <div className="flex flex-wrap w-[900px]">
          <div className="w-full pl-5">
            <div className="bg-[#283046] text-[#d0d2d6] height-screen lg:height-auto px-3 py-2">
            <div className="flex justify-between items-center bg-[#7FD4F1] py-2 md:px-[2px] text-black">
                <div className="pl-2 font-bold text-2xl">Vendor Update</div>
                <div  onClick={() => navigate(-1)} className="pr-2 font-bold text-sm cursor-pointer bg-[#3ab0d8] px-3 py-1 mr-3">Vendor List</div>
            </div>

              <form onSubmit={vendorUpdate}>
                    <div className='flex flex-col mb-2 md:flex-row gap-4 w-full text-[#d0d2d6] mt-2'>
                        <div className='flex flex-col w-full gap-1'>
                            <label htmlFor='vendor_name' className="text-sm">Name:</label>
                            <input className='bg-[#D6E3EA] px-4 py-1 border-2 border-slate-700 rounded-sm outline-none focus:border-indigo-500 text-[#2A2D2E]' onChange={inputHandle} value={state.vendor_name} type='text' placeholder='vendor name' id='vendor_name' name='vendor_name' required/>
                        </div>
                        <div className='flex flex-col w-full gap-1'>
                            <label htmlFor='vendor_company' className="text-sm">Company Name:</label>
                            <input className='bg-[#D6E3EA] px-4 py-1 border border-slate-700 rounded-sm outline-none focus:border-indigo-500 text-[#2A2D2E]' onChange={inputHandle} value={state.vendor_company} type='text' placeholder='enter company name' id='vendor_company' name='vendor_company' required/>
                        </div>
                        <div className='flex flex-col w-full gap-1'>
                            <label htmlFor='vendor_contact_number' className="text-sm">Contact Number:</label>
                            <input className='bg-[#D6E3EA] px-4 py-1 border border-slate-700 rounded-sm outline-none focus:border-indigo-500 text-[#2A2D2E]' onChange={inputHandle} value={state.vendor_contact_number} type='text' placeholder='contact number' id='vendor_contact_number' name='vendor_contact_number' required/>
                        </div>
                    </div>
                    <div className='flex flex-col mb-2 md:flex-row gap-4 w-full text-[#d0d2d6]'>
                        <div className='flex flex-col w-full gap-1'>
                            <label htmlFor='vendor_vat_number' className="text-sm">Vat Number: <span className="text-[#F92F51]">(optional)</span></label>
                            <input onChange={inputHandle} className='bg-[#D6E3EA] px-4 py-1 border border-slate-700 rounded-sm outline-none focus:border-indigo-500 text-[#2A2D2E]' value={state.vendor_vat_number} type='text' placeholder='enter vat number' min='0' id='vendor_vat_number' name='vendor_vat_number'/>
                        </div>
                         <div className='flex flex-col w-full gap-1'>
                            <label htmlFor='vendor_country' className="text-sm">Country:</label>
                            <input onChange={inputHandle} className='bg-[#D6E3EA] px-4 py-1 border border-slate-700 rounded-sm outline-none focus:border-indigo-500 text-[#2A2D2E]' value={state.vendor_country} type='text' placeholder='enter country' min='0' id='vendor_country' name='vendor_country' required/>
                        </div>
                        <div className='flex flex-col w-full gap-1'>
                            <label htmlFor='vendor_district' className="text-sm">District:</label>
                            <input className='bg-[#D6E3EA] px-4 py-1 border border-slate-700 rounded-sm outline-none focus:border-indigo-500 text-[#2A2D2E]' onChange={inputHandle} value={state.vendor_district} type='text' placeholder='enter district' min='0' id='vendor_district' name='vendor_district' required/>
                        </div>
                    </div>
                    <div className='flex flex-col mb-2 md:flex-row gap-4 w-full text-[#d0d2d6]'>
                        <div className='flex flex-col w-full gap-1'>
                            <label htmlFor='vendor_city' className="text-sm">City:</label>
                            <input onChange={inputHandle} className='bg-[#D6E3EA] px-4 py-1 border border-slate-700 rounded-sm outline-none focus:border-indigo-500 text-[#2A2D2E]' value={state.vendor_city} type='text' placeholder='enter city' min='0' id='vendor_city' name='vendor_city' required/>
                        </div>
                         
                        <div className='flex flex-col w-full gap-1'>
                            <label htmlFor='vendor_zip' className="text-sm">Zip Code:</label>
                            <input className='bg-[#D6E3EA] px-4 py-1 border border-slate-700 rounded-sm outline-none focus:border-indigo-500 text-[#2A2D2E]' onChange={inputHandle} value={state.vendor_zip} type='text' placeholder='Enter Zip code' min='0' id='vendor_zip' name='vendor_zip' required/>
                        </div>
                        <div className='flex flex-col w-full gap-1'>
                            <label htmlFor='vendor_email' className="text-sm">Email: <span className="text-[#F92F51]">(optional)</span></label>
                            <input onChange={inputHandle} className='bg-[#D6E3EA] px-4 py-1 border border-slate-700 rounded-sm outline-none focus:border-indigo-500 text-[#2A2D2E]' value={state.vendor_email} type='text' placeholder='enter email' min='0' id='vendor_email' name='vendor_email'/>
                        </div>

                    </div>
                    <div className='flex flex-col mb-2 md:flex-row gap-4 w-full text-[#d0d2d6]'>
                        <div className='flex flex-col w-full gap-1'>
                            <label htmlFor='vendor_street' className="text-sm">Street:</label>
                            <input onChange={inputHandle} className='bg-[#D6E3EA] px-4 py-1 border border-slate-700 rounded-sm outline-none focus:border-indigo-500 text-[#2A2D2E] w-[565px]' value={state.vendor_street} type='text' placeholder='enter  street' min='0' id='vendor_street' name='vendor_street' required/>
                        </div>
                        <div className='flex flex-col w-full gap-1'>
                            <label htmlFor='vendor_website' className="text-sm">Website: <span className="text-[#F92F51]">(optional)</span></label>
                            <input onChange={inputHandle} className='bg-[#D6E3EA] px-4 py-1 border border-slate-700 rounded-sm outline-none focus:border-indigo-500 text-[#2A2D2E]' value={state.vendor_website} type='text' placeholder='website' min='0' id='vendor_website' name='vendor_website'/>
                        </div>
                    </div>
                    <div>
                    <button disabled={loader?true:false} type="submit" className='bg-blue-500 px-[93px] py-2 mb-3 text-white hover:shadow-blue-500/50 hover:shadow-md font-bold'>
                        {
                            loader? <PropagateLoader color='#fff' cssOverride={cssOverride}/>: 'Update'
                        }
                        
                    </button>
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

export default VendorEdit;
