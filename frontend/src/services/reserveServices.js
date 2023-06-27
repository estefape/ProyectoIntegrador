import { constants } from "./constants"
import { getData, postData } from "./utils"

export const reserveAll = () => {
    return getData(constants.RESERVATIONS_ENDPOINT )
}

export const reserveFindByDates = (startDate, endDate) => {
    return getData(constants.RESERVATIONS_ENDPOINT + 'availability?' + 'startDate='+ startDate + '&endDate=' + endDate)
}

export const createReserve = (reservation) => {
    return postData(constants.RESERVATIONS_ENDPOINT, reservation)
}

