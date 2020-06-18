import React from 'react';
import ResponsableConsulta from './ResponsableConsulta';
import update from 'react-addons-update';
import { Component } from 'react';
import Responsable from './Responsable';

export default class RenderizarResponsables extends Component {
    constructor(props) {
        super(props)
        this.handleCambioResponsable = this.handleCambioResponsable.bind(this);
        this.state = {
            loading: false
        }
    }

    handleCambioResponsable(interno, cuit, responsable, cargo, representacion, esContratado, tituloHabilitante, matricula, entidadOtorganteTitulo) {
        const respuestasResponsable = this.props.responsables
        //console.log('CUIT: ' + cuit)
        
        var commentIndex = respuestasResponsable.findIndex(function(c) { 
            return c.Interno == interno; 
        });
        //console.log('commentIndex: ' + commentIndex)
        
        var updateRespuesta = update(respuestasResponsable[commentIndex], {CUIT: {$set: cuit}, 
            Responsable: {$set: responsable},
            Cargo: {$set: cargo},
            Representacion: {$set: representacion},
            EsContratado: {$set: esContratado},            
            TituloHabilitante: {$set: tituloHabilitante},
            Matricula: {$set: matricula},
            EntidadOtorganteTitulo: {$set: entidadOtorganteTitulo}
        })

        var newData = update(respuestasResponsable, {
            $splice: [[commentIndex, 1, updateRespuesta]]
        });      
        
        this.props.cambioResponsable(newData)
    }   
    
    render() {
        return(<div>
            <h2>Datos Laborales del Profesional o Responsable del Formulario</h2>
            <table className="gremios-table">
                <thead className="cabecera">
                    <tr>
                        <th>CUIT/CUIL/CUIP</th>
                        <th>Nombre y apellido</th>
                        <th>Cargo</th>
                        <th>Representación</th>
                        <th>Propio/contratado</th>
                        <th>Título habilitante</th>
                        <th>N° matrícula</th>
                        <th>Entidad que otorgó el título habilitante</th>
                    </tr>
                </thead>
                {this.props.esConsulta === true ?
                    <tbody>
                        {this.props.responsables.map(responsable =>
                        <ResponsableConsulta 
                            key={responsable.Interno} 
                            id={responsable.Interno}
                            responsable={responsable}
                            entidadOtorganteTitulo={responsable.EntidadOtorganteTitulo}
                        />)}
                    </tbody>
                :
                    <tbody>
                        {this.props.responsables.map(responsable =>
                        <Responsable 
                            key={responsable.Interno} 
                            id={responsable.Interno}
                            responsable={responsable}
                            entidadOtorganteTitulo={responsable.EntidadOtorganteTitulo}
                            cambioResponsable={this.handleCambioResponsable}
                        />)}
                    </tbody>
                }   
            </table>
            <h4 style={{textAlign: "initial"}}>Cargos:</h4>
            <h4 style={{textAlign: "initial", marginLeft: "1%"}}>Profesional de Higiene y Seguridad en el Trabajo</h4>
            <h4 style={{textAlign: "initial", marginLeft: "1%"}}>Profesional de Medicina Laboral</h4>
            <h4 style={{textAlign: "initial", marginLeft: "1%"}}>Responsable de Datos del Formulario</h4>
            <h4 style={{textAlign: "initial", marginLeft: "2%"}}>En Representación ingresar</h4>
            <h4 style={{textAlign: "initial", marginLeft: "3%"}}>Representante Legal</h4>
            <h4 style={{textAlign: "initial", marginLeft: "3%"}}>Presidente</h4>
            <h4 style={{textAlign: "initial", marginLeft: "3%"}}>VicePresidente</h4>
            <h4 style={{textAlign: "initial", marginLeft: "3%"}}>Director General</h4>
            <h4 style={{textAlign: "initial", marginLeft: "3%"}}>Gerente General</h4>
            <h4 style={{textAlign: "initial", marginLeft: "3%"}}>Administrador General</h4>
            <h4 style={{textAlign: "initial", marginLeft: "3%"}}>Otros</h4>
        </div>

        )
    }        
}

//export default RenderizarResponsables;