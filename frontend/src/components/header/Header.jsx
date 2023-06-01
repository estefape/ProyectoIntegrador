import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import iconoLogo from "../../assets/logo1.png";
import './header.css';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

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
                <a className='btn' to={`/admin/`}>Admin</a>
                <button className='btn'>Crear cuenta</button>
                <button className='btn'>Iniciar sesión</button>
            </div>
            <nav className={menuOpen ? 'menu-open' : 'menu-closed'}>
                <div className="nav-header">
                    MENU
                </div>
                <ul>
                    <li><a href="#">Crear cuenta</a></li>
                    <li><a href="#">Iniciar sesión</a></li>
                </ul>
                <div className='redes-sociales'>
                    <span><FacebookIcon /></span>
                    <span><InstagramIcon /></span>
                    <span><WhatsAppIcon /></span>
                    <span><LinkedInIcon /></span>
                </div>
            </nav>
            <div className={menuOpen ? 'menu-btn menu-open' : 'menu-btn'} onClick={handleMenuClick}>
                <span></span>
                <span></span>
                <span></span>
            </div>

        </header>
    )
}
