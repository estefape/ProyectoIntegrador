import "./search.css"
import * as cityService from "../../services/cityServices";
import React, {useEffect, useState } from "react";
import useForm from "../../hooks/useForm";
import { Calendar } from 'primereact/calendar';

import 'primereact/resources/primereact.css';                       // core css
import 'primeicons/primeicons.css';                                 // icons
import 'primeflex/primeflex.css';  
import 'primereact/resources/themes/saga-orange/theme.css'
import './search.css'

export const Search = () => {

  const [ { city }, handleInputChanges, handleFileChanges, reset,] = useForm({ city: "", });
  const [cities, setCities] = useState([]);
  const [dates, setDates] = useState(null);

  useEffect(() => {
      cityService
      .cityAll()
      .then((response) => {
        return response.json();
      })
      .then((cities) => {
        setCities(cities);
      });   
  }, []);

  return (
    <div className="search">
      <h2>Busca ofertas en oficinas...</h2>
      <div className="search-container">
        <select name="city" value={city} onChange={handleInputChanges}>
          <option value="">Seleccione una ciudad</option>
            {cities.map((cit) => {
              return (
                <option key={cit.idCity} value={cit.idCity}>
                  {cit.name}
                </option>
              );
            })}
        </select> 
        
            <Calendar id="calendar-picker" value={dates} onChange={(e) => setDates(e.value)} selectionMode="range" readOnlyInput />

        <button className="btn">Buscar</button>
      </div>
    </div>
  )
}
