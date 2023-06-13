import { useEffect, useState } from "react"
import { CategoryList } from "../../components/categoryList/CategoryList"
import { CoworkingRecommendation } from "../../components/coworkingRecommendation/CoworkingRecommendation"
import { Search } from "../../components/search/Search"
import "./home.css"

export const Home = () => {

  const [ hiddenRecommedations, setHiddenRecommedantions ] = useState(false);

  const handleCustomEvent = ( value ) => {
    setHiddenRecommedantions( value );
  }

  return (
    <>
      <div className="home">
        <Search customEvent={handleCustomEvent} />
        <CategoryList />
        { !hiddenRecommedations && <CoworkingRecommendation /> }
      </div>
    </>
  )
}
