import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import NuevoFormularioRGRL from '../components/FormulariosRGRL/NuevoFormularioRGRL';
import ListaFormularios from '../components/ConsultaFormularios/ListaFormularios';
import Spinner from '../components/UI/Spinner';
import ReferenteDatos from '../Api/ReferenteDatos/ReferenteDatos';

class Formulario extends Component{   
    constructor(props) {
        super(props)
        this.state = {
            internoEstablecimiento: 0,
            internoFormulario: 0,
            razonSocial: '',
            direccion: '',
            cargarFormulario: false,
            loadingFormularios: false,
            isLoading: true,
        }
        this.seleccionaRegistro = this.seleccionaRegistro.bind(this)
        this.handleFinalizaCarga = this.handleFinalizaCarga.bind(this)
        this.handleLoadingFormularios = this.handleLoadingFormularios.bind(this)
        this.handleClickCerrar = this.handleClickCerrar.bind(this)
    }

    handleClick = () => {
        this.setState({ 
            cargarFormulario: true,
            internoRespuestaFormulario: 0,
            internoEstablecimiento: 0,
            internoFormulario: 0,
            estado: '',
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

    handleReplica = (internoRespuestasFormulario) => {

    }    

    seleccionaRegistro = (internoRespuestaFormulario, cuit, internoFormulario, internoEstablecimiento, estado, razonSocial, direccion) => {
        console.log('[Formularios] - internoEstablecimiento: ' + internoEstablecimiento)
        this.setState({
            internoRespuestaFormulario,
            internoFormulario,
            internoEstablecimiento,
            estado,
        })
    }

    handleFinalizaCarga() {
        this.setState({ 
            cargarFormulario: false,
            internoRespuestaFormulario: 0,
            internoFormulario: 0,
            internoEstablecimiento: 0,
            estado: '',
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
        ReferenteDatos(this.props.match.params.CUIT)
        .then(res => {
            //console.log('[Formularios] - res: ' + JSON.stringify(res))
            this.setState({
                referenteDatos: res,
                isLoading: !this.state.isLoading,
            })
        })
    }  
    
    render(){
        const disableEditar = this.state.estado !== 'Confirmado' && this.state.internoRespuestaFormulario ? false : true
        //const disableReplicar = this.state.estado === 'Confirmado' ? false : true
        console.log('[Formularios] estado: ' + this.state.estado + ' - interno: ' + this.state.internoRespuestaFormulario)
        //console.log('[Formularios] loadingFormularios: ' + this.state.loadingFormularios)
        //console.log('[Formularios] isLoading: ' + this.state.isLoading)
        //console.log('[Formularios] referenteDatos: ' + JSON.stringify(this.state.referenteDatos))
        return <div>
            {this.state.isLoading === false ?
                <>
                {this.state.cargarFormulario === false ?
                    <div>
                        <h1>Consulta de Formularios RGRL</h1>
                        <Button  
                            onClick={this.handleEdita}
                            className="btn-consultaformulario"
                            disabled={disableEditar}
                        >
                            Edita Formulario
                        </Button>
                        <Button 
                            onClick={this.handleClick}
                            className="btn-consultaformulario"
                        >
                            Genera Formulario
                        </Button>
                        <Button 
                            onClick={this.handleClick}
                            className="btn-consultaformulario"
                            disabled={true}
                            hidden={true}
                        >
                            Replica Formulario
                        </Button>
                        <Button 
                            onClick={this.handleClickCerrar}
                            className="btn-consultaformulario"
                        >
                            Finaliza
                        </Button>
                        {this.state.loadingFormularios === false ?
                            <ListaFormularios
                                cuit={this.props.match.params.CUIT}
                                seleccionaRegistro={this.seleccionaRegistro}
                                loadingFormularios={this.handleLoadingFormularios}
                            />
                        :
                            <Spinner />
                        }
                    </div>
                :
                    <NuevoFormularioRGRL
                        internoRespuestaFormulario={this.state.internoRespuestaFormulario}
                        cuit={this.props.match.params.CUIT}
                        internoEstablecimiento={this.state.internoEstablecimiento}
                        internoFormulario={this.state.internoFormulario}
                        referenteDatos={this.state.referenteDatos}
                        estado={this.state.estado}
                        finalizaCarga={this.handleFinalizaCarga}
                    />
                }   
                </>
            :
                <Spinner />
            }            
        </div>
            
    }
}

export default Formulario;