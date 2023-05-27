import Swal from "sweetalert2"
import "./login.css"

import React, { useState } from 'react'

export const Login = () => {

  const [user, setUser] = useState({
    email: "",
    password: "",
  })

  const resetInputs = () => {
    setUser({
      email: "",
      password: "",
    })
  }

  const submitForm = (e) => {
    e.preventDefault();
    if (validation()) {

      Swal.fire({
        title: "Inicio de sesion exitoso!",
        text: "Seras redirigido...",
        icon: "success",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#F2921D",
      })
        .then(
          // TODO: peticion fetch al back para inicio de sesion...
          console.log(user)
        )

    }

  }

  const validation = () => {

    if (!user.email.includes("@")) {
      Swal.fire({
        title: "Error",
        text: "Email invalido!",
        icon: "error",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#F2921D",
      })

      resetInputs();
      return false;
    }

    if (user.password.length < 8) {
      Swal.fire({
        title: "Error",
        text: "Contraseña invalida!",
        icon: "error",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#F2921D",
      })

      resetInputs();
      return false;
    }

    return true;
  }

  return (
    <div className="login-container" >

      <div className="login">

        <form onSubmit={submitForm}>

          <div className="login-pt1">

            <div className="icon-container">
              <svg xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-person-check"
                viewBox="0 0 16 16">
                <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514ZM11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
                <path d="M8.256 14a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Z" />
              </svg>
              <h1>Iniciar sesión</h1>
            </div>
            <input
              className="input"
              type="email"
              placeholder="Ingrese su email..."
              id="email"
              name="email"
              value={user.email}
              onChange={e => setUser({ ...user, email: e.target.value })} />
            <input
              className="input"
              type="password"
              placeholder="Contraseña..."
              id="password"
              name="password"
              value={user.password}
              onChange={e => setUser({ ...user, password: e.target.value })} />
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
