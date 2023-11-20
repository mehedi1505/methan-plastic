import React from "react";
import { Link } from "react-router-dom";
import { BsCurrencyDollar } from "react-icons/bs";
import { RiProductHuntLine } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
const Options = () => {
  
  return (
    <div className="px-2 py-5 md:px-7">
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7 mb-4">
      <div className="flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3">
        <div className="flex flex-col text-[#d0d2d6] justify-start items-start">

          <span className="text-xs font-medium"><Link to="/admin/dashboard/item-category" className='py-1 mr-2 cursor-pointer font-bold'>Manage Category</Link></span>
        </div>
        <div className="flex w-[38px] h-[39px] rounded-full justify-center items-center bg-[#28c76f1f] text-xl">
          <BsCurrencyDollar className="text-[#28c76f] drop-shadow-lg" />
        </div>
      </div>
      <div className="flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3">
        <div className="flex flex-col text-[#d0d2d6] justify-start items-start">
    
          <span className="text-xs font-medium"><Link to="/admin/dashboard/item-group" className='py-1 mr-2 cursor-pointer font-bold'>Manage Group</Link></span>
        </div>
        <div className="flex w-[38px] h-[39px] rounded-full justify-center items-center bg-[#e000e81f] text-xl">
          <RiProductHuntLine className="text-[#cd00e8] shadow-lg" />
        </div>
      </div>
      <div className="flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3">
        <div className="flex flex-col text-[#d0d2d6] justify-start items-start">

          <span className="text-xs font-medium"><Link to="/admin/dashboard/item-unit" className='py-2 mr-2 cursor-pointer font-bold'>Manage Unit</Link></span>
        </div>
        <div className="flex w-[38px] h-[39px] rounded-full justify-center items-center bg-[#00cfe81f] text-xl">
          <FaUsers className="text-[#00cfe8] shadow-lg" />
        </div>
      </div>
      <div className="flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3">
        <div className="flex flex-col text-[#d0d2d6] justify-start items-start">

          <span className="text-xs font-medium"><Link to="/admin/dashboard/customer/add" className='py-2 mr-2 cursor-pointer font-bold'>Customer</Link></span>
        </div>
        <div className="flex w-[38px] h-[39px] rounded-full justify-center items-center bg-[#7367f01f] text-xl">
          <AiOutlineShoppingCart className="text-[#7367f0] shadow-lg" />
        </div>
      </div>
    </div>
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7 mb-4">
      <div className="flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3">
        <div className="flex flex-col text-[#d0d2d6] justify-start items-start">

          <span className="text-xs font-medium"> <Link to="/admin/dashboard/vendor/add" className='py-2 mr-2 cursor-pointer font-bold'>Vendor</Link></span>
        </div>
        <div className="flex w-[38px] h-[39px] rounded-full justify-center items-center bg-[#28c76f1f] text-xl">
          <BsCurrencyDollar className="text-[#28c76f] drop-shadow-lg" />
        </div>
      </div>
      <div className="flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3">
        <div className="flex flex-col text-[#d0d2d6] justify-start items-start">
    
          <span className="text-xs font-medium"> <Link to="/admin/dashboard/gate-pass-type" className='py-2 mr-2 cursor-pointer font-bold'>Gate pass Type</Link></span>
        </div>
        <div className="flex w-[38px] h-[39px] rounded-full justify-center items-center bg-[#e000e81f] text-xl">
          <RiProductHuntLine className="text-[#cd00e8] shadow-lg" />
        </div>
      </div>
      <div className="flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3">
        <div className="flex flex-col text-[#d0d2d6] justify-start items-start">

          <span className="text-xs font-medium"> <Link to="/admin/dashboard/gate-pass-list" className='py-2 mr-2 cursor-pointer font-bold'>Gate pass</Link></span>
        </div>
        <div className="flex w-[38px] h-[39px] rounded-full justify-center items-center bg-[#00cfe81f] text-xl">
          <FaUsers className="text-[#00cfe8] shadow-lg" />
        </div>
      </div>
      <div className="flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3">
        <div className="flex flex-col text-[#d0d2d6] justify-start items-start">
          <span className="text-xs font-medium"><Link to="/admin/dashboard/term" className='py-2 mr-2 cursor-pointer font-bold'>Manage Term</Link></span>
        </div>
        <div className="flex w-[38px] h-[39px] rounded-full justify-center items-center bg-[#7367f01f] text-xl">
          <AiOutlineShoppingCart className="text-[#7367f0] shadow-lg" />
        </div>
      </div>
    </div>
  

    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7 mb-4">
      <div className="flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3">
        <div className="flex flex-col text-[#d0d2d6] justify-start items-start">

          <span className="text-xs font-medium"><Link to="/admin/dashboard/receive-type" className='py-2 mr-2 cursor-pointer font-bold'>Receive Type</Link></span>
        </div>
        <div className="flex w-[38px] h-[39px] rounded-full justify-center items-center bg-[#28c76f1f] text-xl">
          <BsCurrencyDollar className="text-[#28c76f] drop-shadow-lg" />
        </div>
      </div>
      <div className="flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3">
        <div className="flex flex-col text-[#d0d2d6] justify-start items-start">
    
          <span className="text-xs font-medium"> <Link to="#" className='py-2 mr-2 cursor-pointer font-bold'>Stock Adjustment</Link></span>
        </div>
        <div className="flex w-[38px] h-[39px] rounded-full justify-center items-center bg-[#e000e81f] text-xl">
          <RiProductHuntLine className="text-[#cd00e8] shadow-lg" />
        </div>
      </div>
      <div className="flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3">
        <div className="flex flex-col text-[#d0d2d6] justify-start items-start">

          <span className="text-xs font-medium"> <Link to="/admin/dashboard/agent" className='py-2 mr-2 cursor-pointer font-bold'>Agent</Link></span>
        </div>
        <div className="flex w-[38px] h-[39px] rounded-full justify-center items-center bg-[#00cfe81f] text-xl">
          <FaUsers className="text-[#00cfe8] shadow-lg" />
        </div>
      </div>
      <div className="flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3">
        <div className="flex flex-col text-[#d0d2d6] justify-start items-start">
          <span className="text-xs font-medium"><Link to="/admin/dashboard/payment-mode" className='py-2 mr-2 cursor-pointer font-bold'>Payment Mode</Link></span>
        </div>
        <div className="flex w-[38px] h-[39px] rounded-full justify-center items-center bg-[#7367f01f] text-xl">
          <AiOutlineShoppingCart className="text-[#7367f0] shadow-lg" />
        </div>
      </div>
    </div>

    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7 mb-4">
      <div className="flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3">
        <div className="flex flex-col text-[#d0d2d6] justify-start items-start">

          <span className="text-xs font-medium"> <Link to="/admin/dashboard/expense-category" className='py-2 mr-2 cursor-pointer font-bold'>Expense Category</Link></span>
        </div>
        <div className="flex w-[38px] h-[39px] rounded-full justify-center items-center bg-[#28c76f1f] text-xl">
          <BsCurrencyDollar className="text-[#28c76f] drop-shadow-lg" />
        </div>
      </div>

  
    </div>


  </div>
   

  );
};

export default Options;
