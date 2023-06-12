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


export const Search = ({ customEvent }) => {
  const [cities, setCities] = useState([]);
  const [dates, setDates] = useState(null);
  const [products, setProducts] = useState([]);
  const [productsFilter, setProductsFilter] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [showResult, setShowResult] = useState(false);

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
    setShowResult(true);
    customEvent(true);
  };

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
        showResult ?
          productsFilter.length > 0 ? (
            <>
              <div className="result-list">
                <h2>Resultados encontrados ({productsFilter.length})</h2>
                <div className="result-list-container">
                  <Swiper
                    navigation={true}
                    slidesPerView={1}
                    spaceBetween={20}
                    modules={[Navigation]}
                    centerInsufficientSlides={true}
                    breakpoints={{
                      768: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                      },
                      992: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                      },
                    }}
                    className="mySwiper"
                  >
                    {productsFilter.map(product => (
                      <SwiperSlide key={`swiper-${product.idCoworking}`}>
                        <CoworkingCard 
                          clasePersonalizada={'result-card'} 
                          product={{ ...product }} 
                          key={product.idCoworking} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            </>)

            : (
                selectedCity && 
                productsFilter.length === 0 &&
                <h3 className="no-results">No se han encontrado resultados para su busqueda</h3>
              )

          : <></>
      }


    </div>

  );
};
