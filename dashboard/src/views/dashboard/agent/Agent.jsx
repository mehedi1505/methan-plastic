import React, { useState,useEffect, forwardRef } from "react";
import { Link} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import { PropagateLoader } from 'react-spinners'
import {cssOverride} from '../../../utils/utils'
import { FaEdit } from "react-icons/fa";
import toast from 'react-hot-toast'
// import { GrClose } from "react-icons/gr";
// import { BsImage } from "react-icons/bs";
import {messageClear,agent_add,get_agent} from '../../../store/reducers/agentReducer'
import Search from '../../../components/Search'
import {FixedSizeList as List} from 'react-window'

function handleOnWheel({deltaY}){
console.log('handleOnWheel',deltaY)
}
const outerElementType = forwardRef((props,ref)=>(
  <div ref={ref} onWheel={handleOnWheel} {...props} />
))
const Agent = () => {
  const dispatch = useDispatch()
  const {loader,successMessage,errorMessage,agents,totalAgent} = useSelector(state=>state.agent)
  const {userInfo} = useSelector(state=>state.auth)
  const [searchValue, setSearchValue] = useState("");

  const [state,setState] = useState({
    agent_fullname:'',
    agent_address:'',
    agent_contact:'',
    agent_email:'',
  })

const inputHandle = (e)=>{
    setState({
        ...state,
        [e.target.name] : e.target.value
    })
}

  const agentAdd= (e)=>{
      e.preventDefault()
      dispatch(agent_add({
        state:state,
        userName:userInfo.name
      }))
  }
  useEffect(()=>{
    dispatch(get_agent({searchValue}))
},[searchValue,successMessage,errorMessage])

  useEffect(()=>{
    if(successMessage){
      toast.success(successMessage)
      dispatch(messageClear())
      setState({
        agent_fullname:'',
        agent_address:'',
        agent_contact:'',
        agent_email:'',
      })
    }
    if(errorMessage){
      toast.error(errorMessage)
      dispatch(messageClear())
    }
  },[successMessage,errorMessage])

  function AllRows({ index, style }) {
    return <div style={style} className='flex text-xs mt-2'>
      <div className='w-[5%] p-1 whitespace-nowrap'>{index + 1}</div>
      <div className='w-[20%] p-1 whitespace-nowrap'>{`${agents[index]?.agent_fullname}`}</div>
      <div className='w-[30%] p-1 whitespace-nowrap'>{`${agents[index]?.agent_address}`}</div>
      <div className='w-[15%] p-1 whitespace-nowrap'>{`${agents[index]?.agent_contact}`}</div>
      <div className='w-[20%] p-1 whitespace-nowrap'>{`${agents[index]?.agent_email}`}</div>
      <div className="w-[10%] flex justify-center items-center gap-1">
        <Link to={`/admin/dashboard/edit-agent/${agents[index]?._id}`} className="p-[5px] rounded bg-yellow-500 hover:shadow-lg shadow-yellow-500/50">
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
      <div className="flex flex-wrap w-[930px]">
          <div className="w-full pl-2 mt-[-20px]">
            <div className="bg-[#283046] text-[#d0d2d6] height-screen lg:height-auto px-3 py-5">
            <div className="flex justify-between items-center bg-[#283046] py-1 md:px-[2px] text-white">
                <div className="pl-2 font-bold text-2xl">Agent Create</div>
                {/* <div onClick={()=>navigate('/admin/dashboard/vendor/list')} className="pr-2 font-bold text-sm cursor-pointer bg-[#3ab0d8] px-3 py-1 mr-3">Vendor List</div> */}
            </div>
            <hr className="border-2 border-slate-500 w-[98%] mx-auto"/>
              <form onSubmit={agentAdd}>
                    <div className='flex flex-col mb-1 md:flex-row gap-2 w-full text-[#d0d2d6] mt-5'>
                        <div className='flex flex-col w-[32%] gap-1'>
                        <label htmlFor="agent_fullname">Agent Full Name</label>
                            <input value={state.agent_fullname}  onChange={inputHandle} className="bg-[#283046] border border-slate-700 px-4 py-1 focus:border-indigo-500 outline-none text-[#d0d2d6] rounded-md"
                              type="text"
                              id="agent_fullname"
                              name="agent_fullname"
                              placeholder="Enter Agent name" required
                            />
                        </div>
                        <div className='flex flex-col w-[32%] gap-1'>
                        <label htmlFor="agent_contact">Contact Number</label>
                              <input value={state.agent_contact} onChange={inputHandle} className="bg-[#283046] border border-slate-700 px-4 py-1 focus:border-indigo-500 outline-none text-[#d0d2d6] rounded-md"
                                type="text"
                                id="agent_contact"
                                name="agent_contact"
                                placeholder="Enter contact number" required
                              />
                        </div>
                        <div className='flex flex-col w-[33%] gap-1'>
                        <label htmlFor='agent_email'>Email:</label>
                        <input value={state.agent_email}  onChange={inputHandle} className="bg-[#283046] border border-slate-700 px-4 py-1 focus:border-indigo-500 outline-none text-[#d0d2d6] rounded-md"
                              type="text"
                              id="agent_email"
                              name="agent_email"
                              placeholder="Enter email"
                            />
                        </div>
                       

                    </div>
                 
                    <div className='flex flex-col mb-1 md:flex-row text-[#d0d2d6] gap-2'>
                    <div className='flex flex-col w-[70%] gap-1'>
                        <label htmlFor="agent_address">Address</label>
                              <input value={state.agent_address}  onChange={inputHandle} className="bg-[#283046] border border-slate-700 px-4 py-1 focus:border-indigo-500 outline-none text-[#d0d2d6] rounded-md"
                                type="text"
                                id="agent_address"
                                name="agent_address"
                                placeholder="Enter address" required
                              />
                        </div>
                    <div className='flex flex-col w-[30%] gap-1'>
                    <button disabled={loader?true:false} type="submit" className='bg-green-500 mt-[28px] w-[255px] py-[9px] text-white text-xs hover:shadow-green-500/50 hover:shadow-md font-bold rounded-sm'>
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
                  Total Agent : {totalAgent}
              </div>
              {/* <div className="flex justify-between items-center bg-[#4dc4ec]">
                  <button onClick={()=>navigate('/admin/dashboard/vendor/add')} className="px-3 py-1">Vendor Add</button>
              </div> */}

              <Search searchValue={searchValue} setSearchValue={setSearchValue}/>
            </div> 
              <div className='w-full border border-slate-700 overflow-x-auto'>
                    <div className='flex bg-[#007DC3] uppercase font-bold text-xs min-w-[340px]  text-white'>
                        <div className='w-[5%] p-2'>No</div>
                        <div className='w-[20%] p-2'>Agent Name</div>
                        <div className='w-[30%] p-2'>Address</div>
                        <div className='w-[15%] p-2'>Contact Number</div>
                        <div className='w-[20%] p-2'>Email</div>
                        <div className='w-[10%] p-2'>Action</div>
                    </div>
                    {
                        <List 
                        style={{minWidth: '340px',overflowX:'hidden',color: 'white'}}
                        className='List'
                        height={275}
                        itemCount={agents.length}
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

export default Agent;
