import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav } from "reactstrap";
import { useDataContext } from "../Context/dataContext";
import { clearLocalStorage } from "../Hooks/useLocalStorage";
import { ReactComponent as IconMaker } from "../Assets/Images/map.svg";

function NavBar(props) {
  const { accessAdminToken, accessToken, logged, url } = useDataContext();
  const [isReadyForInstall, setIsReadyForInstall] = React.useState(false);
  const [admin, setAdmin] = useState([]);
  const [user, setUser] = useState([]);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const fetchDataAdmin = useCallback(async () => {
    try {
      const response = await axios.get(
        `${url}/Auth/findByTokenAdmin/${accessAdminToken.access_token}`
      );
      setAdmin(response.data);
    } catch (error) {}
  }, [accessAdminToken, url]);

  const fetchDataUUser = useCallback(async () => {
    try {
      const response = await axios.get(
        `${url}/Auth/findByToken/${accessToken.access_token}`
      );
      setUser(response.data);
    } catch (error) {}
  }, [accessToken, url]);

  const clearLocal = () => {
    clearLocalStorage();
    setTimeout(() => {
      window.location.href = "/";
    }, 500);
  };

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (event) => {
      // Prevent the mini-infobar from appearing on mobile.
      event.preventDefault();
      console.log("👍", "beforeinstallprompt", event);
      // Stash the event so it can be triggered later.
      window.deferredPrompt = event;
      // Remove the 'hidden' class from the install button container.
      setIsReadyForInstall(true);
    });
    fetchDataAdmin();
    fetchDataUUser();
  }, [fetchDataAdmin, fetchDataUUser]);

  async function downloadApp() {
    console.log("👍", "butInstall-clicked");
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
      // The deferred prompt isn't available.
      console.log("oops, no prompt event guardado en window");
      return;
    }
    // Show the install prompt.
    promptEvent.prompt();
    // Log the result
    const result = await promptEvent.userChoice;
    console.log("👍", "userChoice", result);
    // Reset the deferred prompt variable, since
    // prompt() can only be called once.
    window.deferredPrompt = null;
    // Hide the install button.
    setIsReadyForInstall(false);
  }

  return (
    <div>
      <Navbar color="faded" light className="navbar">
        <NavbarBrand href="/" className="me-auto">
          <h1 className="title1">
            InfoTPM
            <IconMaker className="IconMaker" />
          </h1>
        </NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="botonDesplegable" />
        <Collapse isOpen={isNavbarOpen} navbar className="desplegable">
          <Nav navbar>
            {logged ? (
              user.usu_role === "user" || user.usu_role === "Driver" ? (
                <ul className="buttons">
                  <li key="Perfil">
                    <a className="btn" href="/Perfil" onClick={toggleNavbar}>
                      Perfil
                    </a>
                    <div className="Divider" />
                  </li>
                  <li key="Lineas">
                    <a className="btn" href="/Lines">
                      Lineas
                    </a>
                    <div className="Divider" />
                  </li>
                  <li key="Ayuda">
                    <a className="btn" href="/HelpSection">
                      Ayuda
                    </a>
                    <div className="Divider" />
                  </li>
                  <li key="CerrarSesion">
                    <Link className="btn" to="/" onClick={clearLocal}>
                      Cerrar Sesion
                    </Link>
                    <div className="Divider" />
                  </li>
                  {isReadyForInstall && (
                    <li className="btn download-btn" onClick={downloadApp}>
                      Download
                    </li>
                  )}
                </ul>
              ) : admin !== undefined ? (
                <ul className="buttons">
                  <li key="Dashboard">
                    <a className="btn" href="/VariableEditor">
                      Panel de Control
                    </a>
                    <div className="Divider" />
                  </li>
                  <li key="Lineas">
                    <a className="btn" href="/Lines">
                      Lineas
                    </a>
                    <div className="Divider" />
                  </li>
                  <li key="Comentarios">
                    <a className="btn" href="/Comments">
                      Comentarios
                    </a>
                    <div className="Divider" />
                  </li>
                  <li key="CerrarSesion">
                    <Link className="btn" to="/" onClick={clearLocal}>
                      Cerrar Sesion
                    </Link>
                    <div className="Divider" />
                  </li>
                  {isReadyForInstall && (
                    <li className="btn download-btn" onClick={downloadApp}>
                      Download
                    </li>
                  )}
                </ul>
              ) : (
                <ul className="buttons">
                  <li key="Perfil">
                    <a className="btn" href="/Perfil">
                      Perfil
                    </a>
                    <div className="Divider" />
                  </li>
                  <li key="Lineas">
                    <a className="btn" href="/Lines">
                      Lineas
                    </a>
                    <div className="Divider" />
                  </li>
                  <li key="Ayuda">
                    <a className="btn" href="/Comments">
                      Comentarios
                    </a>
                    <div className="Divider" />
                  </li>
                  {isReadyForInstall && (
                    <li className="btn download-btn" onClick={downloadApp}>
                      Descargar
                    </li>
                  )}
                </ul>
              )
            ) : (
              <ul className="buttons">
                <li key="Account">
                  <a className="btn" href="/Account">
                    Cuenta
                  </a>
                  <div className="Divider" />
                </li>
                <li key="Lineas">
                  <a className="btn" href="/Lines">
                    Lineas
                  </a>
                  <div className="Divider" />
                </li>
                <li key="Ayuda">
                  <a className="btn" href="/HelpSection">
                    Ayuda
                  </a>
                  <div className="Divider" />
                </li>
                {isReadyForInstall && (
                  <li className="btn download-btn" onClick={downloadApp}>
                    Descargar
                  </li>
                )}
              </ul>
            )}
          </Nav>

          {/* <ul className='buttons'>
                <li key='Perfil'>
                  <Link className='btn' to='/Perfil'>Perfil</Link>
                  <div className='Divider' />
                </li>
                <li key='Lineas'>
                  <Link className='btn' to='/Lineas'>Lineas</Link>
                  <div className='Divider' />
                </li>
                <li key='Ayuda'>
                  <Link className='btn' to='/Ayuda'>Comentarios</Link>
                  <div className='Divider' />
                </li>
                <li key='CerrarSesion'>
                  <Link className='btn' to='/' onClick={clearLocal}>Cerrar Sesion</Link>
                  <div className='Divider' />
                </li>
              </ul>
              :
              <ul className='buttons'>
                {routes.filter((route) => route.visibility === true) // Filtra solo las rutas con visibility = true
                  .reverse()
                  .map((route) => (
                    <li key={route.path}>
                      <Link className='btn' to={route.path}>{route.title}</Link>
                      <div className='Divider' />
                    </li>
                  ))}
                {isReadyForInstall && <li className='btn download-btn' onClick={downloadApp}>Download</li>}
              </ul>
            }
          </Nav> */}

          {/* <ul className='buttons'>
              {routes.filter((route) => route.visibility === true) // Filtra solo las rutas con visibility = true
                .reverse()
                .map((route) => (
                  <li key={route.path}>
                    <Link className='btn' to={route.path}>{route.title}</Link>
                    <div className='Divider' />
                  </li>
                ))}
              {isReadyForInstall && <li className='btn download-btn' onClick={downloadApp}>Download</li>}
            </ul>
          </Nav> */}
        </Collapse>
      </Navbar>
    </div>
  );
}

export { NavBar };
