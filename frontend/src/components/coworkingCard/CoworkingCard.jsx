import "./coworkingCard.css"
import { Icons } from "../icons/Icons";
import { Link } from 'react-router-dom';
import StarRating  from "../starRating/StarRating";


export const CoworkingCard = ({image, name, category, city, address, description, idCoworking, rating}) => {
  // este componente va a recibir una oficina de buena valoracion
  // y de este vamos a extraer, la NOTA, el promedio ej: MUY BUENO, BUENO, etc
  // cant estrellas ?
  // distancia al centro de la ciudad en la que se encuentra
  // breve descripcion
  // comodidades ?
  const images = image.split(";");

  const imageStyle = {
    backgroundImage: `url(${images[0]})`
  }

  return (
    <>
      <div className="coworking-card">
        <div className="coworking-card-img" style={ imageStyle }></div>
        <div className="coworking-card-container">
          <div className="coworking-card-top">
            <h3>{name}</h3>
            <h4>{category.name}</h4>
            <StarRating className="rating-container" value={rating?.rating || 0} />
          </div>
          <div className="coworking-card-body">
            <div>
              <p> <Icons name="pin" /> {address} {city}</p>
              <p>MOSTRAR EN EL MAPA</p>
            </div>
          </div>
          <div className="coworking-card-footer">
            <p>{description.substring(0, 70)}...</p>
            <Link className="btn" to={`/detail/${idCoworking}`}>Ver Mas</Link>
          </div>
        </div>
      </div>
    </>
  );
};
