import React, { Component } from 'react';
import './Contratista.css'

//Componente que se conecta al web api y trae todas las preguntas
class ContratistaConsulta extends Component{ 
    
render() {
    //const isDisable = this.props.contratista.CUIT === 0 ? true : false
    const isDisable = true
    const cuit = this.props.contratista.CUIT          
    const contratista = this.props.contratista.Contratista

    return <fieldset>  
        <label className="pregunta-lbl">CUIT:</label>
        <input type="number" name="cuit" disabled={isDisable} value={cuit}></input>        
        <label className="pregunta-lbl">Contratista:</label>
        <input type="text" name="contratista" disabled={isDisable} value={contratista}></input>     
    </fieldset>
    }
}

export default ContratistaConsulta;