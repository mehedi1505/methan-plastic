import React, { useState,useEffect, forwardRef } from "react";
import { Link} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import { PropagateLoader } from 'react-spinners'
import {cssOverride} from '../../../utils/utils'
import { FaEdit, FaTrash } from "react-icons/fa";
import toast from 'react-hot-toast'
// import { GrClose } from "react-icons/gr";
// import { BsImage } from "react-icons/bs";
import {messageClear,gate_pass_type_add,get_all_gate_pass_type,gate_pass_type_delete} from '../../../store/reducers/gatePassReducer'
import Search from '../../../components/Search'
import {FixedSizeList as List} from 'react-window'
import Select from 'react-select'
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment';

function handleOnWheel({deltaY}){
console.log('handleOnWheel',deltaY)
}
const outerElementType = forwardRef((props,ref)=>(
  <div ref={ref} onWheel={handleOnWheel} {...props} />
))
const GatePassType = () => {
  const dispatch = useDispatch()
  const {loader,successMessage,errorMessage,gatePassTypes,totalGatePassType} = useSelector(state=>state.gatePass)
  const {userInfo} = useSelector(state=>state.auth)
  const [searchValue, setSearchValue] = useState("");

  const [state,setState] = useState({
    gp_type:'',
    gp_note:''
  })


const inputHandle = (e)=>{
    setState({
        ...state,
        [e.target.name] : e.target.value
    })
}

const Add= (e)=>{
    e.preventDefault()
    dispatch(gate_pass_type_add({
      state:state,
      userName:userInfo.name
    }))
}
useEffect(()=>{
  dispatch(get_all_gate_pass_type({searchValue}))
},[searchValue])

  useEffect(()=>{
    if(successMessage){
      toast.success(successMessage)
      dispatch(messageClear())
      setState({
        gp_type:'',
        gp_note:''
      })
      dispatch(get_all_gate_pass_type({searchValue}))
    }
    if(errorMessage){
      toast.error(errorMessage)
      dispatch(messageClear())
    }
  },[successMessage,errorMessage])

  function AllRows({ index, style }) {
    return <div style={style} className='flex text-xs mt-2'>
      <div className='w-[10%] p-1 whitespace-nowrap'>{index + 1}</div>
      <div className='w-[30%] p-1 whitespace-nowrap'>{`${gatePassTypes[index]?.gp_type}`}</div>
      <div className='w-[40%] p-1 whitespace-nowrap'>{`${gatePassTypes[index]?.gp_note}`}</div>
      <div className="w-[20%] flex justify-center items-center gap-1">
        <Link to={`/admin/dashboard/edit-gate-pass-type/${gatePassTypes[index]?._id}`} className="p-[5px] rounded bg-yellow-500 hover:shadow-lg shadow-yellow-500/50">
          <FaEdit />
        </Link>
        <button onClick = {()=>dispatch(gate_pass_type_delete(`${gatePassTypes[index]._id}`))} className="p-[5px] rounded bg-red-600 hover:shadow-lg shadow-red-600/50">
          <FaTrash />
        </button>
      </div>
    </div>

  } 
     
  return (
    <div className="mx-auto md:px-[2px] mt-[-20px]">
      <div className="flex flex-wrap w-[98%] mx-auto">
          <div className="w-full">
            <div className="bg-[#283046] text-[#d0d2d6] height-screen lg:height-auto px-2 py-1">
            <div className="flex justify-between items-center bg-[#283046] py-1 md:px-[10px] text-white">
                <div className="pl-2 font-bold text-3xl">Gate Pass Create</div>
            </div>
              <hr className="border-2 border-slate-500 w-[98%] mx-auto mb-5"/>
              <form onSubmit={Add}>
                    <div className='flex flex-col mb-1 md:flex-row gap-2 w-full px-3 text-[#d0d2d6] mt-1'>
                        <div className='flex flex-col w-[40%] gap-1 text-xs'>
                        <label htmlFor="gp_type">Gate Pass Type</label>
                            <input value={state.gp_type} onChange={inputHandle} className="bg-[#FFFFFF] border border-slate-700 shadow-md px-4 py-2 focus:border-indigo-500 outline-none text-black rounded-md"
                              type="text"
                              id="gp_type"
                              name="gp_type"
                              placeholder="Enter Type name" required
                            />
                        </div> 
                        <div className='flex flex-col w-[40%] gap-1 text-xs'>
                        <label htmlFor="gp_note">Type Note</label>
                            <input value={state.gp_note} onChange={inputHandle} className="bg-[#FFFFFF] border border-slate-700 shadow-md px-4 py-2 focus:border-indigo-500 outline-none text-black rounded-md"
                              type="text"
                              id="gp_note"
                              name="gp_note"
                              placeholder="Enter Note"
                            />
                        </div> 
                        <div className='flex w-[20%]'>
                    <button disabled={loader?true:false} type="submit" className='bg-green-500 mt-[19px] w-[180px] py-[2px] text-white text-xs hover:shadow-green-500/50 hover:shadow-md font-bold rounded-md'>
                        {
                            loader? <PropagateLoader color='#fff' cssOverride={cssOverride}/>: 'Add'
                        }
                        
                    </button>
                    </div>

                    </div>

       
                <div className='mt-4'>
                </div>
              </form>
              <div className="w-full p-2 bg-[#283046] rounded-md">
            <div className='w-full flex justify-between items-center bg-[#283046] py-2'>
              <div className='text-white font-bold'>
                  Total Gate Pass : {totalGatePassType}
              </div>
              <Search searchValue={searchValue} setSearchValue={setSearchValue}/>
            </div> 
              <div className='w-full border border-slate-700 overflow-x-auto'>
                    <div className='flex bg-[#007DC3] uppercase font-bold text-xs min-w-[340px]  text-white'>
                        <div className='w-[10%] p-2'>No</div>
                        <div className='w-[30%] p-2'>Type</div>
                        <div className='w-[40%] p-2'>Note</div>
                        <div className='w-[20%] p-2'>Action</div>
                    </div>
                    {
                        <List 
                        style={{minWidth: '340px',overflowX:'hidden',color: 'white'}}
                        className='List'
                        height={385}
                        itemCount={gatePassTypes.length}
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
    </div>
  );
};

export default GatePassType;