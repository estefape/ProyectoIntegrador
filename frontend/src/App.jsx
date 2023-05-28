import React from 'react';
import { Home } from './routes/home/Home';
import { Footer } from './components/footer/Footer';
import { Header } from './components/header/Header';
import ProductForm from './components/productForm/ProductForm';
import CategoryForm from './components/categoryForm/CategoryForm';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SideBar from './components/sidebar/sidebar';
import Products from './components/products/products';
import { CoworkingDetail } from './routes/coworkingDetail/CoworkingDetail';


function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/detail/:officeId' element={<CoworkingDetail/>}/>
          <Route path='admin' element={<SideBar/>}>
            <Route path='products' element={<Products/>}/>
            <Route path='newproduct' element={<ProductForm/>}/>
            <Route path='categories/create' element={<CategoryForm/>}/>
          </Route>
          <Route path='/*' element={<Navigate to='/' replace/>} />
        </Routes>
        <Footer/>
      </div>
    </BrowserRouter>
  )
}

export default App;
