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
import {messageClear,pay_mode_add,get_pay_mode,pay_mode_delete} from '../../../store/reducers/paymentModeReducer'
import Search from '../../../components/Search'
import {FixedSizeList as List} from 'react-window'

function handleOnWheel({deltaY}){
console.log('handleOnWheel',deltaY)
}
const outerElementType = forwardRef((props,ref)=>(
  <div ref={ref} onWheel={handleOnWheel} {...props} />
))
const PaymentMode = () => {
  const dispatch = useDispatch()
  const {loader,successMessage,errorMessage,paymodes,totalPmode} = useSelector(state=>state.pay_mode)
  const {userInfo} = useSelector(state=>state.auth)
  const [searchValue, setSearchValue] = useState("");
  const [show, setShow] = useState(false);
  const [state,setState] = useState({
    pay_mode:'',
    pay_number:'',
    pay_note:''
  })

const inputHandle = (e)=>{
    setState({
        ...state,
        [e.target.name] : e.target.value
    })
}

  const Add = (e)=>{
      e.preventDefault()
      dispatch(pay_mode_add({
        state:state,
        userName:userInfo.name
      }))
  }
  useEffect(()=>{
    dispatch(get_pay_mode({searchValue}))
},[searchValue,successMessage,errorMessage])

  useEffect(()=>{
    if(successMessage){
      toast.success(successMessage)
      dispatch(messageClear())
      setState({
        pay_mode:'',
        pay_number:'',
        pay_note:''
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
      <div className='w-[20%] p-2 whitespace-nowrap'>{`${paymodes[index].pay_mode}`}</div>
      <div className='w-[20%] p-2 whitespace-nowrap'>{`${paymodes[index].pay_number}`}</div>
      <div className='w-[35%] p-2 whitespace-nowrap'>{`${paymodes[index].pay_note}`}</div>
      <div className="w-[15%] flex justify-center items-center gap-1">
      <Link to= {`/admin/dashboard/edit-payment-mode/${paymodes[index]._id}`} className="p-[5px] rounded bg-yellow-500 hover:shadow-lg shadow-yellow-500/50">
        <FaEdit />
      </Link>
        <button onClick = {()=>dispatch(pay_mode_delete(`${paymodes[index]._id}`))} className="p-[5px] rounded bg-red-600 hover:shadow-lg shadow-red-600/50">
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
              <div className='flex justify-between items-center mb-1'>
                <h1 className="text-[#d0d2d6] font-semibold text-xl">
                  Add Payment Mode
                </h1>
                <div onClick={()=>setShow(false)} className='block lg:hidden cursor-pointer'>
                  <AiOutlineCloseCircle/>
                </div>
              </div>
              <hr className='border border-slate-500'/>
              <form onSubmit={Add}>
                <div className="flex flex-col w-full gap-1 mb-3 mt-3">
                  <label htmlFor="pay_mode">Payment Mode</label>
                  <input value={state.pay_mode} onChange={inputHandle} className="bg-[#283046] border border-slate-700 px-4 py-1 focus:border-indigo-500 outline-none text-[#d0d2d6] rounded-md"
                    type="text"
                    id="pay_mode"
                    name="pay_mode"
                    placeholder="Enter pay mode" required
                  />
                </div>
                <div className="flex flex-col w-full gap-1 mb-3">
                <div className='flex flex-col w-full gap-1 text-[#d0d2d6] mb-4'>
                  <label htmlFor='pay_number'>Payment Number:</label>
                    <input value={state.pay_number} onChange={inputHandle} className="bg-[#283046] border border-slate-700 px-4 py-1 focus:border-indigo-500 outline-none text-[#d0d2d6] rounded-md"
                    type="text"
                    id="pay_number"
                    name="pay_number"
                    placeholder="Enter pay number"
                  />
                </div>
                <div className='flex flex-col w-full gap-1 text-[#d0d2d6] mb-4'>
                    <label htmlFor='pay_note'>Payment Note:</label>
                    <input value={state.pay_note} onChange={inputHandle} className="bg-[#283046] border border-slate-700 px-4 py-1 focus:border-indigo-500 outline-none text-[#d0d2d6] rounded-md"
                    type="text"
                    id="pay_note"
                    name="pay_note"
                    placeholder="Enter pay note"
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
                  Total Pay Mode : {totalPmode}
              </div>
              <Search searchValue={searchValue} setSearchValue={setSearchValue}/>
            </div>


            <div className="w-full px-2 py-3 bg-[#283046] rounded-md mt-6">

              <div className='w-full overflow-x-auto'>
                    <div className='flex bg-[#283046] uppercase font-bold text-xs min-w-[380px] text-white'>
                        <div className='w-[10%] p-2'>No</div>
                        <div className='w-[20%] p-2'>Pay Mode</div>
                        <div className='w-[20%] p-2'>Pay Number</div>
                        <div className='w-[35%] p-2'>Pay Note</div>
                        <div className='w-[15%] p-2'>Action</div>
                    </div>
                    {
                        <List 
                        style={{minWidth: '340px',overflowX:'hidden',color: 'white'}}
                        className='List'
                        height={326}
                        itemCount={paymodes.length}
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

export default PaymentMode;
