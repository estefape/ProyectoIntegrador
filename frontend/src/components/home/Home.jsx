import { OfficeListByCategory } from "../officeListByCategory/OfficeListByCategory"
import { RecommendedOffices } from "../recommendedOficces/RecommendedOffices"
import { Search } from "../search/Search"
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
