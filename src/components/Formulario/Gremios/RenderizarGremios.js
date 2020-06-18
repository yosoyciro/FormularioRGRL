import React from 'react';
import GremioConsulta from './GremioConsulta';
import Gremio from './Gremio';
import update from 'react-addons-update';
import { Component } from 'react';

export default class RenderizarGremios extends Component {
    constructor(props) {
        super(props)
        this.handleCambioGremio = this.handleCambioGremio.bind(this);
    }

    handleCambioGremio(legajo, gremio, interno) {
        const respuestasGremio = this.props.gremios 
        
        var commentIndex = respuestasGremio.findIndex(function(c) { 
            return c.Interno == interno; 
        });
        //console.log('commentIndex: ' + commentIndex)
        
        var updateRespuesta = update(respuestasGremio[commentIndex], {Legajo: {$set: legajo},
            Nombre: {$set: gremio}
        })
        var newData = update(respuestasGremio, {
            $splice: [[commentIndex, 1, updateRespuesta]]
        });      
        
        this.props.cambioGremio(newData);
    }    
    
    render() {
        return (<div>
            <h2>Representación Gremial</h2>
            <table className="gremios-table">
                <thead className="cabecera">
                    <tr>
                        <th className="cabecera-gremioslegajo">Nro Legajo del Gremio</th>
                        <th className="cabecera-gremiosgremio">Nombre del Gremio</th>
                    </tr>
                </thead>
                {this.props.esConsulta === true ?
                    <tbody>                    
                        {this.props.gremios.map(gremio =>
                            <GremioConsulta 
                                key={gremio.Interno} 
                                gremio={gremio}
                            />
                        )}                    
                    </tbody>
                :   
                    <tbody>                    
                        {this.props.gremios.map(gremio =>
                            <Gremio 
                                key={gremio.Interno} 
                                gremio={gremio}
                                cambioGremio={this.handleCambioGremio}
                            />
                        )}                    
                    </tbody>
                }
            </table>
            <h4 style={{textAlign: "initial"}}>En caso de contar con delegados gremiales indicar número de legajo conforme a la inscripción en el Ministerio de Trabajo, Empleo y Seguiridad Social</h4>
            <a style={{display: "table-cell", fontSize: "initial"}} href="http://www.trabajo.gov.ar" target="_blank">(http://www.trabajo.gov.ar)</a> 
            </div>
        )
    }
}