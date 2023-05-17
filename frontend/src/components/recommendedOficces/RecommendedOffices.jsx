import "./recommendedOffices.css"
import { CardRecommend } from "../cardRecommend/CardRecommend"

export const RecommendedOffices = () => {
  // este componente va a recibir un array de las oficinas mejor valoradas
  // por cada una de ellas vamos a crear un componenete CardRecommend
  return (
    <>
      <div className="recommended-offices-comp">
        <div>
          <h2>Recomendaciones</h2>
        </div>
        <div className="recommended-offices-comp-container">
          <CardRecommend image="/images/photo5.jpg"/>
          <CardRecommend image="/images/photo6.jpg"/>
          <CardRecommend image="/images/photo7.jpg"/>
          <CardRecommend image="/images/photo8.jpg"/>
        </div>
      </div>
    </>
  )
}
