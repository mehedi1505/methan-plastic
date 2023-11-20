import React, { useState, useEffect,useRef } from "react";
import { Link, useNavigate,useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ReactPrint from 'react-to-print'
import {BiSolidPrinter} from 'react-icons/bi'
// import numwords from 'num-words'
import {
  messageClear,
  invoice_products_get,
  invoice_delete,
  invoice_view_by_id
} from "../../../store/reducers/invoiceReducer";

import moment from "moment";

const InvoiceView = () => {
  const numWords = require('num-words')
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {invoiceId} = useParams()
  const ref = useRef()
  const { invoiceViewInfo,invoiceTotalAmount,invoiceProduct} =useSelector((state) => state.invoice);
  const { userInfo } = useSelector((state) => state.auth);

  const [vat,setVat] = useState('')
  const [due,setDue] = useState('')

useEffect(()=>{
dispatch(invoice_view_by_id(invoiceId))
},[invoiceId])


  return (
    <div className="px-2 py-2">
      <div className="flex flex-wrap w-full mt-[-28px]">
        <div className="bg-[#B9BFCB] w-[75%] mx-auto">
       <div className='bg-[#B9BFCB] text-right'>
       <ReactPrint trigger={()=> <button className='bg-[#A8AEBC] p-1 px-3 text-green-900 flex items-center gap-1 rounded-md text-xs ml-[300px] mt-5'><BiSolidPrinter/> Preview</button>} content={()=>ref.current}/>
       </div>
          <div ref={ref} className="w-full p-3 bg-[#B9BFCB] min-h-[900px]">
            <div className="bg-[#A8AEBC] text-black text-sm w-[92%] py-[6px] mx-auto text-center mt-[25px]">
              <p className="text-2xl font-bold pb-1">
                Methan Plastic Industries             
              </p>
              <p className="text-xs">
                World Class PET & HDPE Bottle Manufacturer
              </p>
            </div>
            <div className="my-[18px]">
              <div className="flex mx-auto bg-[#3f485c] text-white items-center justify-center rounded-md w-[80px] text-sm py-[2px]">
                Challan
              </div>
            </div>
            <div className="w-[92%] mx-auto flex justify-between text-center bg-[#B9BFCB] py-2 mb-[50px]">
              <div className="text-black font-normal text-xs">
                <table class="border-collapse border border-black-400 bg-[#B9BFCB] w-[330px]">
                  <tbody>
                    <tr>
                      <td class="border border-black text-start pl-[7px]">Client Id</td>
                      <td class="border border-black text-start pl-[7px]">{invoiceViewInfo[0]?.customer[0]?.cus_id}</td>
                    </tr>
                    <tr>
                      <td class="border border-black text-start pl-[7px]">Name</td>
                      <td class="border border-black text-start pl-[7px]">{invoiceViewInfo[0]?.customer[0]?.cus_company}</td>
                    </tr>
                    <tr>
                      <td class="border border-black text-start pl-[7px]">Address</td>
                      <td class="border border-black text-start pl-[7px]">{invoiceViewInfo[0]?.customer[0]?.city},{invoiceViewInfo[0]?.customer[0]?.district},{invoiceViewInfo[0]?.customer[0]?.contact_number}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="text-black font-norma text-xs">
                <table class="border-collapse border border-black bg-[#B9BFCB] w-[190px]">
                  <tbody>
                    <tr>
                      <td class="border border-black text-start pl-[7px]">Date:</td>
                      <td class="border border-black text-start pl-[7px]">{moment(`${invoiceViewInfo[0]?.invoice_date}`).format('LL')}</td>
                    </tr>
                    <tr>
                      <td class="border border-black text-start pl-[7px]">Bill No:</td>
                      <td class="border border-black text-start pl-[7px]"></td>
                    </tr>
                    <tr>
                      <td class="border border-black text-start pl-[7px]">p.w.o no</td>
                      <td class="border border-black text-start pl-[7px]"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="text-black font-normal text-xs w-[92%] mx-auto min-h-[150px] mt-5">
              <table class="border-collapse bg-[#B9BFCB] w-full">
                <thead>
                  <tr className='min-h-[120px]'>
                    <th class="border border-black w-[10%]">SL#</th>
                    <th class="border border-black w-[20%]">P.Code</th>
                    <th class="border border-black w-[50%]">Product Name</th>
                    <th class="border border-black w-[20%]">Qty</th>
                  
                  </tr>
                </thead>
                <tbody>
                 {
                      invoiceProduct && invoiceProduct.map((p,i)=>  <tr key={i}>
                      <td class="border border-black text-center">{i+1}</td>
                      <td class="border border-black text-center">{p.product_code}</td>
                      <td class="border border-black text-start pl-[7px]">{p.product_name}</td>
                      <td class="border border-black text-center">{p.product_qty}</td>
                    </tr>

                    )

                 }

                </tbody>
              
              </table>


            </div>
              <div className='flex w-[92%] mx-auto text-xs mt-[30px] justify-between items-center'>
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
              <div className='flex flex-col w-[92%] mx-auto bg-[#333] text-white p-2 mt-[80px]'>
                <p className='text-xs text-center'>Bevage (4 miles), Barulpara, Mirpur, Kushtia,Mobile-01711-170782, 01929-603970 </p>
                <p className='text-xs text-center'>Email: qjaman@gmail.com</p>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceView;
