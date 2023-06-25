import "./reservationDetail.css";

import { Link, useParams } from 'react-router-dom';
import { getData, getDateFromString, getStringFromDate } from '../../services/utils';
import { useContext, useEffect, useState } from 'react';

import AppContext from "../../context/AppContext";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ReservationCalendar from '../reservationCalendar/ReservationCalendar';
import StarRating from "../starRating/StarRating";
import { constants } from "../../services/constants";

export const ReservationDetail = () => {

    const { setCheckIn, checkIn, checkOut, setCheckOut } = useContext(AppContext);

    const [coworking, setCoworking] = useState({})
    const [reservations, setReservations] = useState([])
    const { id } = useParams()

    useEffect(() => {
        getData(constants.PRODUCTS_ENDPOINT + id).then(data => {
            data.images = data.image.split(";");
            setCoworking(data);
        });
        getData(`${constants.RESERVATIONS_ENDPOINT}coworking?coworking=${id}`).then(data => {
            const reservationsMap = data.map(reservation => {
                return {
                    start: reservation.start_date.split("T")[0],
                    end: reservation.end_date.split("T")[0],
                }
            });
            setReservations(reservationsMap);
        });
    }, [id])

    const handleSelect = (ranges) => {
        const { startDate, endDate } = ranges.selection;
        setCheckIn(getStringFromDate(startDate));
        setCheckOut(getStringFromDate(endDate));
    }

    return (
        <>
            {coworking && coworking.images ?
                (
                    <div className='reservation-detail'>
                        <div className="title">
                            <h1>{coworking.name}</h1>
                            <Link className="arrowBack" to={`/detail/${coworking.idCoworking}`}>
                                <ChevronLeftIcon sx={{ fontSize: 50 }} className="icon" />
                            </Link>
                        </div>
                        <form className="container reservation-form">
                            <section className='reservation-section'>
                                <h2 className='category'>Completa tus Datos</h2>
                                <article className="grid-2c gray-background">
                                    <div>
                                        <div>
                                            <label htmlFor="nombre">Nombre</label>
                                            <input type="text" id="nombre" name="nombre" placeholder="Nombre" />
                                        </div>
                                        <div>
                                            <label htmlFor="apellido">Apellido</label>
                                            <input type="text" id="apellido" name="apellido" placeholder="Apellido" />
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            <label htmlFor="email">Email</label>
                                            <input type="email" id="email" name="email" placeholder="Email" />
                                        </div>
                                        <div>
                                            <label htmlFor="Ciudad">Ciudad</label>
                                            <input type="text" id="ciudad" name="ciudad" placeholder="Ciudad" />
                                        </div>
                                    </div>
                                </article>
                                <h2 className='category'>Selecciona tu fecha de reserva</h2>
                                <article className="calendar">
                                    <ReservationCalendar 
                                        fechasNoDisponibles={reservations} 
                                        onChange={handleSelect} 
                                        selection={{
                                            startDate: getDateFromString(checkIn), 
                                            endDate: getDateFromString(checkOut), 
                                        }}
                                    />
                                </article>
                                <h2 className='category'>Tu horario de llegada</h2>
                                <article className='horarios'>
                                    <p><CheckCircleOutlineIcon /> El horario de reserva es de 9:00 a 18:00</p>
                                    <label htmlFor="horario">Indica tu horario estimado de llegada</label>
                                    <select name="horario" id="horario">
                                        <option value="" defaultValue={true}>Seleccione</option>
                                        <option value="9:00">9:00</option>
                                        <option value="10:00">10:00</option>
                                        <option value="11:00">11:00</option>
                                        <option value="12:00">12:00</option>
                                    </select>
                                </article>
                            </section>
                            <aside className='reservation-aside'>
                                <h2 className='category'>Detalle de la reserva</h2>
                                <img src={coworking.images[0]} alt="" />
                                <h2 className='category'>Reserva en {coworking.name}</h2>
                                <div className="icon-container">
                                    <StarRating
                                        value={coworking.rating?.rating}
                                        cantidadVotos={coworking.rating?.valoraciones}
                                        idCoworking={coworking.idCoworking}
                                    />
                                </div>
                                <div className="icon-container separator" ><LocationOnIcon className='icon' />{coworking.address}</div>
                                <div className='separator check'>
                                    <div>check in </div>
                                    <div>{checkIn}</div>
                                </div>
                                <div className='separator check'>
                                    <div>check out </div>
                                    <div>{checkOut}</div>
                                </div>

                                <button type="submit"className='btn'>Confirmar Reserva</button>
                            </aside>
                        </form>
                        <div className="container with-border-bottom">
                            <h2 className="category">Qué tenés que saber</h2>
                        </div>

                        <div className="container policies">
                            <div>
                                <h3 className="category">Normas del Coworking</h3>
                                <p>{coworking.coworkingRulesPolicy}</p>
                            </div>
                            <div>
                                <h3 className="category">Salud y seguridad</h3>
                                <p>{coworking.healthSafetyPolicy}</p>
                            </div>
                            <div>
                                <h3 className="category">Politicas de cancelación</h3>
                                <p>{coworking.cancellationPolicy}</p>
                            </div>
                        </div>

                    </div>
                ) : (<p>Cargando...</p>)
            }
        </>
    )
}