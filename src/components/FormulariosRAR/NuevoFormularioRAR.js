import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import DatosGeneralesRAR from '../UI/DatosGenerales/DatosGeneralesRAR';
import CargarFormularioRAR from './CargarFormularioRAR';
import GenerarFormularioRAR from './GenerarFormularioRAR';

class NuevoFormularioRAR extends Component{   
    constructor(props) {
        super(props)
        this.handleFormularioGenerado = this.handleFormularioGenerado.bind(this);
        this.state = {
            formularioRARGenerado: []
        }
    }

    handleFormularioGenerado(formularioRARGenerado) {
        this.setState({
            formularioRARGenerado            
        })        
    }
    
    render() {
        const { handle } = this.props.match.params
        const disabled = this.state.formularioRARGenerado.length === 0 ? false : true
        //console.log('[Formularios] cuit: ' + handle)

        return <Fragment>
            <h2>Formulario RAR</h2>
            <DatosGeneralesRAR 
                cuit={handle}
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