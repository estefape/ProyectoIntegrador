import "./historyreserve.css"
import "../../components/favorites/favorites.css"
import { useContext, useEffect, useState } from "react"
import { getDataAuth } from "../../services/utils"
import { constants } from "../../services/constants"
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Link } from "react-router-dom";
import { Loading } from "../../components/loading/Loading";
import { HistoryCard } from "../../components/historyCard/HistoryCard";
import AppContext from "../../context/AppContext"


export const HistoryReserve = () => {

    const [historyList, setHistoryList] = useState(null);
    const { globalState: userAuth } = useContext(AppContext);


    useEffect(() => {
        getDataAuth(`${constants.RESERVATIONS_ENDPOINT}user?user=${userAuth.id}`)
            .then(data => setHistoryList(data.sort(ordernarPorFechaAnterior)))
    }, []);

    const ordernarPorFechaAnterior = (reservaA, reservaB) => {
        const fecha1 = reservaA.start_date.replaceAll("-", "").replace("T", "").replaceAll(":", "")
        const fecha2 = reservaB.start_date.replaceAll("-", "").replace("T", "").replaceAll(":", "")
        return fecha1 - fecha2;
    }


    return (
        <div className="history-reserve-page">

            <div className="title">
                <h1>Historial de reservas</h1>
                <Link className="arrowBack" to={`/`}>
                    <ChevronLeftIcon sx={{ fontSize: 50 }} className="icon" />
                </Link>
            </div>
            {
                historyList === null
                    ? (<Loading />)
                    : historyList.length == 0
                        ? (<h3 className="sin-coworking">No hay reservas</h3>)
                        : (<div className="coworking-favorito-container history-reserve-container">
                            {historyList.map((reserva, index) => <HistoryCard historyReserve={reserva} key={index} />)}
                        </div>)
            }
        </div>
    )
}