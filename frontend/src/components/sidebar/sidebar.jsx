import { React } from 'react'
import { NavLink, Outlet, } from 'react-router-dom'
import './sideBar.css'

const SideBar = () => {
  return (
    <>
      <div className='adminWrapper'>
        <div className="sidebar">
          <NavLink to="/admin" end>Inicio</NavLink>
          <NavLink to="/admin/newproduct">Agregar oficina</NavLink>
          <NavLink to="/admin/products">Oficinas</NavLink>
          <NavLink to="/admin/categories/create">Agregar Categoria</NavLink>
        </div>
        <Outlet />
      </div>
    </>
  )
}

export default SideBar;