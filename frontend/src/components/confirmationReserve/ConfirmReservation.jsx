import { useContext, useEffect, useState } from "react"
import "./confirmReservation.css"
import AppContext from "../../context/AppContext"
import { useNavigate, useParams } from "react-router-dom";


export const ConfirmReservation = () => {

    const { reservation: reservationGlobalState } = useContext(AppContext);
    const [reservation, setReservation] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const { coworking, start_date, end_date, admision_time, user } = reservationGlobalState;
        setReservation({
            coworking,
            start_date,
            end_date,
            user,
            admision_time,
        })
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(reservation);

        // TODO: aqui va la peticion al backend

        navigate(`/reservation/${id}/success`);

    }



    return (
        <>

            {
                reservation &&

                <div className="container-confirm">
                    <form onSubmit={onSubmit} className="card-confirm">
                        <h2 style={{ fontSize: "2rem", textAlign: "center" }} >Detalle de su reserva</h2>
                        <p><span style={{ fontWeight: "bold" }}>Atencion:</span> Usted esta a punto de realizar
                            una reserva, verifique que los datos ingresados sean los correctos, en caso que no coincidan
                            realice la reserva nuevamente <span className="here" onClick={() => navigate(`/reservation/${id}`)}>aqui.</span></p>
                        {/* <img src={reservation.coworking.images[0]} alt="" /> */}
                        {/* <h2 className='coworking-name'>Coworking {reservation.coworking.name}</h2> */}
                        <div className="body-confirm">
                            <div className="container-datos-personales">
                                <h2>Datos personales</h2>
                                <div className='separator check'>
                                    <div>Nombre:</div>
                                    <div>{reservation.user.nombre}</div>
                                </div>
                                <div className='separator check'>
                                    <div>Apellido:</div>
                                    <div>{reservation.user.apellido}</div>
                                </div>
                                <div className='separator check'>
                                    <div>Email:</div>
                                    <div>{reservation.user.email}</div>
                                </div>
                            </div>
                            <div className="container-datos-coworking">
                                <h2>Datos del Coworking</h2>
                                <div className="separator check" >
                                    <div>Nombre:</div>
                                    <div>{reservation.coworking.name}</div>
                                </div>
                                <div className="separator check" >
                                    <div>Ubicacion:</div>
                                    <div>{reservation.coworking.address}</div>
                                </div>
                                <div className='separator check'>
                                    <div>Check in:</div>
                                    {
                                        reservation.admision_time ?
                                            <div>{`${reservation.admision_time}hs - ${reservation.start_date}`}</div> :
                                            <div>{`${reservation.start_date}`}</div>
                                    }
                                </div>
                                <div className='separator check'>
                                    <div>Check out:</div>
                                    {
                                        reservation.admision_time ?
                                            <div>{`${reservation.admision_time}hs - ${reservation.start_date}`}</div> :
                                            <div>{`${reservation.end_date}`}</div>
                                    }
                                </div>
                            </div>

                        </div>
                        <button type="submit" className='btn btn-confirm'>Reservar</button>
                        <p style={{ alignSelf: "center" }}>¿No coinciden los datos? Realice la reserva nuevamente <span className="here" onClick={() => navigate(`/reservation/${id}`)}>aqui.</span>
                        </p>
                    </form>
                </div>
            }
        </>
    )
}