import React, { Component, Fragment } from 'react';
import DatosGeneralesRAR from '../UI/DatosGenerales/DatosGeneralesRAR';
import CargarFormularioRAR from './CargarFormularioRAR';
import GenerarFormularioRAR from './GenerarFormularioRAR';
import ElegirEstablecimientoRAR from '../UI/ElegirEstablecimiento/ElegirEstablecimientoRAR'

class NuevoFormularioRAR extends Component{   
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
            internoEstablecimiento: 0,
            direccion: ''
        }
    }

    componentDidMount() {
        this.setState({ 
            cuit: parseInt(this.props.cuit),
            razonSocial: this.props.razonSocial,
            internoEstablecimiento: parseInt(this.props.internoEstablecimiento),
            direccion: this.props.direccion
        })
    }
    handleFormularioGenerado(formularioRARGenerado) { 
        console.log('[NuevoFormularioRAR] handleFormularioGenerado - formularioRARGenerado: ' + formularioRARGenerado)        
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
        //console.log('[NuevoFormularioRAR]-establecimiento: ' + this.state.internoEstablecimiento)
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
            <DatosGeneralesRAR 
                cuit={this.props.cuit}
                seleccionCUIT={this.handleSeleccionCUIT}                
                finalizaCarga={this.handleFinalizaCarga}
            />
            {this.state.cuit !== 0 ?
                <ElegirEstablecimientoRAR 
                    cuit={this.state.cuit}
                    internoEstablecimiento={this.state.internoEstablecimiento}
                    razonSocial={this.state.razonSocial}
                    direccion={this.state.direccion}
                    seleccionEstablecimiento={this.handleSeleccionEstablecimiento}
                />                         
            :
                null
            } 
            {this.state.internoEstablecimiento !== 0 ? /*{this.state.establecimiento.internoEstablecimiento !== 0 ? /*{this.props.establecimientoSeleccionado !== 0 ?*/            
                <GenerarFormularioRAR 
                    internoEstablecimiento={this.state.internoEstablecimiento}
                    formularioGenerado={this.handleFormularioGenerado}
                    disabled={disabled}
                />
            :
                null
            }

            {this.state.formularioRARGenerado.length !== 0 ?
                <CargarFormularioRAR 
                    formularioRARGenerado={this.state.formularioRARGenerado}   
                    finalizaCarga={this.handleFinalizaCarga} 
                />
            :
                null
            }
        </Fragment>
    }
}

export default NuevoFormularioRAR;