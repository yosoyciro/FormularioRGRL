import React, { Component } from 'react';
import './Secciones.css'

class Secciones extends Component{    

    render() { 
        return <div className="container">
                <h4 className="h4">{this.props.seccion.Descripcion}</h4>                
            </div>
    }
}

export default Secciones;