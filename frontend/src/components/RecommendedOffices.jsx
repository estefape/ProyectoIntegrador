import { CardRecommend } from "./CardRecommend"

export const RecommendedOffices = () => {
  // este componente va a recibir un array de las oficinas mejor valoradas
  // por cada una de ellas vamos a crear un componenete CardRecommend
  return (
    <>
        <div className="recommended-offices-comp">
        <h3 >Recomendaciones</h3>
        <div>
          
          <CardRecommend/>
          <CardRecommend/>

        </div>
      </div>
    </>
  )
}
