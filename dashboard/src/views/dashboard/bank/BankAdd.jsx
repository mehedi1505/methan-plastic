import React, { useState,useEffect, forwardRef } from "react";
import { Link} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import { PropagateLoader } from 'react-spinners'
import {cssOverride} from '../../../utils/utils'
import { FaEdit, FaTrash } from "react-icons/fa";
import { AiOutlineCloseCircle } from "react-icons/ai";
import toast from 'react-hot-toast'
// import { GrClose } from "react-icons/gr";
// import { BsImage } from "react-icons/bs";
import {messageClear,bank_add,get_bank,bank_delete} from '../../../store/reducers/bankReducer'
import Search from '../../../components/Search'
import {FixedSizeList as List} from 'react-window'

function handleOnWheel({deltaY}){
console.log('handleOnWheel',deltaY)
}
const outerElementType = forwardRef((props,ref)=>(
  <div ref={ref} onWheel={handleOnWheel} {...props} />
))
const BankAdd = () => {
  const dispatch = useDispatch()
  const {loader,successMessage,errorMessage,banks,totalBank} = useSelector(state=>state.bank)
  const {userInfo} = useSelector(state=>state.auth)
  const [searchValue, setSearchValue] = useState("");
  const [show, setShow] = useState(false);
  const [state,setState] = useState({
     bank_name:'',
     bank_short_name:'',
  })

const inputHandle = (e)=>{
    setState({
        ...state,
        [e.target.name] : e.target.value
    })
}

  const bankAdd= (e)=>{
      e.preventDefault()
      dispatch(bank_add({
        state:state,
        userName:userInfo.name
      }))
  }
  useEffect(()=>{
    dispatch(get_bank({searchValue}))
},[searchValue,successMessage,errorMessage])

  useEffect(()=>{
    if(successMessage){
      toast.success(successMessage)
      dispatch(messageClear())
      setState({
        bank_name:'',
        bank_short_name:'',
      })
    }
    if(errorMessage){
      toast.error(errorMessage)
      dispatch(messageClear())
    }
  },[successMessage,errorMessage])



const AllRows = ({index,style})=>{
  return <div style={style} className='flex text-sm'>
      <div className='w-[10%] p-2 whitespace-nowrap'>{index+1}</div>
      <div className='w-[35%] p-2 whitespace-nowrap'>{`${banks[index]?.bank_name}`}</div>
      <div className='w-[35%] p-2 whitespace-nowrap'>{`${banks[index]?.bank_short_name}`}</div>
      <div className="w-[20%] flex justify-center items-center gap-1">
      <Link to= {`/admin/dashboard/edit-bank/${banks[index]?._id}`} className="p-[5px] rounded bg-yellow-500 hover:shadow-lg shadow-yellow-500/50">
        <FaEdit />
      </Link>
        <button onClick = {()=>dispatch(bank_delete(`${banks[index]?._id}`))} className="p-[5px] rounded bg-red-600 hover:shadow-lg shadow-red-600/50">
          <FaTrash />
        </button>
      </div>
    </div>

}


          
  return (
    <div className="px-2 py-5 md:px-[2px]">
      <div className='lg:hidden flex justify-between items-center mb-5 p-3 bg-[#283046] rounded-sm'>
           <h1 className='text-[#d0d2d6] font-semibold text-lg'>Bank</h1> 
          <button onClick={()=>setShow(true)} className='bg-indigo-500 px-3 py-1 rounded-sm text-white shadow-md hover:shadow-indigo-500/50'>Add</button>
      </div>
      <div className="flex flex-wrap w-full">
      <div
          className={`w-[320px] lg:w-4/12 translate-x-100 lg:relative lg:right-1 fixed ${
            show ? "right-0" : "-right-[340px]"
          } z-[9999] top-0 transition-all duration-500`}
        >
          <div className="w-full pl-5">
            <div className="bg-[#283046] text-[#d0d2d6] height-screen lg:min-h-[478px] rounded-l-lg px-3 py-2">
              <div className='flex justify-between items-center mb-4'>
                <h1 className="text-[#d0d2d6] font-semibold text-xl">
                  Add Bank
                </h1>
                <div onClick={()=>setShow(false)} className='block lg:hidden cursor-pointer'>
                  <AiOutlineCloseCircle/>
                </div>
              </div>
              <form onSubmit={bankAdd}>
                <div className="flex flex-col w-full gap-1 mb-3">
                  <label htmlFor="bank_name">Bank Name</label>
                  <input
                   value={state.bank_name}  onChange={inputHandle} className="bg-[#283046] border border-slate-700 px-4 py-1 focus:border-indigo-500 outline-none text-[#d0d2d6] rounded-md"
                    type="text"
                    id="bank_name"
                    name="bank_name"
                    placeholder="Enter bank name" required
                  />
                </div>
                <div className="flex flex-col w-full gap-1 mb-3">
                <div className='flex flex-col w-full gap-1 text-[#d0d2d6] mb-4'>
                        <label htmlFor='unit_desc'>Bank Short Name:</label>
                        <input
                   value={state.bank_short_name}  onChange={inputHandle} className="bg-[#283046] border border-slate-700 px-4 py-1 focus:border-indigo-500 outline-none text-[#d0d2d6] rounded-md"
                    type="text"
                    id="bank_short_name"
                    name="bank_short_name"
                    placeholder="Enter short name" required
                  />
                    </div>
                </div>
       
                <div className='mt-4'>
                <button disabled={loader?true:false} type="submit" className='bg-blue-500 w-full px-7 py-2 rounded-md mb-3 text-white hover:shadow-blue-500/50 hover:shadow-md'>
              {
                loader? <PropagateLoader color='#fff' cssOverride={cssOverride}/>: 'Add'
              }
             
            </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-8/12 pr-4">
          <div className="w-full px-3 py-3 bg-[#283046] rounded-r-lg">
            <div className='w-full flex justify-between items-center bg-[#283046] p-2'>
              <div className='text-white font-bold'>
                  Total Bank : {totalBank}
              </div>
              <Search searchValue={searchValue} setSearchValue={setSearchValue}/>
            </div>


            <div className="w-full px-2 py-3 bg-[#283046] rounded-md mt-6">

              <div className='w-full overflow-x-auto'>
                    <div className='flex bg-[#007DC3] uppercase font-bold text-xs min-w-[380px] text-white'>
                        <div className='w-[10%] p-2'>No</div>
                        <div className='w-[35%] p-2'>Bank Name</div>
                        <div className='w-[35%] p-2'>Bank Short Name</div>
                        <div className='w-[20%] p-2'>Action</div>
                    </div>
                    {
                        <List 
                        style={{minWidth: '340px',overflowX:'hidden',color: 'white'}}
                        className='List'
                        height={326}
                        itemCount={banks.length}
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

export default BankAdd;
