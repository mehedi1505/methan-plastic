import React, { useState,useEffect, forwardRef } from "react";
import { Link,useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import { PropagateLoader } from 'react-spinners'
import {cssOverride} from '../../../utils/utils'
import toast from 'react-hot-toast'
import {messageClear,vendor_add,vendor_get} from '../../../store/reducers/vendorReducer'
import { FaEdit, FaTrash } from "react-icons/fa";
import {FixedSizeList as List} from 'react-window'
import Search from '../../../components/Search'

function handleOnWheel({deltaY}){
  console.log('handleOnWheel',deltaY)
  }
  const outerElementType = forwardRef((props,ref)=>(
    <div ref={ref} onWheel={handleOnWheel} {...props} />
  ))
const VendorAdd = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {loader,successMessage,errorMessage,vendors,totalVendor} = useSelector(state=>state.vendor)
  const {userInfo} = useSelector(state=>state.auth)
  const [searchValue, setSearchValue] = useState("");
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

const inputHandle = (e)=>{
    setState({
        ...state,
        [e.target.name] : e.target.value
    })
}

  const vendorAdd= (e)=>{
      e.preventDefault()
      dispatch(vendor_add({
        state:state,
        userName:userInfo.name
      }))
  }
  useEffect(()=>{
    dispatch(vendor_get({searchValue}))
},[searchValue,successMessage,errorMessage])
  useEffect(()=>{
    if(successMessage){
      toast.success(successMessage)
      dispatch(messageClear())
      setState({
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
        vendor_email:'',
      })
    }
    if(errorMessage){
      toast.error(errorMessage)
      dispatch(messageClear())
    }
  },[successMessage,errorMessage])
  function AllRows({ index, style }) {
    return <div style={style} className='flex text-xs mt-2'>
      <div className='w-[10%] p-1 whitespace-nowrap'>{index + 1}</div>
      <div className='w-[35%] p-1 whitespace-nowrap'>{`${vendors[index].vendor_name}`}</div>
      <div className='w-[35%] p-1 whitespace-nowrap'>{`${vendors[index].vendor_company}`}</div>
      <div className='w-[35%] p-1 whitespace-nowrap'>{`${vendors[index].vendor_contact_number}`}</div>
      <div className='w-[35%] p-1 whitespace-nowrap'>{`${vendors[index].vendor_country}`}</div>
      <div className="w-[20%] flex justify-center items-center gap-1">
        <Link to={`/admin/dashboard/vendor-edit/${vendors[index]._id}`} className="p-[5px] rounded bg-yellow-500 hover:shadow-lg shadow-yellow-500/50">
          <FaEdit />
        </Link>
        {/* <button onClick = {()=>dispatch(vendor_delete(`${vendors[index]._id}`))} className="p-[5px] rounded bg-red-600 hover:shadow-lg shadow-red-600/50">
          <FaTrash />
        </button> */}
      </div>
    </div>;

  } 
        
  return (
    <div className="mx-auto md:px-[2px]">
      <div className="flex flex-wrap w-[915px]">
          <div className="w-full pl-5">
            <div className="bg-[#283046] text-[#d0d2d6] height-screen lg:height-auto px-3 py-1">
            <div className="flex justify-between items-center bg-[#283046] py-1 md:px-[2px] text-white">
                <div className="pl-2 font-bold text-2xl">Vendor Create</div>
                {/* <div onClick={()=>navigate('/admin/dashboard/vendor/list')} className="pr-2 font-bold text-sm cursor-pointer bg-[#3ab0d8] px-3 py-1 mr-3">Vendor List</div> */}
            </div>
<hr/>
              <form onSubmit={vendorAdd}>
                    <div className='flex flex-col mb-1 md:flex-row gap-1 w-full text-[#d0d2d6] mt-1'>
                        <div className='flex flex-col w-[20%] gap-1'>
                            <label htmlFor='vendor_name' className="text-sm">Name:</label>
                            <input className='bg-[#D6E3EA] px-2 py-1 border border-slate-700 rounded-sm outline-none focus:border-indigo-500 text-[#2A2D2E] text-xs' onChange={inputHandle} value={state.vendor_name} type='text' placeholder='vendor name' id='vendor_name' name='vendor_name' required/>
                        </div>
                        <div className='flex flex-col w-[20%] gap-1'>
                            <label htmlFor='vendor_company' className="text-sm">Company Name:</label>
                            <input className='bg-[#D6E3EA] px-2 py-1 border border-slate-700 rounded-sm outline-none focus:border-indigo-500 text-[#2A2D2E] text-xs' onChange={inputHandle} value={state.vendor_company} type='text' placeholder='enter company name' id='vendor_company' name='vendor_company' required/>
                        </div>

                        <div className='flex flex-col w-[15%] gap-1'>
                            <label htmlFor='vendor_contact_number' className="text-sm">Contact Number:</label>
                            <input className='bg-[#D6E3EA] px-2 py-1 border border-slate-700 rounded-sm outline-none focus:border-indigo-500 text-[#2A2D2E] text-xs' onChange={inputHandle} value={state.vendor_contact_number} type='text' placeholder='contact number' id='vendor_contact_number' name='vendor_contact_number' required/>
                        </div>
                        <div className='flex flex-col w-[15%] gap-1'>
                            <label htmlFor='vendor_country' className="text-sm">Country:</label>
                            <input onChange={inputHandle} className='bg-[#D6E3EA] px-2 py-1 border border-slate-700 rounded-sm outline-none focus:border-indigo-500 text-[#2A2D2E] text-xs' value={state.vendor_country} type='text' placeholder='enter country' id='vendor_country' name='vendor_country' required/>
                        </div>
                                      
                        <div className='flex flex-col w-[10%] gap-1'>
                            <label htmlFor='vendor_district' className="text-sm">District:</label>
                            <input className='bg-[#D6E3EA] px-2 py-1 border border-slate-700 rounded-sm outline-none focus:border-indigo-500 text-[#2A2D2E] text-xs' onChange={inputHandle} value={state.vendor_district} type='text' placeholder='enter district' id='vendor_district' name='vendor_district' required/>
                        </div>
                        <div className='flex flex-col w-[10%] gap-1'>
                            <label htmlFor='vendor_city' className="text-sm">City:</label>
                            <input onChange={inputHandle} className='bg-[#D6E3EA] px-2 py-1 border border-slate-700 rounded-sm outline-none focus:border-indigo-500 text-[#2A2D2E] text-xs' value={state.vendor_city} type='text' placeholder='enter city' id='vendor_city' name='vendor_city' required/>
                        </div>
                        <div className='flex flex-col w-[10%] gap-1'>
                            <label htmlFor='vendor_zip' className="text-sm">Zip Code:</label>
                            <input className='bg-[#D6E3EA] px-2 py-1 border border-slate-700 rounded-sm outline-none focus:border-indigo-500 text-[#2A2D2E] text-xs' onChange={inputHandle} value={state.vendor_zip} type='text' placeholder='Enter Zip' id='vendor_zip' name='vendor_zip' required/>
                        </div>

                    </div>
                    <div className='flex flex-col mb-1 md:flex-row gap-1 w-full text-[#d0d2d6]'>
                        <div className='flex flex-col w-[20%] gap-1'>
                            <label htmlFor='vendor_vat_number' className="text-sm">Vat Number: <span className="text-[#F92F51]">(optional)</span></label>
                            <input onChange={inputHandle} className='bg-[#D6E3EA] px-2 py-1 border border-slate-700 rounded-sm outline-none focus:border-indigo-500 text-[#2A2D2E] text-xs' value={state.vendor_vat_number} type='text' placeholder='enter vat number' min='0' id='vendor_vat_number' name='vendor_vat_number'/>
                        </div>
                        <div className='flex flex-col w-[20%] gap-1'>
                            <label htmlFor='vendor_email' className="text-sm">Email: <span className="text-[#F92F51]">(optional)</span></label>
                            <input onChange={inputHandle} className='bg-[#D6E3EA] px-2 py-1 border border-slate-700 rounded-sm outline-none focus:border-indigo-500 text-[#2A2D2E] text-xs' value={state.vendor_email} type='text' placeholder='enter email' id='vendor_email' name='vendor_email'/>
                        </div>
                        <div className='flex flex-col w-[20%] gap-1'>
                            <label htmlFor='vendor_website' className="text-sm">Website: <span className="text-[#F92F51]">(optional)</span></label>
                            <input onChange={inputHandle} className='bg-[#D6E3EA] px-2 py-1 border border-slate-700 rounded-sm outline-none focus:border-indigo-500 text-[#2A2D2E] text-xs' value={state.vendor_website} type='text' placeholder='website' id='vendor_website' name='vendor_website'/>
                        </div>
                        
                        <div className='flex flex-col w-[30%] gap-1'>
                            <label htmlFor='vendor_street' className="text-sm">Street:</label>
                            <input onChange={inputHandle} className='bg-[#D6E3EA] px-2 py-1 border border-slate-700 rounded-sm outline-none focus:border-indigo-500 text-[#2A2D2E] text-xs' value={state.vendor_street} type='text' placeholder='enter  street' id='vendor_street' name='vendor_street' required/>
                        </div>
                        <div className='flex w-[10%] gap-1'>
                    <button disabled={loader?true:false} type="submit" className='bg-green-500 mt-6 py-[2px] w-[150px] text-white text-xs hover:shadow-blue-500/50 hover:shadow-md font-bold rounded-sm'>
                        {
                            loader? <PropagateLoader color='#fff' cssOverride={cssOverride}/>: 'Add'
                        }
                        
                    </button>
                    </div>
                    </div>
                   

       
                <div className='mt-4'>
                </div>
              </form>
            </div>
          
            <div className="w-full p-2 bg-[#283046] rounded-md mt-2">
            <div className='w-full flex justify-between items-center bg-[#283046] p-2'>
              <div className='text-white font-bold'>
                  Total Vendor : {totalVendor}
              </div>
              {/* <div className="flex justify-between items-center bg-[#4dc4ec]">
                  <button onClick={()=>navigate('/admin/dashboard/vendor/add')} className="px-3 py-1">Vendor Add</button>
              </div> */}

              <Search searchValue={searchValue} setSearchValue={setSearchValue}/>
            </div> 
              <div className='w-full overflow-x-auto'>
                    <div className='flex bg-[#007DC3] uppercase font-bold text-xs min-w-[340px] text-white'>
                        <div className='w-[10%] p-2'>No</div>
                        <div className='w-[35%] p-2'>Name</div>
                        <div className='w-[35%] p-2'>Company</div>
                        <div className='w-[35%] p-2'>Contact Number</div>
                        <div className='w-[35%] p-2'>Country</div>
                        <div className='w-[20%] p-2'>Action</div>
                    </div>
                    {
                        <List 
                        style={{minWidth: '340px',overflowX:'hidden',color: 'white'}}
                        className='List'
                        height={300}
                        itemCount={vendors.length}
                        itemSize={32}
                        outerElementType={outerElementType}
                        >
                            {AllRows}
                        </List>
                    }
                </div>

            </div>
          </div>     
      </div>
    </div>
  );
};

export default VendorAdd;
