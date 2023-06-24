import { authorizationUser } from "./userService";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

export const postData = async (url, data) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: buildHeadersJSON(),
        body: JSON.stringify(data)
    })
    return response
}

export const putData = async (url, data) => {
    const response = await fetch(url, {
        method: 'PUT',
        headers: buildHeadersJSON(),
        body: JSON.stringify(data)
    })
        
    return response
}
export const postDataWithFormData = async (url, data) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: buildHeaders(),
        body: data,
    })
    return response
}

export const getData = async (url) => {
    try {
        const requestConfig = {
            method: 'GET',
        }

        const response = await fetch(url, requestConfig);
        return await response.json();
    }
    catch (error) {
        console.log(error);
        return null;
    }
}

export const deleteData = async (url) => {
    const response = await fetch(url, {
        method: 'DELETE',
        headers: buildHeaders(),
    })
    return response
}

const buildHeaders = () => {
    const headers = new Headers()

    headers.append('Authorization', `Basic ${authorizationUser()}`)
    headers.append("Cookie", "JSESSIONID=84FFC7022AF0BB7B17746928F3A93B44");

    return headers
}

const buildHeadersJSON = () => {
    const headers = new Headers()

    headers.append('Authorization', `Basic ${authorizationUser()}`)
    headers.append("Cookie", "JSESSIONID=84FFC7022AF0BB7B17746928F3A93B44");
    headers.append('Content-Type', 'application/json');

    return headers
}

export const getDateFromString = (dateString) => {
    try {
        const date = dayjs(dateString, 'DD/MM/YYYY').toDate();
        if (date.toString() === 'Invalid Date') {
            console.error('Formato de fecha invalido', dateString);
            return null;
        }
        return date
    } catch (error) {
        console.error('Formato de fecha invalido', dateString);
        return null;
    }
    
}

export const getStringFromDate = (date) => {
    try {
        return dayjs(date).format('DD/MM/YYYY');
    } catch (error) {
        console.error('Formato de fecha invalido', dateString);
        return null;
    }
    
}