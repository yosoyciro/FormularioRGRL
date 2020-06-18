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
        this.state = {
            formularioRGRL: [],
            cuit: 0,
            razonSocial: '',
            internoFormulario: 0,
            internoEstablecimiento: 0,
            direccion: '',
            loading: false
        }
    }

    componentDidMount() {
        this.setState({ 
            cuit: parseInt(this.props.cuit),
            razonSocial: this.props.razonSocial,
            internoFormulario: this.props.internoFormulario,
            internoEstablecimiento: parseInt(this.props.internoEstablecimiento),
            direccion: this.props.direccion,
            estado: this.props.estado
        })
    }

    handleFinalizaCarga() {
        this.props.finalizaCarga()
    }

    handleSeleccionEstablecimiento(internoEstablecimiento, direccion, loading) {
        //console.log('[NuevoFormularioRAR]-handleSeleccionEstablecimiento - internoEstablecimiento: ' + internoEstablecimiento + '- direccion: ' + direccion)
        this.setState({ 
            internoEstablecimiento,
            direccion,
            loading
        })
        //console.log('[NuevoFormularioRGRL]-establecimiento: ' + this.state.internoEstablecimiento)
    }

    handleSeleccionFormulario(formularioRGRL, internoFormulario) {
        console.log('[NuevoFormularioRGRL] internoFormulario ' + internoFormulario)
        this.setState({
            formularioRGRL,
            internoFormulario
        })        
    }

    handleSeleccionCUIT(cuit, razonSocial, estado) {
        this.setState({ 
            cuit,
            razonSocial
        })
    }

    handleLoading(loading) {
        this.setState({
            loading
        })
    }
    
    render() {        
        return <Fragment> 
            <h2>Formulario RGRL</h2>        
            <DatosGenerales
                cuit={this.props.cuit}
                seleccionCUIT={this.handleSeleccionCUIT}                
                finalizaCarga={this.handleFinalizaCarga}
            />
            {this.state.cuit !== 0 ?
                <ElegirEstablecimientoRAR
                    cuit={this.state.cuit}
                    internoFormulario={this.state.internoFormulario}
                    internoEstablecimiento={this.state.internoEstablecimiento}
                    razonSocial={this.state.razonSocial}
                    direccion={this.state.direccion}
                    seleccionEstablecimiento={this.handleSeleccionEstablecimiento}
                />                         
            :
                null
            } 
            {this.state.internoEstablecimiento !== 0 ? 
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
                />
            :
                null
            }
        </Fragment>        
    }
}

export default NuevoFormularioRGRL;