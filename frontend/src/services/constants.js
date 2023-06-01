const root = 'http://localhost:8080/api'

export const constants = {
    PRODUCTS_ENDPOINT: root + '/Products/',
    CATEGORIES_ENDPOINT: root + '/Categories',
    LOGIN_ENDPOINT: `${ root }/auth/login`,
    REGISTER_ENDPOINT: `${ root }/auth/register`,
}