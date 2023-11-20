import React, { useState,useEffect, forwardRef } from "react";
import { Link,useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'

import { FaEdit, FaTrash } from "react-icons/fa";
import { AiOutlineCloseCircle } from "react-icons/ai";
import toast from 'react-hot-toast'

import {messageClear,boms_get,bom_delete} from '../../../store/reducers/bomReducer'
import Search from '../../../components/Search'
import {FixedSizeList as List} from 'react-window'


function handleOnWheel({deltaY}){
console.log('handleOnWheel',deltaY)
}
const outerElementType = forwardRef((props,ref)=>(
  <div ref={ref} onWheel={handleOnWheel} {...props} />
))
const BomList=()=>{
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { successMessage,errorMessage,boms,totalBom } = useSelector(state=>state.bom)
  const {userInfo} = useSelector(state=>state.auth)
  const [searchValue, setSearchValue] = useState("");

  useEffect(()=>{
    dispatch(boms_get({searchValue}))
  },[])

  useEffect(()=>{
    if(successMessage){
      toast.success(successMessage)
      dispatch(boms_get({searchValue}))
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
      <div className='w-[50%] p-2 whitespace-nowrap text-xs'>{`${boms[index].product_name}`}</div>
      <div className='w-[20%] p-2 whitespace-nowrap text-xs'>{`${boms[index].product_code}`}</div>
      <div className="w-[20%] flex justify-center items-center gap-1">
        {/* <Link to={`/admin/dashboard/customer-edit/${boms[index]._id}`} className="p-[5px] rounded bg-yellow-500 hover:shadow-lg shadow-yellow-500/50">
          <FaEdit />
        </Link> */}
        <button onClick = {()=>dispatch(bom_delete(`${boms[index].product_id}`))} className="p-[5px] rounded bg-red-600 hover:shadow-lg shadow-red-600/50">
          <FaTrash />
        </button>
      </div>
    </div>;

  }          
  return (
    <div className="mx-auto md:mx-auto w-[98%]">
      <div className="flex flex-wrap w-full mt-[-20px]">
        <div className="w-full">
          <div className="w-full py-5 bg-[#283046]">
            <div className='w-full flex justify-between items-center bg-[#283046] px-3 py-2'>
              <div className='text-white font-bold'>
                  Total BOM : {totalBom}
              </div>
              <Search searchValue={searchValue} setSearchValue={setSearchValue}/>
              <div className="flex justify-between items-center bg-[#283046] gap-2">
              <button  onClick={()=>navigate('/admin/dashboard/special-bom-create')} className='bg-[#00AC47] px-2 py-1 rounded-md font-semibold'>Special bom Create</button>
                  <button onClick={()=>navigate('/admin/dashboard/bom-add')} className="px-3 py-1 rounded-md text-black bg-[#FCC218] font-semibold">Bom Create</button>
              </div>
            </div>


            <div className="w-full p-2 bg-[#283046] rounded-md mt-6">
              <div className='w-full overflow-x-auto'>
                    <div className='flex bg-[#0c0c0c] uppercase font-bold text-center text-xs w-full text-white'>
                        <div className='w-[10%] p-2 text-xs'>Sl#</div>
                        <div className='w-[50%] p-2 text-xs'>Product Name</div>
                        <div className='w-[20%] p-2 text-xs'>Product_code</div>
                        <div className='w-[20%] p-2 text-xs'>Action</div>
                    </div>
                    {
                        <List 
                        style={{minWidth: '340px',overflowX:'hidden',color: 'white'}}
                        className='List'
                        height={460}
                        itemCount={boms.length}
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

export default BomList;
