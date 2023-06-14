import React, { useEffect, useState, useContext } from "react";
import { CoworkingCard } from "../coworkingCard/CoworkingCard";
import AppContext from "../../context/AppContext";

export const SearchResult = () => {

    const { searchResults, showResults, selectedCity } = useContext(AppContext);

    if (!showResults) {
        return (<></>)
    }

    if (showResults && selectedCity && searchResults.length === 0) {
        return (<h3 className="no-results">No se han encontrado resultados para su busqueda</h3>)
    }

    return (
        <div className="coworking-recommendation">
            <h2>Resultados</h2>
            {searchResults.length > 0 ? 
            (
                <div className="coworking-recommendation-container">
                    {searchResults.map(item => (
                        <CoworkingCard product={{...item}} key={item.idCoworking} />
                    ))}
                </div>
            ) : 
            (<p>Cargando...</p>)}
        </div>
    )
}

