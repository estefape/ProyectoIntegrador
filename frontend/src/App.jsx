import './reset.css'

import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

import Categories from './components/categories/Categories';
import { CategoryDetail } from './routes/categoryDetail/CategoryDetail';
import CategoryForm from './components/categoryForm/CategoryForm';
import Cities from './components/cities/Cities'
import CityForm from './components/cityForm/CityForm.jsx'
import { CoworkingDetail } from './routes/coworkingDetail/CoworkingDetail';
import EditCityForm from './components/editCityForm/EditCityForm';
import EditProductForm from './components/editProductForm/EditProductForm';
import { Footer } from './components/footer/Footer';
import { Header } from './components/header/Header';
import { Home } from './routes/home/Home';
import { Login } from './routes/login/Login';
import ProductForm from './components/productForm/ProductForm';
import Products from './components/products/products';
import React from 'react';
import { ReservationDetail } from './components/reservationDetail/ReservationDetail';
import SideBar from './components/sidebar/sidebar';
import { SignUp } from './routes/signup/SignUp';

function App() {

  // TODO: comprobar y recuperar datos del localStorage, para ver si hay una sesion abierta
  // si la hay, recuperar los datos y mandar a logear
  /*
      user {
        name:
        lastname:
        email:
        accessTokenClass: {
            accessToken:
            fechaCreacion:
            fechaVencimiento: fechaCreacion + tiempoVigencia
        }

        accesToken = findToken(token)
        if(accessToken.fechaVenciemineto > fechaActual) {
          return null
        }else
        user = findUserByToken
        return user = {
          name, lastname, email, accessTokenNuevo
        }
      }

  */

  return (
    <HashRouter>
      <div className='App'>
        <Header />
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={ <Login/> }/>
          <Route path='/signup' element={ <SignUp/> }/>
          <Route path='/detail/:id' element={<CoworkingDetail/>}/>
          <Route path='/category/:categoryId' element={<CategoryDetail/>}/>
          <Route path='/reservation/:id' element={<ReservationDetail/>}/>
          <Route path='/admin' element={<SideBar />}>
            <Route path='products' element={<Products/>}/>
            <Route path='newproduct' element={<ProductForm/>}/>            
            <Route path='editproduct' element={<EditProductForm/>}>
              <Route path=':productId' element={<EditProductForm/>}/>
            </Route>
            <Route path='cities' element={<Cities/>}/>
            <Route path='newcity' element={<CityForm/>}/>
            <Route path='editcity' element={<EditCityForm/>}>
              <Route path=':name' element={<EditCityForm/>}/>
            </Route>
            <Route path='categories' element={<Categories/>}/>
            <Route path='newcategory' element={<CategoryForm/>}/>
          </Route>
          <Route path='/*' element={<Navigate to='/' replace />} />
        </Routes>
        <Footer />
      </div>
    </HashRouter>
  )
}

export default App;