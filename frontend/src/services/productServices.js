import { constants } from "./constants"
import { postData, getData, deleteData, postDataWithFormData } from "./utils"

export const productRegister = (product) => {
    return postDataWithFormData(constants.PRODUCTS_ENDPOINT, product)
}

export const productDelete = (id) => {
    return deleteData(constants.PRODUCTS_ENDPOINT + id)
}

export const productAll = () => {
    return getData(constants.PRODUCTS_ENDPOINT )
}