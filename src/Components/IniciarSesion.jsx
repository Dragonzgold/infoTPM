import React from 'react';
import "../css/iniciarSesion.css";
import Menu from "./NavbarTPM";
import { Link } from "react-router-dom";

export default function IniciarSesion(){
    return(
        <div className='fondo'>
            <Menu />
            <div className='containerInicioSesion'>
                <h1 className='titulo'>
                    Inicio de Sesión
                    <hr className='rayaTitulo'/>
                </h1>
                <div className='containerInterno'>
                    <h2 className='correoInicioSesion'>Correo Electronico</h2>
                    <input className='containerCorreo' placeholder='Introduzca su correo'/>
                    <h2 className='passwordInicioSesion'>
                        Password
                    </h2>
                    <input className='containerPassword' placeholder='Introduzca su contraseña'/>
                    <h3 className='olvidarContraseña'>
                        <Link to="/RecuperarPassword">¿Olvidaste la contraseña?</Link>
                    </h3>
                    <button className='botonInicio'>Iniciar Sesión</button>
                    <button className='botonRegistro'>Registrar</button>
                </div>

            </div>
        </div>
    )
};