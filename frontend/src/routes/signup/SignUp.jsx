import "./signup.css";
import React from 'react';

export const SignUp = () => {
    return (

        <div className="signup-container" >

            <div className="signup">

                <div className="signup-pt1" >
                    <h1>Crear cuenta</h1>
                    <input className="input" type="text" placeholder="Ingrese su nombre"/>
                    <input className="input" type="text" placeholder="Ingrese su apellido"/>
                    <input className="input" type="email" placeholder="Ingrese su email..." />
                    <input className="input" type="password" placeholder="Contraseña..." />
                    <input className="input" type="password" placeholder="Repita su contraseña..." />
                    <button className="btn" >Registrarse</button>
                </div>
            </div>

        </div>

    )
}
