import React, { useState } from 'react'
import axios from 'axios';
import { Link } from "react-router-dom";
import { Label, Input } from 'reactstrap';
import { useHistory } from "react-router-dom";
import { useDataContext } from '../Context/dataContext';

function Admin() {
  const history = useHistory();
  const [adm_email, setEmail] = useState('');
  const [adm_password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [attemps, setAttemps] = useState(3);
  const { setLogged, setAccessAdminToken, url } = useDataContext();
  const [tkn, setTkn] = useState('');

  const fetchData = async (email, password) => {
    try {
      const response = await axios.get(`${url}/Auth/loginAdmin/${email}/${password}`);
      setAccessAdminToken(response.data.data);
      const response2 = await axios.get(`${url}/Auth/findByTokenAdmin/${response.data.data.access_token}`);
      setTkn(response2.data);
      setLogged(true);
      history.push({
        pathname: "/VariableEditor",
        state: {
          user: tkn,
        }
      });
    } catch (error) {
      throw new Error("Inicio de sesión fallido");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
  
    try {
      await fetchData(adm_email, adm_password);
 
    } catch (error) {
      if (attemps === 0) {
        setError("Has superado el número de intentos. Intenta más tarde.");
      } else {
        setAttemps(attemps - 1);
        const errorMessage = `Correo o contraseña incorrectos. Inténtalo de nuevo. Intentos restantes: ${attemps}`;
        setError(errorMessage);
      }
    }
  };

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
              value={adm_email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={adm_password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <h3 className='olvidarContraseña'>
              <Link to="/Recover">¿Olvidaste la contraseña?</Link>
            </h3>
            <div className='LoginButtons__admin'>
              <button type="submit" className='botonInicio btnLogin'>
                Iniciar Sesión
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export { Admin }