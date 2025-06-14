import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import './assets/App.css'

import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

import Homepage from './pages/user/Homepage'
import AboutPage from './pages/user/About'
function App() {
    return (
        <div className=''>
          <Header />
          <Routes>
              <Route path='/' element={<Homepage />}/>
              <Route path='/about' element={<AboutPage />}/>
          </Routes>         
          <Footer/>               
        </div> 
    )
}

export default App
