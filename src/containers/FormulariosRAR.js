import React, {Component} from 'react';
import { Button } from 'react-bootstrap';
import ReferenteDatos from '../Api/ReferenteDatos/ReferenteDatos';
import ListaFormulariosRAR from '../components/FormulariosRAR/ListaFormulariosRAR';
import NuevoFormularioRAR from '../components/FormulariosRAR/NuevoFormularioRAR';
import Spinner from '../components/UI/Spinner';
import BuscarParametro from '../Api/AutParametro';
import PresentacionesSelect from '../components/UI/Presentaciones/PresentacionesSelect'
import { PresentacionesListar } from '../Api/Presentaciones/Presentaciones';

export class FormulariosRAR extends Component{
    constructor() {
        super()
        this.state = {
            cuit: 0,
            isLoading: true,
            referenteDatos: [],
            internoFormularioRAR: 0,
            internoEstablecimiento: 0,
            cargarFormulario: false,            
            estado: '',
            presentaciones: [],
            internoPresentacion: 0,
            estadoPresentacion: '',
        }
        this.seleccionaRegistro = this.seleccionaRegistro.bind(this)
        this.handleFinalizaCarga = this.handleFinalizaCarga.bind(this)
        this.handleClickCerrar = this.handleClickCerrar.bind(this)
        this.handleSeleccionaPresentacion = this.handleSeleccionaPresentacion.bind(this)
    }

    componentDidMount() {
        BuscarParametro(this.props.match.params.Param)
        .then(res => {
            switch (res) {
                case null:
                    console.log('No se encontro parametro ' + this.props.match.params.Param);
                    this.handleClickCerrar();
                    break;
            
                default:
                    this.setState({cuit: res.CUIT})
                    const data = {
                        cuit: this.state.cuit,
                        tipo: 'A',
                    }
                    PresentacionesListar(data)
                    .then(presentaciones => {
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

    handleClick = () => {
        this.setState({ 
            cargarFormulario: true,
            internoFormularioRAR: 0,
            internoEstablecimiento: 0,
            estado: ''
        })
    }

    handleClickCerrar() {       
        window.history.back();
        window.close();
        //console.log('cerrar')
    }

    handleEdita = () => {
        //this.props.history.push('/NuevoFormularioRAR/' + this.state.cuit);
        this.setState({ 
            cargarFormulario: true
        })
    }

    seleccionaRegistro = (internoFormularioRAR, internoEstablecimiento, estado) => {
        //console.log('[FormulariosRAR] - direccion: ' + direccion)
        this.setState({
            internoFormularioRAR,
            internoEstablecimiento,
            estado
        })
    }

    handleFinalizaCarga() {
        this.setState({ 
            cargarFormulario: !this.state.cargarFormulario,
            estado: ''
        })
    }

    handleSeleccionaPresentacion = (internoPresentacion, estadoPresentacion, nuevaPresentacion) => {
        this.setState({
            internoPresentacion,
            estadoPresentacion
        })

        if (nuevaPresentacion === true)
        {
            PresentacionesListar(this.state.cuit)
            .then(presentaciones => {
                this.setState({presentaciones})
            })
        }
    }
 
    render(){
        //console.log('[FormulariosRAR] - internoFormulariorRAR: ' + this.state.internoFormularioRAR)
        console.log('[FormulariosRAR] - internoPresentacion: ' + this.state.internoPresentacion)
        const disableEdita = this.state.cuit !== 99999999999 && this.state.internoFormularioRAR !== 0 ? false : true
        const disableGenera = this.state.cuit === 99999999999 ? true : false
        return <div>
            {this.state.isLoading === true ?
                <Spinner />
            :
            <>
                {this.state.cargarFormulario === false ?
                    <div>
                        <h1>Consulta de Formularios RAR</h1>
                        {this.state.cuit !== 0 && this.state.estado !== 'Confirmado' ?
                            <Button 
                                onClick={this.handleEdita}
                                className="btn-consultaformulario"
                                disabled={disableEdita}
                            >
                                Edita Formulario
                            </Button>
                        :
                            null
                        }
                        <Button 
                            onClick={this.handleClick}
                            className="btn-consultaformulario"
                            disabled={disableGenera}
                        >
                            Genera Formulario
                        </Button>
                        <Button 
                            onClick={this.handleClickCerrar}
                            className="btn-consultaformulario"
                        >
                            Finaliza
                        </Button>
                        <PresentacionesSelect 
                            presentaciones={this.state.presentaciones}
                            seleccionaPresentacion={this.handleSeleccionaPresentacion}
                            cuit={this.state.cuit}
                            internoPresentacion={this.state.internoPresentacion}
                            tipo={'RAR'}
                            estadoPresentacion={this.state.estadoPresentacion}
                        />
                        <ListaFormulariosRAR
                            cuit={this.state.cuit}
                            internoPresentacion={this.state.internoPresentacion}
                            seleccionaRegistro={this.seleccionaRegistro}
                            cargarFormulario={this.state.cargarFormulario}
                        />
                    </div>       
                :
                    <NuevoFormularioRAR
                        cuit={this.state.cuit}
                        internoEstablecimiento={this.state.internoEstablecimiento}
                        referenteDatos={this.state.referenteDatos}
                        finalizaCarga={this.handleFinalizaCarga}
                    />
                }  
            </>
        }
        </div>
    }
}

export default FormulariosRAR;