import "./search.css";
import * as cityService from "../../services/cityServices";
import * as productService from "../../services/productServices";
import React, { useEffect, useState, useContext } from "react";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { locale, addLocale} from 'primereact/api';        
import "primereact/resources/primereact.css";       
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "primereact/resources/themes/saga-orange/theme.css";
import calendarESP from "../../data/calendar";
import AppContext from "../../context/AppContext";

export const Search = () => {
  const [cities, setCities] = useState([]);
  const [dates, setDates] = useState(null);
  const [products, setProducts] = useState([]);
  const { 
    setSearchResults, 
    setShowResults, 
    selectedCity, 
    setSelectedCity 
  } = useContext(AppContext);

  addLocale('es', calendarESP);
  useEffect(() => {
    cityService
      .cityAll()
      .then((response) => {
        return response;
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
    setSearchResults(products.filter(filterProductsByCity));
    setShowResults(true);
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
          numberOfMonths={2}
          selectionMode="range"
          locale="es"
          readOnlyInput
        />
        <button className="btn" onClick={handleSearch}>
          Buscar
        </button>
      </div>
    </div>

  );
};
