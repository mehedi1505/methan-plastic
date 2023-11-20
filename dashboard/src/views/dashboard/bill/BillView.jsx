import React, { useState, useEffect,useRef } from "react";
import { Link, useNavigate,useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ReactPrint from 'react-to-print'
import {BiSolidPrinter} from 'react-icons/bi'
// import numwords from 'num-words'
import {messageClear, bill_products_get, bill_view_by_id,customer_due} from "../../../store/reducers/billReducer";

import moment from "moment";

const BillView = () => {

  const numWords = require('num-words')
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { billId } = useParams()
  const ref = useRef()
  const { billViewInfo,billDetailProduct,billTotalAmount,billAmount,collectionAmount} =useSelector((state) => state.bill);
  const { userInfo } = useSelector((state) => state.auth);

  const [vat,setVat] = useState(0)
  const [due,setDue] = useState(0)

useEffect(()=>{
dispatch(bill_view_by_id(billId))
},[billId])
const totalBill = billTotalAmount.length>0 ? billTotalAmount[0].totalAmount: 0
const customerCollectionTotal = collectionAmount.length>0 ? collectionAmount[0].totalCollectionAmount : 0
const customerBillAmount = billAmount.length>0 ? billAmount[0].totalBillAmount : 0
const customerDue =  customerBillAmount - customerCollectionTotal

const totalVat = totalBill * 0.05
const totalDue =  parseFloat(totalBill + vat + due)


const handleDueCheckbox = (e)=>{
    if(e.target.checked){
      dispatch(customer_due(billViewInfo[0]?.customer[0]?._id))
      setDue(customerDue)
    } else{
      setDue(0)
    }
  }
  
  useEffect(()=>{
    setDue(customerDue)
  },[customerDue])

// console.log(vatValue)
const handleVatCheckbox = (e)=>{
  if(e.target.checked){
      setVat(totalVat)
  }else{
    setVat(0)
  }
}
  return (
    <div className="px-2 py-2">
      <div className="flex flex-wrap w-full mt-[-28px]">
        <div className="bg-[#B9BFCB] w-[75%] mx-auto">
       <div className='text-right'>
       <ReactPrint trigger={()=> <button className='bg-[#A8AEBC] p-1 px-3 text-green-900 flex items-center gap-1 rounded-md text-xs ml-[300px] mt-5'><BiSolidPrinter/> Preview</button>} content={()=>ref.current}/>
       </div>
          <div ref={ref} className="w-full p-2 bg-[#B9BFCB] min-h-[950px]">
            <div className="bg-[#A8AEBC] text-black text-sm w-[92%] py-[6px] mx-auto text-center mt-[25px]">
              <p className="text-2xl font-bold pb-1">
                Methan Plastic Industries             
              </p>
              <p className="text-xs">
                World Class PET & HDPE Bottle Manufacturer
              </p>
            </div>
            <div className="my-[18px]">
              <div className="flex mx-auto bg-[#3f485c] text-white font-bold items-center justify-center rounded-md w-[80px] text-sm py-[2px]">
                Bill
              </div>
            </div>
            <div className="w-[92%] mx-auto flex md:flex-row gap-1 justify-between text-center bg-[#B9BFCB] py-2 mb-[30px]">
              <div className="text-black font-normal text-xs">
                <table class="border-collapse border border-black-400 bg-[#B9BFCB] w-[300px]">
                  <tbody>
                    <tr>
                      <td class="border border-black text-start pl-[7px]">Client Id</td>
                      <td class="border border-black text-start pl-[7px]">{billViewInfo[0]?.customer[0]?.cus_id}</td>
                    </tr>
                    <tr>
                      <td class="border border-black text-start pl-[7px]">Name</td>
                      <td class="border border-black text-start pl-[7px]">{billViewInfo[0]?.customer[0]?.cus_company}</td>
                    </tr>
                    <tr>
                      <td class="border border-black text-start pl-[7px]">Address</td>
                      <td class="border border-black text-start pl-[7px]">{billViewInfo[0]?.customer[0]?.city},{billViewInfo[0]?.customer[0]?.district},{billViewInfo[0]?.customer[0]?.contact_number}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="text-black font-norma text-xs">
                <table className="border-collapse border border-black bg-[#B9BFCB] w-[200px]">
                  <tbody>
                    <tr>
                      <td className="border border-black text-start pl-[7px]">Date:</td>
                      <td className="border border-black text-start pl-[7px]">{moment(`${billViewInfo[0]?.bill_date}`).format('LL')}</td>
                    </tr>
                    <tr>
                      <td className="border border-black text-start pl-[7px]">Bill No:</td>
                      <td className="border border-black text-start pl-[7px]">{billViewInfo[0]?.bill_number}</td>
                    </tr>
                    <tr>
                      <td className="border border-black text-start pl-[7px]">P.W.O No</td>
                      <td className="border border-black text-start pl-[7px]"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="text-black font-normal text-xs w-[92%] mx-auto min-h-[250px] mt-5">
              <table className="border-collapse bg-[#B9BFCB] w-full">
                <thead>
                  <tr>
                    <th className="border border-black">SL#</th>
                    <th className="border border-black">P.Code</th>
                    <th className="border border-black w-[200px]">Product Name</th>
                    <th className="border border-black">Qty</th>
                    <th className="border border-black">Unit Price</th>
                    <th className="border border-black">Total Amount</th>
                  
                  </tr>
                </thead>
                <tbody>
                 {
                      billDetailProduct && billDetailProduct.map((p,i) => <tr key={i}>
                      <td className="border border-black text-center">{i+1}</td>
                      <td className="border border-black text-center">{p.product_code}</td>
                      <td className="border border-black text-start pl-[7px]">{p.product_name}</td>
                      <td className="border border-black text-center">{p.product_qty}</td>
                      <td className="border border-black text-center">{p.product_price.toFixed(2)}</td>
                      <td className="border border-black text-center">{p.product_total.toFixed(2)}</td>
                    </tr>

                    )

                 }
                  <tr className="border border-black text-center"><td></td><td></td><td></td><td></td><td>Total Taka: </td><td className='border border-black'>{parseFloat(totalBill).toFixed(2)}</td></tr>

                  <tr><td></td><td></td><td className='text-right'>VAT</td><td><input onChange={handleVatCheckbox} className='bg-[#B9BFCB]' type="checkbox" /></td><td className='border border-black text-center'>VAT</td><td className='border border-black text-center'>{parseFloat(vat).toFixed(2)}</td></tr>

                  <tr><td></td><td></td><td className='text-right'>add Due</td><td className='col-span-3'><input onChange={handleDueCheckbox} type="checkbox" /></td><td className='border border-black text-center'>Previous Due:</td><td className='border border-black text-center'>{parseFloat(due).toFixed(2)}</td></tr>

                  <tr><td></td><td></td><td></td><td></td><td className='border border-black text-center'>Total Due:</td><td className='border border-black text-center'>{ totalDue.toFixed(2) }</td></tr>
                </tbody>
              
              </table>
              <div className="flex w-[100%] mx-auto p-2 mt-[25px] bg-[#A8AEBC] font-semibold">
            <p>In word: {numWords(Math.floor(totalDue))}</p>
            </div>


            </div>
              <div className='flex w-[92%] mx-auto text-xs mt-[60px] justify-between items-center'>
              <div className='flex flex-col text-center'>
                <hr className='border border-black w-[100px]'/>
                Received By
              </div>
              <div className='flex flex-col text-center'>
                <hr className='border border-black w-[100px]'/>
                Store Officer
              </div>
              <div className='flex flex-col text-center'>
                <hr className='border border-black w-[100px]'/>
                Approved By
              </div>

              </div>
              <div className='flex flex-col w-[92%] mx-auto bg-[#333] text-white p-2 mt-[30px]'>
                <p className='text-xs text-center'>Bevage (4 miles), Barulpara, Mirpur, Kushtia,Mobile-01711-170782, 01929-603970 </p>
                <p className='text-xs text-center'>Email: qjaman@gmail.com</p>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillView;
