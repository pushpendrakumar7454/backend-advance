import React from 'react'
import { Outlet } from 'react-router'
import SellerHeader from '../../shared/ui/components/SellerHeader'
const SellerLayout = () => {
  return (
    <div>
      <SellerHeader/>
      <Outlet/>
    </div>
  )
}

export default SellerLayout
