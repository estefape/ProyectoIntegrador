import { React } from 'react'
import { NavLink, Outlet, } from 'react-router-dom'
import './sideBar.css'

const SideBar = () => {
  return (
    <>
      <div className="sidebar">
        <NavLink to="/admin" end>Inicio</NavLink>
        <NavLink to="/admin/create">Agregar oficina</NavLink>
        <NavLink to="/admin/products">Oficinas</NavLink>
      </div>
      <Outlet/>
    </>
  )
}

export default SideBar;