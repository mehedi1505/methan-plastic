import React, { useState, useEffect,useRef, forwardRef  } from "react";
import { useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ReactPrint from 'react-to-print'
import {BiSolidPrinter} from 'react-icons/bi'
import toast from 'react-hot-toast'
import {cssOverride} from '../../../utils/utils'
import numwords from 'num-words'
import {product_stock,get_all_product_for_stock,get_single_product_stock} from "../../../store/reducers/reportReducer";
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

  const [productId, setProductId] = useState('')
  useEffect(()=>{
    // dispatch(get_all_vendor())
    dispatch(get_all_product_for_stock())
  },[])
  useEffect(()=>{
    if(productId){
      dispatch(get_single_product_stock(productId))
    }
  },[productId])

  const ref = useRef()
  const { productStockData,allProducts,productInfo,totalProduction,totalSale} = useSelector(state => state.report);
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
const productOptions = allProducts && allProducts.map((product)=>({
  "value" : product._id,
  "label" : product.product_code
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
dispatch(product_stock())
dispatch(get_all_product_for_stock())
},[])

const o_stock = productInfo && productInfo?.opening_stock ? productInfo?.opening_stock : 0
const productionQty = totalProduction && totalProduction.length>0 ? totalProduction[0]?.totalProductionQty : 0
const saleQty = totalSale && totalSale.length>0 ? totalSale[0]?.totalProductSaleQty : 0
const result = o_stock+productionQty-saleQty
  return (
    <div className="px-2 py-2">
      <div className="flex flex-wrap w-full mt-[-28px]">
        <div className="bg-[#fefeff] w-[90%] mx-auto">
       <div className='text-right'>
       <ReactPrint trigger={()=> <button className='bg-[#eaeaf0] p-1 px-3 text-green-900 flex items-center gap-1 rounded-md text-xs mx-auto mt-5'><BiSolidPrinter/> Preview</button>} content={()=>ref.current}/>
       </div>
       <div className='flex flex-col mb-1 justify-between items-center  md:flex-row gap-2 w-[92%] mx-auto text-[#d0d2d6] mt-2'>
       <div className='flex flex-col w-[25%]  text-[#333] gap-1'>
          <label htmlFor='item_code' className="text-xs text-Black">Search Product Code:</label>
          <div style={{width:220,color:'black'}}>
          <Select
            options={productOptions}
            defaultValue={productId}
            placeholder="Choose product"
            onChange={(e)=>setProductId(e.value)}
            isSearchable
            noOptionsMessage={()=>"no product found.."}
            styles={customStyles}
            required
            />
            </div>

        </div>
      
        <div className='flex flex-col mb-1 md:flex-row w-[60%] text-xs mx-auto gap-2'>
              <div className="text-xs w-[35%] text-black">Product Name:<br/> {productInfo?.product_name}</div>
              <div className="text-xs w-[10%] text-black">O_Stock:<br/>  {o_stock}</div>
              <div className="text-xs w-[15%] text-black">Prod Qty:<br/>  {productionQty}</div>
              <div className="text-xs w-[15%] text-black">Sale Qty:<br/>  {saleQty}</div>
              <div className="text-xs w-[15%] text-black">Stock Qty:<br/>  {result}</div>
        </div>
      </div>
      

          <div ref={ref} className="w-full p-2 bg-[#fefeff] min-h-[500px]">
            <div className="bg-[#fefeff] text-black text-sm w-[95%] py-[6px] mx-auto text-center">
              <p className="text-2xl font-bold pb-1">
                Product Stock Report             
              </p>
              <div className='w-ful overflow-x-auto'>

              <table className="min-w-full text-left text-[9px] font-light">
                        <thead className="border-b font-xs dark:border-neutral-500">
                            <tr>
                            <th scope="col" className="px-6 py-2">SL</th>
                            <th scope="col" className="px-6 py-2">Product Code</th>
                            <th scope="col" className="px-6 py-2">Product Name</th>
                            <th scope="col" className="px-6 py-2">Opening Stock</th>
                            <th scope="col" className="px-6 py-2">Production Qty</th>
                            <th scope="col" className="px-6 py-2">Sale Qty</th>
                            <th scope="col" className="px-6 py-2">Stock Qty</th>
                            </tr>
                        </thead>
                        <tbody className="text-black">
                        {
                       productStockData && productStockData.map((p,i)=><tr key={i}>
                        <td className="whitespace-nowrap px-6 py-1 font-medium">{i+1}</td>
                        <td className="whitespace-nowrap px-6 py-1 font-medium">{p?._id.code}</td>
                        <td className="whitespace-nowrap px-6 py-1 font-medium">{p?._id.name}</td>
                        <td className="whitespace-nowrap px-6 py-1 font-medium">{p?.opnStock}</td>
                        <td className="whitespace-nowrap px-6 py-1 font-medium">{p?.totalProdQty}</td>
                        <td className="whitespace-nowrap px-6 py-1 font-medium">{p?.totalSlQuantity}</td>
                        <td className="whitespace-nowrap px-6 py-1 font-medium">{(p?.opnStock + p?.totalProdQty - p?.totalSlQuantity)}</td>
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