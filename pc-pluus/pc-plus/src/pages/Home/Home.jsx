import React from 'react'
import './Home.css'
import Navbar from '../../components/Navbar/Navbar'
import HeroSection from '../../components/HeroSection/HeroSection'
import Partners from '../../components/partners/Partners'
import Why from '../../components/WhyUs/Why'
import Category from '../../components/CategoryHome/Category'
import BuildPc from '../../components/BuildpcSection/BuildPc'
import Footer from '../../components/Footer/Footer'



const Home = () => {
  return (

    <div className='Home-container'>
      <div className="home-hero-page">
        <Navbar />
        <HeroSection />
      </div>
      <Partners />
      <Why />
      <Category />
      <BuildPc />
      <Footer />

    </div>
  )
}

export default Home