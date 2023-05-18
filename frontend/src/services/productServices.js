import { constants } from "./constants"
import { postData, getData } from "./utils"

export const productRegister = (product = {}) => {
    return postData(constants.REGISTER_PRODUCTS_ENDPOINT, product)
}

export const productAll = () => {
    return getData(constants.ALL_PRODUCTS_ENDPOINT )
}