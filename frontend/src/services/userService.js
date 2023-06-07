export const authorizationUser = () => {
    const userData = JSON.parse(atob(localStorage.getItem('data')))
    return btoa(`${userData.email}:${userData.password}`)
}