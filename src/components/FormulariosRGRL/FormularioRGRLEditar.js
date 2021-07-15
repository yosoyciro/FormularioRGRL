import React, { Component, Fragment } from 'react';
import { CargarEstablecimientos } from '../../Api/CargarEstablecimientos';
import CargarFormularioPorInterno from '../../Api/FormulariosRGRL/CargarFormularioPorInterno';
import ReferenteDatos from '../../Api/ReferenteDatos/ReferenteDatos';
import FormularioA from '../../containers/FormularioA';
import DatosGenerales from '../UI/DatosGenerales/DatosGenerales';
import ElegirEstablecimientoRAR from '../UI/ElegirEstablecimiento/ElegirEstablecimientoRAR';
import ElegirTipoFormulario from '../UI/ElegirTipoFormulario/ElegirTipoFormulario';
import Spinner from '../UI/Spinner'

class FormularioRGRLEditar extends Component{   
    constructor(props) {
        super(props)
        this.handleFinalizaCarga = this.handleFinalizaCarga.bind(this);
        this.handleSeleccionEstablecimiento = this.handleSeleccionEstablecimiento.bind(this);
        this.handleLoadingEstablecimientos = this.handleLoadingEstablecimientos.bind(this);
        this.handleLoading = this.handleLoading.bind(this);
        this.handleSeleccionFormulario = this.handleSeleccionFormulario.bind(this);

        this.state = {
            formularioRGRL: null,
            referenteDatos: [],
            establecimiento: null,
            loading: true,
            cargoEstablecimientos: false,
            cargoFormularios: false,
        }
    }

    async componentDidMount() {
        //Cargo el formulario
        //console.log('[FormularioRGRLEditar-componentDidMount] this.props', this.props)
        //console.log('[FormularioRGRLEditar-componentDidMount] this.props.match.params.Interno ', this.props.match.params.Interno)
        const formularioRGRL = await CargarFormularioPorInterno(this.props.match.params.Interno);
        //console.log('[FormularioRGRLEditar] formularioRGRL ', formularioRGRL)

        //Cargo establecimiento
        const establecimiento = await CargarEstablecimientos({opcion: 1, internoEstablecimiento: formularioRGRL.InternoEstablecimiento})
        
        //Cargo referente datos
        const referenteDatos = await ReferenteDatos(establecimiento.CUIT)

        this.setState({
            formularioRGRL,
            establecimiento,
            referenteDatos,
            loading: !this.state.loading
        });        
        
        //console.log('[FormularioRGRLEditar] referenteDatos ', this.state.referenteDatos)
    }

    //Props para componentes
    handleSeleccionCUIT(cuit, razonSocial, notificacionFecha) {
        
    }

    handleSeleccionEstablecimiento(internoEstablecimiento, direccion, cantTrabajadores, superficie, loading) {
        this.setState({ cargoEstablecimientos: !this.state.cargoEstablecimientos })
    }

    handleLoadingEstablecimientos(loadingEstablecimientos) {
        /*this.setState({
            loadingEstablecimientos
        })*/
    }

    handleFinalizaCarga() {
        //console.log('handleFinalizaCarga - this.props', this.props)
        //this.goBack();
        this.props.history.goBack();
    }

    handleLoading(loading) {
        this.setState({
            loading
        })
    }

    handleSeleccionFormulario(formularioRGRL, internoFormulario) {
        //console.log('[NuevoFormularioRGRL] internoFormulario ' + internoFormulario)
        this.setState({ cargoFormularios: !this.state.cargoFormularios })     
    }

    render() {  
        //console.log('this.state.loading', this.state.loading)
        //console.log('this.state.referenteDatos', this.state.referenteDatos)
        //console.log('[FormularioRGRLEditar] establecimiento ', this.state.establecimiento)
        return <Fragment> 
            <h2>Edita Formulario RGRL</h2>  
            {this.state.loading === true ?
                <Spinner/>
            :
            <>
                <DatosGenerales
                    cuit={this.state.referenteDatos[0].CUIT}
                    referenteDatos={this.state.referenteDatos}
                    seleccionCUIT={this.handleSeleccionCUIT}  
                    //changeNotificacionFecha={this.handleNotificacionFecha}              
                    finalizaCarga={this.handleFinalizaCarga}
                /> 

                <ElegirEstablecimientoRAR
                    cuit={this.state.referenteDatos[0].CUIT}
                    referenteDatos={this.state.referenteDatos}
                    internoFormulario={this.state.formularioRGRL.InternoFormulario}
                    internoEstablecimiento={this.state.formularioRGRL.InternoEstablecimiento}
                    cantTrabajadores={this.state.establecimiento.CantTrabajadores}
                    superficie={this.state.establecimiento.Superficie}
                    mostrarDatosEstablecimiento={true}
                    seleccionEstablecimiento={this.handleSeleccionEstablecimiento}
                    loadingEstablecimientos={this.handleLoadingEstablecimientos}
                />

                {this.state.cargoEstablecimientos === true ?
                    <ElegirTipoFormulario
                        internoEstablecimiento={this.state.formularioRGRL.InternoEstablecimiento}
                        internoFormulario={this.state.formularioRGRL.InternoFormulario}
                        estado={this.state.formularioRGRL.Estado}
                        seleccionFormulario={this.handleSeleccionFormulario}
                        loading={this.handleLoading}
                    />
                :
                    null
                }

                {this.state.cargoFormularios === true ?
                    <FormularioA
                        formularioRGRL={this.state.formularioRGRL}
                        internoEstablecimiento={this.state.formularioRGRL.InternoEstablecimiento}
                        internoRespuestasFormulario={this.state.formularioRGRL.Interno}
                        notificacionFecha={this.state.referenteDatos[0].NotificacionRGRL}
                        cantTrabajadores={this.state.establecimiento.CantTrabajadores}
                        superficie={this.state.establecimiento.Superficie}
                    />
                :
                    null
                }
            </>
            }
        </Fragment>        
    }
}

export default FormularioRGRLEditar;