import { constants } from "./constants"
import { getData, postData } from "./utils"

export const categoryRegister = (category = {}) => {
    return postData(constants.REGISTER_CATEGORIES_ENDPOINT, category)
}

export const categoryAll = () => {
    return getData(constants.ALL_CATEGORIES_ENDPOINT )
}