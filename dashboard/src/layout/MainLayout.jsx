import React, { useState } from 'react'
import {Outlet} from 'react-router-dom'
import Header from './Header';
import Sidebar from './Sidebar';

const MainLayout = () => {
  const [showSidebar, setShowSidebar] = useState(false)
  return (
    <div className="bg-[#4e5b7c] min-h-screen w-full">
      <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar}/>
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar}/>
      <div className="ml-0 md:ml-[210px] lg:ml-[210px] pt-[95px] transition-all">
        <Outlet/>
      </div>
    </div>
  )
}

export default MainLayout