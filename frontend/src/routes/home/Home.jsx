import { OfficeListByCategory } from "../../components/officeListByCategory/OfficeListByCategory"
import { RecommendedOffices } from "../../components/recommendedOficces/RecommendedOffices"
import { Search } from "../../components/search/Search"
import "./home.css"

export const Home = () => {
  return (
    <>
      <div className="body-comp">
        <Search />
        <OfficeListByCategory />
        <RecommendedOffices />
      </div>
    </>
  )
}
