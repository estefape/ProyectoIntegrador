import "./officeListByCategory.css"
import { CardCategory } from "../cardCategory/CardCategory";

export const OfficeListByCategory = () => {
  // este componente va a recibir un array con las categorias de las oficinas
  // y los cantidad de resultados que corresponde a cada categoria
  // y una imagen que represente a cada categoria
  // por cada categoria vamos a generar un componente CardCategory
  return (
    <>
      <div className="office-list-comp">
        <h2>Buscar por tipo de oficina</h2>
        <div>
          
          <CardCategory image="/images/photo1.jpg"/>
          <CardCategory image="/images/photo2.jpg"/>
          <CardCategory image="/images/photo3.jpg"/>
          <CardCategory image="/images/photo4.jpg"/>

        </div>
      </div>
    </>
  );
};
