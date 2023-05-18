import "./cardRecommend.css"
import { Icons } from "../icons/Icons";
import { Link } from 'react-router-dom';


export const CardRecommend = ({image, name, category, city, address, description, officeId}) => {
  // este componente va a recibir una oficina de buena valoracion
  // y de este vamos a extraer, la NOTA, el promedio ej: MUY BUENO, BUENO, etc
  // cant estrellas ?
  // distancia al centro de la ciudad en la que se encuentra
  // breve descripcion
  // comodidades ?
  return (
    <>
      <div className="card-recommend">
        <div className="card-recommend-img">
          <img src={image} alt="" />
        </div>
        <div className="card-recommend-container">
          <div className="card-recommend-top">
            <h3>{name}</h3>
            <h4>{category}</h4>
            <div>
              <p> <Icons name="star" /> Muy Bueno</p>
            </div>
          </div>
          <div className="card-recommend-body">
            <div>
              <p> <Icons name="pin" /> {address} {city}</p>
              <p>MOSTRAR EN EL MAPA</p>
            </div>
          </div>
          <div className="card-recommend-footer">
            <p>{description.substring(0, 100)}...</p>
            <Link className="btn" to={`/detail/${officeId}`}>Ver Mas</Link>
          </div>
        </div>
      </div>
    </>
  );
};
