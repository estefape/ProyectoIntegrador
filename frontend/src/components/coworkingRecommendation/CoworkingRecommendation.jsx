import "./coworkingRecommendation.css"
import { CoworkingCard } from "../coworkingCard/CoworkingCard"
import oficinas from "../../data.json"

export const CoworkingRecommendation = () => {
  // este componente va a recibir un array de las oficinas mejor valoradas
  // por cada una de ellas vamos a crear un componenete CardRecommend

  const getCoworkingRecommendation = () => {
    return oficinas
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
    <>
      <div className="recommended-offices-comp">
        <div>
          <h2>Recomendaciones</h2>
        </div>
        <div className="recommended-offices-comp-container">
          {getRandomList(getCoworkingRecommendation()).map(item =>(
            <CoworkingCard {...item} key={item.officeId} />
          ))}
        </div>
      </div>
    </>
  )
}
