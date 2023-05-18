import { constants } from "./constants"
import { postData } from "./utils"

export const productRegister = (product = {}) => {
    return postData(constants.PRODUCTS_ENDPOINT, product)
}