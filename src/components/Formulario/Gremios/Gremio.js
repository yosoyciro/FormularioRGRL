import React, { Component, Fragment } from 'react';
import './Gremio.css';

//Componente que se conecta al web api y trae todas las preguntas
class Gremio extends Component{     
    handleChange = (event) => {
        switch(event.target.name) {
            case 'legajo':
                const legajo = event.target.value === '' ? 0 : event.target.value
                this.props.cambioGremio(legajo, this.props.gremio.Gremio, this.props.gremio.Interno)   
                break;

            case 'nombre':
                this.props.cambioGremio(this.props.gremio.Legajo, event.target.value, this.props.gremio.Interno)   
                break;

            default:
        }
    }


    render() {        
        const legajo = this.props.gremio.Legajo === 0 ? '' : this.props.gremio.Legajo
        const nombre = this.props.gremio.Nombre

        return <Fragment>
            <tr>
                <td>
                    <input 
                    className="gremios-legajo"
                        type="number" 
                        name="legajo" 
                        onChange={this.handleChange} 
                        value={legajo}>                        
                    </input>
                </td>
                <td>
                    <input 
                        className="gremios-nombre"
                        type="text" 
                        name="nombre" 
                        onChange={this.handleChange} 
                        value={nombre}>
                    </input>     
                </td>
            </tr>
        </Fragment>
    }
}

export default Gremio;