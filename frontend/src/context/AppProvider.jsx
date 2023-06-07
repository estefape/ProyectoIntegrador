import React, { useState } from 'react'
import AppContext from './AppContext'


export const AppProvider = ({ children }) => {

    const [globalState, setGlobalState] = useState({
        nombre: "",
        apellido: "",
        authenticado: false,
        email: "",
        roles: [],
    });


    // Aca van todos los metodos para extraer y setear los valores de las propiedades del Global Context,
    // una vez definidas recuerden pasarlas al value del context provider

    const getNameGlobalState = () => {
        return globalState.nombre;
    }

    const getSurnameGlobalState = () => {
        return globalState.apellido;
    }

    const isAuthGlobalState = () => {
        return globalState.authenticado;
    }

    const login = ({ nombre, apellido, email, roles }) => {
        setGlobalState({ ...globalState, nombre, apellido, email, authenticado: true, roles });
    }

    const getRolesGlobalState = () => {
        return globalState.roles;
    }

    const signOf = () => {
        localStorage.clear()
        setGlobalState({
            nombre: "",
            apellido: "",
            authenticado: false,
            email: "",
            roles: "",
        })
    }




    return (
        <AppContext.Provider value={{
            getNameGlobalState,
            getSurnameGlobalState,
            isAuthGlobalState,
            login,
            getRolesGlobalState,
            signOf
        }}>
            {children}
        </AppContext.Provider>
    )

}

export default AppProvider;
