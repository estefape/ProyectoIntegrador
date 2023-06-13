import { React, useEffect, useContext } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import AppContext from '../../context/AppContext';
import './sideBar.css'

const SideBar = () => {

  const navigate = useNavigate()
  const { getRolesGlobalState } = useContext(AppContext);

  useEffect(() => {
    const roles = getRolesGlobalState();
    if ( roles.find(({ name }) => name === "ROLE_ADMIN") == undefined)  {
        navigate("/")
    }
}, []);

  return (
    <>
      <div className='adminWrapper'>
        <div className="sidebar">
          <NavLink to="/admin" end>Inicio</NavLink>
          <NavLink to="/admin/products">Oficinas</NavLink>
          <NavLink to="/admin/newproduct">Agregar Oficina</NavLink>                     
          <NavLink to="/admin/categories/create">Agregar Categoria</NavLink>
          <NavLink to="/admin/cities">Ciudades</NavLink>
          <NavLink to="/admin/newCity">Agregar Ciudad</NavLink>   
        </div>
        <Outlet />
      </div>
    </>
  )
}

export default SideBar;