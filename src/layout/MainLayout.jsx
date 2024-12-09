import Navbar from '@/components/Navbar';
import React from 'react';
import { Outlet } from 'react-router-dom';

// Outlet in react-router-dom
// Renders the matching child route of a parent route or nothing if no child route matches. 

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <div className='mt-16'>
        <Outlet />
      </div>
    </div>
  )
}

export default MainLayout