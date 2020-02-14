import React, { Component, Fragment } from 'react';
import DatosGenerales from '../components/UI/DatosGenerales/DatosGenerales';
import { connect } from 'react-redux';
import FormularioA from './FormularioA';

class Formulario extends Component{   
    componentDidMount() {
        
    }  
    render() {
        const { handle } = this.props.match.params
        //console.log('[Formularios] cuit: ' + handle)

        return <Fragment>
            <h2>Formulario RGRL</h2>
            <DatosGenerales 
                cuit={handle}
            />
            {this.props.formSel !== 0 ?
                <FormularioA />
            :
                null
            }
        </Fragment>
    }
}

const mapStateToProps = state => {
    return {
        formSel: state.form.formSeleccionado,
        /*cantGremios: state.form.cantGremios,
        cantContratistas: state.form.cantContratistas,
        cantResponsables: state.form.cantResponsables,*/
    };
}

export default connect(mapStateToProps, null) (Formulario);