import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import NuevoFormularioRGRL from '../components/FormulariosRGRL/NuevoFormularioRGRL';
import ListaFormularios from '../components/FormulariosRGRL/ListaFormularios';
import Spinner from '../components/UI/Spinner'

class Formulario extends Component{   
    constructor(props) {
        super(props)
        this.state = {
            cuit: 0,
            internoEstablecimiento: 0,
            razonSocial: '',
            direccion: '',
            cargarFormulario: false,
            loadingFormularios: false
        }
        this.seleccionaRegistro = this.seleccionaRegistro.bind(this)
        this.handleFinalizaCarga = this.handleFinalizaCarga.bind(this)
        this.handleLoadingFormularios = this.handleLoadingFormularios.bind(this)
    }

    handleClick = () => {
        this.setState({ 
            cargarFormulario: true,
            cuit: 0,
            internoEstablecimiento: 0,
            internoFormulario: 0,
            estado: '',
            razonSocial: null,
            direccion: null                      
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
        //console.log('[Formularios] - Direccion: ' + direccion)
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

    handleLoadingFormularios(estadoNum) {
        //console.log('[Formularios] handleLoadingFormularios ' + estadoNum)    
        var estado = false
        switch (parseInt(estadoNum)) {
            case 1:
                estado = true
                break;
        
            case 0:
                estado = false
                break;
            default:
                break;
        }   
        this.setState({ loadingFormularios: estado })
    }

    componentDidMount() {
        
    }  
    render(){
        //console.log('[Formularios] loadingFormularios: ' + this.state.loadingFormularios)
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
                    {this.state.loadingFormularios === false ?
                        <ListaFormularios
                            seleccionaRegistro={this.seleccionaRegistro}
                            loadingFormularios={this.handleLoadingFormularios}
                        />
                    :
                        <Spinner />
                    }
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