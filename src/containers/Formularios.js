import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import NuevoFormularioRGRL from '../components/FormulariosRGRL/NuevoFormularioRGRL';
import ListaFormularios from '../components/ConsultaFormularios/ListaFormularios';
import Spinner from '../components/UI/Spinner';
import ReferenteDatos from '../Api/ReferenteDatos/ReferenteDatos';
import BuscarParametro from '../Api/AutParametro';
import ReplicarFormularioRGRL from '../components/FormulariosRGRL/ReplicarFormularioRGRL';
import { PresentacionesListar } from '../Api/Presentaciones/Presentaciones';
import PresentacionesSelect from '../components/UI/Presentaciones/PresentacionesSelect'

class Formulario extends Component{   
    constructor(props) {
        super(props)
        this.state = {
            cuit: 0,
            internoEstablecimiento: 0,
            internoFormulario: 0,
            razonSocial: '',
            direccion: '',
            formulario: '',
            cargarFormulario: false,
            loadingFormularios: false,
            isLoading: true,
            accion: '',
            presentaciones: [],
            internoPresentacion: 0,
            estadoPresentacion: '',
        }
        this.seleccionaRegistro = this.seleccionaRegistro.bind(this)
        this.handleFinalizaCarga = this.handleFinalizaCarga.bind(this)
        this.handleLoadingFormularios = this.handleLoadingFormularios.bind(this)
        this.handleClickCerrar = this.handleClickCerrar.bind(this)
        this.handleSeleccionaPresentacion = this.handleSeleccionaPresentacion.bind(this)
    }

    handleClick = () => {
        this.setState({ 
            cargarFormulario: true,
            internoRespuestaFormulario: 0,
            internoEstablecimiento: 0,
            internoFormulario: 0,
            estado: '',
            accion: 'generar',
        })
    }

    handleClickCerrar() {     
        window.history.back();
        window.close()
        console.log('cerrar3')
    }

    handleEdita = () => {
        //this.props.history.push('/NuevoFormularioRAR/' + this.state.cuit);
        this.setState({ 
            cargarFormulario: true,
            accion: 'editar'
        })
    }

    handleReplica = () => {
        this.setState({ 
            cargarFormulario: true,
            accion: 'replicar'
        })
    }    

    handleSeleccionaPresentacion = async (presentacion, nuevaPresentacion) => {
        //console.log('[Formularios] handleSeleccionaPresentacion nuevaPresentacion ' + JSON.stringify(presentacion))
        

        if (nuevaPresentacion === true)
        {
            const nuevaPresentacion = {
                $id: this.state.presentaciones.length + 1,
                Interno: presentacion.Interno,
                CUIT: this.state.cuit,
                Nombre: presentacion.Nombre,
                Estado: presentacion.Estado,
                Tipo: presentacion.Tipo,
                FechaHoraGeneracion: presentacion.FechaHoraGeneracion,
                CantidadEstablecimientos: presentacion.CantidadEstablecimientos,

            }
            this.setState(prevState => ({
                presentaciones: [...prevState.presentaciones, nuevaPresentacion]
              }))
            
            this.setState({
                internoPresentacion: presentacion.Interno,
                estadoPresentacion: presentacion.Estado
            })
        }
        else
        {
            this.setState({
                internoPresentacion: presentacion.value,
                estadoPresentacion: presentacion.estado
            })
        }
    }

    seleccionaRegistro = (internoRespuestaFormulario, cuit, internoFormulario, internoEstablecimiento, estado, razonSocial, direccion, formulario) => {
        console.log('[Formularios] - internoEstablecimiento: ' + internoEstablecimiento)
        this.setState({
            internoRespuestaFormulario,
            internoFormulario,
            internoEstablecimiento,
            estado,
            direccion,
            formulario
        })
    }

