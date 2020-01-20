import React, { Component } from 'react';
import './Gremio.css';

//Componente que se conecta al web api y trae todas las preguntas
class Gremio extends Component{     
handleChange = (event) => {
    switch(event.target.name) {
        case 'legajo':
            this.props.cambioGremio(event.target.value, this.props.gremio.Gremio, this.props.gremio.Interno)   
            break;

        case 'nombre':
            this.props.cambioGremio(this.props.gremio.Legajo, event.target.value, this.props.gremio.Interno)   
            break;

        default:
    }
}


render() {        
    const legajo = this.props.gremio.Legajo
    const nombre = this.props.gremio.Nombre

    return <div className="container">        
        <div className="renglon">
            <label className="pregunta-lbl">Legajo:</label>
            <input type="text" name="legajo" onChange={this.handleChange} value={legajo}></input>
            <label className="pregunta-lbl">Nombre:</label>
            <input type="text" name="nombre" onChange={this.handleChange} value={nombre}></input>     
        </div>
    </div>
    }
}

export default Gremio;