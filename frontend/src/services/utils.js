export const postData = async (url, data) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
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
        method: 'DELETE'
    })
    return response
}