import "./cardRecommend.css"

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
          <img src="" alt="" />
        </div>
        <div id="card-recommend-container">
          <div id="card-recommend-top">
            <h3>Nombre de la oficina</h3>
            <div>
              <svg
                fill="#f2921d"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" /></svg>
              <p>Muy Bueno</p>
              {/* <p>8</p> */}
            </div>
          </div>
          <div id="card-recommend-body">
            <div>
              <svg
                fill="#f2921d"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" /></svg>
              <p>A 940m del Centro</p>
              <p>-</p>
              <p>MOSTRAR EN EL MAPA</p>
            </div>
            {/* <div>
              <p>ICONO</p>
              <p>ICONO</p>
            </div> */}
          </div>

          <div id="card-recommend-footer">
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non sunt molestias et placeat, expedita debitis vero nihil perferendis magnam sequi eum porro incidunt facere, illum temporibus voluptatem repudiandae cumque ipsam!</p>
            <button>Ver mas...</button>
          </div>
        </div>
      </div>
    </>
  );
};
