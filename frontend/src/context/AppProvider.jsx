import React, { useState } from 'react'
import AppContext from './AppContext'


export const AppProvider = ({ children }) => {

    const [globalState, setGlobalState] = useState({
        nombre: "Jorgelina",
        apellido: "Cueli",
        authenticado: false,
        email: "",
        password: "",
    })


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

    const login = ({
        email, password
    }) => {
        setGlobalState({ ...globalState, email, password, authenticado: true });
    }

    const signOf = () => {
        setGlobalState({
            nombre: "",
            apellido: "",
            authenticado: false,
            email: "",
            password: "",
        })
    }




    return (
        <AppContext.Provider value={{
            getNameGlobalState,
            getSurnameGlobalState,
            isAuthGlobalState,
            login,
            signOf
        }}>
            {children}
        </AppContext.Provider>
    )

}

export default AppProvider;
