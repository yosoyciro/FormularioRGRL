import React from 'react';
import ContratistaConsulta from './ContratistaConsulta';
import Contratista from './Contratista';
import update from 'react-addons-update';
import { Component } from 'react';

export default class RenderizarGremios extends Component {
    constructor(props) {
        super(props)
        this.handleCambioContratista = this.handleCambioContratista.bind(this);
    }

    handleCambioContratista(interno, cuit, contratista) {
        const respuestasContratista = this.props.contratistas
        
        var commentIndex = respuestasContratista.findIndex(function(c) { 
            return c.Interno == interno; 
        });
        //console.log('commentIndex: ' + commentIndex)
        
        var updateRespuesta = update(respuestasContratista[commentIndex], {CUIT: {$set: cuit},
            Contratista: {$set: contratista}
        })
        var newData = update(respuestasContratista, {
            $splice: [[commentIndex, 1, updateRespuesta]]
        });      
        
        this.props.cambioContratista(newData);
    }

    render() {
        return (<div>
            <h2>Contratistas</h2>
            <table className="gremios-table">
                <thead className="cabecera">
                    <tr>
                        <th className="cabecera-gremioslegajo">CUIT</th>
                        <th className="cabecera-gremiosnombre">Contratista</th>
                    </tr>
                </thead>
                {this.props.esConsulta === true ?
                    <tbody>
                        {this.props.contratistas.map(contratista =>
                        <ContratistaConsulta 
                            key={contratista.Interno}                     
                            contratista={contratista}
                        />)}
                    </tbody>
                :
                    <tbody>
                        {this.props.contratistas.map(contratista =>
                        <Contratista 
                            key={contratista.Interno}                     
                            contratista={contratista}
                            cambioContratista={this.handleCambioContratista}
                        />)}
                    </tbody>
                }
            </table>
            <h4 style={{textAlign: "initial"}}>En caso de tener contratistas, indicar nro de CUIT y Nombre - Razón Social</h4>
        </div>

        )
    }    
}
