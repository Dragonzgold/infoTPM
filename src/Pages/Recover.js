import React, { useState } from 'react'
import axios from 'axios';
import { Label, Input } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useHistory, Redirect } from 'react-router-dom';
import { useDataContext } from '../Context/dataContext';

function Recover() {
  const { logged, url } = useDataContext();
  const history = useHistory();
  const [to, setTo] = useState("");

  const handleSubmit = async () => {
    try {
      await axios.post(`${url}/Mailer/emailRecovery/${to}`);
      toast.success('El correo fue enviado con éxito');
      setTo('');
      setTimeout(() => {
        history.push('/Account');
      }, 3000);
    } catch (error) {
      console.log(error);
      toast.error('Hubo un error al enviar el correo');
    }
  };

  return (
    logged ? (
      <Redirect to="/Perfil" />
    ) : (
      <div>
        <div className='containerRecuperarPassword'>
          <h1 className='titulo'>
            Restablecer Contraseña
            <div className='rayaTitulo' />
          </h1>

          <div className='containerInternoPassword'>
            <div className='Form'>
              <p className='introducirCorreoPassword'>Ingrese su correo electrónico para buscar su cuenta</p>

              <Label className='correoPassword' for="exampleEmail">
                Email
              </Label>
              <Input
                className='inputCorreoPassword'
                type="email"
                name="email"
                id="to"
                onChange={(e) => setTo(e.target.value)}
                placeholder="Introduzca su correo"
              />

              <div className='RecoverButtons'>
                <button className='buttonBuscarPassword btnRecover' onClick={handleSubmit} > Buscar</button>
                <Link to="/Account"><button className='buttonCancelarPassword btnRecover'>Cancelar</button></Link>
              </div>
            </div>
          </div>
        <ToastContainer />
        </div>
      </div>
    )
  );
}

export { Recover }