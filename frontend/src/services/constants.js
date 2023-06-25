const root = 'http://3.141.149.37/api'

export const constants = {
    PRODUCTS_ENDPOINT: `${root}/Products/`,
    CATEGORIES_ENDPOINT: `${root}/Categories/`,
    LOGIN_ENDPOINT: `${root}/auth/login`,
    REGISTER_ENDPOINT: `${root}/auth/register`,
    RATING_ENDPOINT: `${root}/Ratings`,
    POLICY_ENDPOINT: `${root}/Policies`,
    CITIES_ENDPOINT: `${root}/Cities/`,
    FACILITIES_ENDPOINT: `${root}/Facilities/`,
    RESERVATIONS_ENDPOINT: `${root}/Reserves/`,
    AUTH_HEADERS: {
        'Authorization': 'Basic ' + btoa('davidgalvis05@hotmail.com:Cow05*'),
        'Content-Type': 'application/json',
    },
}
