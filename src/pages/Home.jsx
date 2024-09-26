import React from 'react'
import Banner from '../components/Banner'
import Category from '../components/Category'
import FlashSale from '../components/FlashSale'
import Offer from '../components/Offer'
import BestSeller from '../components/Products'
import Arrived from '../components/Arrived'
import Footer from '../common/Footer'

const Home = () => {
  return (
    <div>
      <Banner />
      <Category />
      <FlashSale />
      <Offer />
      <BestSeller />
      <Arrived />
      <Footer/>
    </div>
  )
}

export default Home