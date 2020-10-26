import React, { Component, Fragment } from 'react';
import './Contratista.css'
import BuscarPersona from '../../../Api/BuscarPersona'
import Button from 'react-bootstrap/Button'
import Spinner from '../../UI/Spinner'

//Componente que se conecta al web api y trae todas las preguntas
class Contratista extends Component{ 
    constructor(props){
        super(props)
        this.handleAFIP = this.handleAFIP.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.state = {
            loading: false
        }
    }
    handleChange = (event) => {
        //console.log('event.target.value: ' + event.target.value)
        if (event.target.name === 'cuit')        
        {
            //this.setState({cuit: event.target.value}) 
            this.props.cambioContratista(this.props.contratista.Interno, event.target.value, '')                                   
        }

        if (event.target.name === 'contratista')
        {
            //this.setState({ contratista: event.target.value });
            this.props.cambioContratista(this.props.contratista.Interno, this.props.contratista.CUIT, event.target.value)
        }            
    }

    handleAFIP = async event => {  
        const cuitRepetido = this.props.contratistas.find(contratista => contratista.CUIT === this.props.contratista.CUIT && contratista.Interno !== this.props.contratista.Interno )
        //console.log('cuitRepetido: ' + JSON.stringify(cuitRepetido))
        switch (cuitRepetido) {
            case undefined:
                
                break;
        
            default:
                alert('CUIT repetido')
                this.props.cambioContratista(this.props.contratista.Interno, 0, '')
                break;
        }
        this.setState({ loading: !this.state.loading })      
        const param = {
            CUIT: this.props.contratista.CUIT,
            BuscarEnAFIP: true
        }

        const respuesta = await BuscarPersona(param);               
        //console.log('respuesta: ' + respuesta[0].razonSocial);
        this.props.cambioContratista(this.props.contratista.Interno, this.props.contratista.CUIT, respuesta[0].razonSocial)
        this.setState({ loading: !this.state.loading })
    }
    
render() {
    //const isDisable = this.props.contratista.CUIT === 0 ? true : false
    //console.log('[Contratista] loading ' + this.state.loading)
    const isDisable = true
    const cuit = this.props.contratista.CUIT          
    const contratista = this.props.contratista.Contratista

    return <Fragment>
        {this.state.loading === true ?
            <Spinner />
        :
        <tr>
            <td className="td-contratista-cuit">
                <input 
                    className="contratistas-cuit"
                    type="number" 
                    name="cuit" 
                    onChange={this.handleChange} 
                    value={cuit}>
                </input>   
                <Button 
                    //onClick={() => {this.setState({ loading: !this.state.loading }); this.handleAFIP()}}
                    onClick={this.handleAFIP}
                    variant="primary" 
                    size="sm"
                >
                    Verifica
                </Button>
            </td>
            <td>
                <input 
                    className="contratistas-contratista"
                    type="text" 
                    name="contratista" 
                    disabled={isDisable} 
                    onChange={this.handleChange} 
                    value={contratista}></input> 
            </td>
        </tr>
        }
    </Fragment>
    }
}

export default Contratista;