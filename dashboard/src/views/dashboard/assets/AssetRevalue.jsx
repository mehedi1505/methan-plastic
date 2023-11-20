import React, { useState,useEffect, forwardRef } from "react";
import { Link} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import { PropagateLoader } from 'react-spinners'
import {cssOverride} from '../../../utils/utils'
import { FaEdit} from "react-icons/fa";
import toast from 'react-hot-toast'

import {messageClear,asset_revalue_add,asset_revalue_get,asset_register_item_get,get_type_origin} from '../../../store/reducers/assetReducer'
import Search from '../../../components/Search'
import {FixedSizeList as List} from 'react-window'
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import Select from 'react-select'
import moment from 'moment';

function handleOnWheel({deltaY}){
console.log('handleOnWheel',deltaY)
}
const outerElementType = forwardRef((props,ref)=>( 
  <div ref={ref} onWheel={handleOnWheel} {...props} />
))
const AssetRevalue = () => {
  const dispatch = useDispatch()
  const {loader,successMessage,errorMessage,assetRevalues,totalRevalue,assetRegisterItems,typeInfo,registerInfo} = useSelector(state=>state.asset)
  const {userInfo} = useSelector(state=>state.auth)
  const [searchValue, setSearchValue] = useState("");

  const [state,setState] = useState({
    asset_price:'',
    asset_note:''
  })
const [selectedDate, setSelectedDate] = useState(Date.now());
const [assetId, setAssetId] = useState('');
const inputHandle = (e)=>{
    setState({
        ...state,
        [e.target.name] : e.target.value
    })
}
useEffect(()=>{
 if(assetId){
  dispatch(get_type_origin(assetId))
 }
},[assetId])
const Add= (e)=>{
    e.preventDefault()
    dispatch(asset_revalue_add({
      state:state,
      selectedDate,
      assetId,
      userName:userInfo.name
    }))
}
// asset type get
useEffect(()=>{
  dispatch(asset_revalue_get({searchValue}))
},[searchValue,successMessage,errorMessage])
// asset register get
useEffect(()=>{
    dispatch(asset_register_item_get())
},[])

  useEffect(()=>{
    if(successMessage){
      toast.success(successMessage)
      dispatch(messageClear())
      setState({
        revalue_price:'',
        revalue_note:''
      })
      setAssetId('')
    }
    if(errorMessage){
      toast.error(errorMessage)
      dispatch(messageClear())
    }
  },[successMessage,errorMessage])
 
  function AllRows({ index, style }) {
    return <div style={style} className='flex text-xs mt-2'>
      <div className='w-[5%] p-1 whitespace-nowrap'>{index + 1}</div>
      <div className='w-[20%] p-1 whitespace-nowrap'>{`${assetRevalues[index]?.register[0]?.asset_name}`}</div>
      <div className='w-[20%] p-1 whitespace-nowrap'>{moment(`${assetRevalues[index]?.revalue_date}`).format('LLL')}</div>
      <div className='w-[10%] p-1 whitespace-nowrap'>{`${assetRevalues[index]?.revalue_price}`}</div>
      <div className='w-[35%] p-1 whitespace-nowrap'>{`${assetRevalues[index]?.revalue_note}`}</div>
      <div className="w-[5%] flex justify-center items-center gap-1">
        <Link to={`/admin/dashboard/edit-asset-revalue/${assetRevalues[index]?.asset_id}`} className="p-[5px] rounded bg-yellow-500 hover:shadow-lg shadow-yellow-500/50">
          <FaEdit />
        </Link>
        {/* <button onClick = {()=>dispatch(expense_delete(`${assets[index]._id}`))} className="p-[5px] rounded bg-red-600 hover:shadow-lg shadow-red-600/50">
          <FaTrash />
        </button> */}
      </div>
    </div>

  } 
  const assetOptions = assetRegisterItems && assetRegisterItems.map((item)=>({
    "value" : item._id,
    "label" : item.asset_name
  }))
  const customStyles = {
    control: base => ({
      ...base,
      height: 32,
      minHeight: 32,
      background:'#FFFFFF',
      align:'center',
      fontSize: 12,
    }),
    valueContainer: (provided, state) => ({
      ...provided,
      height: '25px',
      padding: '0 6px'
    }),
  
    input: (provided, state) => ({
      ...provided,
      margin: '0px',
    }),
    indicatorSeparator: state => ({
      display: 'none',
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      height: '25px',
    }),
    
  };   
  return (
    <div className="mx-auto md:px-[2px]">
      <div className="flex flex-wrap w-[925px]">
          <div className="w-full pl-2">
            <div className="bg-[#283046] text-[#d0d2d6] height-screen lg:height-auto px-2 py-1">
            <div className="flex justify-between items-center bg-[#283046] py-1 md:px-[10px] text-white">
                <div className="pl-2 font-bold text-2xl">Asset Revalue Create</div>
            </div>
              <hr/>
              <form onSubmit={Add}>
                    <div className='flex flex-col mb-1 md:flex-row gap-2 w-full px-3 text-[#d0d2d6] mt-1'>
                        <div className='flex flex-col w-[33%] gap-[5px]'>  
                            <label htmlFor='asset_id' className="text-xs text-white">Asset Item:</label>                              
                                <div style={{width:289,color:'black'}}>                 
                                      <Select
                                      options={assetOptions}
                                      defaultValue={assetId}
                                      placeholder="Choose Type"
                                      onChange={(e)=>setAssetId(e.value)}
                                      isSearchable
                                      noOptionsMessage={()=>"no type found.."}
                                      styles={customStyles}
                                      required
                                      />
                                </div>
                       </div>
                        {
                          registerInfo && <div className='flex flex-row w-[32%] gap-[5px] md:mt-6'>
                          <p>Type: {typeInfo.asset_type_name}</p> | 
                          <p>Origin: {registerInfo.asset_origin}</p> 
                        </div> 
                        }

                 
                    </div> 
                    <div className='flex flex-col mb-1 md:flex-row gap-2 w-full px-3 text-[#d0d2d6] mt-1'>
                    <div className='flex flex-col w-[32%] gap-[5px]'>
                                  <label htmlFor='revalue_date' className="text-xs text-white">Purchase Date:</label>   
                                  <div className="bg-[#FFFFFF] text-black px-[8px] py-[4px] rounded-[3px]">
                                    <DatePicker                        
                                        selected={selectedDate}
                                        onChange={date=>setSelectedDate(date)}
                                        dateFormat="dd/MM/yyyy"
                                        filterDate={date=>date.getDay() !== 5}
                                        showYearDropdown
                                        scrollableMonthYearDropdown
                                    />
                                  </div>
                    </div> 
                        <div className='flex flex-col w-[15%] gap-1 text-xs'>
                        <label htmlFor="revalue_price">Revalue Price</label>
                            <input value={state.revalue_price}  onChange={inputHandle} className="bg-[#FFFFFF] border border-slate-700 shadow-md px-4 py-2 focus:border-indigo-500 outline-none text-black rounded-md"
                              type="number"
                              id="revalue_price"
                              name="revalue_price"
                              min="0"
                              step="any"
                              placeholder="Enter price" required
                            />
                        </div>
                        <div className='flex flex-col w-[50%] gap-1 text-xs'>
                        <label htmlFor="revalue_note">Revalue Note</label>
                            <input value={state.revalue_note}  onChange={inputHandle} className="bg-[#FFFFFF] border border-slate-700 shadow-md px-4 py-2 focus:border-indigo-500 outline-none text-black rounded-md"
                              type="text"
                              id="revalue_note"
                              name="revalue_note"
                              placeholder="Enter note"
                            />
                        </div> 
                      <div className='flex w-[15%]'>
                        <button disabled={loader?true:false} type="submit" className='bg-green-500 mt-[19px] w-[100px] py-[2px] text-white text-xs hover:shadow-green-500/50 hover:shadow-md font-bold rounded-md'>
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
                  Total Revalue : {totalRevalue}
              </div>
              <Search searchValue={searchValue} setSearchValue={setSearchValue}/>
            </div> 
              <div className='w-full border border-slate-700 overflow-x-auto'>
                    <div className='flex bg-[#007DC3] uppercase font-bold min-w-[340px] text-left text-white'>
                        <div className='w-[5%] p-2 text-xs'>No</div>
                        <div className='w-[20%] p-2 text-xs'>Asset Name</div>
                        <div className='w-[20%] p-2 text-xs'>Revalue Date</div>
                        <div className='w-[10%] p-2 text-xs'>Price</div>
                        <div className='w-[35%] p-2 text-xs'>Revalue Note</div>
                        <div className='w-[5%] p-2 text-xs'>Action</div>
                    </div>
                    {
                        <List 
                        style={{minWidth: '340px',overflowX:'hidden',color: 'white'}}
                        className='List'
                        height={295}
                        itemCount={assetRevalues.length}
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

export default AssetRevalue;