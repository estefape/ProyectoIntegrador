import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from './components/home/Home';
import { Footer } from './components/footer/Footer';
import { Header } from './components/header/Header';


function App(){
  return (
    <div className='App'> 
      <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/> 
      </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  )
}

export default App;
