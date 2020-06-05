import React, { Component, Fragment } from 'react';
//import { connect } from 'react-redux';
import FormularioA from './FormularioA';
import { Button } from 'react-bootstrap';
import ConsultaFormularios from './ConsultaFormularios';
import NuevoFormularioRGRL from '../components/Formulario/NuevoFormularioRGRL';

class Formulario extends Component{   
    constructor(props) {
        super(props)
        this.state = {
            cuit: 0,
            internoEstablecimiento: 0,
            razonSocial: '',
            direccion: '',
            cargarFormulario: false
        }
        this.seleccionaRegistro = this.seleccionaRegistro.bind(this)
        this.handleFinalizaCarga = this.handleFinalizaCarga.bind(this)
    }

    handleClick = () => {
        this.setState({ 
            cargarFormulario: true,
            cuit: 0,
            internoEstablecimiento: 0,
            internoFormulario: 0,
            estado: '',
            razonSocial: null,
            direccion: null,                        
        })
    }

    handleClickCerrar() {       
        window.history.back();
        //console.log('cerrar')
    }

    handleEdita = () => {
        //this.props.history.push('/NuevoFormularioRAR/' + this.state.cuit);
        this.setState({ 
            cargarFormulario: true
        })
    }

    seleccionaRegistro = (cuit, internoFormulario, internoEstablecimiento, estado, razonSocial, direccion) => {
        console.log('[Formularios] - Direccion: ' + direccion)
        this.setState({
            cuit,
            internoFormulario,
            internoEstablecimiento,
            estado,
            razonSocial,
            direccion
        })
    }

    handleFinalizaCarga() {
        this.setState({ 
            cargarFormulario: false,
            cuit: 0,
            internoFormulario: 0,
            internoEstablecimiento: 0,
            estado: '',
            razonSocial: null,
            direccion: null
        })
    }

    componentDidMount() {
        
    }  
    render(){
        return <div>
            {this.state.cargarFormulario === false ?
                <div>
                    <h1>Consulta de Formularios RGRL</h1>
                    {this.state.cuit !== 0 ?
                        <Button  
                            onClick={this.handleEdita}
                            className="btn-consultaformulario"
                        >
                            Edita Formulario
                        </Button>
                    :
                        null
                    }
                    <Button 
                        onClick={this.handleClick}
                        className="btn-consultaformulario"
                    >
                        Genera Formulario
                    </Button>
                    <Button 
                        onClick={this.handleClickCerrar}
                        className="btn-consultaformulario"
                    >
                        Finaliza
                    </Button>
                    <ConsultaFormularios
                        seleccionaRegistro={this.seleccionaRegistro}
                        cargarFormulario={this.state.cargarFormulario}
                    />
                </div>
            :
                <NuevoFormularioRGRL
                    cuit={this.state.cuit}
                    internoEstablecimiento={this.state.internoEstablecimiento}
                    internoFormulario={this.state.internoFormulario}
                    razonSocial={this.state.razonSocial}
                    direccion={this.state.direccion}
                    estado={this.state.estado}
                    finalizaCarga={this.handleFinalizaCarga}
                />
            }               
        </div>
            
    }
}

export default Formulario;