import React, { useState,useEffect, forwardRef } from "react";
import { Link,useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'

import { FaEdit, FaTrash } from "react-icons/fa";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { FcPlus } from "react-icons/fc";
import toast from 'react-hot-toast'
import {messageClear,receive_items_get,receive_invoice_delete} from '../../../store/reducers/receiveReducer'
import Search from '../../../components/Search'
import {FixedSizeList as List} from 'react-window'


function handleOnWheel({deltaY}){
console.log('handleOnWheel',deltaY)
}
const outerElementType = forwardRef((props,ref)=>(
  <div ref={ref} onWheel={handleOnWheel} {...props} />
))
const ItemReceiveList=()=>{
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { successMessage,errorMessage,receiveItems,totalReceiveItem } = useSelector(state=>state.item_receive)
  const {userInfo} = useSelector(state=>state.auth)
  const [searchValue, setSearchValue] = useState("");

  useEffect(()=>{
    dispatch(receive_items_get({searchValue}))
  },[])
  useEffect(()=>{
    if(successMessage){
      toast.success(successMessage)
      dispatch(messageClear())
      dispatch(receive_items_get({searchValue}))
    }
    if(errorMessage){
      toast.error(errorMessage)
      dispatch(messageClear())
    }
  },[successMessage,errorMessage])

  function AllRows({ index, style }) {
    return <div style={style} className='flex text-sm text-center items-center'>
      <div className='w-[10%] p-2 whitespace-nowrap'>{index + 1}</div>
      <div className='w-[20%] p-2 whitespace-nowrap text-xs'>{`${receiveItems[index]?.rec_invoice}`}</div>
      <div className='w-[20%] p-2 whitespace-nowrap text-xs'>{`${receiveItems[index]?.vendor[0]?.vendor_company}`}</div>
      <div className='w-[10%] p-2 whitespace-nowrap text-xs'>{`${receiveItems[index]?.discount}`}</div>
      <div className='w-[20%] p-2 whitespace-nowrap text-xs'>{`${receiveItems[index]?.rec_by}`}</div>
      <div className="w-[20%] flex justify-center items-center gap-1">
        <Link to={`/admin/dashboard/receive-invoice-edit/${receiveItems[index]?._id}`} className="p-[5px] rounded bg-yellow-500 hover:shadow-lg shadow-yellow-500/50">
          <FaEdit />
        </Link>
        <button onClick = {()=>dispatch(receive_invoice_delete(`${receiveItems[index]?._id}`))} className="p-[5px] rounded bg-red-600 hover:shadow-lg shadow-red-600/50">
          <FaTrash />
        </button>
      </div>
    </div>;

  }          
  return (
    <div className="px-2 py-2 md:px-[10px]">
      <div className="flex flex-wrap w-full mt-[-28px]">
        <div className="w-full">
          <div className="w-full p-5 bg-[#283046] min-h-[630px]">
            <div className='w-full flex justify-between items-center bg-[#283046] px-3'>
              <div className='text-white font-bold'>
                  Total Receive Challan : {totalReceiveItem}
              </div>
              <div className="flex justify-between items-center bg-[#283046] text-white">
                  <button onClick={()=>navigate('/admin/dashboard/receive-items')} className=" flex px-4 py-[2px] border border-slate-700 rounded-full items-center"><FcPlus/> Add new</button>
              </div>
            </div>


            <div className="w-full p-2 bg-[#283046] rounded-md mt-2">
            <Search searchValue={searchValue} setSearchValue={setSearchValue}/>
              <div className='w-full overflow-x-auto mt-[8px] border border-slate-700'>
                    <div className='flex bg-[#007DC3] uppercase font-bold text-center text-xs min-w-[340px] text-white'>
                        <div className='w-[10%] p-2 text-xs'>Sl#</div>
                        <div className='w-[20%] p-2 text-xs'>Challan No</div>
                        <div className='w-[20%] p-2 text-xs'>Vendor</div>
                        <div className='w-[10%] p-2 text-xs'>Discount</div>
                        <div className='w-[20%] p-2 text-xs'>Received by</div>
                        <div className='w-[20%] p-2 text-xs'>Action</div>
                    </div>
                    
                    {
                        <List 
                        style={{minWidth: '340px',overflowX:'hidden',color: 'white'}}
                        className='List'
                        height={450}
                        itemCount={receiveItems.length}
                        itemSize={35}
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

export default ItemReceiveList;
