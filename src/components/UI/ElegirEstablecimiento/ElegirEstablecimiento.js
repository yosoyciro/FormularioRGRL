import React, { Component } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import * as tiposAcciones from '../../../Store/acciones';
import Api from '../../../Api/Api';
import './ElegirEstablecimiento.css'

//Componente que se conecta al web api y trae todas las preguntas
class ElegirEstablecimiento extends Component{ 
    state = {
        selectedOption: 0,
        establecimientos: []      
    }
        
    componentDidMount() {        
        this.cargarEstablecimientos()
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption: selectedOption.value }) 

        //Grabo el form elegido en el Redux
        this.props.seleccionEstablecimiento(selectedOption.value, selectedOption.label);    
    }    

    cargarEstablecimientos = async  event => {
        try {
            const refEstablecimientos = await Api.get(`RefEstablecimiento/ListarPorCuit?pCuit=${this.props.cuit}`)             
            console.log(refEstablecimientos.data)
            this.setState({establecimientos: refEstablecimientos.data})            
        }
        catch (error) {
            console.log(error);
        }     
    }

render() {           
    const menuIsOpen= (this.props.establecimientoSeleccionado === 0 ? true : false)    
    const disable = (this.props.establecimientoSeleccionado !== 0 && this.props.formSel !== 0)  ? true : false
    const opciones = this.state.establecimientos.map(establecimiento => {
        console.log('establecimiento: ' + establecimiento)            
        return {value: establecimiento.Interno, label: establecimiento.Direccion, cuit: this.props.cuit, razonsocial: this.props.razonSocial }
    })

    //Cuando elijo, armo el label nuevo
    var currentSelection = []
    if (this.props.establecimientoSeleccionado)
        currentSelection = [
            {label: 'Seleccione formulario para ' + this.props.cuit + ' - ' + this.props.razonSocial + ' - ' + this.props.descripcionEstablecimiento, value: this.props.establecimientoSeleccionado}
        ];    
    
    return <>
            <table className="table-establecimiento">
                <thead className="elegirestablecimiento-thead">
                    <tr className="elegirestablecimiento-tr">
                        <th className="elegirestablecimiento-th"></th>
                        <th className="selectestablecimiento-th"></th>
                    </tr>
                </thead>
                <tbody className="elegirestablecimiento-tbody">
                    <td className="elegirestablecimiento-td">
                        <label>Establecimiento: </label>
                    </td>
                    <td className="elegirestablecimiento-td">
                        <Select 
                            value={currentSelection}
                            name="form-field-name"
                            onChange={this.handleChange}                     
                            options={opciones}
                            isSearchable={false}
                            isDisabled={disable}
                            placeholder={'Seleccione establecimiento dependiente de ' + this.props.cuit + ' ' + this.props.razonSocial}
                            menuIsOpen={menuIsOpen}
                            formatCreateLabel={userInput => `Search for ${userInput}`}
                        />
                    </td>
                </tbody>
            </table>                                   
        </>                                                                                                      
    }
}

const mapStateToProps = state => {
    return {
        establecimientoSeleccionado: state.establecimiento.interno,
        descripcionEstablecimiento: state.establecimiento.descripcion,
        formSel: state.form.formSeleccionado
    };
}

const mapDispatchToProps = dispatch => {
    return {
        seleccionEstablecimiento: (internoEstablecimiento, descripcion) => dispatch({type: tiposAcciones.ESTABLECIMIENTO_SELECCION, internoEstablecimiento: internoEstablecimiento, descripcion: descripcion})
    };
}

export default connect(mapStateToProps,mapDispatchToProps) (ElegirEstablecimiento);