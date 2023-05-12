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
              <p>8</p>
              <p>Muy Bueno</p>
            </div>
          </div>
          <div id="card-recommend-body">
            <div>
              <p>ICONO</p>
              <p>A 940m del Centro</p>
              <p>MOSTRAR EN EL MAPA</p>
            </div>
            <div>
              <p>ICONO</p>
              <p>ICONO</p>
            </div>
          </div>

          <div id="card-remmend-footer">
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non sunt molestias et placeat, expedita debitis vero nihil perferendis magnam sequi eum porro incidunt facere, illum temporibus voluptatem repudiandae cumque ipsam!</p>
            <button>Ver mas...</button>
          </div>
        </div>
      </div>
    </>
  );
};
