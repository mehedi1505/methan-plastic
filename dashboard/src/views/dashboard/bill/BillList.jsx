import React, { useState,useEffect, forwardRef } from "react";
import { Link,useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'

import { FaEdit, FaTrash } from "react-icons/fa";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BsFillEyeFill } from "react-icons/bs";

import { FcPlus } from "react-icons/fc";
import toast from 'react-hot-toast'
import {messageClear,get_all_bill} from '../../../store/reducers/billReducer'
import Search from '../../../components/Search'
import {FixedSizeList as List} from 'react-window'
import moment from 'moment';

function handleOnWheel({deltaY}){
console.log('handleOnWheel',deltaY)
}
const outerElementType = forwardRef((props,ref)=>(
  <div ref={ref} onWheel={handleOnWheel} {...props} />
))

const BillList=()=>{
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {loader,successMessage,errorMessage,bills,totalBill} = useSelector(state=>state.bill)
  const {userInfo} = useSelector(state=>state.auth)
  const [searchValue, setSearchValue] = useState("");

  useEffect(()=>{
    dispatch(get_all_bill({searchValue}))
  },[])
  useEffect(()=>{
    if(successMessage){
      toast.success(successMessage)
      dispatch(messageClear())
      dispatch(get_all_bill({searchValue}))
    }
    if(errorMessage){
      toast.error(errorMessage)
      dispatch(messageClear())
    }
  },[successMessage,errorMessage])

  function AllRows({ index, style }) {
    return <div style={style} className='flex text-sm text-center items-center'>
      <div className='w-[10%] p-2 whitespace-nowrap'>{index + 1}</div>
      <div className='w-[20%] p-2 whitespace-nowrap text-xs'>{moment(`${bills[index]?.bill_date}`).format('LL')}</div>
      <div className='w-[15%] p-2 whitespace-nowrap text-xs'>{`${bills[index]?.bill_number}`}</div>
      <div className='w-[30%] p-2 whitespace-nowrap text-xs'>{`${bills[index]?.bill_note}`}</div>
      <div className="w-[10%] flex justify-center items-center gap-1">
        <Link to={`/admin/dashboard/edit-bill/${bills[index]?._id}`} className="p-[5px] rounded bg-yellow-500 hover:shadow-lg shadow-yellow-500/50">
          <FaEdit />
        </Link>
        <Link to={`/admin/dashboard/view-bill/${bills[index]?._id}`} className="p-[5px] rounded bg-cyan-500 hover:shadow-lg shadow-cyan-500/50">
          <BsFillEyeFill />
        </Link>
        {/* <button onClick = {()=>dispatch(gate_pass_delete(`${gatePassProducts[index]?._id}`))} className="p-[5px] rounded bg-red-600 hover:shadow-lg shadow-red-600/50">
          <FaTrash />
        </button> */}
      </div>
    </div>;

  }          
  return (
    <div className="px-2 py-2 md:px-[10px]">
      <div className="flex flex-wrap w-full mt-[-28px]">
        <div className="w-full">
          <div className="w-full p-5 bg-[#283046] min-h-[620px]">
            <div className='w-full flex justify-between items-center bg-[#283046] px-3'>
              <div className='text-white font-bold'>
                  Total Bill: {totalBill}
              </div>
              <div className="flex justify-between items-center bg-[#283046] text-white">
                  <button onClick={()=>navigate('/admin/dashboard/bill-add')} className=" flex px-4 py-[2px] border border-slate-700 rounded-full items-center"><FcPlus/> Add new</button>
              </div>
            </div>


            <div className="w-full p-2 bg-[#283046] rounded-md mt-2">
            <Search searchValue={searchValue} setSearchValue={setSearchValue}/>
              <div className='w-full overflow-x-auto mt-[8px] border border-slate-700'>
                    <div className='flex bg-[#212122] uppercase font-bold text-center text-xs min-w-[340px] text-white'>
                        <div className='w-[10%] p-2 text-xs'>Sl#</div>
                        <div className='w-[20%] p-2 text-xs'>Bill Date</div>
                        <div className='w-[15%] p-2 text-xs'>Bill Number</div>
                        <div className='w-[30%] p-2 text-xs'>Bill Note</div>
                        <div className='w-[10%] p-2 text-xs'>Action</div>
                    </div>                    
                    {
                      <List 
                      style={{minWidth: '340px',overflowX:'hidden',color: 'white'}}
                      className='List'
                      height={410}
                      itemCount={bills.length}
                      itemSize={40}
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

export default BillList;