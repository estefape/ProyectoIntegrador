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
