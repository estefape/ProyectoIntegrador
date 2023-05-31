import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import iconoLogo from "../../assets/logo1.png";
import './header.css';

export const Header = () => {

    const [menuOpen, setMenuOpen] = useState(false);
    const [avatar, setAvatar] = useState("");
    const [buttonsHeader, setButtonsHeader] = useState(true);

    const navigate = useNavigate();

    const { isAuthGlobalState,
        signOf,
        getNameGlobalState,
        getSurnameGlobalState
    } = useContext(AppContext);

    useEffect(() => {

        if (!isAuthGlobalState()) {
            setAvatar(getNameGlobalState().charAt(0) + getSurnameGlobalState().charAt(0))
        }

    }, []);

    // useEffect(() => {

    //     if (window.location.href.includes("login") || window.location.href.includes("signup")) {
    //         setButtonsHeader(false);
    //     }

    // }, [])



    const closeSesion = () => {

        signOf();

        Swal.fire({
            title: "Cerrando sesion!",
            text: "Seras redirigido...",
            icon: "success",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#F2921D",
        })
            .then(() => {
                navigate("/")
            })

    }

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
                {
                    isAuthGlobalState()
                        ?
                        <>
                            <li className='avatar-container'>
                                <span className='avatar'> {avatar}</span>
                                <button className='btn' onClick={closeSesion} >Cerrar sesión</button>
                            </li>
                        </>
                        :
                        <>
                            <li><Link to="/signup" className='btn'>Crear cuenta</Link></li>
                            <li><Link to="/login" className='btn'>Iniciar sesión</Link></li>
                        </>
                }
            </div>
            <nav className={menuOpen ? 'menu-open' : 'menu-closed'}>
                <div className="nav-header">
                    MENU
                </div>
                <ul>
                    {
                        isAuthGlobalState()
                            ?
                            <li><Link to="#" className='btn'>Cerrar sesión</Link></li>
                            :
                            <>
                                <li><Link to="/signup" className='btn'>Crear cuenta</Link></li>
                                <li><Link to="/login" className='btn'>Iniciar sesión</Link></li>
                            </>


                    }
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
