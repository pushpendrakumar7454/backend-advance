import React from 'react'
import HomePage from './HomePage'
import ShopByCategory from '../components/ShopByCategory'

import TredingProducts from '../components/TrendingProducts'
import Animation from '../components/Animation'
import HomeSection from '../components/HomeSection'

const Main = () => {
  return (
    <div>
      <HomePage/>
      <ShopByCategory/>
   
      <TredingProducts/>
      <Animation/>   
     <HomeSection/> 
    </div>
  )
}

export default Main
