import React, { useState, useEffect,useRef, forwardRef  } from "react";
import { useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ReactPrint from 'react-to-print'
import {BiSolidPrinter} from 'react-icons/bi'
import toast from 'react-hot-toast'
import {cssOverride} from '../../../utils/utils'
import numwords from 'num-words'
import {customers_get,get_challan_data} from "../../../store/reducers/reportReducer";
import Select from 'react-select'
import {FixedSizeList as List} from 'react-window'
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import moment from "moment";
import { messageClear,item_add } from './../../../store/reducers/itemReducer';
function handleOnWheel({deltaY}){
  console.log('handleOnWheel',deltaY)
  }
  const outerElementType = forwardRef((props,ref)=>(
    <div ref={ref} onWheel={handleOnWheel} {...props} />
  ))
const ChallanReport = () => {

  const numWords = require('num-words')
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
    dispatch(customers_get())
  },[])

  const ref = useRef()
  const { customers, challanData,errorMessage,successMessage} = useSelector(state => state.report);
  // const { userInfo } = useSelector(state => state.auth);

  const [startDate, setStartDate] = useState(Date.now());
  const [endDate, setEndDate] = useState(Date.now());
  const [cusId,setCusId] = useState('')

const challanReportData = (e)=>{
      e.preventDefault()
      dispatch(get_challan_data({
        cusId,
        startDate,
        endDate
      }))
}

const customerOptions = customers && customers.map((customer)=>({
  "value" : customer._id,
  "label" : customer.cus_company
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
// function AllRows({ index, style }) {
//   return <div style={style} className='flex text-xs mt-2'>
//     <div className='w-[10%] p-1 whitespace-nowrap'>{index + 1}</div>
//     <div className='w-[10%] p-1 whitespace-nowrap'>{`${challanData[index]?.rec_invoice}`}</div>
//     <div className='w-[20%] p-1 whitespace-nowrap'>{moment(`${challanData[index]?.rec_date}`).format('LL')}</div>
//     <div className='w-[20%] p-1 whitespace-nowrap'>{`${challanData[index]?.item_name}`}</div>
//     <div className='w-[20%] p-1 whitespace-nowrap'>{`${challanData[index]?.vendor[0]?.vendor_company}`}</div>
//     <div className='w-[10%] p-1 whitespace-nowrap'>{`${challanData[index]?.item_price}`}</div>
//     <div className='w-[10%] p-1 whitespace-nowrap'>{`${challanData[index]?.item_total}`}</div>
//   </div>

// } 
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
    <div className="px-2 py-2">
      <div className="flex flex-wrap w-full mt-[-28px]">
        <div className="bg-[#fefeff] w-[90%] mx-auto">
       <div className='text-right'>
       <ReactPrint trigger={()=> <button className='bg-[#eaeaf0] p-1 px-3 text-green-900 flex items-center gap-1 rounded-md text-xs mx-auto mt-5'><BiSolidPrinter/> Preview</button>} content={()=>ref.current}/>
       </div>
       <form onSubmit={challanReportData}>
            <div className='flex flex-col mb-1 md:flex-row gap-2 w-[92%] mx-auto text-[#d0d2d6] mt-2'>
              <div className='flex flex-col w-[25%] gap-1'>  
                <label htmlFor='vendor_id' className="text-xs text-white">Customer:</label>                              
                    <div style={{width:160,color:'black'}}>                 
                          <Select
                          options={customerOptions}
                          defaultValue={cusId}
                          placeholder="Choose Customer"
                          onChange={(e)=>setCusId(e.value)}
                          isSearchable
                          noOptionsMessage={()=>"no customer found.."}
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
       </form>

          <div ref={ref} className="w-full p-2 bg-[#fefeff] min-h-[900px]">
            <div className="bg-[#fefeff] text-black text-sm w-[92%] py-[6px] mx-auto text-center">
              <p className="text-2xl font-bold pb-1">
               Challan Report             
              </p>
              <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                    <table className="min-w-full text-left text-[9px] font-light">
                        <thead className="border-b font-xs dark:border-neutral-500">
                            <tr>
                            <th scope="col" className="px-6 py-2">Customer</th>
                            <th scope="col" className="px-6 py-2">Challan No</th>
                            <th scope="col" className="px-6 py-2">Challan Date</th>
                            <th scope="col" className="px-6 py-2">Total Item</th>
                            <th scope="col" className="px-6 py-2">Challan Amount</th>
                            <th scope="col" className="px-6 py-2">Discount</th>
                            <th scope="col" className="px-6 py-2">Net Challan Amount</th>
                            </tr>
                        </thead>
                        <tbody className="text-black">
                        {
                       challanData && challanData.map((c,i)=><tr key={i}>
                        <td className="whitespace-nowrap px-6 py-1 font-medium">{c.customer[0]?.cus_company}</td>
                        <td className="whitespace-nowrap px-6 py-1">{c.master[0]?.invoice_number}</td>
                        <td className="whitespace-nowrap px-6 py-1">{moment(`${c.master[0]?.invoice_date}`).format('LL')}</td>
                        <td className="whitespace-nowrap px-6 py-1">{c.totalQuantity}</td>
                        <td className="whitespace-nowrap px-6 py-1">{c.totalAmount}</td>
                        <td className="whitespace-nowrap px-6 py-1">{c.master[0]?.discount}</td>
                        <td className="whitespace-nowrap px-6 py-1">{c.totalAmount - c.master[0]?.discount}</td>
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
        </div>
      </div>
    </div>
  );
};

export default ChallanReport;