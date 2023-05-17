import "./recommendedOffices.css"
import { CardRecommend } from "../cardRecommend/CardRecommend"

export const RecommendedOffices = () => {
  // este componente va a recibir un array de las oficinas mejor valoradas
  // por cada una de ellas vamos a crear un componenete CardRecommend

  const getRecommendedOfficesList = () => {
    return [
      {
        image: "/images/photo5.jpg", 
        name: "Gamer", 
        category: "Coworking Sectorial", 
        city: "Buenos Aires", 
        address: "Av. Pres. Figueroa Alcorta 7597, C1428 CABA", 
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      },
      {
        image: "/images/photo6.jpg", 
        name: "Compartidos", 
        category: "Coworking compartido", 
        city: "Cordoba", 
        address: "Bv. Sarmiento, Av. Uruguay esq, X5152 Villa Carlos Paz, Córdoba", 
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      },
      {
        image: "/images/photo7.jpg", 
        name: "Cubiculos", 
        category: "Coworking fijo", 
        city: "Buenos Aires", 
        address: "Av. Pres. Figueroa Alcorta 7597, C1428 CABA", 
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      },
      {
        image: "/images/photo8.jpg", 
        name: "Start Up", 
        category: "Coworking incubador", 
        city: "Mendoza", 
        address: "Av. de Acceso Este 3280, M5500 Guaymallén, Mendoza", 
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      }
    ]
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
          {getRandomList(getRecommendedOfficesList()).map(item =>(
            <CardRecommend {...item} />
          ))}
        </div>
      </div>
    </>
  )
}
