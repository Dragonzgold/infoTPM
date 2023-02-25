import React, { useState } from "react";
import "../css/navbar.css";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

export default function NavbarTPM() {
  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <div>
      <Navbar color="faded" light className="navbar">
        <NavbarBrand href="/" className="me-auto">
          <h1 className="title1">InfoTPM</h1>
        </NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="botonDesplegable" />
        <Collapse isOpen={!collapsed} navbar className="desplegable">
          <Nav navbar>
            <NavItem >
              <NavLink href="/components/" className='primeraOpcion'>Perfil</NavLink>
            </NavItem>
            <hr className="lineaRecta1"/>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap" >
                <p className="opcion2">Lineas</p>
              </NavLink>
            </NavItem>
            <hr className="lineaRecta2"/>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap" >
                <p className="opcion3">Mapa</p>
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
