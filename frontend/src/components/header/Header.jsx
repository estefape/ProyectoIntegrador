import React, { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import iconoLogo from "../../assets/logo1.png";
import './header.css';

export const Header = () => {

    const [menuOpen, setMenuOpen] = useState(false);

    const handleMenuClick = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header className='header'>
            <div className="logo">
                <Link to="/">
                    <img src={iconoLogo} alt="Logo de la empresa" />
                    <span>Encuentra tu espacio de trabajo ideal</span>
                </Link>
            </div>
            <div className="buttons">
                <Link to="/signup" className='btn'>Crear cuenta</Link>
                <Link to="/login" className='btn'>Iniciar sesión</Link>
            </div>
            <nav className={menuOpen ? 'menu-open' : 'menu-closed'}>
                <ul>
                    <li><Link to="/signup" className='btn'>Crear cuenta</Link></li>
                    <li><Link to="/login" className='btn'>Iniciar sesión</Link></li>
                    {/* <li><a href="/signup">Crear cuenta</a></li>
                    <li><a href="/login">Iniciar sesión</a></li> */}
                </ul>
            </nav>
            <div className="menu-btn" onClick={handleMenuClick}>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </header>
    )
}
