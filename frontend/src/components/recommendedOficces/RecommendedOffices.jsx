import "./recommendedOffices.css"
import { CardRecommend } from "../cardRecommend/CardRecommend"

export const RecommendedOffices = () => {
  // este componente va a recibir un array de las oficinas mejor valoradas
  // por cada una de ellas vamos a crear un componenete CardRecommend
  return (
    <>
        <div className="recommended-offices-comp">
        <h2>Recomendaciones</h2>
        <div>
          
          <CardRecommend/>
          <CardRecommend/>
          <CardRecommend/>

        </div>
      </div>
    </>
  )
}
