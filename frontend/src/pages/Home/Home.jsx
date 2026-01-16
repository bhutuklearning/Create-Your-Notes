import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import Hero2 from './Hero2'
import Hero3 from './Hero3'
import Hero1 from './Hero1'
import Hero4 from './Hero4'

const Home = () => {
  return (
    <main>
      <Navbar/>
      <Hero1/>
      <Hero2/>
      <Hero3/>
      <Hero4/>
      <Footer/>
    </main>
  )
}

export default Home
