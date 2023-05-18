import React from 'react';
import { Home } from './components/home/Home';
import { Footer } from './components/footer/Footer';
import { Header } from './components/header/Header';
import ProductForm from './components/productForm/ProductForm';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SideBar from './components/sidebar/sidebar';
import { CardRecommend } from './components/cardRecommend/CardRecommend';


function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='admin' element={<SideBar />}>
            <Route path='create' element={<ProductForm/>}/>
            <Route path='products' element={<CardRecommend/>}/>
          </Route>
          <Route path='/*' element={<Navigate to='/' replace/>} />
        </Routes>
        <Footer/>
      </div>
    </BrowserRouter>
  )
}

export default App;
