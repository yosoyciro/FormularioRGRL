import React, { Component } from 'react';
import Select from 'react-select';
import Api from '../../../Api/Api';
import './ElegirEstablecimiento.css'

//Componente que se conecta al web api y trae todas las preguntas
class ElegirEstablecimiento extends Component{ 
    state = {
        selectedOption: 0,
        establecimientos: []      
    }
        
    componentDidMount() {        
        switch(parseInt(this.props.internoEstablecimiento))
        {
            case 0:
                this.cargarEstablecimientos()
                break;

            default:
                // Create a new array based on current state:
                let establecimientos = [...this.state.establecimientos];

                // Add item to it
                establecimientos.push({ 
                    Interno: this.props.internoEstablecimiento,
                    DomicilioCalle: this.props.direccion
                 });

                // Set state
                this.setState({ establecimientos });
                this.props.seleccionEstablecimiento(parseInt(this.props.internoEstablecimiento), this.props.direccion)
                break;
        }
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
        //console.log('establecimiento: ' + establecimiento)            
        return {value: establecimiento.Interno, label: establecimiento.DomicilioCalle + ' ' + establecimiento.DomicilioNro, cuit: this.props.cuit, razonsocial: this.props.razonSocial }
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

export default ElegirEstablecimiento;