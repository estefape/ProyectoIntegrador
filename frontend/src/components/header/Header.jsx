import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
                <button className='btn'>Crear cuenta</button>
                <button className='btn'>Iniciar sesión</button>
            </div>
            <nav className={menuOpen ? 'menu-open' : 'menu-closed'}>
                <ul>
                    <li><a href="#">Crear cuenta</a></li>
                    <li><a href="#">Iniciar sesión</a></li>
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
