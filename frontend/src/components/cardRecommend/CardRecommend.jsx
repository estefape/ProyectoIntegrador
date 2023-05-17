import "./cardRecommend.css"
import { Icons } from "../icons/Icons";

export const CardRecommend = ({image, name, category, city, address, description}) => {
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
            <p>{description}</p>
            <button className='btn'>Ver mas...</button>
          </div>
        </div>
      </div>
    </>
  );
};
