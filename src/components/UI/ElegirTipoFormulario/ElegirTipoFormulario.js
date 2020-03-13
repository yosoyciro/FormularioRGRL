import React, { Component } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import * as tiposAcciones from '../../../Store/acciones';
import CargarFormularios from '../../../Api/CargarFormularios'
import './ElegirTipoFormulario.css'

class ElegirTipoFormulario extends Component{ 
    state = {
        selectedOption: 0,
        mostrarPreguntas: false,
        formularios: []
    }

    componentDidMount = async event => {
        this.props.seleccionFormulario(0, 0, 0, 0, '');                     
        const formularios = await CargarFormularios(this.props.establecimientoSeleccionado) 
        this.setState({ formularios })
    }

    handleChange = (selectedOption) => {
        //console.log('estado: ' + selectedOption.estado)
        this.setState({ selectedOption: selectedOption.value })       
        this.props.seleccionFormulario(selectedOption.value, selectedOption.gremios, selectedOption.contratistas, selectedOption.responsables, selectedOption.estado);                     
    }

    handleSubmit (event) {
        event.preventDefault();                
    }       

    /*cargarFormularios = async establecimiento => {
        return CargarFormularios(establecimiento)
    }*/

render() {     
    //console.log('establecimiento: ' + this.props.establecimientoSeleccionado)
    const tiposForm = this.state.formularios
    
        
    //tiposForm.map(t => console.log('t: ' + t.label))
    //console.log('length: ' + tiposForm.length())
    //Habilitado o no
    const disable = (this.props.establecimientoSeleccionado !== 0 && this.props.formSel !== 0)  ? true : false
    const menuIsOpen = (this.props.establecimientoSeleccionado !== 0 && this.props.formSel === 0)  ? true : false

    return <table className="table-tipoformulario">
            <label>Formulario: </label>        
            <Select 
                name="formularios-select"
                onChange={this.handleChange}                        
                options={tiposForm}
                isDisabled={disable}
                isSearchable={false}
                placeholder={'Formularios disponibles'}
                menuIsOpen={menuIsOpen}
            />                              
        </table>                                                                                                             
    }
}

const mapStateToProps = state => {
    return {
        establecimientoSeleccionado: state.establecimiento.interno,
        formSel: state.form.formSeleccionado
    };
}

const mapDispatchToProps = dispatch => {
    return {
        seleccionFormulario: (formSeleccionado, cantGremios, cantContratistas, cantResponsables, estado) => dispatch({type: tiposAcciones.FORMULARIO_SELECCION, formSeleccionado: formSeleccionado, cantGremios: cantGremios, cantContratistas: cantContratistas, cantResponsables: cantResponsables, estado: estado})
    };
}

export default connect(mapStateToProps,mapDispatchToProps) (ElegirTipoFormulario);