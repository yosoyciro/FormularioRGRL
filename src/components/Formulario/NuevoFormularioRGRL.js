import React, { Component, Fragment } from 'react';
import DatosGenerales from '../UI/DatosGenerales/DatosGenerales';
import ElegirEstablecimiento from '../UI/ElegirEstablecimiento/ElegirEstablecimiento';
import FormularioA from '../../containers/FormularioA';
//import CargarFormulario from './CargarFormulario';
//import GenerarFormularioRAR from './GenerarFormularioRAR';
//import ElegirEstablecimientoRAR from '../UI/ElegirEstablecimiento/ElegirEstablecimientoRAR'

class NuevoFormularioRGRL extends Component{   
    constructor(props) {
        super(props)
        this.handleFormularioGenerado = this.handleFormularioGenerado.bind(this);
        this.handleFinalizaCarga = this.handleFinalizaCarga.bind(this);
        this.handleSeleccionEstablecimiento = this.handleSeleccionEstablecimiento.bind(this);
        this.handleSeleccionCUIT = this.handleSeleccionCUIT.bind(this);
        this.state = {
            formularioRARGenerado: [],
            cuit: 0,
            razonSocial: '',
            internoFormulario: 0,
            internoEstablecimiento: 0,
            direccion: '',
            estado: null
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

    handleFormularioGenerado(formularioRARGenerado) { 
        //console.log('[NuevoFormularioRAR] handleFormularioGenerado - formularioRARGenerado: ' + formularioRARGenerado)        
        this.setState({
            formularioRARGenerado: formularioRARGenerado
        })            
    }

    handleFinalizaCarga() {
        this.props.finalizaCarga()
    }

    handleSeleccionEstablecimiento(internoEstablecimiento, direccion) {
        //console.log('[NuevoFormularioRAR]-handleSeleccionEstablecimiento - internoEstablecimiento: ' + internoEstablecimiento + '- direccion: ' + direccion)
        this.setState({ 
            internoEstablecimiento: internoEstablecimiento,
            direccion: direccion
        })
        //console.log('[NuevoFormularioRGRL]-establecimiento: ' + this.state.internoEstablecimiento)
    }

    handleSeleccionCUIT(cuit, razonSocial) {
        this.setState({ 
            cuit,
            razonSocial
        })
    }
    
    render() {        
        console.log('RENDER - formularioRARGenerador: ' + Object.values(this.state.formularioRARGenerado))
        const disabled = this.state.formularioRARGenerado.length === 0 ? false : true
        //console.log('[NuevoFormularioRAR] cuit: ' + params.cuitSeleccionado)
        //console.log('[NuevoFormularioRAR] - internoEstablecimiento: ' + this.state.internoEstablecimiento)
        return <Fragment>
            <h2>Formulario RAR</h2>
            <DatosGenerales
                cuit={this.props.cuit}
                seleccionCUIT={this.handleSeleccionCUIT}                
                finalizaCarga={this.handleFinalizaCarga}
            />
            {this.state.cuit !== 0 ?
                <ElegirEstablecimiento
                    cuit={this.state.cuit}
                    internoEstablecimiento={this.state.internoEstablecimiento}
                    razonSocial={this.state.razonSocial}
                    direccion={this.state.direccion}
                    seleccionEstablecimiento={this.handleSeleccionEstablecimiento}
                />                         
            :
                null
            } 
            {this.state.internoEstablecimiento !== 0 ? 
                <FormularioA
                    internoFormulario={this.state.internoFormulario}
                    internoEstablecimiento={this.state.internoEstablecimiento}
                    estado={this.state.estado}
                    formularioGenerado={this.handleFormularioGenerado}
                    disabled={disabled}
                />
            :
                null
            }
        </Fragment>
    }
}

export default NuevoFormularioRGRL;