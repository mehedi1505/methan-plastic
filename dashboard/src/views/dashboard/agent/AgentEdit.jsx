import React, { useState,useEffect, forwardRef } from "react";
import { Link, useParams,useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import { PropagateLoader } from 'react-spinners'
import {cssOverride} from '../../../utils/utils'
import toast from 'react-hot-toast'
import {messageClear,get_agent_by_id,agent_update} from '../../../store/reducers/agentReducer'

const AgentEdit = () => {
  const dispatch = useDispatch()
  const { agentId } = useParams()
  const navigate = useNavigate()
  const {loader,successMessage,errorMessage,agent} = useSelector(state=>state.agent)
  const {userInfo} = useSelector(state=>state.auth)
  const [state,setState] = useState({
    agent_fullname:'',
    agent_address:'',
    agent_contact:'',
    agent_email:''
  })
  useEffect(()=>{
    dispatch(get_agent_by_id(agentId))
},[agentId])
const inputHandle = (e)=>{
    setState({
        ...state,
        [e.target.name] : e.target.value
    })
}
useEffect(()=>{
    setState({
      agent_fullname:agent.agent_fullname,
      agent_address:agent.agent_address,
      agent_contact:agent.agent_contact,
      agent_email:agent.agent_email
    })
},[agent])

  const update= (e)=>{
      e.preventDefault()
      const obj = {
        agent_fullname:state.agent_fullname,
        agent_address:state.agent_address,
        agent_contact:state.agent_contact,
        agent_email:state.agent_email,
        agentId:agentId,
        userName:userInfo.name
      }
      dispatch(agent_update(obj))
  }
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
        
  return (
    <div className="px-2 py-3 md:px-[2px] w-[550px] mx-auto">
      <div className="flex flex-wrap w-full">
          <div className="w-full">
            <div className="bg-[#283046] text-[#d0d2d6] height-screen lg:height-auto rounded-lg px-7 py-2">
             <div className='flex justify-between items-center bg-[#283046] px-2 py-2 mb-5 mt-3'>
                <div className='text-white font-bold text-2xl'>
                  Agent Update
                </div>
                <div>
                  <button onClick={() => navigate(-1)} className="bg-[#323b55] px-5 py-1 text-white rounded-md">Go Back</button>
                </div>
             </div>
             <hr/>
              <form onSubmit={update}>
                <div className="flex flex-col w-full gap-1 my-3">
                  <label htmlFor="agent_fullname">Agent Full Name</label>
                  <input value={state.agent_fullname}  onChange={inputHandle} className="bg-[#283046] border border-slate-700 px-4 py-1 focus:border-indigo-500 outline-none text-[#d0d2d6] rounded-md"
                    type="text"
                    id="agent_fullname"
                    name="agent_fullname"
                    placeholder="Enter agent name" required
                  />
                </div>
                <div className="flex flex-col w-full gap-1 mb-3">
                  <label htmlFor="agent_address">Address</label>
                  <input value={state.agent_address}  onChange={inputHandle} className="bg-[#283046] border border-slate-700 px-4 py-1 focus:border-indigo-500 outline-none text-[#d0d2d6] rounded-md"
                    type="text"
                    id="agent_address"
                    name="agent_address"
                    placeholder="Enter Unit name" required
                  />
                </div>
                <div className="flex flex-col w-full gap-1 mb-3">
                  <label htmlFor="agent_contact">Contact Number</label>
                  <input value={state.agent_contact}  onChange={inputHandle} className="bg-[#283046] border border-slate-700 px-4 py-1 focus:border-indigo-500 outline-none text-[#d0d2d6] rounded-md"
                    type="text"
                    id="agent_contact"
                    name="agent_contact"
                    placeholder="Enter contact number" required
                  />
                </div>
                <div className="flex flex-col w-full gap-1 mb-3">
                  <label htmlFor="agent_email">Email</label>
                  <input value={state.agent_email}  onChange={inputHandle} className="bg-[#283046] border border-slate-700 px-4 py-1 focus:border-indigo-500 outline-none text-[#d0d2d6] rounded-md"
                    type="text"
                    id="agent_email"
                    name="agent_email"
                    placeholder="Enter Email" required
                  />
                </div>
       
                <div className='mt-4'>
                <button disabled={loader?true:false} type="submit" className='bg-blue-500 w-full px-7 py-2 rounded-md mb-3 text-white hover:shadow-blue-500/50 hover:shadow-md'>
              {
                loader? <PropagateLoader color='#fff' cssOverride={cssOverride}/>: 'Update'
              }
             
            </button>
                </div>
              </form>
            </div>
          </div>

       
        
      </div>
    </div>
  );
};

export default AgentEdit;
