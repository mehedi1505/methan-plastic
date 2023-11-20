import React from "react";
import { Link } from "react-router-dom";
import { BsCurrencyDollar } from "react-icons/bs";
import { RiProductHuntLine } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
const Assets = () => {
  
  return (
    <div className="px-2 py-5 md:px-7">
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7 mb-4">
      <div className="flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3">
        <div className="flex flex-col text-[#d0d2d6] justify-start items-start">

          <span className="text-xs font-medium"><Link to="/admin/dashboard/asset-type" className='py-1 mr-2 cursor-pointer font-bold'>Asset Type</Link></span>
        </div>
        <div className="flex w-[38px] h-[39px] rounded-full justify-center items-center bg-[#28c76f1f] text-xl">
          <BsCurrencyDollar className="text-[#28c76f] drop-shadow-lg" />
        </div>
      </div>
      <div className="flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3">
        <div className="flex flex-col text-[#d0d2d6] justify-start items-start">
    
          <span className="text-xs font-medium"><Link to="/admin/dashboard/asset-register" className='py-1 mr-2 cursor-pointer font-bold'>Asset Register</Link></span>
        </div>
        <div className="flex w-[38px] h-[39px] rounded-full justify-center items-center bg-[#e000e81f] text-xl">
          <RiProductHuntLine className="text-[#cd00e8] shadow-lg" />
        </div>
      </div>
      <div className="flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3">
        <div className="flex flex-col text-[#d0d2d6] justify-start items-start">

          <span className="text-xs font-medium"><Link to="/admin/dashboard/asset-revalue" className='py-2 mr-2 cursor-pointer font-bold'>Asset Revalue</Link></span>
        </div>
        <div className="flex w-[38px] h-[39px] rounded-full justify-center items-center bg-[#00cfe81f] text-xl">
          <FaUsers className="text-[#00cfe8] shadow-lg" />
        </div>
      </div>
      <div className="flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3">
        <div className="flex flex-col text-[#d0d2d6] justify-start items-start">

          <span className="text-xs font-medium"><Link to="/admin/dashboard/asset-closure" className='py-2 mr-2 cursor-pointer font-bold'>Asset Closure</Link></span>
        </div>
        <div className="flex w-[38px] h-[39px] rounded-full justify-center items-center bg-[#7367f01f] text-xl">
          <AiOutlineShoppingCart className="text-[#7367f0] shadow-lg" />
        </div>
      </div>
    </div>

    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7 mb-4">
      <div className="flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3">
        <div className="flex flex-col text-[#d0d2d6] justify-start items-start">

          <span className="text-xs font-medium"> <Link to="/admin/dashboard/asset-depreciation" className='py-2 mr-2 cursor-pointer font-bold'>Asset Depreciation</Link></span>
        </div>
        <div className="flex w-[38px] h-[39px] rounded-full justify-center items-center bg-[#28c76f1f] text-xl">
          <BsCurrencyDollar className="text-[#28c76f] drop-shadow-lg" />
        </div>
      </div> 
    </div>
  </div>
  );
};

export default Assets;
