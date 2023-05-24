import { constants } from "./constants"
import { postData, getData, deleteData } from "./utils"

export const productRegister = (product = {}) => {
    return postData(constants.REGISTER_PRODUCTS_ENDPOINT, product)
}

export const productDelete = (id) => {
    return deleteData(constants.DELETE_PRODUCTS_ENDPOINT + id)
}

export const productAll = () => {
    return getData(constants.ALL_PRODUCTS_ENDPOINT )
}