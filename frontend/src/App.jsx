import React from 'react';
import { Home } from './routes/home/Home';
import { Footer } from './components/footer/Footer';
import { Header } from './components/header/Header';
import ProductForm from './components/productForm/ProductForm';
import CategoryForm from './components/categoryForm/CategoryForm';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SideBar from './components/sidebar/sidebar';
import Products from './components/products/products';
<<<<<<< HEAD
import { Detail } from './routes/detail/Detail';
import { Login } from './routes/login/Login';
import { SignUp } from './routes/signup/SignUp';
=======
import { CoworkingDetail } from './routes/coworkingDetail/CoworkingDetail';
import { CategoryDetail } from './routes/categoryDetail/CategoryDetail';
>>>>>>> d7758f213f490d8f2ed2059aad980af96c74947d


function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Header />
        <Routes>
<<<<<<< HEAD
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp/>} />
          <Route path='/detail/:officeId' element={<Detail />} />
          <Route path='admin' element={<SideBar />}>
            <Route path='create' element={<ProductForm />} />
            <Route path='products' element={<Products />} />
=======
          <Route path='/' element={<Home/>} />
          <Route path='/detail/:officeId' element={<CoworkingDetail/>}/>
          <Route path='/category/:categoryId' element={<CategoryDetail/>}/>
          <Route path='admin' element={<SideBar />}>
            <Route path='products' element={<Products/>}/>
            <Route path='newproduct' element={<ProductForm/>}/>
            <Route path='categories/create' element={<CategoryForm/>}/>
>>>>>>> d7758f213f490d8f2ed2059aad980af96c74947d
          </Route>
          <Route path='/*' element={<Navigate to='/' replace />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App;
