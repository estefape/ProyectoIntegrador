import { constants } from "./constants"
import { getData, postData, postDataWithFormData } from "./utils"

export const cityRegister = (city) => {
    return postDataWithFormData(constants.CITIES_ENDPOINT, city)
}

export const cityAll = () => {
    return getData(constants.CITIES_ENDPOINT )
}