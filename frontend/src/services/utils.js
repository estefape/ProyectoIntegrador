export const postData = async (url, data) => {
    console.log(JSON.stringify(data))
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return response
}