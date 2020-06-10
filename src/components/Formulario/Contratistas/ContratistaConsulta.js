import React, { Component, Fragment } from 'react';
import './Contratista.css'

//Componente que se conecta al web api y trae todas las preguntas
class ContratistaConsulta extends Component{ 
    
render() {
    //const isDisable = this.props.contratista.CUIT === 0 ? true : false
    const isDisable = true
    const cuit = this.props.contratista.CUIT          
    const contratista = this.props.contratista.Contratista

    return <Fragment>
    <tr>
        <td>
            <input 
                className="contratistas-cuit"
                type="text" 
                name="cuit" 
                value={cuit}
                disabled={true}
            >                    
            </input>   
        </td>
        <td>
            <input 
                className="contratistas-contratista"
                type="text" 
                name="contratista" 
                disabled={isDisable} 
                value={contratista}></input> 
        </td>
    </tr>
    </Fragment>
    }
}

export default ContratistaConsulta;