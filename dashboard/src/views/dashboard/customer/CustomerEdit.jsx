import React, { useState,useEffect, forwardRef } from "react";
import { Link,useNavigate,useParams} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import { PropagateLoader } from 'react-spinners'
import {cssOverride} from '../../../utils/utils'
import toast from 'react-hot-toast'
import Select from 'react-select'
import {messageClear,customer_get_by_id,customer_update} from '../../../store/reducers/customerReducer'

const CustomerEdit = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {customerId }= useParams()
  const {loader,successMessage,errorMessage,customer} = useSelector(state=>state.customer)
  const {userInfo} = useSelector(state=>state.auth)
  const [state,setState] = useState({
    cus_id:'',
    cus_name:'',
    cus_company:'',
    contact_number:'',
    vat_number:'',
    cus_desc:'',
    cus_website:'',
    cus_email:'',
    status:'',
    country:'',
    district:'',
    zip:'',
    city:'',
    street:'',
    billing_country:'',
    billing_district:'',
    billing_zip:'',
    billing_city:'',
    billing_street:'',
    shipping_country:'',
    shipping_district:'',
    shipping_zip:'',
    shipping_city:'',
    shipping_street:''
  })
  useEffect(()=>{
    dispatch(customer_get_by_id(customerId))
},[customerId])


