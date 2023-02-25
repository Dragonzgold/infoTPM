import React from 'react';
import Menu from "./NavbarTPM";
import "../css/recuperarPassword.css";
import { Link } from "react-router-dom";

export default function RecuperarPassword(){
    return(
        <div>
            <Menu />

            <div className='containerRecuperarPassword'>
                <h1 className='tituloRestablecerContraseña'>
                    Restablecer Contraseña
                    <hr className='rayaTitulo'/>
                </h1>
                <div className='containerInternoPassword'>
                    <p className='introducirCorreoPassword'>Ingrese su correo electrónico para buscar su cuenta</p>
                    <h2 className='correoPassword'>Correo Electronico</h2>
                    <input className='inputCorreoPassword' placeholder='Introduzca su correo'/>
                    <button className='buttonBuscarPassword'> Buscar</button>
                    <Link to="/"><button className='buttonCancelarPassword'>Cancelar</button></Link>
                </div>
            </div>
        </div>
    )
}