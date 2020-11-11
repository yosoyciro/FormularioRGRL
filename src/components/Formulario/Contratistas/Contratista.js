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
        this.BuscarPersona = this.BuscarPersona.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.state = {
            loading: false,
            cuit: this.props.contratista.CUIT === 0 ? '' : this.props.contratista.CUIT,
        }
    }
    
    handleChange = (event) => {
        //#region oldcode
        //console.log('event.target.value: ' + event.target.value)
        /*const cuit = event.target.value === '' ? 0 : event.target.value
        if (event.target.name === 'cuit')        
        {
            //this.setState({cuit: event.target.value}) 
            this.props.cambioContratista(this.props.contratista.Interno, cuit, '')                                   
        }

        if (event.target.name === 'contratista')
        {
            //this.setState({ contratista: event.target.value });
            this.props.cambioContratista(this.props.contratista.Interno, this.props.contratista.CUIT, event.target.value)
        }   */
        //#endregion
        const cuit = event.target.value === '' ? 0 : event.target.value
        this.setState({ cuit })  
        
        if (cuit === 0)
        {
            this.props.cambioContratista(this.props.contratista.Interno, cuit, '')
        }
    }

    BuscarPersona = async event => {
        this.setState({ loading: !this.state.loading })      
        const param = {
            CUIT: this.state.cuit,
            BuscarEnAFIP: true,
            Tipo: 'RGRL',
        }

        const respuesta = await BuscarPersona(param);               
        //console.log('respuesta: ' + respuesta[0].razonSocial);
        this.props.cambioContratista(this.props.contratista.Interno, this.state.cuit, respuesta[0].razonSocial)
        this.setState({ loading: !this.state.loading })
    }

    handleAFIP = async event => {
        //console.log('cuit: ' + this.state.cuit)
        //console.log('[Contratista] this.props.contratistas: ' + JSON.stringify(this.props.contratistas))  
        const cuitRepetido = this.props.contratistas.find(contratista => parseInt(contratista.CUIT) === parseInt(this.state.cuit))
        //console.log('cuitRepetido: ' + JSON.stringify(cuitRepetido))
        switch (cuitRepetido) {
            case undefined:
                await this.BuscarPersona()
                break;
        
            default:
                alert('CUIT repetido ' + cuitRepetido.CUIT)
                this.setState({ cuit: 0 })
                this.props.cambioContratista(this.props.contratista.Interno, 0, '')
                break;
        }
        
    }
    
render() {
    //const isDisable = this.props.contratista.CUIT === 0 ? true : false
    //console.log('[Contratista] loading ' + this.state.loading)
    const isDisable = true
    
    const cuit = this.state.cuit === 0 ? '' : this.state.cuit      
    const disableVerificar = cuit === '' ? true : false
    const contratista = cuit === '' ? '' : this.props.contratista.Contratista

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
                    disabled={disableVerificar}
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