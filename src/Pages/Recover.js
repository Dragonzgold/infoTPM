import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { Link } from "react-router-dom";
import { Label, Input } from 'reactstrap';
import { useHistory } from 'react-router-dom';

function Recover() {
  const [to, setTo] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const history = useHistory();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://infotpm-backend-production.up.railway.app/Users');
      setUsuarios(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (event) =>{
    event.preventDefault();
    const user = usuarios.find((user) => user.usu_email !== to);
    if (!user) {
      alert('El correo no existe');
      return;
    }
    try {
      axios.post(
        'https://infotpm-backend-production.up.railway.app/Email',
        {
          to,
        }
      );
      alert('El correo fue enviado con exito');
      setTo('');
      history.push('/Account');
    } catch (error) {
      console.log(error);
    }
  }

  return (
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
      </div>
    </div>
  )
}

export { Recover }