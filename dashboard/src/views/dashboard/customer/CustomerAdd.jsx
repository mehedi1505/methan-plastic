import React, { useState,useEffect, forwardRef } from "react";
import { Link,useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import { PropagateLoader } from 'react-spinners'
import {cssOverride} from '../../../utils/utils'
import toast from 'react-hot-toast'
import {messageClear,customer_add,} from '../../../store/reducers/customerReducer'

const CustomerAdd = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {loader,successMessage,errorMessage} = useSelector(state=>state.customer)
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

const inputHandle = (e)=>{
    setState({
        ...state,
        [e.target.name] : e.target.value
    })
}

  const customerAdd= (e)=>{
      e.preventDefault()
      dispatch(customer_add({
        state:state,
        userName:userInfo.name
      }))
  }
  useEffect(()=>{
    if(successMessage){
      toast.success(successMessage)
      dispatch(messageClear())
      setState({
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
    }
    if(errorMessage){
      toast.error(errorMessage)
      dispatch(messageClear())
    }
  },[successMessage,errorMessage])

  const handleBillingCheckbox = (e) => {
    if (e.target.checked) {

     setState({
        ...state,
        billing_country:state.country,
        billing_district:state.district,
        billing_zip:state.zip,
        billing_city:state.city,
        billing_street:state.street,
     })
    } else {
     setState({
        ...state,
        billing_country:'',
        billing_district:'',
        billing_zip:'',
        billing_city:'',
        billing_street:''
     })
    }

  }; 
  const handleShippingCheckbox = (e) => {
    if (e.target.checked) {

     setState({
        ...state,
        shipping_country:state.country,
        shipping_district:state.district,
        shipping_zip:state.zip,
        shipping_city:state.city,
        shipping_street:state.street,
     })
    } else {
     setState({
        ...state,
        shipping_country:'',
        shipping_district:'',
        shipping_zip:'',
        shipping_city:'',
        shipping_street:''
     })
    }

  }; 

  return (
    <div className="md:px-[2px] w-[98%] mx-auto mt-[-20px]">
      <div className="flex flex-wrap">
          <div className="w-full">
            <div className="bg-[#283046] text-[#d0d2d6] height-screen lg:height-auto px-3 p-5">
            <div className="flex justify-between items-center bg-[#7FD4F1] py-2 md:px-[2px] text-black">
                <div className="pl-2 font-bold text-2xl">Customer Create</div>
                <div onClick={()=>navigate('/admin/dashboard/customer/list')} className="pr-2 font-bold text-sm cursor-pointer bg-[#3ab0d8] px-3 py-1 mr-3">Customer List</div>
            </div>

              <form onSubmit={customerAdd}>

              
                    <div className='flex flex-col mb-2 md:flex-row gap-4 w-full text-[#d0d2d6] mt-2'>
                        <div className='flex flex-col w-[23%] gap-1'>
                            <label htmlFor='cus_id' className="text-sm">Customer ID:</label>
                            <input className='bg-[#D6E3EA] px-4 py-1 border-2 border-slate-700 rounded-sm outline-none focus:border-indigo-500 text-[#2A2D2E]' onChange={inputHandle} value={state.cus_id} type='text' placeholder='customer name' id='cus_id' name='cus_id' required/>
                        </div>
                        <div className='flex flex-col w-[24%] gap-1'>
                            <label htmlFor='cus_name' className="text-sm">Name:</label>
                            <input className='bg-[#D6E3EA] px-4 py-1 border-2 border-slate-700 rounded-sm outline-none focus:border-indigo-500 text-[#2A2D2E]' onChange={inputHandle} value={state.cus_name} type='text' placeholder='customer name' id='cus_name' name='cus_name' required/>
                        </div>
                        <div className='flex flex-col w-[25%] gap-1'>
                            <label htmlFor='cus_company' className="text-sm">Company Name:</label>
                            <input className='bg-[#D6E3EA] px-4 py-1 border border-slate-700 rounded-sm outline-none focus:border-indigo-500 text-[#2A2D2E]' onChange={inputHandle} value={state.cus_company} type='text' placeholder='enter company name' id='cus_company' name='cus_company' required/>
                        </div>
                        <div className='flex flex-col w-[23%] gap-1'>
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
                    <div>Billing Address <input type="checkbox" onChange={handleBillingCheckbox} /> <strong>if same as customer address? Please check.</strong></div>
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
                    <div>Shipping Address <input type="checkbox" onChange={handleShippingCheckbox} /> <strong>if same as customer address? Please check.</strong></div>
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
                    </div>

                    <div>
                    <button disabled={loader?true:false} type="submit" className='bg-blue-500 px-[93px] py-2 mb-3 text-white hover:shadow-blue-500/50 hover:shadow-md font-bold'>
                        {
                            loader? <PropagateLoader color='#fff' cssOverride={cssOverride}/>: 'Add Customer'
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

export default CustomerAdd;
