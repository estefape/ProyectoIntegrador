import "./categoryList.css"
import { CategoryCard } from "../categoryCard/categoryCard";

export const CategoryList = () => {
  // este componente va a recibir un array con las categorias de las oficinas
  // y los cantidad de resultados que corresponde a cada categoria
  // y una imagen que represente a cada categoria
  // por cada categoria vamos a generar un componente CardCategory
  return (
    <>
      <div className="office-list-comp">
        <h2>Buscar por tipo de oficina</h2>
        <div>
          
          <CategoryCard image="/images/photo1.jpg" name="Coworking Sectorial"/>
          <CategoryCard image="/images/photo2.jpg" name="Coworking Compartido"/>
          <CategoryCard image="/images/photo3.jpg" name="Coworking Fijo"/>
          <CategoryCard image="/images/photo4.jpg" name="Coworking Incubador"/>

        </div>
      </div>
    </>
  );
};
