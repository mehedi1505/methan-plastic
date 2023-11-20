import React, { useState,useEffect, forwardRef } from "react";
import { Link} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import { PropagateLoader } from 'react-spinners'
import {cssOverride} from '../../../utils/utils'
import { FaEdit} from "react-icons/fa";
import toast from 'react-hot-toast'

import {messageClear,asset_type_add,asset_type_get} from '../../../store/reducers/assetReducer'
import Search from '../../../components/Search'
import {FixedSizeList as List} from 'react-window'


function handleOnWheel({deltaY}){
console.log('handleOnWheel',deltaY)
}
const outerElementType = forwardRef((props,ref)=>( 
  <div ref={ref} onWheel={handleOnWheel} {...props} />
))
const AssetType = () => {
  const dispatch = useDispatch()
  const {loader,successMessage,errorMessage,assetTypes,totalType} = useSelector(state=>state.asset)
  const {userInfo} = useSelector(state=>state.auth)
  const [searchValue, setSearchValue] = useState("");

  const [state,setState] = useState({
    asset_type_name:'',
    asset_type_shortcode:'',
    asset_type_note:''
  })

const inputHandle = (e)=>{
    setState({
        ...state,
        [e.target.name] : e.target.value
    })
}

const Add= (e)=>{
    e.preventDefault()
    dispatch(asset_type_add({
      state:state,
      userName:userInfo.name
    }))
}


  useEffect(()=>{
    dispatch(asset_type_get({searchValue}))
},[searchValue,successMessage,errorMessage])

  useEffect(()=>{
    if(successMessage){
      toast.success(successMessage)
      dispatch(messageClear())
      setState({
        asset_type_name:'',
        asset_type_shortcode:'',
        asset_type_note:''
      })
    }
    if(errorMessage){
      toast.error(errorMessage)
      dispatch(messageClear())
    }
  },[successMessage,errorMessage])
 
  function AllRows({ index, style }) {
    return <div style={style} className='flex text-xs mt-2'>
      <div className='w-[10%] p-1 whitespace-nowrap'>{index + 1}</div>
      <div className='w-[30%] p-1 whitespace-nowrap'>{`${assetTypes[index]?.asset_type_name}`}</div>
      <div className='w-[20%] p-1 whitespace-nowrap'>{`${assetTypes[index]?.asset_type_shortcode}`}</div>
      <div className='w-[30%] p-1 whitespace-nowrap'>{`${assetTypes[index]?.asset_type_note}`}</div>
      <div className="w-[10%] flex justify-center items-center gap-1">
        <Link to={`/admin/dashboard/edit-asset-type/${assetTypes[index]?._id}`} className="p-[5px] rounded bg-yellow-500 hover:shadow-lg shadow-yellow-500/50">
          <FaEdit />
        </Link>
        {/* <button onClick = {()=>dispatch(expense_delete(`${assets[index]._id}`))} className="p-[5px] rounded bg-red-600 hover:shadow-lg shadow-red-600/50">
          <FaTrash />
        </button> */}
      </div>
    </div>

  } 
       
  return (
    <div className="mx-auto md:px-[2px]">
      <div className="flex flex-wrap w-[925px]">
          <div className="w-full pl-2">
            <div className="bg-[#283046] text-[#d0d2d6] height-screen lg:height-auto px-2 py-5">
            <div className="flex justify-between items-center bg-[#283046] py-1 md:px-[10px] text-white">
                <div className="pl-2 font-bold text-2xl">Asset Type Create</div>
            </div>
            <hr className="border-2 border-slate-500 w-[97%] mx-auto"/>
              <form onSubmit={Add}>
                    <div className='flex flex-col mb-1 md:flex-row gap-2 w-full px-3 text-[#d0d2d6] mt-5'>
                        <div className='flex flex-col w-[50%] gap-1 text-xs'>
                        <label htmlFor="asset_type_name">Asset Type Name</label>
                            <input value={state.asset_type_name}  onChange={inputHandle} className="bg-[#FFFFFF] border border-slate-700 shadow-md px-4 py-3 focus:border-indigo-500 outline-none text-black rounded-md"
                              type="text"
                              id="asset_type_name"
                              name="asset_type_name"
                              placeholder="Enter type name" required
                            />
                        </div> 
                        <div className='flex flex-col w-[50%] gap-1 text-xs'>
                        <label htmlFor="asset_type_shortcode">Asset Type Shortcode</label>
                            <input value={state.asset_type_shortcode}  onChange={inputHandle} className="bg-[#FFFFFF] border border-slate-700 shadow-md px-4 py-3 focus:border-indigo-500 outline-none text-black rounded-md"
                              type="text"
                              id="asset_type_shortcode"
                              name="asset_type_shortcode"
                              placeholder="Enter type name"
                            />
                        </div>

                    </div>
                    <div className='flex flex-col mb-1 md:flex-row gap-2 w-full px-3 text-[#d0d2d6] mt-1'>
                        <div className='flex flex-col w-[50%] gap-1 text-xs'>
                        <label htmlFor="asset_type_note">Asset Type Note</label>
                            <input value={state.asset_type_note}  onChange={inputHandle} className="bg-[#FFFFFF] border border-slate-700 shadow-md px-4 py-3 focus:border-indigo-500 outline-none text-black rounded-md"
                              type="text"
                              id="asset_type_note"
                              name="asset_type_note"
                              placeholder="Enter type note"
                            />
                        </div> 

                      <div className='flex w-[10%]'>
                        <button disabled={loader?true:false} type="submit" className='bg-green-500 mt-[19px] w-[80px] py-[2px] text-white text-md hover:shadow-green-500/50 hover:shadow-md font-bold rounded-md'>
                            {
                                loader? <PropagateLoader color='#fff' cssOverride={cssOverride}/>: 'Add'
                            }
                            
                        </button>
                    </div>

                    </div>

              </form>
              <div className="w-full p-2 bg-[#283046] rounded-md">
            <div className='w-full flex justify-between items-center bg-[#283046] py-2'>
              <div className='text-white font-bold'>
                  Total Type : {totalType}
              </div>
              <Search searchValue={searchValue} setSearchValue={setSearchValue}/>
            </div> 
              <div className='w-full border border-slate-700 overflow-x-auto'>
                    <div className='flex bg-[#007DC3] uppercase font-bold text-xs min-w-[340px] text-left text-white'>
                        <div className='w-[10%] p-2'>No</div>
                        <div className='w-[30%] p-2'>Asset Type Name</div>
                        <div className='w-[20%] p-2'>Asset Type Shortcode</div>
                        <div className='w-[30%] p-2'>Asset Type Note</div>
                        <div className='w-[10%] p-2'>Action</div>
                    </div>
                    {
                        <List 
                        style={{minWidth: '340px',overflowX:'hidden',color: 'white'}}
                        className='List'
                        height={265}
                        itemCount={assetTypes.length}
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

export default AssetType;
