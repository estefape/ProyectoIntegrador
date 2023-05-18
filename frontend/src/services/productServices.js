import { constants } from "./constants"
import { postData } from "./utils"

export const productRegister = (product = {}) => {
    return postData(constants.REGISTER_PRODUCTS_ENDPOINT, product)
}