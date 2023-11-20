import React, {useEffect, useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast'
import { PropagateLoader } from 'react-spinners'
import {admin_login,messageClear} from '../../store/reducers/authReducer'
import {cssOverride} from '../../utils/utils'

const AdminLogin = () => {
  const dispatch= useDispatch()
  const navigate = useNavigate()
const {loader,errorMessage,successMessage} = useSelector(state=>state.auth)
  const [state, setState] = useState({
    email: '',
    password: ''
  })
  const {email, password} = state
  
  const inputHandle = (e)=>{
    setState({
      ...state,
      [e.target.name] : e.target.value
    })
  }

  const submit = (e)=>{
    e.preventDefault()
    dispatch(admin_login(state))
  }
  useEffect(()=>{
    if(errorMessage){
      toast.error(errorMessage)
      dispatch(messageClear())
    }
    if(successMessage){
      toast.success(successMessage)
      dispatch(messageClear())
      navigate('/')
    }
  },[errorMessage,successMessage])

  return (
    <div className="min-w-screen min-h-screen bg-[#161d31] flex justify-center items-center px-3">
      <div className='w-[300px] p-4 text-[#d0d2d6]'>
        <div className='bg-[#283046] p-2'>
        <div className="h-[90px] flex justify-center items-center">
            <div className='w-[180px] h-[80px]'>
                <img className="mx-auto w-[70px] h-[70px] rounded-full ring-[3px] ring-green-700 p-1" src="http://localhost:3000/images/logo.png" alt="image" />
            </div>
        </div>
        <div className='bg-green-600 w-[120px] mx-auto mb-4 font-bold px-[3px] text-center rounded-md'>Admin Login</div>
          <form onSubmit={submit}>
            <div className='flex flex-col w-full gap-1 mb-2'>
              <label htmlFor="email">Email:</label>
              <input onChange={inputHandle} value={email} className='px-3 py-1 outline-none border border-slate-700 bg-transparent rounded-md text-[#d0d2d6] focus:border-indigo-500 overflow-hidden' type='text' name='email' placeholder='Email' id='email' required/>
            </div>
            <div className='flex flex-col w-full gap-1 mb-2'>
              <label htmlFor="password">Password:</label>
              <input onChange={inputHandle} value={password} className='px-3 py-1 outline-none border border-slate-700 bg-transparent rounded-md text-[#d0d2d6] focus:border-indigo-500 overflow-hidden' type='password' name='password' placeholder='Password' id='password' required/>
            </div>
            <button disabled={loader?true:false} type="submit" className='bg-blue-500 w-full px-7 py-2 rounded-md mb-3 text-white hover:shadow-blue-500/50 hover:shadow-md'>
              {
                loader? <PropagateLoader color='#fff' cssOverride={cssOverride}/>: 'Login'
              }
             
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin