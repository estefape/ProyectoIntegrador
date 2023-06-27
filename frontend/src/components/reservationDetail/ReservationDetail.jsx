import "./reservationDetail.css";

import { Link, useNavigate, useParams } from 'react-router-dom';
import { getData, getDateFromString, getStringFromDate, mapDateStringFromDateRequest } from '../../services/utils';
import { useContext, useEffect, useState } from 'react';

import AppContext from "../../context/AppContext";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ReservationCalendar from '../reservationCalendar/ReservationCalendar';
import StarRating from "../starRating/StarRating";
import { constants } from "../../services/constants";
import { createReserve } from "../../services/reserveServices"

export const ReservationDetail = () => {

    const { setCheckIn, 
            checkIn, 
            checkOut, 
            setCheckOut,
            setReservation,
            globalState,
        } = useContext(AppContext);

    const [coworking, setCoworking] = useState({});
    const [reservations, setReservations] = useState([]);
    const [admissionTime, setAdmissionTime ] = useState();
    const [dates, setDates] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();

    const [user, setUser] = useState({
        nombre: globalState.nombre,
        apellido: globalState.apellido,
        email: globalState.email,
        comentario: "",
    });

    const onSubmitForm = (e) => {
        e.preventDefault();
        const reservationTemp = {
            start_date : mapDateStringFromDateRequest(dates.startDate),
            end_date : mapDateStringFromDateRequest(dates.endDate),
            coworking : {
                idCoworking: coworking.idCoworking,
            },
            user: {
                id: globalState.id,
            },
        };

        setReservation(reservationTemp);
        console.log(reservationTemp);

        
        createReserve(reservationTemp)
            .then( (response) => {
                console.log(response)
            })
            .catch(e => console.log(e))


        // navigate(`/reservation/${id}/confirm`);
        
    }

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
        setDates({
            startDate: startDate,
            endDate: endDate
        })
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
                        <form onSubmit={onSubmitForm} className="container reservation-form">
                            <section className='reservation-section'>
                                <h2 className='category'>Completa tus Datos</h2>
                                <article className="grid-2c gray-background">
                                    <div>
                                        <div>
                                            <label htmlFor="nombre">Nombre</label>
                                            <input 
                                                type="text" 
                                                placeholder="Nombre" 
                                                id="nombre" 
                                                name="nombre" 
                                                value={user.nombre}
                                                onChange={e => setUser({...user, nombre: e.target.value})}
                                                />
                                        </div>
                                        <div>
                                            <label htmlFor="apellido">Apellido</label>
                                            <input 
                                                type="text" 
                                                placeholder="Apellido" 
                                                id="apellido" 
                                                name="apellido" 
                                                value={user.apellido}
                                                onChange={e => setUser({...user, apellido: e.target.value})}
                                                />
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            <label htmlFor="email">Email</label>
                                            <input 
                                                type="email" 
                                                placeholder="Email" 
                                                id="email" 
                                                name="email" 
                                                value={user.email}
                                                onChange={e => setUser({...user, email: e.target.value})}
                                                />
                                        </div>
                                        <div>
                                            <label htmlFor="Comentario">Comentario</label>
                                            <input 
                                                type="text" 
                                                placeholder="Ingrese alguna informacion relevante..." 
                                                id="comentario" 
                                                name="comentario" 
                                                value={user.comentario}
                                                onChange={e => setUser({...user, comentario: e.target.value})}
                                                />
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
                                    <select 
                                        id="horario"
                                        name="horario" 
                                        value={admissionTime}
                                        onChange={e => setAdmissionTime(e.target.value)}
                                        >
                                        <option 
                                            defaultValue={true} 
                                            value="">Seleccione
                                        </option>
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
                                    <div>Check in:</div>
                                    <div>{checkIn}</div>
                                </div>
                                <div className='separator check'>
                                    <div>Check out:</div>
                                    <div>{checkOut}</div>
                                </div>

                                <button type="submit" className='btn'>Confirmar Reserva</button>
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