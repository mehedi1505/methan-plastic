import React, { useState,useEffect, forwardRef } from "react";
import { Link} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import { PropagateLoader } from 'react-spinners'
import {cssOverride} from '../../../utils/utils'
import { FaEdit} from "react-icons/fa";
import toast from 'react-hot-toast'

import {messageClear,asset_register_add,asset_type_get,asset_register_get} from '../../../store/reducers/assetReducer'
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
const AssetRegister = () => {
  const dispatch = useDispatch()
  const {loader,successMessage,errorMessage,assetRegisters,assetTypes,totalRegister} = useSelector(state=>state.asset)
  const {userInfo} = useSelector(state=>state.auth)
  const [searchValue, setSearchValue] = useState("");

  const [state,setState] = useState({
    asset_name:'',
    asset_origin:'',
    asset_price:'',
    asset_note:''
  })
const [selectedDate, setSelectedDate] = useState(Date.now());
const [assetTypeId, setAssetTypeId] = useState('');
const inputHandle = (e)=>{
    setState({
        ...state,
        [e.target.name] : e.target.value
    })
}

const Add= (e)=>{
    e.preventDefault()
    dispatch(asset_register_add({
      state:state,
      selectedDate,
      assetTypeId,
      userName:userInfo.name
    }))
}
// asset type get
useEffect(()=>{
  dispatch(asset_register_get({searchValue}))
},[searchValue,successMessage,errorMessage])
// asset type get
useEffect(()=>{
    dispatch(asset_type_get({searchValue}))
},[searchValue,successMessage,errorMessage])

  useEffect(()=>{
    if(successMessage){
      toast.success(successMessage)
      dispatch(messageClear())
      setState({
        asset_name:'',
        asset_origin:'',
        asset_price:'',
        asset_note:''
      })
      setAssetTypeId('')
    }
    if(errorMessage){
      toast.error(errorMessage)
      dispatch(messageClear())
    }
  },[successMessage,errorMessage])
 
  function AllRows({ index, style }) {
    return <div style={style} className='flex text-xs mt-2'>
      <div className='w-[5%] p-1 whitespace-nowrap'>{index + 1}</div>
      <div className='w-[15%] p-1 whitespace-nowrap'>{`${assetRegisters[index]?.asset_name}`}</div>
      <div className='w-[15%] p-1 whitespace-nowrap'>{`${assetRegisters[index]?.type[0]?.asset_type_name}`}</div>
      <div className='w-[15%] p-1 whitespace-nowrap'>{moment(`${assetRegisters[index]?.purchase_date}`).format('LLL')}</div>
      <div className='w-[15%] p-1 whitespace-nowrap'>{`${assetRegisters[index]?.asset_origin}`}</div>
      <div className='w-[10%] p-1 whitespace-nowrap'>{`${assetRegisters[index]?.asset_price}`}</div>
      <div className='w-[18%] p-1 whitespace-nowrap'>{`${assetRegisters[index]?.asset_note}`}</div>
      <div className="w-[5%] flex justify-center items-center gap-1">
        <Link to={`/admin/dashboard/edit-asset-register/${assetRegisters[index]?._id}`} className="p-[5px] rounded bg-yellow-500 hover:shadow-lg shadow-yellow-500/50">
          <FaEdit />
        </Link>
        {/* <button onClick = {()=>dispatch(expense_delete(`${assets[index]._id}`))} className="p-[5px] rounded bg-red-600 hover:shadow-lg shadow-red-600/50">
          <FaTrash />
        </button> */}
      </div>
    </div>

  } 
  const typeOptions = assetTypes && assetTypes.map((type)=>({
    "value" : type._id,
    "label" : type.asset_type_name
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
      <div className="flex flex-wrap w-[930px] mt-[-20px]">
          <div className="w-full pl-2">
            <div className="bg-[#283046] text-[#d0d2d6] height-screen lg:height-auto px-2 py-5">
            <div className="flex justify-between items-center bg-[#283046] py-1 md:px-[10px] text-white">
                <div className="pl-2 font-bold text-2xl">Asset Register Create</div>
            </div>
            <hr className="border-2 border-slate-500 w-[97%] mx-auto"/>
              <form onSubmit={Add}>
                    <div className='flex flex-col mb-1 md:flex-row gap-2 w-full px-3 text-[#d0d2d6] mt-5'>
                        <div className='flex flex-col w-[24%] gap-1 text-xs'>
                        <label htmlFor="asset_name">Asset Name</label>
                            <input value={state.asset_name}  onChange={inputHandle} className="bg-[#FFFFFF] border border-slate-700 shadow-md px-4 py-2 focus:border-indigo-500 outline-none text-black rounded-md"
                              type="text"
                              id="asset_name"
                              name="asset_name"
                              placeholder="Enter name" required
                            />
                        </div> 
                        <div className='flex flex-col w-[24%] gap-[5px]'>  
                            <label htmlFor='asset_type_id' className="text-xs text-white">Asset Type:</label>                              
                                <div style={{width:210,color:'black'}}>                 
                                      <Select
                                      options={typeOptions}
                                      defaultValue={assetTypeId}
                                      placeholder="Choose Type"
                                      onChange={(e)=>setAssetTypeId(e.value)}
                                      isSearchable
                                      noOptionsMessage={()=>"no type found.."}
                                      styles={customStyles}
                                      />
                                </div>
                            </div>
                          
                                <div className='flex flex-col w-[24%] gap-1 text-xs'>
                        <label htmlFor="asset_origin">Asset Origin</label>
                            <input value={state.asset_origin}  onChange={inputHandle} className="bg-[#FFFFFF] border border-slate-700 shadow-md px-4 py-2 focus:border-indigo-500 outline-none text-black rounded-md"
                              type="text"
                              id="asset_origin"
                              name="asset_origin"
                              placeholder="Enter origin"
                            />
                        </div>
                        <div className='flex flex-col w-[24%] gap-[5px]'>
                                <label htmlFor='purchase_date' className="text-xs text-white">Purchase Date:</label>   
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

                    </div>
                    
                    <div className='flex flex-col mb-1 md:flex-row gap-2 w-full px-3 text-[#d0d2d6] mt-1'>
            
                        <div className='flex flex-col w-[24%] gap-1 text-xs'>
                        <label htmlFor="asset_price">Asset Price</label>
                            <input value={state.asset_price}  onChange={inputHandle} className="bg-[#FFFFFF] border border-slate-700 shadow-md px-4 py-2 focus:border-indigo-500 outline-none text-black rounded-md"
                              type="number"
                              id="asset_price"
                              name="asset_price"
                              min="0"
                              step="any"
                              placeholder="Enter price" required
                            />
                        </div>
                        <div className='flex flex-col w-[74%] gap-1 text-xs'>
                        <label htmlFor="asset_note">Asset Note</label>
                            <input value={state.asset_note}  onChange={inputHandle} className="bg-[#FFFFFF] border border-slate-700 shadow-md px-4 py-2 focus:border-indigo-500 outline-none text-black rounded-md"
                              type="text"
                              id="asset_note"
                              name="asset_note"
                              placeholder="Enter note"
                            />
                        </div> 
                      

                    </div>
                    <div className='w-[23%] ml-[12px]'>
                        <button disabled={loader?true:false} type="submit" className='bg-green-500 mt-[12px] w-full py-[6px] text-white text-md hover:shadow-green-500/50 hover:shadow-md font-bold rounded-md'>
                            {
                                loader? <PropagateLoader color='#fff' cssOverride={cssOverride}/>: 'Add'
                            }
                            
                        </button>
                    </div>
              </form>
              <div className="w-full p-2 bg-[#283046] rounded-md">
            <div className='w-full flex justify-between items-center bg-[#283046] py-2'>
              <div className='text-white font-bold'>
                  Total Register : {totalRegister}
              </div>
              <Search searchValue={searchValue} setSearchValue={setSearchValue}/>
            </div> 
              <div className='w-full border border-slate-700 overflow-x-auto'>
                    <div className='flex bg-[#007DC3] uppercase font-bold text-xs min-w-[340px] text-left text-white'>
                        <div className='w-[5%] p-2'>No</div>
                        <div className='w-[15%] p-2'>Asset Name</div>
                        <div className='w-[15%] p-2'>Asset Type</div>
                        <div className='w-[15%] p-2'>Purchase Date</div>
                        <div className='w-[15%] p-2'>Asset Origin</div>
                        <div className='w-[10%] p-2'>Asset Price</div>
                        <div className='w-[18%] p-2'>Asset Note</div>
                        <div className='w-[5%] p-2 text-left'>Action</div>
                    </div>
                    {
                        <List 
                        style={{minWidth: '340px',overflowX:'hidden',color: 'white'}}
                        className='List'
                        height={260}
                        itemCount={assetRegisters.length}
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

export default AssetRegister;