    handleFinalizaCarga() {
        this.setState({ 
            cargarFormulario: false,
            internoRespuestaFormulario: 0,
            internoFormulario: 0,
            internoEstablecimiento: 0,
            estado: '',
            accion: ''
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
        BuscarParametro(this.props.match.params.Param)
        .then(res => {
            switch (res) {
                case null:
                    console.log('No se encontro parametro ' + this.props.match.params.Param);
                    alert(`El parametro ${this.props.match.params.Param} venció o no existe`)
                    this.handleClickCerrar();
                    break;
            
                default:
                    //Busco las presentaciones del CUIT y luego los datos
                    this.setState({cuit: res.CUIT})
                    const data = {
                        cuit: this.state.cuit,
                        tipo: 'R',
                    }
                    PresentacionesListar(data)
                    .then(presentaciones => {
                        console.log('[Formularios] presentaciones: ' + JSON.stringify(presentaciones))
                        this.setState({presentaciones})

                        ReferenteDatos(this.state.cuit)
                        .then(res => {
                            //console.log('[Formularios] - res: ' + JSON.stringify(res))
                            this.setState({
                                referenteDatos: res,
                                isLoading: !this.state.isLoading,
                            })
                        })
                    })
                    
                    break;
            }
        }) 
        
    }
    
    //#region  renders
    formularioMostrar() {
        switch (this.state.accion) {
            case 'replicar':
                return (
                    <ReplicarFormularioRGRL 
                        cuit={this.state.cuit}
                        referenteDatos={this.state.referenteDatos}
                        internoRespuestaFormulario={this.state.internoRespuestaFormulario}
                        internoFormulario={this.state.internoFormulario}
                        internoEstablecimiento={this.state.internoEstablecimiento}
                        establecimiento={this.state.direccion}
                        formulario={this.state.formulario}
                        finalizaCarga={this.handleFinalizaCarga}
                    />
                )

            case 'generapresentacion':
                break;
            default: //generar
                return (
                    <NuevoFormularioRGRL
                        internoRespuestaFormulario={this.state.internoRespuestaFormulario}
                        cuit={this.state.cuit}
                        internoEstablecimiento={this.state.internoEstablecimiento}
                        internoFormulario={this.state.internoFormulario}
                        referenteDatos={this.state.referenteDatos}
                        estado={this.state.estado}
                        finalizaCarga={this.handleFinalizaCarga}
                    />
                )
        }
    }

    botonesMostrar(disableGenera, disableReplicar, disableEditar) {
        return (
            <>
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
                    disabled={disableGenera}
                >
                    Genera Formulario
                </Button>
                <Button 
                    onClick={this.handleReplica}
                    className="btn-consultaformulario"
                    disabled={disableReplicar}
                >
                    Replica Formulario
                </Button>
                <Button 
                    onClick={this.handleClickCerrar}
                    className="btn-consultaformulario"
                >
                    Finaliza
                </Button>
            </>
        )
    }
    //#endregion

    render(){
        const disableEditar = this.state.estado !== 'Confirmado' && this.state.internoRespuestaFormulario ? false : true
        const disableGenera = this.state.cuit === 99999999999 ? true : false
        const disableReplicar =this.state.cuit === 99999999999 || this.state.internoRespuestaFormulario === 0 || this.state.internoPresentacion !== 0 ? true : false //this.state.estado === 'Confirmado' ? true : false
        //console.log('[Formularios] estado: ' + this.state.estado + ' - interno: ' + this.state.internoRespuestaFormulario)
        //console.log('[Formularios] loadingFormularios: ' + this.state.loadingFormularios)
        //console.log('[Formularios] isLoading: ' + this.state.isLoading)
        //console.log('[Formularios] referenteDatos: ' + JSON.stringify(this.state.referenteDatos))
        return <div>
            {this.state.isLoading === false ?
                <>
                {this.state.cargarFormulario === false ?
                    <div>
                        <h1>Consulta de Formularios RGRL</h1>
                        {this.botonesMostrar(disableGenera, disableReplicar, disableEditar)}
                        <PresentacionesSelect 
                            presentaciones={this.state.presentaciones}
                            seleccionaPresentacion={this.handleSeleccionaPresentacion}
                            cuit={this.state.cuit}
                            internoPresentacion={this.state.internoPresentacion}
                            tipo={'RGRL'}
                            estadoPresentacion={this.state.estadoPresentacion}
                        />
                        {this.state.loadingFormularios === false && this.state.isLoading === false ?
                            <ListaFormularios
                                cuit={this.state.cuit}
                                internoPresentacion={this.state.internoPresentacion}
                                seleccionaRegistro={this.seleccionaRegistro}
                                loadingFormularios={this.handleLoadingFormularios}
                                history={this.props.history}
                            />
                        :
                            <Spinner />
                        }
                    </div>
                :   <>
                        {this.formularioMostrar()}
                    </>
                }   
                </>
            :
                <Spinner />
            }            
        </div>
            
    }
}

export default Formulario;