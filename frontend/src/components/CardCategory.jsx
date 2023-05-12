export const CardCategory = () => {
  // cardCategory va a recibir cada objeto Category del back
  // y vamos a mostrar una imagen representativa de la categoria
  // el nombre de la categoria y la cantidad de resultados para esa categoria aprox
  return (
    <>
      <div className="card-category">
        <img
        // imagen categoria
          src="https://placehold.co/600x400"
          className="card-category-img-top"
          alt="..."
        ></img>
        <div className="card-category-body">
          {/* categoria */}
          <h4>Categoria</h4>
          {/* cantidad de resultados */}
          <p>Cantidad de resultados</p>
        </div>
      </div>
    </>
  );
};
