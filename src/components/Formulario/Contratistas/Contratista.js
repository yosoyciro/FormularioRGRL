import React, { Component, Fragment } from 'react';
import './Contratista.css'
import BuscarPersona from '../../../Api/BuscarPersona'
import Button from 'react-bootstrap/Button'

//Componente que se conecta al web api y trae todas las preguntas
class Contratista extends Component{ 
    handleChange = (event) => {
        console.log('event.target.value: ' + event.target.value)
        if (event.target.name === 'cuit')        
        {
            //this.setState({cuit: event.target.value}) 
            this.props.cambioContratista(this.props.contratista.Interno, event.target.value, this.props.contratista.Contratista)                                   
        }

        if (event.target.name === 'contratista')
        {
            //this.setState({ contratista: event.target.value });
            this.props.cambioContratista(this.props.contratista.Interno, this.props.contratista.CUIT, event.target.value)
        }            
    }

    handleAFIP = async event => {        
        const param = {
            CUIT: this.props.contratista.CUIT,
            BuscarEnAFIP: true
        }

        const respuesta = await BuscarPersona(param);               
        console.log('respuesta: ' + respuesta[0].razonSocial);
        this.props.cambioContratista(this.props.contratista.Interno, this.props.contratista.CUIT, respuesta[0].razonSocial)
    }
    
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
                    type="number" 
                    name="cuit" 
                    onChange={this.handleChange} 
                    value={cuit}></input>   
            </td>
            <td>
                <input 
                    className="contratistas-cuit"
                    type="text" 
                    name="contratista" 
                    disabled={isDisable} 
                    onChange={this.handleChange} 
                    value={contratista}></input> 
            </td>
            <td>
                <Button 
                    onClick={this.handleAFIP}
                    variant="primary" 
                    size="sm"
                >
                    Verifica
                </Button>
            </td>
        </tr>
    </Fragment>
    }
}

export default Contratista;