import React from "react";
import { Link } from "react-router-dom";
import { BsCurrencyDollar } from "react-icons/bs";
import { RiProductHuntLine } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";

const Report = () => {
  
  return (
    <div className="px-2 py-5 md:px-7">
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7 mb-4">
      <div className="flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3">
        <div className="flex flex-col text-[#d0d2d6] justify-start items-start">

          <span className="text-xs font-medium"><Link to="/admin/dashboard/material-receive-report" className='py-1 mr-2 cursor-pointer font-bold'>Receive Report</Link></span>
        </div>
        <div className="flex w-[38px] h-[39px] rounded-full justify-center items-center bg-[#28c76f1f] text-xl">
          <BsCurrencyDollar className="text-[#28c76f] drop-shadow-lg" />
        </div>
      </div>
      <div className="flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3">
        <div className="flex flex-col text-[#d0d2d6] justify-start items-start">
    
          <span className="text-xs font-medium"><Link to="/admin/dashboard/challan-report" className='py-1 mr-2 cursor-pointer font-bold'>Challan Report</Link></span>
        </div>
        <div className="flex w-[38px] h-[39px] rounded-full justify-center items-center bg-[#e000e81f] text-xl">
          <RiProductHuntLine className="text-[#cd00e8] shadow-lg" />
        </div>
      </div>
      <div className="flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3">
        <div className="flex flex-col text-[#d0d2d6] justify-start items-start">

          <span className="text-xs font-medium"><Link to="/admin/dashboard/gp-report" className='py-2 mr-2 cursor-pointer font-bold'>Gate Pass Report</Link></span>
        </div>
        <div className="flex w-[38px] h-[39px] rounded-full justify-center items-center bg-[#00cfe81f] text-xl">
          <FaUsers className="text-[#00cfe8] shadow-lg" />
        </div>
      </div>
      <div className="flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3">
        <div className="flex flex-col text-[#d0d2d6] justify-start items-start">

          <span className="text-xs font-medium"><Link to="/admin/dashboard/payment-report" className='py-2 mr-2 cursor-pointer font-bold'>Payment Report</Link></span>
        </div>
        <div className="flex w-[38px] h-[39px] rounded-full justify-center items-center bg-[#7367f01f] text-xl">
          <AiOutlineShoppingCart className="text-[#7367f0] shadow-lg" />
        </div>
      </div>
    </div>
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7 mb-4">
      <div className="flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3">
        <div className="flex flex-col text-[#d0d2d6] justify-start items-start">

          <span className="text-xs font-medium"> <Link to="/admin/dashboard/expenses-report" className='py-2 mr-2 cursor-pointer font-bold'>Expense Report</Link></span>
        </div>
        <div className="flex w-[38px] h-[39px] rounded-full justify-center items-center bg-[#28c76f1f] text-xl">
          <BsCurrencyDollar className="text-[#28c76f] drop-shadow-lg" />
        </div>
      </div>
      <div className="flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3">
        <div className="flex flex-col text-[#d0d2d6] justify-start items-start">
    
          <span className="text-xs font-medium"> <Link to="/admin/dashboard/collection-report" className='py-2 mr-2 cursor-pointer font-bold'>Collection Report</Link></span>
        </div>
        <div className="flex w-[38px] h-[39px] rounded-full justify-center items-center bg-[#e000e81f] text-xl">
          <RiProductHuntLine className="text-[#cd00e8] shadow-lg" />
        </div>
      </div>
      <div className="flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3">
        <div className="flex flex-col text-[#d0d2d6] justify-start items-start">

          <span className="text-xs font-medium"> <Link to="/admin/dashboard/production-report" className='py-2 mr-2 cursor-pointer font-bold'>Production Report</Link></span>
        </div>
        <div className="flex w-[38px] h-[39px] rounded-full justify-center items-center bg-[#00cfe81f] text-xl">
          <FaUsers className="text-[#00cfe8] shadow-lg" />
        </div>
      </div>
      <div className="flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3">
        <div className="flex flex-col text-[#d0d2d6] justify-start items-start">
          <span className="text-xs font-medium"><Link to="/admin/dashboard/material-stock-report" className='py-2 mr-2 cursor-pointer font-bold'>Material Stock Report</Link></span>
        </div>
        <div className="flex w-[38px] h-[39px] rounded-full justify-center items-center bg-[#7367f01f] text-xl">
          <AiOutlineShoppingCart className="text-[#7367f0] shadow-lg" />
        </div>
      </div>
    </div>
  

    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7 mb-4">
      <div className="flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3">
        <div className="flex flex-col text-[#d0d2d6] justify-start items-start">

          <span className="text-xs font-medium"><Link to="/admin/dashboard/product-stock-report" className='py-2 mr-2 cursor-pointer font-bold'>Product Stock Report</Link></span>
        </div>
        <div className="flex w-[38px] h-[39px] rounded-full justify-center items-center bg-[#28c76f1f] text-xl">
          <BsCurrencyDollar className="text-[#28c76f] drop-shadow-lg" />
        </div>
      </div>
    </div>


  </div>
   

  );
};

export default Report;
