import "./coworkingRecommendation.css"
import { CoworkingCard } from "../coworkingCard/CoworkingCard"
import { useState, useEffect } from "react"
import { constants } from "../../services/constants"

export const CoworkingRecommendation = () => {

  const [coworkingRecommendation, setCoworkingRecommendation] = useState([]);

  const getData = async () => {
    const requestConfig = {
      method: 'GET',
    }

    const response = await fetch(`${constants.PRODUCTS_ENDPOINT}`, requestConfig);
    return await response.json();
  }

  useEffect(() => {
    getData().then(data => {
      setCoworkingRecommendation(data)
    });
  }, []);


  const getRandomList = (array) => {
    let arrayAleatorio = [...array]; // crea una copia del array original para no modificarlo
    for (let i = arrayAleatorio.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // selecciona un índice aleatorio
      [arrayAleatorio[i], arrayAleatorio[j]] = [arrayAleatorio[j], arrayAleatorio[i]]; // intercambia los elementos
    }
    return arrayAleatorio;
  }

  return (

    <div className="coworking-recommendation">
      <h2>Recomendaciones</h2>
      {coworkingRecommendation.length > 0 ?
        (
          <div className="coworking-recommendation-container">
            {getRandomList(coworkingRecommendation).map(item => (
              <CoworkingCard product={{...item}} key={item.idCoworking} />
            ))}
          </div>
        ) : (<p>Cargando...</p>)}
    </div>
  )
}
