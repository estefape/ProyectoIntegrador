import { constants } from "./constants"
import { getData } from "./utils"

export const categoryAll = () => {
    return getData(constants.ALL_CATEGORIES_ENDPOINT )
}