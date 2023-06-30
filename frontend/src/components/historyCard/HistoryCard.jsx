import { getStringFromDate } from "../../services/utils";
import "./historycard.css"
import "../categoryCard/categoryCard.css";
import { Icons } from "../icons/Icons";


export const HistoryCard = ({ historyReserve: { start_date, end_date, coworking } }) => {

    const images = coworking.image.split(";");

    const imageStyle = {
        backgroundImage: `url(${images[0]})`
    }

    return (
        <div className="card-category card-history">
            <div className="history-card-img" style={imageStyle}></div>
            <div className="card-category-body">
                <h4 className="card-info-title">{coworking.name}</h4>
                <div className="history-card-info">
                    <p>{coworking.category.name}</p>
                    <p>{`Check in: ${getStringFromDate(start_date)}`}</p>
                    <p>{`Check out: ${getStringFromDate(end_date)}`}</p>
                    <div className="card-info-location">
                        <Icons name="pin" />
                        <p>{coworking.address}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};