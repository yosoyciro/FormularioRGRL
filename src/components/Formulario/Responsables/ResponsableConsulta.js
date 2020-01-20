import React, { Component } from 'react';
import './Responsable.css'

//Componente que se conecta al web api y trae todas las preguntas
class ResponsableConsulta extends Component{    
    render() {      
        const isDisable = true

        const cuit = this.props.responsable.CUIT
        const responsable = this.props.responsable.Responsable
        const cargo = this.props.responsable.Cargo
        const representacion = this.props.responsable.Representacion
        const esContratado = this.props.responsable.EsContratado
        const tituloHabilitante = this.props.responsable.TituloHabilitante
        const matricula = this.props.responsable.Matricula
        const entidadOtorganteTitulo = this.props.responsable.EntidadOtorganteTitulo

        return <div className="container">
            <div className="renglon">
                <label>CUIT:</label>
                <input type="text" name="cuit" value={cuit}></input>                
                <label>Responsable:</label>
                <input type="text" name="responsable" disabled={true} value={responsable}></input>
                <label>Cargo:</label>
                <select className="Select" name="cargo" disabled={isDisable} value={cargo}>
                    <option value="R">Responsable de los datos del formulario</option>
                    <option value="H">Profesional de Higiene y Seguridad en trabajo</option>
                    <option value="M">Profesional de Medicina Laboral</option>
                </select>
            </div>
            <div className="renglon">
                <label>Representacion:</label>
                <input type="text" name="representacion" disabled={isDisable} value={representacion}></input>
                <label>Es Contratado:</label>
                <input type="checkbox" name="escontratado" disabled={isDisable} value={esContratado}></input>
                <label>Título Habilitante:</label>
                <input type="text" name="titulohabilitante" disabled={isDisable} value={tituloHabilitante}></input>
                <label>Matrícula:</label>
                <input type="text" name="matricula" disabled={isDisable} value={matricula}></input>
                <label>Entidad Otorgante Título:</label>
                <input type="text" name="entidadotorgantetitulo" disabled={isDisable} value={entidadOtorganteTitulo}></input>
            </div>
        </div>
    }
}

export default ResponsableConsulta;