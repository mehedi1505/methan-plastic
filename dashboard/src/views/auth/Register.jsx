import React, {useState,useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { AiOutlineGithub, AiOutlineGooglePlus } from 'react-icons/ai'
import { FiFacebook } from 'react-icons/fi'
import { CiTwitter } from 'react-icons/ci'
import { PropagateLoader } from 'react-spinners'
import { useDispatch,useSelector } from 'react-redux';
import {cssOverride} from '../../utils/utils'
import {sub_admin_register,messageClear} from '../../store/reducers/authReducer'

const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {loader,successMessage,errorMessage} = useSelector(state=>state.auth)
  const [state, setState] = useState({
    name:'',
    email:'',
    password:''
  })
 
const {name,email,password} = state
  const inputHandle = (e)=>{
      setState({
        ...state,
        [e.target.name] : e.target.value
      })
  }
  const submit = (e)=>{
    e.preventDefault();
    dispatch(sub_admin_register(state))
  }
  useEffect(()=>{
    if(successMessage){
      toast.success(successMessage)
      dispatch(messageClear())
      navigate('/')
    }
    if(errorMessage){
      toast.error(errorMessage)
      dispatch(messageClear())
    }
  },[successMessage,errorMessage])
  return (
    <div className="min-w-screen min-h-screen bg-[#161d31] flex justify-center items-center px-3">
      <div className='w-[350px] p-2 text-[#d0d2d6]'>
        <div className='bg-[#283046] p-2'>
          <h2 className='text-xl mb-3'>Welcome to E-commerce</h2>
          <p className='text-sm mb-3'>Please register your account and start your business</p>
          <form onSubmit= {submit}>
            <div className='flex flex-col w-full gap-1 mb-2'>
              <label htmlFor="name">Name:</label>
              <input onChange={inputHandle} value={name} className='px-3 py-1 outline-none border border-slate-700 bg-transparent rounded-md text-[#d0d2d6] focus:border-indigo-500 overflow-hidden' type='text' name='name' placeholder='Name' id='name' required/>
            </div>
            <div className='flex flex-col w-full gap-1 mb-2'>
              <label htmlFor="email">Email:</label>
              <input onChange={inputHandle} value={email} className='px-3 py-1 outline-none border border-slate-700 bg-transparent rounded-md text-[#d0d2d6] focus:border-indigo-500 overflow-hidden' type='text' name='email' placeholder='Email' id='email' required/>
            </div>
            <div className='flex flex-col w-full gap-1 mb-2'>
              <label htmlFor="password">Password:</label>
              <input onChange={inputHandle} value={password} className='px-3 py-1 outline-none border border-slate-700 bg-transparent rounded-md text-[#d0d2d6] focus:border-indigo-500 overflow-hidden' type='text' name='password' placeholder='Password' id='password' required/>
            </div>
            <div className='flex w-full gap-2 mb-2 items-center'>
              <input className='w-4 h-4 text-blue-600 overflow-hidden bg-gray-100 rounded border-gray-300 focus:ring-blue-500' type='checkbox' id='checkbox'/>
              <label htmlFor="checkbox">I agree to privacy policy & terms</label>
            </div>
            <button disabled={loader?true:false} type="submit" className='bg-blue-500 w-full px-7 py-2 rounded-md mb-3 text-white hover:shadow-blue-500/50 hover:shadow-md'>
              {
                loader? <PropagateLoader color='#fff' cssOverride={cssOverride}/>: 'Sign up'
              }
             
            </button>
            <div className='flex items-center mb-3 gap-3 justify-center'>
              <p>Already have an account? <Link to='/login'>Signin here</Link></p>
            </div>
            <div className="w-full flex justify-center items-center mb-3">
              <div className="w-[45%] bg-slate-700 h-[1px]"></div>
              <div className='w-[10%] flex justify-center items-center'>
                <span className="pb-1">Or</span>
              </div>
                <div className="w-[45%] bg-slate-700 h-[1px]"></div>
            </div>
            <div className='flex justify-center items-center gap-3 mb-3'> 
              <div className='w-[35px] h-[35px] flex rounded-lg bg-orange-700 shadow-md hover:bg-orange-700/50 cursor-pointer items-center justify-center overflow-hidden'>
                <span><AiOutlineGooglePlus/></span>
              </div>
              <div className='w-[35px] h-[35px] flex rounded-lg bg-indigo-700 shadow-md hover:bg-indigo-700/50 cursor-pointer items-center justify-center overflow-hidden'>
                <span><FiFacebook/></span>
              </div>
              <div className='w-[35px] h-[35px] flex rounded-lg bg-cyan-700 shadow-md hover:bg-cyan-700/50 cursor-pointer items-center justify-center overflow-hidden'>
                <span><CiTwitter/></span>
              </div>
              <div className='w-[35px] h-[35px] flex rounded-lg bg-purple-700 shadow-md hover:bg-purple-700/50 cursor-pointer items-center justify-center overflow-hidden'>
                <span><AiOutlineGithub/></span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register