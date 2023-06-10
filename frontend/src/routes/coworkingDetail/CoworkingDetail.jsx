import { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import TvIcon from '@mui/icons-material/Tv';
import WifiIcon from '@mui/icons-material/Wifi';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import CoffeeIcon from '@mui/icons-material/Coffee';
import PrintIcon from '@mui/icons-material/Print';
import { constants } from "../../services/constants";
import StarRating from "../../components/starRating/StarRating";
import  ReservationCalendar  from "../../components/reservationCalendar/ReservationCalendar";

import "./coworkingDetail.css";

export const CoworkingDetail = () => {

    const [singleOffice, setSingleOffice] = useState({})
    const { id } = useParams()


    const getOfficeByOfficeId = async (id) => {
        const requestConfig = {
            method: 'GET',
        }
        const url = constants.PRODUCTS_ENDPOINT + id;
        const response = await fetch(url, requestConfig);
        return await response.json();
    }

    useEffect(() => {
        getOfficeByOfficeId(id).then(data => {
            data.images = data.image.split(";");
            data.reservations = [
                {
                    start: '2023-06-07',
                    end: '2023-06-15',
                },
                {
                    start: '2023-06-19',
                    end: '2023-06-22',
                },
                {
                    start: '2023-07-20',
                    end: '2023-07-22',
                }
            ];
            setSingleOffice(data)
        });
    }, [id])


    return (
        <>
            {singleOffice && singleOffice.images ?
                (
                    <>
                        <div className="title">
                            <h1>{singleOffice.name}</h1>
                            <Link className="arrowBack" to="/">
                                <ChevronLeftIcon sx={{ fontSize: 50 }} className="icon" />
                            </Link>
                        </div>
                        <div className="star-address">
                            <div className="address">
                                <p className="icon-container"> <LocationOnIcon className="icon" />
                                 <span>
                                    {singleOffice.address} {singleOffice.city.name}
                                 </span>
                                 </p>
                            </div>
                            <div className="icon-container">
                                <StarRating 
                                    value={singleOffice.rating?.rating}
                                    cantidadVotos={singleOffice.rating?.valoraciones} 
                                    idCoworking={singleOffice.idCoworking} 
                                />
                            </div>
                        </div>

                        <div className="container">
                            <div className="grid">
                                <div className="item large">
                                    <img src={singleOffice.images[0]} alt="Imagen principal del producto" className="main-image" />
                                </div>
                                {singleOffice.images.slice(1).map((image, index) => (
                                    <div key={index} className="item">
                                        <img src={image} alt={`Imagen ${index + 1}`} />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="container">
                            <h2 className="category"> Categoria: {singleOffice.category.name}</h2>
                            <p>{singleOffice.description}</p>
                        </div>
                        <div className="container with-border-bottom">
                            <h2 className="category">Comodidades</h2>
                        </div>
                        <div className="container comodidades">
                            <div className="grid">
                                <div className="item icon-container"><AcUnitIcon className="icon" /> <span>Aire acondicionado</span></div>
                                <div className="item icon-container"><TvIcon className="icon" /> <span>Smart TV</span></div>
                                <div className="item icon-container"><WifiIcon className="icon" /> <span>Wifi</span></div>
                                <div className="item icon-container"><DirectionsCarIcon className="icon" /> <span>Estacionamiento</span></div>
                                <div className="item icon-container"><CoffeeIcon className="icon" /> <span>Cafe</span></div>
                                <div className="item icon-container"><PrintIcon className="icon" /> <span>Impresora</span></div>
                            </div>
                        </div>
                        <div className="container calendario">
                            <h2 className="category">Fechas disponibles</h2>
                            <div className="reserva">
                                <ReservationCalendar fechasNoDisponibles={ singleOffice.reservations }/>
                                <div className="botonReserva">
                                    <h3 className="category">Agregá tus fechas de reservas para obtener precios exactos</h3>
                                    <button className="btn">Reservar</button>
                                </div>                                
                            </div>
                        </div>
                        <div className="container with-border-bottom">
                            <h2 className="category">Políticas</h2>
                        </div>

                        <div className="container policies">
                            <div>
                                <h3 className="category">Normas del Coworking</h3>
                                <p>{singleOffice.coworkingRulesPolicy}</p>
                            </div>
                            <div>
                                <h3 className="category">Salud y seguridad</h3>
                                <p>{singleOffice.healthSafetyPolicy}</p>
                            </div>
                            <div>
                                <h3 className="category">Politicas de cancelación</h3>
                                <p>{singleOffice.cancellationPolicy}</p>
                            </div>
                        </div>      

                     
                    </>
                ) : (<p>Cargando...</p>)}
        </>
    )
}