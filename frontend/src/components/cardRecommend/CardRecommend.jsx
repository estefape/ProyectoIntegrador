import "./cardRecommend.css"
import { Icons } from "../icons/Icons";

export const CardRecommend = () => {
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
          <img src="https://picsum.photos/600/400" alt="" />
        </div>
        <div className="card-recommend-container">
          <div className="card-recommend-top">
            <h3>Nombre de la oficina</h3>
            <div>
              <p> <Icons name="star" /> Muy Bueno</p>
            </div>
          </div>
          <div className="card-recommend-body">
            <div>
              <p> <Icons name="pin" /> A 940m del Centro</p>
              <p>MOSTRAR EN EL MAPA</p>
            </div>
          </div>
          <div className="card-recommend-footer">
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non sunt molestias et placeat, expedita debitis vero nihil perferendis magnam sequi eum porro incidunt facere, illum temporibus voluptatem repudiandae cumque ipsam!</p>
            <button className='btn'>Ver mas...</button>
          </div>
        </div>
      </div>
    </>
  );
};
