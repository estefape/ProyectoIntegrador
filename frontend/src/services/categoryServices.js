import { constants } from "./constants"
import { getData, postData, postDataWithFormData } from "./utils"

export const categoryRegister = (category) => {
    return postDataWithFormData(constants.REGISTER_CATEGORIES_ENDPOINT, category)
}

export const categoryAll = () => {
    return getData(constants.ALL_CATEGORIES_ENDPOINT )
}