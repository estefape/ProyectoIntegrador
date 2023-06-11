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


      {
        productsFilter.length > 1 ? (
          <>
            <div className="result-list">
              <h2>Resultados</h2>
              <div className="result-list-container">
                <Swiper
                  navigation={true}
                  slidesPerView={1}
                  spaceBetween={20}
                  modules={[Navigation]}
                  breakpoints={{
                    768: {
                      slidesPerView: 1,
                      spaceBetween: 20,
                    },
                    992: {
                      slidesPerView: 1,
                      spaceBetween: 20,
                    },
                  }}
                  className="mySwiper"
                >
                  {productsFilter.map(product => (
                    <SwiperSlide key={`swiper-${product.idCoworking}`}>
                      <CoworkingCard  {...product} key={product.idCoworking} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </>)

          :
          (<></>)
      }

    </div>

  );
};
