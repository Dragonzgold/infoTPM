import React, { useState } from 'react'
import axios from 'axios';
import { Link } from "react-router-dom";
import { Label, Input } from 'reactstrap';
import { useHistory } from "react-router-dom";
import { useDataContext } from '../Context/dataContext';

function Account() {
  const history = useHistory();
  const [usu_email, setEmail] = useState('');
  const [usu_password, setPassword] = useState('');
  const [error, setError] = useState("");
  const [attemps, setAttemps] = useState(3);

  const [tkn, setTkn] = useState('');
  // const [error, setError] = useState("");
  // const [attemps, setAttemps] = useState(3);
  const { setLogged, setAccessToken, url } = useDataContext();
  // const [alertVisible, setAlertVisible] = useState(false);
  // const [inputDisabled, setInputDisabled] = useState(false);

  

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get(`${url}/Users`);
  //     setUsuarios(response.data);

  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const fetchData = async (email, password) => {
    try {
      const response = await axios.get(`${url}/Auth/login/${email}/${password}`);
      setAccessToken(response.data.data);
      console.log(response.data.data)
      const response2 = await axios.get(`${url}/Auth/findByToken/${response.data.data.access_token}`);
      setTkn(response2.data);
      setLogged(true);
      history.push({
        pathname: "/Perfil",
        state: {
          user: tkn,
        }
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginSuccessful = await fetchData(usu_email, usu_password);

    if (loginSuccessful) {

      return;
    }

    if (attemps === 0) {
      setError("Has superado el número de intentos. Intenta más tarde.");
      // setAlertVisible(true);
      // setInputDisabled(true);
    } else {
      setAttemps(attemps - 1);
      const errorMessage = `Correo o contraseña incorrectos. Inténtalo de nuevo. Intentos restantes: ${attemps}`;
      setError(errorMessage);
      // setAlertVisible(true);
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault(); // Previene el comportamiento predeterminado del formulario
  //   const user = usuarios.find((user) => user.usu_email === usu_email && user.usu_password === usu_password);

  //   if (attemps === 0) {
  //     setError("Has superado el número de intentos. Intenta más tarde.");
  //   }
  //   else if (user) {
  //     // Si se encuentra el usuario, cambia de ventana
  //     const usuario = usuarios.find(usuario => usuario.usu_email === usu_email);
  //     const usu_name = `${usuario.usu_name} ${usuario.usu_lastName}`;
  //     const fechaNacimiento = new Date(usuario.usu_birthday);
  //     const usu_birthday = new Date(Date.now() - fechaNacimiento.getTime()).getFullYear() - 1970;

  //     history.push({
  //       pathname: "/Perfil",
  //       state: { mail: usu_email,
  //                name: usu_name,
  //                birthday: usu_birthday, }
  //     });
  //   }
  //   else {
  //     // Si no se encuentra el usuario, establece un mensaje de error
  //     setAttemps(attemps - 1);
  //     setError(`Correo o contraseña incorrectos. Inténtalo de nuevo. Intentos restantes: ${attemps}`);
  //   }
  // };

  return (
      <div className='fondo'>
        <div className='containerInicioSesion'>
          <h1 className='titulo'>
            Inicio de Sesión
            <div className='rayaTitulo' />
            {error && <div className="error">{error}</div>}
          </h1>
          <div className='containerInterno'>
            <form className='Form' onSubmit={handleSubmit}>
              <Label className='correoInicioSesion' for="exampleEmail">
                Email
              </Label>
              <Input
                className='containerCorreo'
                type="email"
                value={usu_email}
                onChange={(e) => setEmail(e.target.value).toLowerCase()}
                name="email"
                id="exampleEmail"
                placeholder="Introduzca su correo"
              />
              <Label className='passwordInicioSesion' for="examplePassword">
                Password
              </Label>
              <Input
                className='containerPassword'
                id="examplePassword"
                name="password"
                placeholder="Introduzca su contraseña"
                type="password"
                value={usu_password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <h3 className='olvidarContraseña'>
                <Link to="/Recover">¿Olvidaste la contraseña?</Link>
              </h3>
              <div className='LoginButtons'>
                <button type="submit" className='botonInicio btnLogin'>
                  Iniciar Sesión
                </button>
                <Link to="/Register">
                  <button className='botonRegistro btnLogin'>
                    Registrar
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
  )
}

export { Account }