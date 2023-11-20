import React, { useState, useEffect,useRef, forwardRef  } from "react";
import { useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ReactPrint from 'react-to-print'
import {BiSolidPrinter} from 'react-icons/bi'
import toast from 'react-hot-toast'
import {cssOverride} from '../../../utils/utils'
import numwords from 'num-words'
import {messageClear,get_production_report_data} from "../../../store/reducers/reportReducer";
import Select from 'react-select'
import {FixedSizeList as List} from 'react-window'
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import moment from "moment";

function handleOnWheel({deltaY}){
  console.log('handleOnWheel',deltaY)
  }
  const outerElementType = forwardRef((props,ref)=>(
    <div ref={ref} onWheel={handleOnWheel} {...props} />
  ))
const ProductionReport = () => {

  const numWords = require('num-words')
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const ref = useRef()
  const { productionData,errorMessage,successMessage} = useSelector(state => state.report);
  // const { userInfo } = useSelector(state => state.auth);

  const [startDate, setStartDate] = useState(Date.now());
  const [endDate, setEndDate] = useState(Date.now());



const productionReportData = (e)=>{
      e.preventDefault()
      dispatch(get_production_report_data({
        startDate,
        endDate
      }))
}

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
function AllRows({ index, style }) {
  return <div style={style} className='flex text-xs mt-2'>
    <div className='w-[10%] p-1 whitespace-nowrap'>{index + 1}</div>
    <div className='w-[30%] p-1 whitespace-nowrap'>{`${productionData[index]?.product_name}`}</div>
    <div className='w-[20%] p-1 whitespace-nowrap'>{moment(`${productionData[index]?.production_date}`).format('LL')}</div>
    <div className='w-[10%] p-1 whitespace-nowrap'>{`${productionData[index]?.product_qty}`}</div>
    <div className='w-[10%] p-1 whitespace-nowrap'>{`${productionData[index]?.product_price}`}</div>
    <div className='w-[20%] p-1 whitespace-nowrap'>{`${productionData[index]?.product_qty*productionData[index]?.product_price}`}</div>
  </div>

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
    <div className="px-2 py-2">
      <div className="flex flex-wrap w-full mt-[-28px]">
        <div className="bg-[#fefeff] w-[90%] mx-auto">
       <div className='text-right'>
       <ReactPrint trigger={()=> <button className='bg-[#eaeaf0] p-1 px-3 text-green-900 flex items-center gap-1 rounded-md text-xs mx-auto mt-5'><BiSolidPrinter/> Preview</button>} content={()=>ref.current}/>
       </div>

       <form onSubmit={productionReportData}>




            <div className='flex flex-col mb-1 md:flex-row gap-2 w-[60%] mx-auto text-[#d0d2d6] mt-2'>
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
                Production Report             
              </p>
              <div className='w-ful overflow-x-auto'>
                    <div className='flex uppercase font-bold text-xs min-w-[340px] text-black no-scrollbars'>
                        <div className='w-[10%] p-2'>No</div>
                        <div className='w-[30%] p-2'>Product Name</div>
                        <div className='w-[20%] p-2'>Production Date</div>
                        <div className='w-[10%] p-2'>Product Qty</div>
                        <div className='w-[10%] p-2'>Price</div>
                        <div className='w-[20%] p-2'>Total Amount</div>
                    </div>
                    {
                        <List 
                        style={{minWidth: '340px',overflowX:'hidden',color: 'black'}}
                        className='List'
                        height={600}
                        itemCount={productionData.length}
                        itemSize={30}
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

export default ProductionReport;