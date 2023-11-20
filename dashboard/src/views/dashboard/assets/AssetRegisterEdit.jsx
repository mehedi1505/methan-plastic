import React, { useState,useEffect} from "react";
import { useNavigate,useParams} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import { PropagateLoader } from 'react-spinners'
import {cssOverride} from '../../../utils/utils'
import toast from 'react-hot-toast'
import {messageClear,asset_type_get,register_get_by_id,register_update} from '../../../store/reducers/assetReducer'
import Select from 'react-select'
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment';
const AssetRegisterEdit = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { regId } = useParams()
  // console.log(expId)
  const {loader,successMessage,errorMessage,assetRegister,assetTypes} = useSelector(state=>state.asset)
  const {userInfo} = useSelector(state=>state.auth)
  const [searchValue, setSearchValue] = useState("");
  const [state,setState] = useState({
    asset_name:'',
    asset_origin:'',
    asset_price:'',
    asset_note:'',
    status:''
  })
  const [selectedDate, setSelectedDate] = useState(Date.now("dd/MM/yyyy"));
  const [assetTypeId, setAssetTypeId] = useState('');

const inputHandle = (e)=>{
    setState({
        ...state,
        [e.target.name] : e.target.value
    })
}
useEffect(()=>{
  dispatch(asset_type_get())
},[])
useEffect(()=>{
  if(regId){
    dispatch(register_get_by_id(regId))
  }
},[regId])

useEffect(()=>{
 if(assetRegister.length>0){
  setState({
    asset_name:assetRegister[0].asset_name,
    asset_origin:assetRegister[0].asset_origin,
    asset_price:assetRegister[0].asset_price,
    asset_note:assetRegister[0].asset_note,
    status:assetRegister[0].status,
  })
  setAssetTypeId(assetRegister[0].type[0]._id)
  setSelectedDate(assetRegister[0].purchase_date)
 }
},[assetRegister])


const update = (e)=>{
  e.preventDefault()
  const obj = {
    asset_name:state.asset_name,
    purchase_date:selectedDate,
    asset_type_id:assetTypeId,
    asset_origin:state.asset_origin,
    asset_price:state.asset_price,
    asset_note:state.asset_note,
    status:state.status,
    regId:regId,
    userName:userInfo.name
  }
  dispatch(register_update(obj))
}


  useEffect(()=>{
    if(successMessage){
      toast.success(successMessage)
      // navigate('/admin/dashboard/asset-register')
      dispatch(messageClear())
    }
    if(errorMessage){
      toast.error(errorMessage)
      dispatch(messageClear())
    }
  },[successMessage,errorMessage])


  const typeOptions = assetTypes && assetTypes.map((type)=>({
    "value" : type._id,
    "label" : type.asset_type_name
  }))

const customStyles = {
  control: base => ({
    ...base,
    height: 32,
    minHeight: 32,
    background:'#D6E3EA',
    align:'center',
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

const options = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
]; 
  return (
      <div className="flex flex-wrap w-[934px]">
          <div className="w-full pl-2">
    <div className="mx-auto py-1 md:px-[2px] mt-[-23px]">
            <div className="bg-[#283046] text-[#d0d2d6] height-screen lg:min-h-[625px] px-3 p-3 rounded-md">
            <div className="flex justify-between items-center bg-[#283046] py-2 md:px-[2px] text-white">
                <div className="pl-2 font-bold text-2xl">Register Edit</div>
                <div onClick={()=>navigate('/admin/dashboard/asset-register')} className="pr-2 font-bold text-sm cursor-pointer bg-[#3ab0d8] px-3 py-1 mr-3">Register List</div>
            </div>

            <form onSubmit={update}>
                    <div className='flex flex-col mb-1 md:flex-row gap-2 w-full px-3 text-[#d0d2d6] mt-1'>
                        <div className='flex flex-col w-[25%] gap-1 text-xs'>
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
                                <div style={{width:202,color:'black'}}>                 
                                      <Select
                                      options={typeOptions}
                                      value={typeOptions.find(option=>option.value === assetTypeId)}
                                      placeholder="Choose Type"
                                      onChange={(e)=>setAssetTypeId(e.value)}
                                      isSearchable
                                      noOptionsMessage={()=>"no type found.."}
                                      styles={customStyles}
                                      />
                                </div>
                            </div>
                            <div className='flex flex-col w-[24%] gap-[5px]'>
                                <label htmlFor='purchase_date' className="text-xs text-white">Purchase Date:</label>   
                                  <div className="bg-[#FFFFFF] text-black px-[8px] py-[4px] rounded-[3px]">
                                    <DatePicker                        
                                        selected={new Date(selectedDate)}
                                        onChange={date=>setSelectedDate(date)}
                                        dateFormat="dd/MM/yyyy"
                                        filterDate={date=>date.getDay() !== 5}
                                        showYearDropdown
                                        scrollableMonthYearDropdown
                                    />
                                  </div>
                                </div> 
                                <div className='flex flex-col w-[23%] gap-1 text-xs'>
                                    <label htmlFor="asset_origin">Asset Origin</label>
                                        <input value={state.asset_origin}  onChange={inputHandle} className="bg-[#FFFFFF] border border-slate-700 shadow-md px-4 py-2 focus:border-indigo-500 outline-none text-black rounded-md"
                                          type="text"
                                          id="asset_origin"
                                          name="asset_origin"
                                          placeholder="Enter origin"
                                        />
                                    </div> 

                    </div>
                    
                    <div className='flex flex-col mb-1 md:flex-row gap-2 w-full px-3 text-[#d0d2d6] pb-6 mt-1'>

                        <div className='flex flex-col w-[25%] gap-1 text-xs'>
                        <label htmlFor="asset_price">Asset Price</label>
                            <input value={state.asset_price}  onChange={inputHandle} className="bg-[#FFFFFF] border border-slate-700 shadow-md px-4 py-2 focus:border-indigo-500 outline-none text-black rounded-md"
                              type="number"
                              id="asset_price"
                              name="asset_price"
                              min="0"
                              step="any"
                              placeholder="Enter price"
                            />
                        </div>
                        <div className='flex flex-col w-[24%] gap-1 text-xs'>
                        <label htmlFor="asset_note">Asset Note</label>
                            <input value={state.asset_note}  onChange={inputHandle} className="bg-[#FFFFFF] border border-slate-700 shadow-md px-4 py-2 focus:border-indigo-500 outline-none text-black rounded-md"
                              type="text"
                              id="asset_note"
                              name="asset_note"
                              placeholder="Enter note"
                            />
                        </div> 
                        <div className='flex flex-col w-[24%] gap-1'>
                        <label htmlFor='status' className="text-xs">Status:</label>
                          <select className="text-black py-[5px] bg-[#D6E3EA] outline-none rounded-md" value={state.status} onChange={inputHandle} name="status" id="status">
                            {options.map(option => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      <div className='flex w-[24%]'>
                        <button disabled={loader?true:false} type="submit" className='bg-green-500 mt-[19px] w-[200px] py-[2px] text-white text-xs hover:shadow-green-500/50 hover:shadow-md font-bold rounded-md'>
                            {
                                loader? <PropagateLoader color='#fff' cssOverride={cssOverride}/>: 'Update'
                            }
                            
                        </button>
                    </div>

                    </div>

              </form>
            </div>
          </div>       
      </div>
    </div>
  );
};

export default AssetRegisterEdit;
