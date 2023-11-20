import React, { useState,useEffect, forwardRef } from "react";
import { Link } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import { PropagateLoader } from 'react-spinners'
import {cssOverride} from '../../../utils/utils'
import { FaEdit, FaTrash } from "react-icons/fa";
import { AiOutlineCloseCircle } from "react-icons/ai";
import toast from 'react-hot-toast'
// import { GrClose } from "react-icons/gr";
// import { BsImage } from "react-icons/bs";
import {messageClear,rec_type_add,rec_type_get} from '../../../store/reducers/recTypeReducer'
import Search from '../../../components/Search'
import {FixedSizeList as List} from 'react-window'

function handleOnWheel({deltaY}){
console.log('handleOnWheel',deltaY)
}
const outerElementType = forwardRef((props,ref)=>(
  <div ref={ref} onWheel={handleOnWheel} {...props} />
))
const ReceiveType = () => {
  const dispatch = useDispatch()
  const {loader,successMessage,errorMessage,types,totalType} = useSelector(state=>state.rec_type)
  const {userInfo} = useSelector(state=>state.auth)
  const [searchValue, setSearchValue] = useState("");
  const [show, setShow] = useState(false);
  const [state,setState] = useState({
    rec_type_name:'',
    rec_type_desc:'',
  })

const inputHandle = (e)=>{
    setState({
        ...state,
        [e.target.name] : e.target.value
    })
}

  const recTypeAdd= (e)=>{
      e.preventDefault()
      dispatch(rec_type_add({
        state:state,
        userName:userInfo.name
      }))
  }
  useEffect(()=>{
    if(successMessage){
      toast.success(successMessage)
      dispatch(messageClear())
      setState({
        rec_type_name:'',
        rec_type_desc:'',
      })
    }
    if(errorMessage){
      toast.error(errorMessage)
      dispatch(messageClear())
    }
  },[successMessage,errorMessage])

useEffect(()=>{
    dispatch(rec_type_get({searchValue}))
},[searchValue,successMessage,errorMessage])

const AllRows = ({index,style})=>{
  return <div  style={style} className='flex text-sm'>
      <div className='w-[10%] p-2 whitespace-nowrap'>{index+1}</div>
      <div className='w-[35%] p-2 whitespace-nowrap'>{`${types[index].rec_type_name}`}</div>
      <div className='w-[35%] p-2 whitespace-nowrap'>{`${types[index].rec_type_desc}`}</div>
      <div className="w-[20%] flex justify-center items-center gap-1">
      <Link to= {`/admin/dashboard/edit-rec-type/${types[index]._id}`} className="p-[5px] rounded bg-yellow-500 hover:shadow-lg shadow-yellow-500/50">
        <FaEdit />
      </Link>
      </div>
    </div>

}


          
  return (
    <div className="px-2 py-5 md:px-[2px]">
      <div className='lg:hidden flex justify-between items-center mb-5 p-3 bg-[#283046] rounded-sm'>
           <h1 className='text-[#d0d2d6] font-semibold text-lg'>Receive Types</h1> 
          <button onClick={()=>setShow(true)} className='bg-indigo-500 px-3 py-1 rounded-sm text-white shadow-md hover:shadow-indigo-500/50'>Add</button>
      </div>
      <div className="flex flex-wrap w-full">
      <div
          className={`w-[320px] lg:w-4/12 translate-x-100 lg:relative lg:right-1 fixed ${
            show ? "right-0" : "-right-[340px]"
          } z-[9999] top-0 transition-all duration-500`}
        >
          <div className="w-full pl-5">
            <div className="bg-[#283046] text-[#d0d2d6] height-screen lg:height-auto rounded-l-lg px-3 py-2">
              <div className='flex justify-between items-center mb-4'>
                <h1 className="text-[#d0d2d6] font-semibold text-xl">
                  Add Receive Type
                </h1>
                <div onClick={()=>setShow(false)} className='block lg:hidden cursor-pointer'>
                  <AiOutlineCloseCircle/>
                </div>
              </div>
              <form onSubmit={recTypeAdd}>
                <div className="flex flex-col w-full gap-1 mb-3">
                  <label htmlFor="rec_type_name">Receive Type Name</label>
                  <input
                   value={state.rec_type_name}  onChange={inputHandle} className="bg-[#4E5B7C] border border-slate-700 px-4 py-1 focus:border-indigo-500 outline-none text-[#d0d2d6] rounded-md"
                    type="text"
                    id="rec_type_name"
                    name="rec_type_name"
                    placeholder="Enter item name" required
                  />
                </div>
                <div className="flex flex-col w-full gap-1 mb-3">
                <div className='flex flex-col w-full gap-1 text-[#d0d2d6] mb-4'>
                        <label htmlFor='rec_type_desc'>Description:</label>
                        <textarea  rows={10} onChange={inputHandle} value={state.rec_type_desc} name='rec_type_desc' id='rec_type_desc' className='bg-[#4E5B7C] px-4 py-1 border border-slate-700 rounded-sm outline-none focus:border-indigo-500 text-[#d0d2d6]' placeholder='Write here..' required></textarea>
                    </div>
                </div>
       
                <div className='mt-4'>
                <button disabled={loader?true:false} type="submit" className='bg-blue-500 w-full px-5 py-1 font-bold rounded-full mb-3 text-white hover:shadow-blue-500/50 hover:shadow-md'>
              {
                loader? <PropagateLoader color='#fff' cssOverride={cssOverride}/>: 'Add Type'
              }
             
            </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-8/12 pr-2">
          <div className="w-full p-4 bg-[#283046] rounded-r-lg">
            <div className='w-full flex justify-between items-center bg-[#283046] p-2'>
              <div className='text-white font-bold'>
                  Total Item : {totalType}
              </div>
              <Search searchValue={searchValue} setSearchValue={setSearchValue}/>
            </div>


            <div className="w-full p-4 bg-[#283046] rounded-md mt-2">

              <div className='w-full overflow-x-auto'>
                    <div className='flex bg-[#007DC3] uppercase font-bold text-xs min-w-[340px] text-white'>
                        <div className='w-[10%] p-2'>No</div>
                        <div className='w-[35%] p-2'>Type Name</div>
                        <div className='w-[35%] p-2'>Type Description</div>
                        <div className='w-[20%] p-2'>Action</div>
                    </div>
                    {
                        <List 
                        style={{minWidth: '340px',overflowX:'hidden',color: 'white'}}
                        className='List'
                        height={336}
                        itemCount={types.length}
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

export default ReceiveType;
