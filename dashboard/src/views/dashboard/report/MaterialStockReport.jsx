import React, { useState, useEffect,useRef, forwardRef  } from "react";
import { useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ReactPrint from 'react-to-print'
import {BiSolidPrinter} from 'react-icons/bi'
import toast from 'react-hot-toast'
import {cssOverride} from '../../../utils/utils'
import numwords from 'num-words'
import {material_stock,get_all_material_for_stock,get_single_item_stock} from "../../../store/reducers/reportReducer";
import Select from 'react-select'
import {FixedSizeList as List} from 'react-window'
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import moment from "moment";
// import { messageClear,item_add } from './../../../store/reducers/itemReducer';
function handleOnWheel({deltaY}){
  console.log('handleOnWheel',deltaY)
  }
  const outerElementType = forwardRef((props,ref)=>(
    <div ref={ref} onWheel={handleOnWheel} {...props} />
  ))
const MaterialReceiveReport = () => {

  const numWords = require('num-words')
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [itemId, setItemId] = useState('')
  useEffect(()=>{
    // dispatch(get_all_vendor())
    dispatch(get_all_material_for_stock())
  },[])
  useEffect(()=>{
    dispatch(get_single_item_stock(itemId))
  },[itemId])

  const ref = useRef()
  const { materialStockData,allItems,itemInfo,recTotal,rmUsedTotal} = useSelector(state => state.report);
  // const { userInfo } = useSelector(state => state.auth);

  // const [startDate, setStartDate] = useState(Date.now());
  // const [endDate, setEndDate] = useState(Date.now());
  // const [vendorId,setVendorId] = useState('')

// const receivedReportData = (e)=>{
//       e.preventDefault()
//       dispatch(get_received_material_data({
//         vendorId,
//         startDate,
//         endDate
//       }))
// }

// const vendorOptions = allVendors && allVendors.map((vendor)=>({
//   "value" : vendor._id,
//   "label" : vendor.vendor_company
// }))
const itemOptions = allItems && allItems.map((item)=>({
  "value" : item._id,
  "label" : item.item_code
}))
const customStyles = {
  control: base => ({
    ...base,
    height: 25,
    minHeight: 25,
    background:'#fefeff',
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

useEffect(()=>{
dispatch(material_stock())
dispatch(get_all_material_for_stock())
},[])

const o_stock = itemInfo && itemInfo?.opening_stock ? itemInfo?.opening_stock : 0
const recQty = recTotal && recTotal.length>0 ? recTotal[0]?.totalRecQty : 0
const rmQty =rmUsedTotal && rmUsedTotal.length>0 ? rmUsedTotal[0]?.totalRmQty : 0
const result = o_stock+recQty-rmQty
  return (
    <div className="px-2 py-2">
      <div className="flex flex-wrap w-full mt-[-28px]">
        <div className="bg-[#fefeff] w-[90%] mx-auto">
       <div className='text-right'>
       <ReactPrint trigger={()=> <button className='bg-[#eaeaf0] p-1 px-3 text-green-900 flex items-center gap-1 rounded-md text-xs mx-auto mt-5'><BiSolidPrinter/> Preview</button>} content={()=>ref.current}/>
       </div>
       <div className='flex flex-col mb-1 justify-between items-center  md:flex-row gap-2 w-[92%] mx-auto text-[#d0d2d6] mt-2'>
       <div className='flex flex-col w-[25%]  text-[#333] gap-1'>
          <label htmlFor='item_code' className="text-xs text-black">Search Item Code:</label>
          <div style={{width:220,color:'black'}}>
          <Select
            options={itemOptions}
            defaultValue={itemId}
            placeholder="Choose Item"
            onChange={(e)=>setItemId(e.value)}
            isSearchable
            noOptionsMessage={()=>"no Item found.."}
            styles={customStyles}
            required
            />
            </div>

        </div>
      
        <div className='flex flex-col mb-1 md:flex-row w-[60%] text-xs mx-auto gap-2'>
              <div className="text-xs w-[30%] text-black">Item Name:<br/> {itemInfo?.item_name}</div>
              <div className="text-xs w-[15%] text-black">O_Stock:<br/>  {o_stock}</div>
              <div className="text-xs w-[15%] text-black">Rec Qty:<br/>  {recQty.toFixed(2)}</div>
              <div className="text-xs w-[15%] text-black">Used Qty:<br/>  {rmQty.toFixed(2)}</div>
              <div className="text-xs w-[15%] text-black">Stock Qty:<br/>  {result.toFixed(2)}</div>
        </div>
      </div>
      
 
       {/* <form onSubmit={receivedReportData}>
            <div className='flex flex-col mb-1 md:flex-row gap-2 w-[92%] mx-auto text-[#d0d2d6] mt-2'>
              <div className='flex flex-col w-[25%] gap-1'>  
                <label htmlFor='vendor_id' className="text-xs text-white">Vendor:</label>                              
                    <div style={{width:160,color:'black'}}>                 
                          <Select
                          options={vendorOptions}
                          defaultValue={vendorId}
                          placeholder="Choose Vendor"
                          onChange={(e)=>setVendorId(e.value)}
                          isSearchable
                          noOptionsMessage={()=>"no vendor found.."}
                          styles={customStyles}
                          />
                    </div>
                </div>
                <div className='flex flex-col w-[200px] gap-1'>
                <label htmlFor='rec_date' className="text-xs text-white">Start Date:</label>   
                  <div className="bg-[#fefeff] text-black px-[8px] py-[1px] w-[200px] border border-slate-500 rounded-[3px]">
                    <DatePicker                        
                        selected={startDate}
                        onChange={date=>setStartDate(date)}
                        dateFormat="dd/MM/yyyy"
                        filterDate={date=>date.getDay() !== 5}
                        showYearDropdown
                        scrollableMonthYearDropdown
                    />
                  </div>
                </div>
                <div className='flex flex-col w-[200px] gap-1'>
                <label htmlFor='rec_date' className="text-xs text-white">End Date:</label>   
                  <div className="bg-[#fefeff] text-black  w-[200px] px-[8px] py-[1px] border border-slate-500 rounded-[3px]">
                    <DatePicker                        
                        selected={endDate}
                        onChange={date=>setEndDate(date)}
                        dateFormat="dd/MM/yyyy"
                        filterDate={date=>date.getDay() !== 5}
                        showYearDropdown
                        scrollableMonthYearDropdown
                    />
                  </div>
                </div>
                <div className='flex flex-col w-[65px] mt-5 gap-1'>
                  <button type="submit" className='bg-blue-500 px-2 py-[2px] rounded-[4px] text-white hover:shadow-blue-500/50 hover:shadow-md font-bold'> Search </button>
                </div>
       </div>
       </form> */}

          <div ref={ref} className="w-full p-2 bg-[#fefeff] min-h-[500px]">
            <div className="bg-[#fefeff] text-black text-sm w-[95%] py-[6px] mx-auto text-center">
              <p className="text-2xl font-bold pb-1">
                Material Stock Report             
              </p>
              <div className='w-ful overflow-x-auto'>

              <table className="min-w-full text-left text-[9px] font-light">
                        <thead className="border-b font-xs dark:border-neutral-500">
                            <tr>
                            <th scope="col" className="px-6 py-2">SL</th>
                            <th scope="col" className="px-6 py-2">Material Code</th>
                            <th scope="col" className="px-6 py-2">Material Name</th>
                            <th scope="col" className="px-6 py-2">Opening Stock</th>
                            <th scope="col" className="px-6 py-2">Rec Qty</th>
                            <th scope="col" className="px-6 py-2">Use Qty</th>
                            <th scope="col" className="px-6 py-2">Stock Qty</th>
                            </tr>
                        </thead>
                        <tbody className="text-black">
                        {
                       materialStockData && materialStockData.map((m,i)=><tr key={i}>
                        <td className="whitespace-nowrap px-6 py-1 font-medium">{i+1}</td>
                        <td className="whitespace-nowrap px-6 py-1 font-medium">{m?._id.code}</td>
                        <td className="whitespace-nowrap px-6 py-1 font-medium">{m?._id.name}</td>
                        <td className="whitespace-nowrap px-6 py-1 font-medium">{m?.opnStock}</td>
                        <td className="whitespace-nowrap px-6 py-1 font-medium">{m?.totalRecQty.toFixed(2)}</td>
                        <td className="whitespace-nowrap px-6 py-1 font-medium">{m?.totalRmQuantity.toFixed(2)}</td>
                        <td className="whitespace-nowrap px-6 py-1 font-medium">{(m?.opnStock + m?.totalRecQty - m?.totalRmQuantity).toFixed(2)}</td>
                       </tr>)
                     }
                        </tbody>
                        </table>
                </div>
            </div>
            
           
       
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialReceiveReport;