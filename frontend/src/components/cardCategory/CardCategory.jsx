import "./cardCategory.css";

export const CardCategory = ({image, name}) => {
  // cardCategory va a recibir cada objeto Category del back
  // y vamos a mostrar una imagen representativa de la categoria
  // el nombre de la categoria y la cantidad de resultados para esa categoria aprox
  return (
    <>
      <div className="card-category">
        <img
          src={image}
          className="card-category-img-top"
          alt="..."
        />
        <div className="card-category-body">
          {/* categoria */}
          <h4>{name}</h4>
          {/* cantidad de resultados */}
          <p>Cantidad de resultados</p>
        </div>
      </div>
    </>
  );
};
