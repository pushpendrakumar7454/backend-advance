import React from 'react'
import UserHeader from '../../shared/ui/components/UserHeader'
import { Outlet } from 'react-router'
import Footer from '../../shared/ui/components/Footer'
const UserLayout = () => {
  return (
    <div>
    <UserHeader/>
    <Outlet/>
    <Footer/>
    </div>
  )
}

export default UserLayout
