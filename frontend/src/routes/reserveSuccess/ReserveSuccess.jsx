import "./reservesuccess.css";
import VerifiedIcon from '@mui/icons-material/Verified';

export const ReserveSuccess = () => {

    return (
        <div className="container">
            <div className="success">
                <div className="body">
                    <VerifiedIcon className="verified-icon"/>
                    <h1 className="title">¡Muchas gracias!</h1>
                    <p className="message">Su reserva se realizó con éxito.</p>
                </div>
                <button className="btn button-success">Ok</button>
            </div>
        </div>
    )
}