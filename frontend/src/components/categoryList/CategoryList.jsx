import "./categoryList.css"
import { CategoryCard } from "../categoryCard/categoryCard";
import { categories } from "../../data.json"
import { useEffect, useState } from "react";


export const CategoryList = () => {
  // este componente va a recibir un array con las categorias de las oficinas
  // y los cantidad de resultados que corresponde a cada categoria
  // y una imagen que represente a cada categoria
  // por cada categoria vamos a generar un componente CardCategory


  const [categoriesList, setCategoriesList] = useState([]);

  const getCategoriesList = () => {
    // Aca deberiamos hacer un fetch a la API para obtener las categorias
    return categories;
  }

  useEffect(() => {
    const data = getCategoriesList();
    setCategoriesList(data)
  }, []);

  return (
    <div className="category-list">
      <h2>Buscar por tipo de oficina</h2>
      <div className="category-list-container">
        {
          categoriesList ? (
            categoriesList.map(category => (<CategoryCard {...category} key={category.id} />))
          )
          :
          (<p>Cargando...</p>)
        }
      </div>
    </div>
  );
};
