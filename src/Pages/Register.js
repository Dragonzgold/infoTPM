import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Label, Input } from "reactstrap";
import { useHistory, Redirect } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { useDataContext } from "../Context/dataContext";
import { ToastContainer, toast } from "react-toastify";

function Register() {
  const history = useHistory();
  const [usu_name, setName] = useState("");
  const [usu_lastName, setLastname] = useState("");
  const [usu_email, setEmail] = useState("");
  const [usu_password, setPassword] = useState("");
  const { logged, url } = useDataContext();

  const handleSubmit = async (event) => {
    if (usu_name.length <= 13 && usu_lastName.length <= 13) {
      if(usu_password.length >=6 && usu_password.length <=15){
        event.preventDefault();
      try {
        await axios.post(`${url}/Auth/register`, {
          usu_name,
          usu_lastName,
          usu_email,
          usu_password,
          usu_role: "user",
        });
        await axios.post(`${url}/Mailer/EmailWelcome/${usu_email}`);
        toast.success("¡Registro exitoso!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setName("");
        setLastname("");
        setEmail("");
        setPassword("");

        history.push("/Account");
      } catch (error) {
        toast.error(error, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      }else{
        alert("Su contraseña no es valida (6 - 15 caracteres)")
      }
    }else{
      alert("El nombre del usuario o contraseña es mayor a 10 caracteres")
    }
  };

  return logged ? (
    <Redirect to="/Perfil" />
  ) : (
    <div>
      <div className="containerInternoRegistro">
        <h1 className="titulo">
          Registrar Usuario
          <div className="rayaTitulo" />
        </h1>
        <div className="containerInformacionRegistro">
          <form onSubmit={handleSubmit} className="Form">
            <div className="FormName">
              <div className="Nombre">
                <Label className="nombreRegistro" htmlFor="exampleName">
                  Nombre
                </Label>
                <Input
                  className="inputNombreRegistro"
                  type="text"
                  name="Name"
                  defaultValue={usu_name}
                  onChange={(event) => setName(event.target.value)}
                  id="exampleName"
                  placeholder="Introduzca su Nombre..."
                  pattern="^[A-ZÑa-zñ]+$"
                  maxLength="48"
                  required
                />
              </div>
              <div className="Apellido">
                <Label className="apellidoRegistro" htmlFor="exampleApellido">
                  Apellido
                </Label>
                <Input
                  className="inputApellidoRegistro"
                  type="text"
                  name="Apellido"
                  defaultValue={usu_lastName}
                  onChange={(event) => setLastname(event.target.value)}
                  id="exampleApellido"
                  placeholder="Introduzca su Apellido..."
                  pattern="^[A-ZÑa-zñ]+$"
                  maxLength="48"
                  required
                />
              </div>
            </div>
            <Label className="correoRegistro" htmlFor="exampleEmail">
              Email
            </Label>
            <Input
              className="inputCorreoRegistro"
              type="email"
              name="email"
              defaultValue={usu_email}
              onChange={(event) => setEmail(event.target.value)}
              id="exampleEmail"
              placeholder="Introduzca su correo..."
              required
            />

            <Label className="contrasenaRegistro" htmlFor="examplePassword">
              Password
            </Label>
            <Input
              className="inputContrasenaRegistro"
              id="examplePassword"
              name="password"
              defaultValue={usu_password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="password"
              type="password"
              required
            />

            <div className="RegisterButtons">
              <Link to="/Account">
                <button className="botonVolverRegistro btnRegister">
                  Volver
                </button>
              </Link>
              <button
                className="botonRegistrarseRegistro btnRegister"
                type="submit"
              >
                Registrarse
              </button>
            </div>
          </form>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}

export { Register };
