import React, {Component} from 'react';
import {NavLink, Link} from 'react-router-dom';
import {Navbar, Nav} from 'react-bootstrap';

export class Menu extends Component{

    render(){
        return(
            <Navbar bg="dark" expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="test">
                    <NavLink className="d-inline p-2 bg-dark text-white" to="/">Inicio</NavLink>
                    <NavLink className="d-inline p-2 bg-dark text-white" to="/ConsultaFormularios">Consulta Formularios</NavLink>
                    <NavLink className="d-inline p-2 bg-dark text-white" to="/NuevoFormulario">Nuevo Formulario</NavLink>
                </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default Menu;