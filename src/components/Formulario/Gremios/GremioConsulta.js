import React, { Component, Fragment } from 'react';
import './Gremio.css';

//Componente que se conecta al web api y trae todas las preguntas
class GremioConsulta extends Component{     
render() {        
    const legajo = this.props.gremio.Legajo === 0 ? '' : this.props.gremio.Legajo
    const nombre = this.props.gremio.Nombre

    return <Fragment>
            <tr>
                <td>
                    <input className="gremios-legajo" type="text" name="legajo" value={legajo} disabled={true}></input>
                </td>
                <td>
                    <input className="gremios-nombre" type="text" name="nombre" value={nombre} disabled={true}></input>     
                </td>
            </tr>
        </Fragment>
    }
}

export default GremioConsulta;