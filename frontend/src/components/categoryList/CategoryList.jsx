import "./categoryList.css"
import { CategoryCard } from "../categoryCard/categoryCard";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import { constants } from "../../services/constants";


export const CategoryList = () => {
  // este componente va a recibir un array con las categorias de las oficinas
  // y los cantidad de resultados que corresponde a cada categoria
  // y una imagen que represente a cada categoria
  // por cada categoria vamos a generar un componente CardCategory


  const [categoriesList, setCategoriesList] = useState([]);

  const getCategoriesList = async() => {
    // Aca deberiamos hacer un fetch a la API para obtener las categorias
    const requestConfig = {
      method: 'GET',
    }

    const response = await fetch(`${constants.CATEGORIES_ENDPOINT}`, requestConfig);
    return await response.json();
  }

  useEffect(() => {
    getCategoriesList().then(data => setCategoriesList(data));
  }, []);

  return (
    <div className="category-list">
      <h2>Buscar por tipo de oficina</h2>
      <div className="category-list-container">
        {
          categoriesList ? (
            <Swiper
              navigation={true}
              slidesPerView={1}
              spaceBetween={20}
              modules={[Navigation]}
              breakpoints={{
                768: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                992: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                }
              }}
              className="mySwiper"
            >
               {categoriesList.map(category => (
                  <SwiperSlide key={`swiper-${category.idCategory}`}>
                    <CategoryCard {...category} key={category.idCategory} />
                  </SwiperSlide>
                ))}
            </Swiper>
          )
          :
          (<p>Cargando...</p>)
        }
      </div>
    </div>
  );
};