const inputHandle = (e)=>{
    setState({
        ...state,
        [e.target.name] : e.target.value
    })
}
useEffect(()=>{
  setState({
    cus_id:customer.cus_id,
    cus_name:customer.cus_name,
    cus_company:customer.cus_company,
    contact_number:customer.contact_number,
    vat_number:customer.vat_number,
    cus_desc:customer.cus_desc,
    cus_website:customer.cus_website,
    cus_email:customer.cus_email,
    status:customer.status,
    country:customer.country,
    district:customer.district,
    zip:customer.zip,
    city:customer.city,
    street:customer.street,
    billing_country:customer.billing_country,
    billing_district:customer.billing_district,
    billing_zip:customer.billing_zip,
    billing_city:customer.billing_city,
    billing_street:customer.billing_street,
    shipping_country:customer.shipping_country,
    shipping_district:customer.shipping_district,
    shipping_zip:customer.shipping_zip,
    shipping_city:customer.shipping_city,
    shipping_street:customer.shipping_street
  })
},[customer])
  const customerUpdate= (e)=>{
      e.preventDefault()
      const obj = {
        cus_id:state.cus_id,
        cus_name:state.cus_name,
        cus_company:state.cus_company,
        contact_number:state.contact_number,
        vat_number:state.vat_number,
        cus_desc:state.cus_desc,
        cus_website:state.cus_website,
        cus_email:state.cus_email,
        status:state.status,
        country:state.country,
        district:state.district,
        zip:state.zip,
        city:state.city,
        street:state.street,
        billing_country:state.billing_country,
        billing_district:state.billing_district,
        billing_zip:state.billing_zip,
        billing_city:state.billing_city,
        billing_street:state.billing_street,
        shipping_country:state.shipping_country,
        shipping_district:state.shipping_district,
        shipping_zip:state.shipping_zip,
        shipping_city:state.shipping_city,
        shipping_street:state.shipping_street,
        customerId:customerId,
        userName:userInfo.name
      }
      dispatch(customer_update(obj))
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
  const options = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ];
  return (
    <div className="mx-auto py-1 md:px-[2px]">
      <div className="flex flex-wrap w-[98%]">
          <div className="w-full pl-5">
            <div className="bg-[#283046] text-[#d0d2d6] height-screen lg:height-auto px-3 p-5">
            <div className="flex justify-between items-center bg-[#7FD4F1] py-2 md:px-[2px] text-black">
                <div className="pl-2 font-bold text-2xl">Customer Edit</div>
                <div onClick={()=>navigate('/admin/dashboard/customer/list')} className="pr-2 font-bold text-sm cursor-pointer bg-[#3ab0d8] px-3 py-1 mr-3">Customer List</div>
            </div>

              <form onSubmit={customerUpdate}>             
                    <div className='flex flex-col mb-2 md:flex-row gap-4 w-full text-[#d0d2d6] mt-2'>
                        <div className='flex flex-col w-[23%] gap-1'>
                            <label htmlFor='cus_id' className="text-sm">Customer Id:</label>
                            <input className='bg-[#D6E3EA] px-4 py-1 border-2 border-slate-700 rounded-sm outline-none focus:border-indigo-500 text-[#2A2D2E]' onChange={inputHandle} value={state.cus_id} type='text' placeholder='customer ID' id='cus_id' name='cus_id' required/>
                        </div>
                        <div className='flex flex-col w-[24%] gap-1'>
                            <label htmlFor='cus_name' className="text-sm">Name:</label>
                            <input className='bg-[#D6E3EA] px-4 py-1 border-2 border-slate-700 rounded-sm outline-none focus:border-indigo-500 text-[#2A2D2E]' onChange={inputHandle} value={state.cus_name} type='text' placeholder='customer name' id='cus_name' name='cus_name' required/>
                        </div>
                        <div className='flex flex-col w-[25%] gap-1'>
                            <label htmlFor='cus_company' className="text-sm">Company Name:</label>
                            <input className='bg-[#D6E3EA] px-4 py-1 border border-slate-700 rounded-sm outline-none focus:border-indigo-500 text-[#2A2D2E]' onChange={inputHandle} value={state.cus_company} type='text' placeholder='enter company name' id='cus_company' name='cus_company' required/>
                        </div>
                        <div className='flex flex-col w-[22%] gap-1'>
                            <label htmlFor='contact_number' className="text-sm">Contact Number:</label>
                            <input className='bg-[#D6E3EA] px-4 py-1 border border-slate-700 rounded-sm outline-none focus:border-indigo-500 text-[#2A2D2E]' onChange={inputHandle} value={state.contact_number} type='text' placeholder='contact number' id='contact_number' name='contact_number' required/>
                        </div>
                       
                    </div>

                    <div className='flex flex-col mb-2 md:flex-row gap-4 w-full text-[#d0d2d6] mt-2'>
                    
                    <div className='flex flex-col w-full gap-1'>
                            <label htmlFor='vat_number' className="text-sm">Vat Number: <span className="text-[#F92F51]">(optional)</span></label>
                            <input onChange={inputHandle} className='bg-[#D6E3EA] px-4 py-1 border border-slate-700 rounded-sm outline-none focus:border-indigo-500 text-[#2A2D2E]' value={state.vat_number} type='text' placeholder='enter vat number' min='0' id='vat_number' name='vat_number'/>
                        </div>

                        <div className='flex flex-col w-full gap-1'>
                            <label htmlFor='cus_website' className="text-sm">Website: <span className="text-[#F92F51]">(optional)</span></label>
                            <input onChange={inputHandle} className='bg-[#D6E3EA] px-4 py-1 border border-slate-700 rounded-sm outline-none focus:border-indigo-500 text-[#2A2D2E]' value={state.cus_website} type='text' placeholder='website' min='0' id='cus_website' name='cus_website'/>
                        </div>
                        <div className='flex flex-col w-full gap-1'>
                            <label htmlFor='cus_email' className="text-sm">Email: <span className="text-[#F92F51]">(optional)</span></label>
                            <input onChange={inputHandle} className='bg-[#D6E3EA] px-4 py-1 border border-slate-700 rounded-sm outline-none focus:border-indigo-500 text-[#2A2D2E]' value={state.cus_email} type='text' placeholder='enter email' min='0' id='cus_email' name='cus_email'/>
                        </div>
                    </div>
                    <div className='flex flex-col mb-2 md:flex-row gap-4 w-full text-[#d0d2d6] mt-2'>
                        <div className='flex flex-col w-full gap-1'>
                            <label htmlFor='cus_desc' className="text-sm">Description:</label>
                            <input onChange={inputHandle} className='bg-[#D6E3EA] px-4 py-1 border border-slate-700 rounded-sm outline-none focus:border-indigo-500 text-[#2A2D2E]' value={state.cus_desc} type='text' placeholder='enter description' min='0' id='cus_desc' name='cus_desc' required/>
                        </div>
                    </div>
                    <div>Customer Address</div><hr/>
                    <div className='flex flex-col mb-2 md:flex-row gap-4 w-full text-[#d0d2d6]'>
                        <div className='flex flex-col w-full gap-1'>
                            <label htmlFor='country' className="text-sm">Country:</label>
                            <input onChange={inputHandle} className='bg-[#D6E3EA] px-4 py-1 border border-slate-700 rounded-sm outline-none focus:border-indigo-500 text-[#2A2D2E]' value={state.country} type='text' placeholder='enter country' min='0' id='country' name='country' required/>
                        </div>
                        <div className='flex flex-col w-full gap-1'>
                            <label htmlFor='district' className="text-sm">District:</label>
                            <input className='bg-[#D6E3EA] px-4 py-1 border border-slate-700 rounded-sm outline-none focus:border-indigo-500 text-[#2A2D2E]' onChange={inputHandle} value={state.district} type='text' placeholder='enter district' min='0' id='district' name='district' required/>
                        </div>
                        <div className='flex flex-col w-full gap-1'>
                            <label htmlFor='zip' className="text-sm">Zip Code:</label>
                            <input className='bg-[#D6E3EA] px-4 py-1 border border-slate-700 rounded-sm outline-none focus:border-indigo-500 text-[#2A2D2E]' onChange={inputHandle} value={state.zip} type='text' placeholder='Enter Zip code' min='0' id='zip' name='zip' required/>
                        </div>
                        
                    </div>

                    <div className='flex flex-col mb-2 md:flex-row gap-4 w-full text-[#d0d2d6]'>
                    <div className='flex flex-col w-full gap-1'>
                            <label htmlFor='city' className="text-sm">City:</label>
                            <input onChange={inputHandle} className='bg-[#D6E3EA] px-4 py-1 border border-slate-700 rounded-sm outline-none focus:border-indigo-500 text-[#2A2D2E]' value={state.city} type='text' placeholder='enter city' min='0' id='city' name='city' required/>
                        </div>
                        <div className='flex flex-col w-full gap-1'>
                            <label htmlFor='street' className="text-sm">Street:</label>
                            <input onChange={inputHandle} className='bg-[#D6E3EA] px-4 py-1 border border-slate-700 rounded-sm outline-none focus:border-indigo-500 text-[#2A2D2E]' value={state.street} type='text' placeholder='enter street' min='0' id='street' name='street' required/>
                        </div>
                    </div>
                    <div>Billing Address</div>
                    <hr/>
                    <div className='flex flex-col mb-2 md:flex-row gap-4 w-full text-[#d0d2d6]'>
                        <div className='flex flex-col w-full gap-1'>
                            <label htmlFor='billing_country' className="text-sm">Country:</label>
                            <input onChange={inputHandle} className='bg-[#D6E3EA] px-4 py-1 border border-slate-700 rounded-sm outline-none focus:border-indigo-500 text-[#2A2D2E]' value={state.billing_country} type='text' placeholder='enter country' min='0' id='billing_country' name='billing_country' required/>
                        </div>
                        <div className='flex flex-col w-full gap-1'>
                            <label htmlFor='billing_district' className="text-sm">District:</label>
                            <input className='bg-[#D6E3EA] px-4 py-1 border border-slate-700 rounded-sm outline-none focus:border-indigo-500 text-[#2A2D2E]' onChange={inputHandle} value={state.billing_district} type='text' placeholder='enter district' min='0' id='billing_district' name='billing_district' required/>
                        </div>
                        <div className='flex flex-col w-full gap-1'>
                            <label htmlFor='billing_zip' className="text-sm">Zip Code:</label>
                            <input className='bg-[#D6E3EA] px-4 py-1 border border-slate-700 rounded-sm outline-none focus:border-indigo-500 text-[#2A2D2E]' onChange={inputHandle} value={state.zip} type='text' placeholder='Enter Zip code' min='0' id='billing_zip' name='billing_zip' required/>
                        </div>
                  
                    </div>
                    <div className='flex flex-col mb-2 md:flex-row gap-4 w-full text-[#d0d2d6]'>
                        <div className='flex flex-col w-full gap-1'>
                            <label htmlFor='billing_city' className="text-sm">City:</label>
                            <input onChange={inputHandle} className='bg-[#D6E3EA] px-4 py-1 border border-slate-700 rounded-sm outline-none focus:border-indigo-500 text-[#2A2D2E]' value={state.city} type='text' placeholder='enter city' min='0' id='billing_city' name='billing_city' required/>
                        </div>
                        <div className='flex flex-col w-full gap-1'>
                            <label htmlFor='billing_street' className="text-sm">Street:</label>
                            <input onChange={inputHandle} className='bg-[#D6E3EA] px-4 py-1 border border-slate-700 rounded-sm outline-none focus:border-indigo-500 text-[#2A2D2E]' value={state.billing_street} type='text' placeholder='enter street' min='0' id='billing_street' name='billing_street' required/>
                        </div>
                  
                    </div>
                    <div>Shipping Address</div>
                        <hr/>
                    <div className='flex flex-col mb-2 md:flex-row gap-4 w-full text-[#d0d2d6]'>
                        <div className='flex flex-col w-full gap-1'>
                            <label htmlFor='shipping_country' className="text-sm">Country:</label>
                            <input onChange={inputHandle} className='bg-[#D6E3EA] px-4 py-1 border border-slate-700 rounded-sm outline-none focus:border-indigo-500 text-[#2A2D2E]' value={state.shipping_country} type='text' placeholder='enter country' min='0' id='shipping_country' name='shipping_country' required/>
                        </div>
                        <div className='flex flex-col w-full gap-1'>
                            <label htmlFor='shipping_district' className="text-sm">District:</label>
                            <input className='bg-[#D6E3EA] px-4 py-1 border border-slate-700 rounded-sm outline-none focus:border-indigo-500 text-[#2A2D2E]' onChange={inputHandle} value={state.shipping_district} type='text' placeholder='enter district' min='0' id='shipping_district' name='shipping_district' required/>
                        </div>
                        <div className='flex flex-col w-full gap-1'>
                            <label htmlFor='shipping_zip' className="text-sm">Zip Code:</label>
                            <input className='bg-[#D6E3EA] px-4 py-1 border border-slate-700 rounded-sm outline-none focus:border-indigo-500 text-[#2A2D2E]' onChange={inputHandle} value={state.shipping_zip} type='text' placeholder='Enter Zip code' min='0' id='shipping_zip' name='shipping_zip' required/>
                        </div>
                    </div>
                    <div className='flex flex-col mb-2 md:flex-row gap-4 w-full text-[#d0d2d6]'>
                        <div className='flex flex-col w-full gap-1'>
                            <label htmlFor='shipping_city' className="text-sm">City:</label>
                            <input onChange={inputHandle} className='bg-[#D6E3EA] px-4 py-1 border border-slate-700 rounded-sm outline-none focus:border-indigo-500 text-[#2A2D2E]' value={state.shipping_city} type='text' placeholder='enter city' min='0' id='shipping_city' name='shipping_city' required/>
                        </div>
                        <div className='flex flex-col w-full gap-1'>
                            <label htmlFor='shipping_street' className="text-sm">Street:</label>
                            <input onChange={inputHandle} className='bg-[#D6E3EA] px-4 py-1 border border-slate-700 rounded-sm outline-none focus:border-indigo-500 text-[#2A2D2E]' value={state.shipping_street} type='text' placeholder='enter street' min='0' id='shipping_street' name='shipping_street' required/>
                        </div>
                        <div className='flex flex-col w-full gap-1'>
                        <label htmlFor='status' className="text-sm">Status:</label>
                          <select className="text-black py-1 bg-[#D6E3EA] outline-none" value={state.status} onChange={inputHandle} name="status" id="status">
                            {options.map(option => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>
                    </div>
                    <div>
                    <button disabled={loader?true:false} type="submit" className='bg-blue-500 px-[93px] py-2 mb-3 text-white hover:shadow-blue-500/50 hover:shadow-md font-bold'>
                        {
                            loader? <PropagateLoader color='#fff' cssOverride={cssOverride}/>: 'Update'
                        }
                        
                    </button>
                </div>
       
                <div className='mt-4'> </div>
              </form>
            </div>
          </div>       
      </div>
    </div>
  );
};

export default CustomerEdit;
