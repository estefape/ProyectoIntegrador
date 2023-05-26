import React from 'react';
import { Home } from './routes/home/Home';
import { Footer } from './components/footer/Footer';
import { Header } from './components/header/Header';
import ProductForm from './components/productForm/ProductForm';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SideBar from './components/sidebar/sidebar';
import Products from './components/products/products';
import { Detail } from './routes/detail/Detail';
import { Login } from './routes/login/Login';
import { SignUp } from './routes/signup/SignUp';


function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp/>} />
          <Route path='/detail/:officeId' element={<Detail />} />
          <Route path='admin' element={<SideBar />}>
            <Route path='create' element={<ProductForm />} />
            <Route path='products' element={<Products />} />
          </Route>
          <Route path='/*' element={<Navigate to='/' replace />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App;
