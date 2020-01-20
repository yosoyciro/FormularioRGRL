import React, { Component } from 'react';
import './Gremio.css';

//Componente que se conecta al web api y trae todas las preguntas
class GremioConsulta extends Component{     
render() {        
    const legajo = this.props.gremio.Legajo
    const nombre = this.props.gremio.Nombre

    return <div className="container">        
        <div className="renglon">
            <label className="pregunta-lbl">Legajo:</label>
            <input type="text" name="legajo" value={legajo} disabled={true}></input>
            <label className="pregunta-lbl">Nombre:</label>
            <input type="text" name="nombre" value={nombre} disabled={true}></input>     
        </div>
    </div>
    }
}

export default GremioConsulta;