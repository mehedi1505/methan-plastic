import React, { useState,useEffect, forwardRef } from "react";
import { Link,useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'

import { FaEdit, FaTrash } from "react-icons/fa";
import { AiOutlineCloseCircle } from "react-icons/ai";
import toast from 'react-hot-toast'

import {messageClear, customer_get} from '../../../store/reducers/customerReducer'
import Search from '../../../components/Search'
import {FixedSizeList as List} from 'react-window'

function handleOnWheel({deltaY}){
console.log('handleOnWheel',deltaY)
}
const outerElementType = forwardRef((props,ref)=>(
  <div ref={ref} onWheel={handleOnWheel} {...props} />
))
const CustomerList=()=>{
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {successMessage,errorMessage,customers,totalCustomer} = useSelector(state=>state.customer)
  const {userInfo} = useSelector(state=>state.auth)
  const [searchValue, setSearchValue] = useState("");
  // const [show, setShow] = useState(false);
  useEffect(()=>{
    dispatch(customer_get({searchValue}))
},[searchValue,successMessage,errorMessage])
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



  function AllRows({ index, style }) {
    return <div style={style} className='flex text-sm text-center items-center'>
      <div className='w-[10%] p-2 whitespace-nowrap'>{index + 1}</div>
      <div className='w-[20%] p-2 whitespace-nowrap text-xs'>{`${customers[index].cus_name}`}</div>
      <div className='w-[15%] p-2 whitespace-nowrap text-xs'>{`${customers[index].cus_company}`}</div>
      <div className='w-[15%] p-2 whitespace-nowrap text-xs'>{`${customers[index].cus_email}`}</div>
      <div className='w-[10%] p-2 whitespace-nowrap text-xs'>{`${customers[index].contact_number}`}</div>
      <div className='w-[10%] p-2 whitespace-nowrap text-xs'>{`${customers[index].country}`}</div>
      <div className='w-[10%] p-2 whitespace-nowrap text-xs'><span className='border-2 border-green-700 px-2 rounded-full'>{`${customers[index].status}`}</span></div>
      <div className="w-[10%] flex justify-center items-center gap-1">
        <Link to={`/admin/dashboard/customer-edit/${customers[index]._id}`} className="p-[5px] rounded bg-yellow-500 hover:shadow-lg shadow-yellow-500/50">
          <FaEdit />
        </Link>
        {/* <button onClick = {()=>dispatch(vendor_delete(`${vendors[index]._id}`))} className="p-[5px] rounded bg-red-600 hover:shadow-lg shadow-red-600/50">
          <FaTrash />
        </button> */}
      </div>
    </div>;

  }          
  return (
    <div className="px-2 py-2 md:px-[2px] mt-[-25px]">
      <div className="flex flex-wrap w-[98%] mx-auto">
        <div className="w-full">
          <div className="w-full p-4 bg-[#283046]">
            <div className='w-full flex justify-between items-center bg-[#7FD4F1] p-2'>
              <div className='text-black font-bold'>
                  Total Customer : {totalCustomer}
              </div>
              <Search searchValue={searchValue} setSearchValue={setSearchValue}/>
              <div className="flex justify-between items-center bg-[#4dc4ec]">
                  <button onClick={()=>navigate('/admin/dashboard/customer/add')} className="px-3 py-1">Customer Add</button>
              </div>
            </div>


            <div className="w-full p-4 bg-[#283046] rounded-md mt-6">
              <div className='w-full overflow-x-auto'>
                    <div className='flex bg-[#007DC3] uppercase font-bold text-center text-xs min-w-[340px] text-white'>
                        <div className='w-[10%] p-2 text-xs'>Sl#</div>
                        <div className='w-[15%] p-2 text-xs'>Name</div>
                        <div className='w-[15%] p-2 text-xs'>Company</div>
                        <div className='w-[15%] p-2 text-xs'>Email</div>
                        <div className='w-[15%] p-2 text-xs'>Contact Number</div>
                        <div className='w-[10%] p-2 text-xs'>Country</div>
                        <div className='w-[10%] p-2 text-xs'>Status</div>
                        <div className='w-[10%] p-2 text-xs'>Action</div>
                    </div>
                    {
                        <List 
                        style={{minWidth: '340px',overflowX:'hidden',color: 'white'}}
                        className='List'
                        height={460}
                        itemCount={customers.length}
                        itemSize={45}
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
    </div>
  );
};

export default CustomerList;
