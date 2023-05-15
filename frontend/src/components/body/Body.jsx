import { OfficeListByCategory } from "../officeListByCategory/OfficeListByCategory"
import { RecommendedOffices } from "../recommendedOficces/RecommendedOffices"
import { Search } from "../search/Search"
import "./body.css"

export const Body = () => {
  return (
    <>
      <div className="body-comp">
        <Search />
        <div>
          <OfficeListByCategory />
          <RecommendedOffices />
        </div>
      </div>
    </>
  )
}
