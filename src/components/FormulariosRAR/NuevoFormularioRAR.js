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
        this.handleLoadingEstablecimientos = this.handleLoadingEstablecimientos.bind(this);
        this.state = {
            formularioRARGenerado: [],
            renderEstablecimientos: false,
            internoEstablecimiento: this.props.internoEstablecimiento,
            loadingEstablecimientos: true,
        }
    }

    componentDidMount() {
        /*this.setState({ 
            internoEstablecimiento: parseInt(this.props.internoEstablecimiento),
        })*/
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

    handleSeleccionEstablecimiento(internoEstablecimiento) {
        console.log('[NuevoFormularioRAR]-handleSeleccionEstablecimiento - internoEstablecimiento: ' + internoEstablecimiento)
        this.setState({ 
            internoEstablecimiento: internoEstablecimiento,
        })
        //console.log('[NuevoFormularioRAR]-establecimiento: ' + this.state.internoEstablecimiento)
    }

    handleSeleccionCUIT(cuit, razonSocial) {
        this.setState({ 
            renderEstablecimientos: true
        })
    }

    handleLoadingEstablecimientos(loadingEstablecimientos) {
        this.setState({
            loadingEstablecimientos
        })
    }
    
    render() {        
        //console.log('RENDER - formularioRARGenerador: ' + Object.values(this.state.formularioRARGenerado))
        const disabled = this.state.formularioRARGenerado.length === 0 ? false : true
        //console.log('[NuevoFormularioRAR] cuit: ' + params.cuitSeleccionado)
        //console.log('[NuevoFormularioRAR] - internoEstablecimiento: ' + this.state.internoEstablecimiento)
        //console.log('[NuevoFormularioRAR] this.state.formularioRARGenerado.CantTrabajadoresExpuestos: ' + this.state.formularioRARGenerado.CantTrabajadoresExpuestos)
        //console.log('[NuevoFormularioRAR] this.state.formularioRARGenerado: ' + JSON.stringify(this.state.formularioRARGenerado))
        return <Fragment>
            <h2>Formulario RAR</h2>
            <DatosGeneralesRAR 
                cuit={this.props.cuit}
                referenteDatos={this.props.referenteDatos}
                seleccionCUIT={this.handleSeleccionCUIT}                
                finalizaCarga={this.handleFinalizaCarga}
            />
            {this.state.renderEstablecimientos ?
                <ElegirEstablecimientoRAR 
                    cuit={this.props.cuit}
                    internoEstablecimiento={this.state.internoEstablecimiento}
                    referenteDatos={this.props.referenteDatos} 
                    seleccionEstablecimiento={this.handleSeleccionEstablecimiento}
                    loadingEstablecimientos={this.handleLoadingEstablecimientos}
                />                         
            :
                null
            } 
            {this.state.internoEstablecimiento !== 0 && !this.state.loadingEstablecimientos ? /*{this.state.establecimiento.internoEstablecimiento !== 0 ? /*{this.props.establecimientoSeleccionado !== 0 ?*/            
                <GenerarFormularioRAR 
                    internoEstablecimiento={this.state.internoEstablecimiento}
                    formularioRARGenerado={this.state.formularioRARGenerado}
                    formularioGenerado={this.handleFormularioGenerado}
                    disabled={disabled}
                />
            :
                null
            }
            <>
            {this.state.formularioRARGenerado.length !== 0 && !this.state.loadingEstablecimientos !== 0 ?
                <CargarFormularioRAR 
                    formularioRARGenerado={this.state.formularioRARGenerado}   
                    finalizaCarga={this.handleFinalizaCarga} 
                />
            :
                null            
            }            
            </>
        </Fragment>
    }
}

export default NuevoFormularioRAR;