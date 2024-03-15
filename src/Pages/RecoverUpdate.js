import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Input, Button, Label, FormFeedback } from "reactstrap";
import { Link, useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useDataContext } from "../Context/dataContext";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

function RecoverUpdate() {
  const history = useHistory();
  const [userEmail, setUserEmail] = useState([]);
  const [usu_password, setUse_password] = useState("");
  const [use_Confirmpassword, setUse_Confirmpassword] = useState("");
  const { url } = useDataContext();
  const { id, email } = useParams();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.put(`${url}/Users/PasswordRecovery/${id}`, {
        usu_password,
      });
      toast.success("Contraseña actualizada");
      setTimeout(() => {
        history.push("/Account");
      }, 5000);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(`${url}/Users/email/${email}`);
      setUserEmail(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [setUserEmail, email, url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // <div>
  //   <div className="containerInternoRegistro">
  //     <h1 className="titulo">
  //       ¿No tienes cuenta aún? {email} <Link to='/Register' id='RegisterA'>¡Regístrate!</Link>
  //       <div className="rayaTitulo" />
  //     </h1>
  //     <div className="containerInformacionRegistro">
  //       <form onSubmit={handleSubmit} className="Form">
  //         <div className="FormName">
  //           <div className="Nombre">
  //             <Label className="nombreRegistro" htmlFor="exampleName">
  //               Nombre
  //             </Label>
  //             <Input
  //               className="inputNombreRegistro"
  //               id="exampleName"
  //               type="password"
  //               name="text"
  //               onChange={(e) => setUse_password(e.target.value)}
  //               invalid={usu_password.length < 8}
  //               placeholder="Introduzca su contraseña"
  //               required
  //             />
  //             {usu_password.length < 8 && (
  //               <FormFeedback invalid>
  //                 Su contraseña debe contener mínimo 8 caracteres
  //               </FormFeedback>
  //             )}
  //           </div>
  //           <div className="Apellido">
  //             <Label className="apellidoRegistro" htmlFor="exampleApellido">
  //               Apellido
  //             </Label>
  //             <Input
  //               className="inputApellidoRegistro"
  //               type="password"
  //               name="Confirm Password"
  //               onChange={(e) => setUse_Confirmpassword(e.target.value)}
  //               invalid={use_Confirmpassword !== usu_password}
  //               placeholder="Introduzca su contraseña"
  //               id="exampleApellido"
  //               required
  //             />
  //             {use_Confirmpassword !== usu_password && (
  //               <FormFeedback invalid>
  //                 Las claves deben ser iguales
  //               </FormFeedback>
  //             )}
  //           </div>
  //         </div>
  //         <div className="RegisterButtons">
  //           <Button
  //             type="submit"
  //             disabled={usu_password !== use_Confirmpassword || usu_password.length < 8 || email !== userEmail.usu_email || parseInt(id) !== userEmail.usu_id}
  //             color='primary'>
  //             Recuperar contraseña
  //           </Button>
  //           {(email !== userEmail.usu_email || parseInt(id) !== userEmail.usu_id) && (
  //             <FormFeedback>
  //               Los datos no coinciden
  //             </FormFeedback>
  //           )}
  //           <Link to='/Login'>
  //             <Button color='secondary'>
  //               Volver
  //             </Button>
  //           </Link>
  //         </div>
  //       </form>
  //     </div>
  //     <ToastContainer />
  //   </div>
  // </div>

  return (
    // <div className='RecoverBody'>
    //   <div>
    //     <div className="card-recovertop">
    //       <p className="parrafo-login">
    //         ¿No tienes cuenta aún? {email} <Link to='/Register' id='RegisterA'>¡Regístrate!</Link>
    //       </p>
    //     </div>
    //     <div className="card-recovertop2"></div>
    //     <div className="card-recover">
    //       <form className="form">
    //         <Input
    //           className='containerCorreo'
    //           type="password"
    //           name="text"
    //           onChange={(e) => setUse_password(e.target.value)}
    //           invalid={usu_password.length < 8}
    //           placeholder="Introduzca su contraseña"
    //           id="to"
    //         />
    //         {usu_password.length < 8 && (
    //           <FormFeedback invalid>
    //             Su contraseña debe contener mínimo 8 caracteres
    //           </FormFeedback>
    //         )}
    //         <Input
    //           className='containerCorreo'
    //           type="password"
    //           name="Confirm Password"
    //           onChange={(e) => setUse_Confirmpassword(e.target.value)}
    //           invalid={use_Confirmpassword !== usu_password}
    //           placeholder="Introduzca su contraseña"
    //           id="to"
    //         />
    //         {use_Confirmpassword !== usu_password && (
    //           <FormFeedback invalid>
    //             Las claves deben ser iguales
    //           </FormFeedback>
    //         )}
    //         <Button
    //           type="submit"
    //           onClick={handleSubmit}
    //           disabled={usu_password !== use_Confirmpassword || usu_password.length < 8 || email !== userEmail.usu_email || parseInt(id) !== userEmail.usu_id}
    //           color='primary'>
    //           Recuperar contraseña
    //         </Button>
    //         {(email !== userEmail.usu_email || parseInt(id) !== userEmail.usu_id) && (
    //           <FormFeedback>
    //             Los datos no coinciden
    //           </FormFeedback>
    //         )}
    //         <Link to='/Login'>
    //           <Button color='secondary'>
    //             Volver
    //           </Button>
    //         </Link>
    //       </form>
    //     </div>
    //   </div>
    // </div>

    <div>
      <div className="containerInternoRegistro">
        <h1 className="titulo">
          Recuperar contraseña
          <div className="rayaTitulo" />
        </h1>
        <div className="containerInformacionRegistro">
          <form onSubmit={handleSubmit} className="Form">
            <div className="FormRecoverPass">
              <div className="Nombre">
                <Label className="RecoverPass" htmlFor="exampleName">
                  Contraseña
                </Label>
                <div className="inputPassRecover">
                  <Input
                    className="inputPass"
                    id="exampleName"
                    type="password"
                    name="text"
                    onChange={(e) => setUse_password(e.target.value)}
                    invalid={usu_password.length < 8}
                    placeholder="Introduzca su contraseña"
                    required
                  />
                </div>
                {usu_password.length < 8 && (
                  <FormFeedback invalid>
                    Su contraseña debe contener mínimo 8 caracteres
                  </FormFeedback>
                )}
              </div>
              <div className="confirmarPass">
                <Label className="" htmlFor="exampleApellido">
                  Confirmar Contraseña
                </Label>
                <Input
                  className="inputRecoverPass"
                  type="password"
                  name="Confirm Password"
                  onChange={(e) => setUse_Confirmpassword(e.target.value)}
                  invalid={use_Confirmpassword !== usu_password}
                  placeholder="Vuelva a escribir su contraseña"
                  id="exampleApellido"
                  required
                />
                {use_Confirmpassword !== usu_password && (
                  <FormFeedback invalid>
                    Las claves deben ser iguales
                  </FormFeedback>
                )}
              </div>
            </div>
            <div className="buttonsRecovery">
              <div>
              <Link to="/Login">
                <Button color="secondary">Volver</Button>
              </Link>
              </div>
              <Button
                className="btnRecovery"
                type="submit"
                disabled={
                  usu_password !== use_Confirmpassword ||
                  usu_password.length < 8 ||
                  email !== userEmail.usu_email ||
                  parseInt(id) !== userEmail.usu_id
                }
                color="primary"
              >
                Recuperar contraseña
              </Button>
              {(email !== userEmail.usu_email ||
                parseInt(id) !== userEmail.usu_id) && (
                <FormFeedback>Los datos no coinciden</FormFeedback>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export { RecoverUpdate };
