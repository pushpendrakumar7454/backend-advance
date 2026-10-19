import React from 'react'
import UserHeader from '../../shared/ui/components/UserHeader'
import { Outlet } from 'react-router'
const UserLayout = () => {
  return (
    <div>
    <UserHeader/>
    <Outlet/>
    </div>
  )
}

export default UserLayout
