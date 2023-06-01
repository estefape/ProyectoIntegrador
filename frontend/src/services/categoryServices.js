import { constants } from "./constants"
import { getData, postData, postDataWithFormData } from "./utils"

export const categoryRegister = (category) => {
    return postDataWithFormData(constants.CATEGORIES_ENDPOINT, category)
}

export const categoryAll = () => {
    return getData(constants.CATEGORIES_ENDPOINT )
}