const root = 'http://localhost:8080/api'

export const constants = {
    PRODUCTS_ENDPOINT: `${root}/Products/`,
    CATEGORIES_ENDPOINT: `${root}/Categories/`,
    LOGIN_ENDPOINT: `${ root }/auth/login`,
    REGISTER_ENDPOINT: `${ root }/auth/register`,
    RATING_ENDPOINT: `${ root }/Ratings`,
    AUTH_HEADERS: {
        'Authorization': 'Basic ' + btoa('davidgalvis05@hotmail.com:Cow05*'),
        'Content-Type': 'application/json',
    },
}
