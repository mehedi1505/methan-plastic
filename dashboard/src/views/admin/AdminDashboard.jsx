import React, { useState,useEffect, forwardRef } from "react";
import { Link } from "react-router-dom";
import { BsCurrencyDollar } from "react-icons/bs";
import { RiProductHuntLine } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Chart from "react-apexcharts";
import {order_products_get,total_sales} from '../../store/reducers/orderReducer'
import {FixedSizeList as List} from 'react-window'
import {useDispatch, useSelector} from 'react-redux'
import moment from 'moment';
function handleOnWheel({deltaY}){
  console.log('handleOnWheel',deltaY)
  }
  const outerElementType = forwardRef((props,ref)=>(
    <div ref={ref} onWheel={handleOnWheel} {...props} />
  ))
  
const AdminDashboard = () => {
  const dispatch = useDispatch()

  const { orderProducts,totalOrder,totalSales,todaySales} = useSelector(state=>state.order)
  const [searchValue, setSearchValue] = useState("");

  const [load,setLoad] =  useState(1)

// useEffect(()=>{
//   if(load === 1){
//     window.onload = ()=> window.location.reload()
//     setLoad(0)
//   }
// },[])
console.log(load)
  useEffect(()=>{
    dispatch(order_products_get({searchValue}))
    // window.onload = ()=> window.location.reload()
  },[])
  


  useEffect(()=>{
    dispatch(total_sales())
  },[])

  // useEffect(()=>{
  //   dispatch(today_sales())
  // },[])

  const state = {
    series: [
      {
        name: "Orders",
        data: [50, 33, 56, 52, 14, 25, 36, 45, 51, 35, 42, 32],
      },
      {
        name: "Revenue",
        data: [40, 33, 46, 52, 14, 45, 36, 45, 18, 35, 42, 22],
      },
      {
        name: "Sellers",
        data: [78, 35, 46, 52, 60, 45, 66, 75, 18, 65, 42, 62],
      },
    ],
    options: {
      color: ["#181ee8", "#181ee8"],
      plotOptions: {
        radius: 30,
      },
      chart: {
        background: "transparent",
        foreColor: "#d0d2d6",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        curve: ["smooth", "straight", "stepline"],
        lineCap: "butt",
        colors: "#f0f0f0",
        width: 0.5,
        dashArray: 0,
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      legend: {
        position: "top",
      },
      responsive: [
        {
          breakpoint: 565,
          yaxis: {
            categories: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ],
          },
          options: {
            plotOptions: {
              bar: {
                horizontal: true,
              },
            },
            chart: {
              height: "550px",
            },
          },
        },
      ],
    },
  };
  function AllRows({ index, style }) {
    return <div style={style} className='flex text-sm text-center items-center'>
      <div className='w-[10%] p-2 whitespace-nowrap'>{index + 1}</div>
      <div className='w-[30%] p-2 whitespace-nowrap text-xs'>{moment(`${orderProducts[index]?.order_date}`).format('LL')}</div>
      <div className='w-[30%] p-2 whitespace-nowrap text-xs'>{moment(`${orderProducts[index]?.delivery_date}`).format('LL')}</div>
      <div className='w-[20%] p-2 whitespace-nowrap text-xs'>{`${orderProducts[index]?.order_number}`}</div>
      <div className='w-[25%] p-2 whitespace-nowrap text-xs'>{`${orderProducts[index]?.customer[0]?.cus_company}`}</div>
      <div className='w-[25%] p-2 whitespace-nowrap text-xs'>{`${orderProducts[index]?.status}`}</div>
    </div>;
  } 
  return (

    <div className="px-2 py-5 md:px-7">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7">
        <div className="flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3">
          <div className="flex flex-col text-[#d0d2d6] justify-start items-start">
            <h2 className="text-sm font-bold">{totalSales.length>0?totalSales[0].totalAmount : 0}</h2>
            <span className="text-xs font-medium">Total Sales</span>
          </div>
          <div className="flex w-[38px] h-[39px] rounded-full justify-center items-center bg-[#28c76f1f] text-xl">
            <BsCurrencyDollar className="text-[#28c76f] drop-shadow-lg" />
          </div>
        </div>
        <div className="flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3">
          <div className="flex flex-col text-[#d0d2d6] justify-start items-start">
            <h2 className="text-sm font-bold">1250</h2>
            <span className="text-xs font-medium">Today sale</span>
          </div>
          <div className="flex w-[38px] h-[39px] rounded-full justify-center items-center bg-[#e000e81f] text-xl">
            <RiProductHuntLine className="text-[#cd00e8] shadow-lg" />
          </div>
        </div>
        <div className="flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3">
          <div className="flex flex-col text-[#d0d2d6] justify-start items-start">
            <h2 className="text-sm font-bold">1750</h2>
            <span className="text-xs font-medium">Today Production</span>
          </div>
          <div className="flex w-[38px] h-[39px] rounded-full justify-center items-center bg-[#00cfe81f] text-xl">
            <FaUsers className="text-[#00cfe8] shadow-lg" />
          </div>
        </div>
        <div className="flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3">
          <div className="flex flex-col text-[#d0d2d6] justify-start items-start">
            <h2 className="text-sm font-bold">{totalOrder}</h2>
            <span className="text-xs font-medium">Orders</span>
          </div>
          <div className="flex w-[38px] h-[39px] rounded-full justify-center items-center bg-[#7367f01f] text-xl">
            <AiOutlineShoppingCart className="text-[#7367f0] shadow-lg" />
          </div>
        </div>
      </div>

      <div className="w-full flex flex-wrap mt-7">
        <div className="w-full lg:w-12/12 lg:pr-3">
          <div className="w-full bg-[#283046] p-4 rounded-md">
            <Chart
              options={state.options}
              series={state.series}
              type="bar"
              height={350}
            />
          </div>
        </div>
   
      </div>

      <div className="w-full p-4 bg-[#283046] rounded-md mt-6">
          <div className='flex justify-between items-center'>
              <h2 className="pl-2 font-semibold text-[14px] text-[#d0d2d6]">
                Total Order: {totalOrder}
              </h2>
          </div>
          <div className='relative overflow-x-auto'>
          <div className="w-full p-2 bg-[#283046] rounded-md">
              <div className='w-full overflow-x-auto mt-[8px] border border-slate-700'>
                    <div className='flex bg-[#313d5e] uppercase font-bold text-center text-xs min-w-[340px] text-white'>
                        <div className='w-[10%] p-2 text-xs'>Sl#</div>
                        <div className='w-[30%] p-2 text-xs'>Order Date</div>
                        <div className='w-[30%] p-2 text-xs'>Delivery Date</div>
                        <div className='w-[20%] p-2 text-xs'>Order No</div>
                        <div className='w-[25%] p-2 text-xs'>Customer Name</div>
                        <div className='w-[25%] p-2 text-xs'>Order Status</div>
                        <div className='w-[10%] p-2 text-xs'>Action</div>
                    </div>                    
                    {
                      <List 
                      style={{minWidth: '340px',overflowX:'hidden',color: 'white'}}
                      className='List'
                      height={180}
                      itemCount={orderProducts.length}
                      itemSize={35}
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
  );
};

export default AdminDashboard; 
