import "./coworkingRecommendation.css"
import { CoworkingCard } from "../coworkingCard/CoworkingCard"
import { coworking } from "../../data.json"

export const CoworkingRecommendation = () => {
  // este componente va a recibir un array de las oficinas mejor valoradas
  // por cada una de ellas vamos a crear un componenete CardRecommend

  const getCoworkingRecommendation = () => {
    return coworking
  }

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
      <div className="coworking-recommendation-container">
        {getRandomList(getCoworkingRecommendation()).filter(item => item.rating >= 4).map(item => (
          <CoworkingCard {...item} key={item.officeId} />
        ))}
      </div>
    </div>
  )
}
