import { CardCategory } from "./CardCategory"
import { OfficeListByCategory } from "./OfficeListByCategory"
import { RecommendedOffices } from "./RecommendedOffices"
import { Search } from "./Search"

export const Body = () => {
  return (
    <>
      <div className="body-comp">
        <Search/>
        <OfficeListByCategory/>
        <RecommendedOffices/>
      </div>
    </>
  )
}
