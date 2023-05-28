import { constants } from "./constants"
import { postData, getData, deleteData, putData } from "./utils"

export const productRegister = (product = {}) => {
    return postData(constants.REGISTER_PRODUCTS_ENDPOINT, product)
}

export const productDelete = (id) => {
    return deleteData(constants.PRODUCTS_ENDPOINT + id)
}

export const productAll = () => {
    return getData(constants.ALL_PRODUCTS_ENDPOINT )
}

export const productFindById = (id) => {
    return getData(constants.PRODUCTS_ENDPOINT + id)
}

export const productUpdate = (product) => {
    return putData(constants.UPDATE_PRODUCTS_ENDPOINT, product)
}