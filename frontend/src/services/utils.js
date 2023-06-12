import { authorizationUser } from "./userService"

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
    const response = await fetch(url, {
        method: 'GET'
    })
    return response
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