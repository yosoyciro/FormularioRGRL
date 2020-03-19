import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import DatosGeneralesRAR from '../UI/DatosGenerales/DatosGeneralesRAR';
import CargarFormularioRAR from './CargarFormularioRAR';
import GenerarFormularioRAR from './GenerarFormularioRAR';
import { Button } from 'react-bootstrap';

class NuevoFormularioRAR extends Component{   
    constructor(props) {
        super(props)
        this.handleFormularioGenerado = this.handleFormularioGenerado.bind(this);
        this.handleFinalizaCarga = this.handleFinalizaCarga.bind(this);
        this.state = {
            formularioRARGenerado: []
        }
    }

    handleFormularioGenerado(formularioRARGenerado) {
        this.setState({
            formularioRARGenerado            
        })        
    }

    handleFinalizaCarga() {
        this.props.finalizaCarga()
    }
    
    render() {        
        //const { match: { params } } = this.props;
        //console.log('params: ' + params)
        const disabled = this.state.formularioRARGenerado.length === 0 ? false : true
        //console.log('[NuevoFormularioRAR] cuit: ' + params.cuitSeleccionado)

        return <Fragment>
            <h2>Formulario RAR</h2>
            <DatosGeneralesRAR 
                cuit={this.props.cuit}
                finalizaCarga={this.handleFinalizaCarga}
            />
            {this.props.establecimientoSeleccionado !== 0 ?
                <GenerarFormularioRAR 
                    establecimiento={this.props.establecimientoSeleccionado}
                    formularioGenerado={this.handleFormularioGenerado}
                    disabled={disabled}
                />
            :
                null
            }

            {this.state.formularioRARGenerado.length !== 0 ?
                <CargarFormularioRAR 
                    formularioRARGenerado={this.state.formularioRARGenerado}                    
                />
            :
                null
            }
        </Fragment>
    }
}

const mapStateToProps = state => {
    return {
        establecimientoSeleccionado: state.establecimiento.interno,
    };
}

export default connect(mapStateToProps, null) (NuevoFormularioRAR);