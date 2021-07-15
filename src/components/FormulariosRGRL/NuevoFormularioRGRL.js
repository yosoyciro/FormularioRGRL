import React, { Component, Fragment } from 'react';
import DatosGenerales from '../UI/DatosGenerales/DatosGenerales';
import FormularioA from '../../containers/FormularioA';
import ElegirTipoFormulario from '../UI/ElegirTipoFormulario/ElegirTipoFormulario';
import ElegirEstablecimientoRAR from '../UI/ElegirEstablecimiento/ElegirEstablecimientoRAR';
//import CargarFormulario from './CargarFormulario';
//import GenerarFormularioRAR from './GenerarFormularioRAR';
//import ElegirEstablecimientoRAR from '../UI/ElegirEstablecimiento/ElegirEstablecimientoRAR'

class NuevoFormularioRGRL extends Component{   
    constructor(props) {
        super(props)
        this.handleFinalizaCarga = this.handleFinalizaCarga.bind(this);
        this.handleSeleccionEstablecimiento = this.handleSeleccionEstablecimiento.bind(this);
        this.handleSeleccionFormulario = this.handleSeleccionFormulario.bind(this);
        this.handleSeleccionCUIT = this.handleSeleccionCUIT.bind(this);
        this.handleLoading = this.handleLoading.bind(this);
        this.handleLoadingEstablecimientos = this.handleLoadingEstablecimientos.bind(this);
        //this.handleNotificacionFecha = this.handleNotificacionFecha.bind(this)
        this.state = {
            formularioRGRL: [],
            renderEstablecimientos: false,
            internoFormulario: 0,
            internoEstablecimiento: 0,
            cantTrabajadores: 0,
            superficie: 0,
            loading: false,
            loadingEstablecimientos: true
        }
    }

    componentDidMount() {
        //console.log('[NuevoFormularioRGRL] referenteDatos: ' + this.props.referenteDatos)
        this.setState({ 
            cuit: this.props.cuit,
            internoFormulario: this.props.internoFormulario,
            internoEstablecimiento: this.props.internoEstablecimiento,
        })
    }

    handleFinalizaCarga() {
        this.props.finalizaCarga()
    }

    handleSeleccionEstablecimiento(internoEstablecimiento, direccion, cantTrabajadores, superficie, loading) {
        console.log('[NuevoFormularioRGRL]-handleSeleccionEstablecimiento - cantTrabajadores: ' + cantTrabajadores + '- direccion: ' + direccion)
        this.setState({ 
            internoEstablecimiento,
            direccion,
            cantTrabajadores,
            superficie,
            loading
        })
        console.log('[NuevoFormularioRGRL]-establecimiento: ' + this.state.internoEstablecimiento)
    }

    handleSeleccionFormulario(formularioRGRL, internoFormulario) {
        console.log('[NuevoFormularioRGRL] formularioRGRL ', formularioRGRL)
        this.setState({
            formularioRGRL,
            internoFormulario
        })        
    }

    handleSeleccionCUIT(cuit, razonSocial, notificacionFecha) {
        this.setState({ 
            renderEstablecimientos: true
        })
    }

    /*handleNotificacionFecha(notificacionFecha) {
        console.log('notificacionFecha: ' + notificacionFecha)
        this.setState({ 
            notificacionFecha,
        })
    }*/

    handleLoading(loading) {
        this.setState({
            loading
        })
    }

    handleLoadingEstablecimientos(loadingEstablecimientos) {
        this.setState({
            loadingEstablecimientos
        })
    }
    
    render() {  
        console.log('[NuevoFormularioRGRL] internoEstablecimiento ', this.state.internoEstablecimiento)   
        console.log('[NuevoFormularioRGRL] this.state.referenteDatos ', this.props.referenteDatos)  
        console.log('[formularioRGRL]', this.state.formularioRGRL) 
        return <Fragment> 
            <h2>Formulario RGRL</h2>        
            <DatosGenerales
                cuit={this.props.cuit}
                referenteDatos={this.props.referenteDatos}
                seleccionCUIT={this.handleSeleccionCUIT}  
                //changeNotificacionFecha={this.handleNotificacionFecha}              
                finalizaCarga={this.handleFinalizaCarga}
            />
            {this.state.renderEstablecimientos ?
                <ElegirEstablecimientoRAR
                    cuit={this.props.cuit}
                    referenteDatos={this.props.referenteDatos}
                    internoFormulario={this.state.internoFormulario}
                    internoEstablecimiento={this.state.internoEstablecimiento}
                    cantTrabajadores={this.state.cantTrabajadores}
                    superficie={this.state.superficie}
                    mostrarDatosEstablecimiento={true}
                    seleccionEstablecimiento={this.handleSeleccionEstablecimiento}
                    loadingEstablecimientos={this.handleLoadingEstablecimientos}
                />                         
            :
                null
            } 
            {this.state.internoEstablecimiento !== 0 && this.state.loadingEstablecimientos !== true ? 
                <ElegirTipoFormulario
                    internoEstablecimiento={this.state.internoEstablecimiento}
                    internoFormulario={this.state.internoFormulario}
                    estado={this.props.estado}
                    seleccionFormulario={this.handleSeleccionFormulario}
                    loading={this.handleLoading}
                />
            :
                null
            }
            {this.state.internoEstablecimiento !== 0 && this.state.formularioRGRL.length !== 0 && this.state.loading === false ? 
                <FormularioA
                    formularioRGRL={this.state.formularioRGRL}
                    internoEstablecimiento={this.state.internoEstablecimiento}
                    internoRespuestasFormulario={this.props.internoRespuestaFormulario}
                    notificacionFecha={this.props.referenteDatos.NotificacionRGRL}
                    cantTrabajadores={this.state.cantTrabajadores}
                    superficie={this.state.superficie}
                />
            :
                null
            }
        </Fragment>        
    }
}

export default NuevoFormularioRGRL;