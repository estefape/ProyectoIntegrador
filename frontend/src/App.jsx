import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from './routes/home/Home';
import { Footer } from './components/footer/Footer';
import { Header } from './components/header/Header';
import { Detail } from './routes/detail/Detail';


function App(){
  return (
    <div className='App'> 
      <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/> 
        <Route path='/detail/:officeId' element={<Detail/>}/>
      </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  )
}

export default App;
