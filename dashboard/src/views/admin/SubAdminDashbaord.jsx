import React from "react";
import { Link } from "react-router-dom";
import { BsCurrencyDollar } from "react-icons/bs";
import { RiProductHuntLine } from "react-icons/ri";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Chart from "react-apexcharts";
const SubAdminDashboard = () => {
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
        name: "Sales",
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
  return (
    <div className="px-2 py-5 md:px-7">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7">
        <div className="flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3">
          <div className="flex flex-col text-[#d0d2d6] justify-start items-start">
            <h2 className="text-sm font-bold">$25362</h2>
            <span className="text-xs font-medium">Total Sales</span>
          </div>
          <div className="flex w-[38px] h-[39px] rounded-full justify-center items-center bg-[#28c76f1f] text-xl">
            <BsCurrencyDollar className="text-[#28c76f] drop-shadow-lg" />
          </div>
        </div>
        <div className="flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3">
          <div className="flex flex-col text-[#d0d2d6] justify-start items-start">
            <h2 className="text-sm font-bold">20</h2>
            <span className="text-xs font-medium">Products</span>
          </div>
          <div className="flex w-[38px] h-[39px] rounded-full justify-center items-center bg-[#e000e81f] text-xl">
            <RiProductHuntLine className="text-[#cd00e8] shadow-lg" />
          </div>
        </div>
        <div className="flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3">
          <div className="flex flex-col text-[#d0d2d6] justify-start items-start">
            <h2 className="text-sm font-bold">50</h2>
            <span className="text-xs font-medium">Orders</span>
          </div>
          <div className="flex w-[38px] h-[39px] rounded-full justify-center items-center bg-[#00cfe81f] text-xl">
            <AiOutlineShoppingCart className="text-[#00cfe8] shadow-lg" />
          </div>
        </div>
        <div className="flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3">
          <div className="flex flex-col text-[#d0d2d6] justify-start items-start">
            <h2 className="text-sm font-bold">12</h2>
            <span className="text-xs font-medium">Pending Orders</span>
          </div>
          <div className="flex w-[38px] h-[39px] rounded-full justify-center items-center bg-[#7367f01f] text-xl">
            <AiOutlineShoppingCart className="text-[#7367f0] shadow-lg" />
          </div>
        </div>
      </div>

      <div className="w-full flex flex-wrap mt-7">
        <div className="w-full lg:w-7/12 lg:pr-3">
          <div className="w-full bg-[#283046] p-4 rounded-md">
            <Chart
              options={state.options}
              series={state.series}
              type="bar"
              height={350}
            />
          </div>
        </div>
        <div className="w-full lg:w-5/12 mt-4 lg:pl-3 lg:mt-0">
          <div className="w-full bg-[#283046] text-[#d0d2d6] px-[8px]">
            <div className="flex justify-between items-center">
              <h2 className="font-semibold text-[14px] text-[#d0d2d6]">
                Recent customer message
              </h2>
              <Link to="#" className="text-sm text-[#d0d2d6] font-semibold">
                View all
              </Link>
            </div>
            <div className="flex flex-col gap-6 pt-6 text-[#d0d2d6]">
              <ol className="relative border-1 border-slate-800 ml-4">
                <li className="ml-6 mb-3">
                  <div className="flex absolute -left-5 shadow-lg justify-center items-center w-10 h-10 p-[5px] bg-[#00d1e848] rounded-full z-10">
                    <img
                      className="w-full h-full shadow-lg rounded-full"
                      src="http://localhost:3000/images/admin.jpg"
                      alt=""
                    />
                  </div>
                  <div className="p-3 bg-slate-800 rounded-lg border border-slate-600 shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                      <Link to="#" className="text-md font-normal">
                        Customer Name
                      </Link>
                      <time className="text-sm font-normal mb-1 sm:mb-0 sm:order-last">
                        4 days ago
                      </time>
                    </div>
                    <div className="p-2 font-normal text-xs bg-slate-700 rounded-lg border border-slate-800">
                      how are you
                    </div>
                  </div>
                </li>
                <li className="ml-6 mb-3">
                  <div className="flex absolute -left-5 shadow-lg justify-center items-center w-10 h-10 p-[5px] bg-[#00d1e848] rounded-full z-10">
                    <img
                      className="w-full h-full shadow-lg rounded-full"
                      src="http://localhost:3000/images/admin.jpg"
                      alt=""
                    />
                  </div>
                  <div className="p-3 bg-slate-800 rounded-lg border border-slate-600 shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                      <Link to="#" className="text-md font-normal">
                      Seller Name
                      </Link>
                      <time className="text-sm font-normal mb-1 sm:mb-0 sm:order-last">
                        4 days ago
                      </time>
                    </div>
                    <div className="p-2 font-normal text-xs bg-slate-700 rounded-lg border border-slate-800">
                      how are you
                    </div>
                  </div>
                </li>
                <li className="ml-6 mb-3">
                  <div className="flex absolute -left-5 shadow-lg justify-center items-center w-10 h-10 p-[5px] bg-[#00d1e848] rounded-full z-10">
                    <img
                      className="w-full h-full shadow-lg rounded-full"
                      src="http://localhost:3000/images/admin.jpg"
                      alt=""
                    />
                  </div>
                  <div className="p-3 bg-slate-800 rounded-lg border border-slate-600 shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                      <Link to="#" className="text-md font-normal">
                        Customer Name
                      </Link>
                      <time className="text-sm font-normal mb-1 sm:mb-0 sm:order-last">
                        4 days ago
                      </time>
                    </div>
                    <div className="p-2 font-normal text-xs bg-slate-700 rounded-lg border border-slate-800">
                      how are you
                    </div>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full p-4 bg-[#283046] rounded-md mt-6">
          <div className='flex justify-between items-center'>
              <h2 className="font-semibold text-[14px] text-[#d0d2d6]">
                Recent Orders
              </h2>
              <Link to="#" className="text-sm text-[#d0d2d6] font-semibold">
                View all
              </Link>
          </div>
          <div className='relative overflow-x-auto'>
            <table className='w-full text-sm text-[#d0d2d6] text-left'>
              <thead className='text-sm text-[#d0d2d6] border-b border-slate-700 uppercase'>
                <tr>
                  <th scope='col' className='py-3 px-4'>Order Id</th>
                  <th scope='col' className='py-3 px-4'>Price</th>
                  <th scope='col' className='py-3 px-4'>Payment</th>
                  <th scope='col' className='py-3 px-4'>Order Status</th>
                  <th scope='col' className='py-3 px-4'>Active</th>
                </tr>
              </thead>
              <tbody>
                  {
                    [1,2,3,4,5].map((d,i)=><tr key={i}>
                    <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'>#1023</td>
                    <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'>$636</td>
                    <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'>
                      <span>Pending</span>
                    </td>
                    <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'>
                    <span>Pending</span>
                    </td>
                    <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'>
                      <Link>View</Link>
                    </td>
                  </tr>)
                  }
              </tbody>
            </table>
          </div>
      </div>
    </div>
  );
};

export default SubAdminDashboard; 
