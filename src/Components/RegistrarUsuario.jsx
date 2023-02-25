import React from 'react'
import Menu from "./NavbarTPM";
import "../css/registrarUsuario.css";
import { Link } from "react-router-dom";

export default function RegistrarUsuario(){
    return(
        <div>
            <Menu/>
            <div className='containerInternoRegistro'>
                <h1 className='titulo'>
                    Registrar Usuario
                    <hr className='rayaTitulo'/>
                </h1>
                <div className='containerInformacionRegistro'>
                    <h2 className='nombreRegistro'>
                        Nombre
                    </h2>
                    <input className='inputNombreRegistro' placeholder='Nombre'/>
                    <h2 className='apellidoRegistro'>Apellido</h2>
                    <input className='inputApellidoRegistro' placeholder='Apellido'/>
                    <h2 className='correoRegistro'>Correo Electronico</h2>
                    <input className='inputCorreoRegistro' placeholder='Introduzca su correo'/>
                    <h2 className='contrasenaRegistro'>contraseña</h2>
                    <input className='inputContrasenaRegistro' placeholder='Introduzca su contraseña'/>
                    <h2 className='confirmarContrasenaRegistro'>Confirmar Contraseña</h2>
                    <input className='inputConfirmarContrasenaRegistro' placeholder='Confirme su contraseña'/>
                    <h2 className='nacimientoRegistro'>Fecha de Nacimiento</h2>
                    <input className='inputDiaRegistro' placeholder='Dia'/>
                    <input className='inputMesRegistro' placeholder='Mes'/>
                    <input className='inputAnoRegistro' placeholder='Año'/>
                    <Link to="/"><button className='botonVolverRegistro'>Volver</button></Link>
                    <button className='botonRegistrarseRegistro'>Registrarse</button> 
                </div>
            </div>
        </div>
    )
}