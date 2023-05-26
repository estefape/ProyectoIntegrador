import "./login.css"

import React, { useState } from 'react'

export const Login = () => {

  const [user, setUser] = useState({
    email: "",
    password: "",
  })

  const submitForm = (e) => {
    e.preventDefault();
    console.log(user);
  }

  return (
    <div className="login-container" >

      <div className="login">

        <form onSubmit={submitForm}>

          <div className="login-pt1">

            <h1>Iniciar sesión</h1>
            <input
              className="input"
              type="email"
              placeholder="Ingrese su email..."
              id="email"
              name="email"
              value={user.email}
              onChange={e => setUser({ ...user, email: e.target.value})} />
            <input
              className="input"
              type="password"
              placeholder="Contraseña..."
              id="password"
              name="password"
              value={user.password}
              onChange={e => setUser({ ...user, password: e.target.value})} />
            <button
              className="btn"
              type="submit"
            >
              Ingresar
            </button>

          </div>



        </form>
        {/* 
        <div className="login-pt2">

          <p>Si no tienes cuenta puedes registrarte aqui...</p>
          <button className="btn" >Crear cuenta</button>

        </div> */}

      </div>

    </div>
  )
}
