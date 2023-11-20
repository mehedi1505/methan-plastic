import React, { useState, useEffect,useRef } from "react";
import { Link, useNavigate,useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ReactPrint from 'react-to-print'
import {BiSolidPrinter} from 'react-icons/bi'
// import numwords from 'num-words'
import {
  messageClear,
  pay_slip_view_by_id
} from "../../../store/reducers/payrollReducer";

import moment from "moment";

const PaySlipView = () => {
  const numWords = require('num-words')
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {paySlipId} = useParams()
  const ref = useRef()
  const { paySlipInfo} =useSelector((state) => state.payroll);
  const { userInfo } = useSelector((state) => state.auth);


useEffect(()=>{
dispatch(pay_slip_view_by_id(paySlipId))
},[paySlipId])

const total_Earn = paySlipInfo.basic_salary + paySlipInfo.house_rent + paySlipInfo.dearness_allowance + paySlipInfo.medical_allowance
const total_deduction = paySlipInfo.provident_fund + paySlipInfo.tax + paySlipInfo.loan + paySlipInfo.penalty
const net_pay = Math.floor(total_Earn - total_deduction)

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
              Bevage (4 miles), Barulpara, Mirpur, Kushtia
              </p>
            </div>
            <div className="my-[30px]">
              <div className="flex mx-auto bg-[#3f485c] text-white items-center justify-center rounded-md w-[120px] text-sm py-[2px]">
                Salary Pay Slip
              </div>
            </div>

            <div className="flex my-5 w-[92%] mx-auto">
               <div className='w-[50%]'>
               <div className='flex'><h1 className='font-bold text-sm'>EMP ID:</h1><span className='pl-2 text-sm'>{paySlipInfo.emp_id}</span></div>
               <div className='flex'><h1 className='font-bold text-sm'>EMP Name:</h1><span className='pl-2 text-sm'>{paySlipInfo.emp_name}</span></div>
               <div className='flex'><h1 className='font-bold text-sm'>Department:</h1><span className='pl-2 text-sm'>{paySlipInfo.department}</span></div>

               </div>
               <div className='w-[50%]'>
               <div className='flex'><h1 className='font-bold text-sm'>Designation:</h1><span className='pl-2 text-sm'>{paySlipInfo.designation}</span></div>
               <div className='flex'><h1 className='font-bold text-sm'>Salary Period:</h1><span className='pl-2 text-sm'>{paySlipInfo.pay_period}</span></div>
               <div className='flex'><h1 className='font-bold text-sm'>Pay Mode:</h1><span className='pl-2 text-sm'>{paySlipInfo.salary_paid_by}</span></div>
               </div>
            </div>
            
            <div className="text-black font-normal text-xs w-[92%] mx-auto min-h-[250px] mt-5">
              <table class="border-collapse bg-[#B9BFCB] w-full">   
                <thead>
                <tr className='min-h-[120px]'>
                    <th class="border border-black w-[25%]">Earning</th>
                    <th class="border border-black w-[25%]">Amount</th>
                    <th class="border border-black w-[25%]">Deduction</th>
                    <th class="border border-black w-[25%]">Amount</th>                  
                  </tr>
                </thead>          
                <tbody>               
                    <tr>
                      <td class="border border-black text-center font-bold">Basic</td>
                      <td class="border border-black text-center">{paySlipInfo.basic_salary}</td>
                      <td class="border border-black text-center font-bold">PF</td>
                      <td class="border border-black text-center">{paySlipInfo.provident_fund}</td>
                    </tr>
                    <tr>
                      <td class="border border-black text-center font-bold">HRA</td>
                      <td class="border border-black text-center">{paySlipInfo.house_rent}</td>
                      <td class="border border-black text-center font-bold">Loan</td>
                      <td class="border border-black text-center">{paySlipInfo.loan}</td>
                    </tr>
                    <tr>
                      <td class="border border-black text-center font-bold">D/A</td>
                      <td class="border border-black text-center">{paySlipInfo.dearness_allowance}</td>
                      <td class="border border-black text-center font-bold">Penalty</td>
                      <td class="border border-black text-center">{paySlipInfo.penalty}</td>
                    </tr>
                    <tr>
                      <td class="border border-black text-center font-bold">M/A</td>
                      <td class="border border-black text-center">{paySlipInfo.medical_allowance}</td>
                      <td class="border border-black text-center font-bold">Tax</td>
                      <td class="border border-black text-center">{paySlipInfo.tax}</td>
                    </tr>
                    <tr className='bg-[#9b9292]'>
                      <td class="border border-black text-center font-bold">Total Earn</td>
                      <td class="border border-black text-center">{total_Earn}</td>
                      <td class="border border-black text-center font-bold">Total Deduct</td>
                      <td class="border border-black text-center">{total_deduction}</td>
                    </tr>
                   
                </tbody>
              
              </table>
            <div className='mt-5 font-bold'>
                Net Pay : {net_pay.toFixed(2)}
            </div>
            <div className="flex w-[100%] mx-auto p-2 mt-[60px] bg-[#A8AEBC] font-semibold">
            <p>In word: {numWords(net_pay)}</p>
            </div>
            </div>
              <div className='flex w-[92%] mx-auto text-xs mt-[90px] justify-between items-center'>
              <div className='flex flex-col text-center'>
                <hr className='border border-black w-[100px]'/>
                EMP Signature
              </div>
            
              <div className='flex flex-col text-center'>
                <hr className='border border-black w-[100px]'/>
                A/C Signature
              </div>

              </div>
              <div className='flex flex-col w-[92%] mx-auto bg-[#333] text-white p-2 mt-[120px]'>
                <p className='text-xs text-center'>Bevage (4 miles), Barulpara, Mirpur, Kushtia,Mobile-01711-170782, 01929-603970 </p>
                <p className='text-xs text-center'>Email: qjaman@gmail.com</p>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaySlipView;
