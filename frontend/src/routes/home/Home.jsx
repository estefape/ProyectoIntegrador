import { CategoryList } from "../../components/categoryList/CategoryList"
import { CoworkingRecommendation } from "../../components/coworkingRecommendation/CoworkingRecommendation"
import { Search } from "../../components/search/Search"
import "./home.css"

export const Home = () => {
  return (
    <>
      <div className="home">
        <Search />
        <CategoryList />
        <CoworkingRecommendation />
      </div>
    </>
  )
}
