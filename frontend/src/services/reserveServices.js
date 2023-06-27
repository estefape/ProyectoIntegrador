import { constants } from "./constants"
import { getData, postData, postDataWithToken } from "./utils"

export const reserveAll = () => {
    return getData(constants.RESERVATIONS_ENDPOINT )
}

export const reserveFindByDates = (startDate, endDate) => {
    return getData(constants.RESERVATIONS_ENDPOINT + 'availability?' + 'startDate='+ startDate + '&endDate=' + endDate)
}

export const createReserve = (reservation) => {
    return postDataWithToken("http://3.141.149.37/api/Reserves", reservation, 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0QHRlc3QuY29tIiwiaWF0IjoxNjg3ODc1ODgwLCJleHAiOjE2ODg0ODA2ODB9.CvT8t_D1nxM-LGrEwqe3hOeaD4vrd1sZ7d2znKnU13wp67eSSbNTPxubu-ksfI0P8GMWlNCmYjIffyou1cLcKg')
}

