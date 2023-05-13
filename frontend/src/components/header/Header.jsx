import React, { useState } from 'react';
import iconoLogo from "../assets/logo1.png";
import './header.css';

const Header = () => {

    const [menuOpen, setMenuOpen] = useState(false);

    const handleMenuClick = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header className='header'>
            <div className="logo">
                <a href="/">
                    <img src={iconoLogo} alt="Logo de la empresa" />
                    <span>El espacio de oficinas del futuro.</span>
                </a>
            </div>
            <div className="buttons">
                <button>Crear cuenta</button>
                <button>Iniciar sesión</button>
            </div>
            <nav className={menuOpen ? 'menu-open' : 'menu-closed'}>
                <ul>
                    <li><a href="#">Inicio</a></li>
                    <li><a href="#">Acerca de</a></li>
                    <li><a href="#">Servicios</a></li>
                    <li><a href="#">Contacto</a></li>
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

export default Header;