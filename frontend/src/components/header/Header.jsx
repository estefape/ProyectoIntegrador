import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import iconoLogo from "../../assets/logo1.png";
import './header.css';
import AppContext from '../../context/AppContext';
import Swal from 'sweetalert2';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export const Header = () => {

    const [menuOpen, setMenuOpen] = useState(false);
    const [avatar, setAvatar] = useState("");
    const [buttonsHeader, setButtonsHeader] = useState(true);
    const [buttonCrearCuenta, setButtonCrearCuenta] = useState(true);
    const [buttonInicioSesion, setButtonInicioSesion] = useState(true);

    const { setShowResults, globalState } = useContext(AppContext);

    const navigate = useNavigate();

    const { isAuthGlobalState,
        signOf,
        getNameGlobalState,
        getSurnameGlobalState
    } = useContext(AppContext);

    useEffect(() => {
        if ( isAuthGlobalState() ) {
            const name = getNameGlobalState();
            const lastName = getSurnameGlobalState();
            const initials = `${name.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
            setAvatar(initials)
        }
    }, [isAuthGlobalState]);

    useEffect(() => {
        if( window.location.href.includes("login") ){
            setButtonInicioSesion(false)
            setButtonCrearCuenta(true)
        }else if( window.location.href.includes("signup") ){
            setButtonInicioSesion(true)
            setButtonCrearCuenta(false)
        }else{
            setButtonInicioSesion(true)
            setButtonCrearCuenta(true)
        }
    })


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
                <Link to="/" onClick={() => setShowResults(false)}>
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
                                <span className='avatar'>{avatar}</span>
                                <span className='nombre'>{getNameGlobalState()} {getSurnameGlobalState()}</span>
                                <button className='btn' onClick={closeSesion} >Cerrar sesión</button>
                            </li>
                        </>
                        :
                        <>
                            { buttonCrearCuenta && <li><Link to="/signup" className='btn'>Crear cuenta</Link></li> }
                            { buttonInicioSesion && <li><Link to="/login" className='btn'>Iniciar sesión</Link></li> }
                        </>
                }
            </div>
            <nav className={menuOpen ? 'menu-open' : 'menu-closed'}>
                <div className="nav-header">
                    
                    { isAuthGlobalState() ? 
                        <div>
                            <div className='avatar'> {avatar}</div> 
                        </div>
                        : 
                        <span>MENU</span>
                    }    
                </div>
                <ul>
                    {
                        isAuthGlobalState()
                            ?
                            <li>
                                <Link to="#" className='btn' onClick={closeSesion}>Cerrar sesión</Link>
                            </li>
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
