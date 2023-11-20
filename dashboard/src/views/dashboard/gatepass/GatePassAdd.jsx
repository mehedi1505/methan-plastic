import React, { useState,useEffect} from "react";
import { Link,useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import { FaEdit, FaTrash } from "react-icons/fa";
import toast from 'react-hot-toast'
import {messageClear,get_agents,get_customers,get_products,get_gp_types,get_terms,gate_pass_add,last_gate_pass_number_show,get_product_info,show_gate_pass_product_details,g_pass_product_details_item_delete} from '../../../store/reducers/gatePassReducer'

import Select from 'react-select'
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment';

// function handleOnWheel({deltaY}){
// console.log('handleOnWheel',deltaY)
// }
// const outerElementType = forwardRef((props,ref)=>(
//   <div ref={ref} onWheel={handleOnWheel} {...props} />
// ))

const GatePassAdd = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {loader,successMessage,errorMessage,agents,customers,terms,gpTypes,products,lastGatePassNumberShow,productInfo,gatePassProductDetails,productTotalPerGatePass} = useSelector(state=>state.gatePass)
  const {userInfo} = useSelector(state=>state.auth)
  const [searchValue, setSearchValue] = useState("");

  const [state,setState] = useState({
    product_qty:'',
    product_price:''
  })

const [gpDate, setGpDate] = useState(Date.now());
const [gpReturnDate, setGpReturnDate] = useState(Date.now());
const [gpNumber,setGpNumber] = useState('')
const [clientNote,setClientNote] = useState('')
const [saleAgentId,setSaleAgentId] = useState('')
const [gpTypeId,setGpTypeId] = useState('')
const [gpTermId,setGpTermId] = useState('')
const [cusId,setCusId] = useState('')
const [productId,setProductId] = useState('')

const inputHandle = (e)=>{
    setState({
        ...state,
        [e.target.name] : e.target.value
    })
}

const GatePassAdd = (e)=>{
    e.preventDefault()
    dispatch(gate_pass_add({
      state,
      gpNumber,
      clientNote,
      gpDate,
      gpReturnDate,
      saleAgentId,
      gpTypeId,
      gpTermId,
      cusId,
      productId,
      userName:userInfo.name
    }))
}
useEffect(()=>{
  dispatch(get_agents())
  dispatch(get_customers())
  dispatch(get_gp_types())
  dispatch(get_terms())
  dispatch(get_products())
  dispatch(last_gate_pass_number_show())
},[])

useEffect(()=>{
  if(productId){
    dispatch(get_product_info(productId))
    setState({
      product_price:productInfo?.price
    })
  }
},[productId])
useEffect(()=>{
  if(productId){
    setState({
      product_price:productInfo?.price
    })
  }
},[productInfo,productId])

  useEffect(()=>{
    if(successMessage){
      toast.success(successMessage)
      dispatch(messageClear())
      setState({
        product_qty:'',
        product_price:'',
      })
      dispatch(show_gate_pass_product_details(gpNumber))
    }
    if(errorMessage){
      toast.error(errorMessage)
      dispatch(messageClear())
    }
  },[successMessage,errorMessage])

  useEffect(()=>{
    if(gpNumber){
        dispatch(show_gate_pass_product_details(gpNumber))
    }
  },[gpNumber])

  const agentOptions = agents && agents.map((agent)=>({
    "value" : agent._id,
    "label" : agent.agent_fullname
    }))
    const customerOptions = customers && customers.map((customer)=>({
      "value" : customer._id,
      "label" : customer.cus_company
    }))
    const termOptions = terms && terms.map((term)=>({
    "value" : term._id,
    "label" : term.term_name
    }))
    const gpTypeOptions = gpTypes && gpTypes.map((gptype)=>({
        "value" : gptype._id,
        "label" : gptype.gp_type
        }))
        const productOptions =products && products.map((product)=>({
          "value" : product._id,
          "label" : product.product_code
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
    <div className="mx-auto md:px-[2px] mt-[-20px]">
      <div className="flex flex-wrap w-[98%] mx-auto">
          <div className="w-full">
            <div className="bg-[#283046] text-[#d0d2d6] height-screen lg:height-auto px-2 py-1">
            <div className="flex justify-between items-center bg-[#283046] py-1 md:px-[10px] text-white">
                <div className="pl-2 font-bold text-3xl">Gate Pass Create</div>
                <div onClick={()=>navigate('/admin/dashboard/gate-pass-list')} className="pl-2 font-bold text-sm cursor-pointer border rounded-full  border-green-500 px-3 py-[3px] hover:bg-[#38425e]">Gate Pass List</div>
            </div>
              <hr className="border-2 border-slate-500 w-[98%] mx-auto mb-5"/>
              <form onSubmit={GatePassAdd}>
                    <div className='flex flex-col mb-1 md:flex-row gap-2 w-full px-3 text-[#d0d2d6] mt-1'>
                    <div className='flex flex-col w-[24%] gap-1'>  
                              <label htmlFor='cus_id' className="text-xs text-white">Customer:</label>                              
                                  <div style={{width:210,color:'black'}}>                 
                                        <Select
                                        options={customerOptions}
                                        defaultValue={cusId}
                                        placeholder="Choose customer"
                                        onChange={(e)=>setCusId(e.value)}
                                        isSearchable
                                        noOptionsMessage={()=>"no type found.."}
                                        styles={customStyles}
                                        required
                                        />
                                  </div>
                            </div>
                            <div className='flex flex-col w-[25%] gap-1'>  
                              <label htmlFor='gp_type_id' className="text-xs text-white">Gate Pass Type:</label>                              
                                  <div style={{width:215,color:'black'}}>                 
                                        <Select
                                        options={gpTypeOptions}
                                        defaultValue={gpTypeId}
                                        placeholder="Choose Category"
                                        onChange={(e)=>setGpTypeId(e.value)}
                                        isSearchable
                                        noOptionsMessage={()=>"no type found.."}
                                        styles={customStyles}
                                        required
                                        />
                                  </div>
                            </div>
                        <div className='flex flex-col w-[25%] gap-1 text-xs'>
                        <label htmlFor="gp_number">Last Gp Number: <span className='text-red-500'>{lastGatePassNumberShow[0]?.gp_number}</span></label>
                            <input onChange={(e)=>setGpNumber(e.target.value)} value={gpNumber} className="bg-[#FFFFFF] border border-slate-700 shadow-md px-4 py-2 focus:border-indigo-500 outline-none text-black rounded-md"
                              type="text"
                              id="gp_number"
                              name="gp_number"
                              placeholder="Enter gp number" required
                            />
                        </div>
                        <div className='flex flex-col w-[25%] gap-1'>
                          <label htmlFor='rec_date' className="text-xs text-white">Gate Pass Date:</label>   
                            <div className="bg-[#FFFFFF] text-black px-[8px] py-[4px] rounded-[3px]">
                              <DatePicker                        
                                  selected={gpDate}
                                  onChange={date=>setGpDate(date)}
                                  dateFormat="dd/MM/yyyy"
                                  filterDate={date=>date.getDay() !== 5}
                                  showYearDropdown
                                  scrollableMonthYearDropdown
                              />
                            </div>
                          </div> 
                    </div>
                 
                    <div className='flex flex-col my-2 md:flex-row px-3 text-[#d0d2d6] gap-2'>
                    <div className='flex flex-col w-[25%] gap-1'>
                          <label htmlFor='return_date' className="text-xs text-white">Return Date:</label>   
                            <div className="bg-[#FFFFFF] text-black px-[8px] py-[4px] rounded-[3px]">
                              <DatePicker                        
                                  selected={gpReturnDate}
                                  onChange={date=>setGpReturnDate(date)}
                                  dateFormat="dd/MM/yyyy"
                                  filterDate={date=>date.getDay() !== 5}
                                  showYearDropdown
                                  scrollableMonthYearDropdown
                              />
                            </div>
                          </div>                     
                    <div className='flex flex-col w-[25%] gap-1'>  
                        <label htmlFor='sale_agent_id' className="text-xs text-white">Sale Agent:</label>                              
                            <div style={{width:215,color:'black'}}>                 
                                <Select
                                options={agentOptions}
                                defaultValue={saleAgentId}
                                placeholder="Choose pay mode"
                                onChange={(e)=>setSaleAgentId(e.value)}
                                isSearchable
                                noOptionsMessage={()=>"not found.."}
                                styles={customStyles}
                                required
                                />
                            </div>
                     </div> 
                     <div className='flex flex-col w-[25%] gap-1'>  
                        <label htmlFor='term_id' className="text-xs text-white">Term:</label>                              
                            <div style={{width:215,color:'black'}}>                 
                                <Select
                                options={termOptions}
                                defaultValue={gpTermId}
                                placeholder="Choose term"
                                onChange={(e)=>setGpTermId(e.value)}
                                isSearchable
                                noOptionsMessage={()=>"not found.."}
                                styles={customStyles}
                                required
                                />
                            </div>
                     </div>                   
                    <div className='flex flex-col w-[24%] gap-1 text-xs'>
                        <label htmlFor="client_note">Client Note</label>
                            <input onChange={(e)=>setClientNote(e.target.value)} value={clientNote} className="bg-[#FFFFFF] border border-slate-700 px-4 py-2 focus:border-indigo-500 outline-none text-black rounded-md"
                            type="text"
                            id="client_note"
                            name="client_note"
                            placeholder="Enter Note"
                            />
                    </div>
  
                    </div>

       
                <div className='mt-4'>
                </div>
                <div className='flex flex-col mb-1 md:flex-row gap-1 w-[98%] mx-auto text-[#d0d2d6] mt-2'>
                        <div className='flex flex-col w-[25%]  text-[#333] gap-1'>
                        <label htmlFor='product_code' className="text-xs text-white">Product Code:</label>
                        <div style={{width:220,color:'black'}}>
                        <Select
                          options={productOptions}
                          defaultValue={productId}
                          placeholder="Choose Product"
                          onChange={(e)=>setProductId(e.value)}
                          isSearchable
                          noOptionsMessage={()=>"no product found.."}
                          styles={customStyles}
                          required
                          />
                          </div>
                          <span className="text-sm text-white">{productInfo?.product_name}</span>
                        </div>
                        <div className='flex flex-col w-[25%] gap-1'>
                            <label htmlFor='product_qty' className="text-xs">Product Qty:</label>
                            <input className='bg-[#D6E3EA]  px-4 py-2 border border-slate-700 rounded-[5px] outline-none focus:border-indigo-500 text-[#2A2D2E] text-xs' onChange={inputHandle} value={state.product_qty} type='number' min="0" step="any" id='product_qty' name='product_qty' required/>
                        </div>
                        <div className='flex flex-col w-[25%] gap-1'>
                            <label htmlFor='product_price' className="text-xs">Product Price:</label>
                            <input className='bg-[#D6E3EA] px-4 py-2 border border-slate-700 rounded-[5px] outline-none focus:border-indigo-500 text-[#2A2D2E] text-xs' onChange={inputHandle} value={state.product_price} type='number' min="0" step="any" id='product_price' name='product_price' required/>
                        </div>
                        <div className='flex flex-col w-[23%] mt-5 gap-1'>
                        <button type="submit" className='bg-blue-500 px-2 mb-3 py-[9px] rounded-[4px] text-white text-xs hover:shadow-blue-500/50 hover:shadow-md font-bold'> Add </button>
                        </div>
                    </div>
              </form>
              

            </div>
          
            <div className='relative overflow-x-auto bg-[#283046] md:min-h-[340px]'>
            <table className='w-full text-xs text-[#d0d2d6] text-left'>
              <thead className='text-xs text-[#d0d2d6] border-b border-slate-700 uppercase'>
                <tr>
                  <th scope='col' className='py-3 px-4'>Product Name</th>
                  <th scope='col' className='py-3 px-4'>Product qty</th>
                  <th scope='col' className='py-3 px-4'>Product Price</th>
                  <th scope='col' className='py-3 px-4'>Total Amount</th>
                  <th scope='col' className='py-3 px-4'>Action</th>
                </tr>
              </thead>
              <tbody>
                  {
                   gatePassProductDetails && gatePassProductDetails.map((prod,i)=><tr key={i}>
                    <td scope='row' className='py-1 px-4 font-medium text-xs whitespace-nowrap'>{prod.product_name}</td>
                    <td scope='row' className='py-1 px-4 font-medium text-xs whitespace-nowrap'>{prod.product_qty}</td>
                    <td scope='row' className='py-1 px-4 font-medium text-xs whitespace-nowrap'>{prod.product_price.toFixed(2)}</td>
                    <td scope='row' className='py-1 px-4 font-medium text-xs whitespace-nowrap'>{prod.product_total.toFixed(2)}</td>
                    <td scope='row' className='py-1 px-4 font-medium text-xs'>
                      <button onClick={()=>dispatch(g_pass_product_details_item_delete({gpId:prod.gp_number,productId:prod.product_id}))} className="p-[5px] rounded bg-red-600 hover:shadow-lg shadow-red-600/50">
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                  )}
              </tbody>
            </table>
            <hr className='w-[97%] border-2 border-slate-500 mx-auto'/>
            <div className="flex justify-between text-white items-center pl-4 pr-[240px] mb-5">
                <div>Total Amount :</div>
                <div>{productTotalPerGatePass[0]?.totalGatePassAmount.toFixed(2)}</div>
              </div>
          </div>
          </div>     
      </div>
    </div>
  );
};

export default GatePassAdd;
