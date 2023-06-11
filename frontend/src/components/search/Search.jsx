import "./search.css";
import * as cityService from "../../services/cityServices";
import * as productService from "../../services/productServices";
import React, { useEffect, useState } from "react";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import "primereact/resources/primereact.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "primereact/resources/themes/saga-orange/theme.css";
import "./search.css";
import { CoworkingCard } from "../coworkingCard/CoworkingCard";
import { SwiperSlide, Swiper } from "swiper/react";
import { Navigation } from "swiper";


export const Search = () => {
  const [cities, setCities] = useState([]);
  const [dates, setDates] = useState(null);
  const [products, setProducts] = useState([]);
  const [productsFilter, setProductsFilter] = useState([products]);
  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    cityService
      .cityAll()
      .then((response) => {
        return response.json();
      })
      .then((cities) => {
        setCities(cities);
      });

    productService
      .productAll()
      .then((response) => {
        return response.json();
      })
      .then((productList) => {
        setProducts(productList);
      });
  }, []);

  const filterProductsByCity = (product) => {
    return product.city?.name == selectedCity.name;
  };

  const handleSearch = () => {
    setProductsFilter(products.filter(filterProductsByCity));
  };

  console.log(productsFilter)

  return (
    <div className="search">
      <h2>Busca ofertas en oficinas...</h2>
      <div className="search-container">
        <Dropdown
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.value)}
          options={cities}
          optionLabel="name"
          placeholder="Seleccione una Ciudad"
          filter
        />
        <Calendar
          placeholder="Seleccione fechas disponibles"
          id="calendar-picker"
          value={dates}
          onChange={(e) => setDates(e.value)}
          selectionMode="range"
          readOnlyInput
        />
        <button className="btn" onClick={handleSearch}>
          Buscar
        </button>
      </div>
      {/* El estado productsFilter contiene la lista de productos filtrados segun los criterios
      de busqueda, reemplazar este bloque por el renderizado de los productos mostrados con cards
      en la seccion home */}
      {/* <div>
        {productsFilter.map((prod) => {
          return (
            <p className="co-filter" key={prod.name}>
              {prod.name}
            </p>
          );
        })}
      </div> */}

      <div className="category-list">
        <h2>Buscar por tipo de oficina</h2>
        <div className="category-list-container">
          {
            productsFilter ? (
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
                {productsFilter.map(product => (
                  <SwiperSlide key={`swiper-${product.idCoworking}`}>
                    <CoworkingCard  {...product} key={product.idCoworking} />
                  </SwiperSlide>
                ))}
              </Swiper>
            )
              :
              (<p>Cargando...</p>)
          }
        </div>
      </div>

    </div>
  );
};
