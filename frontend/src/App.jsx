import "./reset.css";

import { HashRouter, Navigate, Route, Routes } from "react-router-dom";

import Categories from "./components/categories/Categories";
import { CategoryDetail } from "./routes/categoryDetail/CategoryDetail";
import CategoryForm from "./components/categoryForm/CategoryForm";
import Cities from "./components/cities/Cities";
import CityForm from "./components/cityForm/CityForm.jsx";
import { CoworkingDetail } from "./routes/coworkingDetail/CoworkingDetail";
import EditCityForm from "./components/editCityForm/EditCityForm";
import EditProductForm from "./components/editProductForm/EditProductForm";
import { Footer } from "./components/footer/Footer";
import { Header } from "./components/header/Header";
import { Home } from "./routes/home/Home";
import { Login } from "./routes/login/Login";
import ProductForm from "./components/productForm/ProductForm";
import Products from "./components/products/products";
import React, { useContext, useEffect } from "react";
import { ReservationDetail } from "./components/reservationDetail/ReservationDetail";
import SideBar from "./components/sidebar/sidebar";
import { SignUp } from "./routes/signup/SignUp";
import Users from "./components/users/Users";
import AdminHome from "./components/adminHome/AdminHome";
import AppContext from "./context/AppContext";

function App() {

  const { login } = useContext(AppContext);

  const validateSession = () => {
    const dataSession = localStorage.getItem('data')
    if(dataSession){
      const data = JSON.parse(atob(dataSession))
      login(data)
    }
  }

  useEffect(() => {
    validateSession()
  }, [])
  
  return (
    <HashRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/detail/:id" element={<CoworkingDetail />} />
          <Route path="/category/:categoryId" element={<CategoryDetail />} />
          <Route path="/reservation/:id" element={<ReservationDetail />} />
          <Route path="/admin" element={<SideBar />}>
            <Route path="home" element={<AdminHome />} />
            <Route path="products" element={<Products />} />
            <Route path="newproduct" element={<ProductForm />} />
            <Route path="editproduct" element={<EditProductForm />}>
              <Route path=":productId" element={<EditProductForm />} />
            </Route>
            <Route path="cities" element={<Cities />} />
            <Route path="newcity" element={<CityForm />} />
            <Route path="editcity" element={<EditCityForm />}>
              <Route path=":name" element={<EditCityForm />} />
            </Route>
            <Route path="categories" element={<Categories />} />
            <Route path="newcategory" element={<CategoryForm />} />
            <Route path="users" element={<Users/>} />
          </Route>
          <Route path="/*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;
