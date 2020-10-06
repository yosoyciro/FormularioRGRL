import React, { Component } from 'react';
import Select from 'react-select';
import CargarEstablecimientos from '../../../Api/CargarEstablecimientos';
import './ElegirEstablecimiento.css'

//Componente que se conecta al web api y trae todas las preguntas
class ElegirEstablecimiento extends Component{ 
    state = {
        selectedOption: 0,
        establecimientos: []      
    }
        
    componentDidMount = async() => {        
        switch(parseInt(this.props.internoEstablecimiento))
        {
            case 0:
                await this.cargarEstablecimientos(0)
                break;

            default:
                await this.cargarEstablecimientos(1)                
                /*// Create a new array based on current state:
                let establecimientos = [...this.state.establecimientos];

                // Add item to it
                establecimientos.push({ 
                    Interno: this.props.internoEstablecimiento,
                    Nombre: this.props.direccion,
                    DomicilioCalle: this.props.direccion
                 });

                // Set state
                this.setState({ establecimientos });
                this.props.seleccionEstablecimiento(parseInt(this.props.internoEstablecimiento), this.props.direccion)*/
                console.log('devuelve')
                this.props.seleccionEstablecimiento(parseInt(this.props.internoEstablecimiento), this.props.direccion)
                break;
        }
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption: selectedOption.value }) 

        this.props.seleccionEstablecimiento(selectedOption.value, selectedOption.label);    
    }    

    cargarEstablecimientos = async(opcion) => {
        const establecimientos = await CargarEstablecimientos({
            opcion: opcion,
            cuit: this.props.cuit,
            internoEstablecimiento: this.props.internoEstablecimiento
        })    
        this.setState({establecimientos})
        console.log('Establecimientos: ' + JSON.stringify(this.state.establecimientos))
    }

render() {    
    const internoEstablecimiento = parseInt(this.props.internoEstablecimiento)         
    const menuIsOpen= (this.props.internoEstablecimiento === 0 ? true : false)    
    const disable = (this.props.internoEstablecimiento !== 0 && this.props.internoFormulario !== 0)  ? true : false
    const opciones = this.state.establecimientos.map(establecimiento => {
        return {
            value: establecimiento.Interno, 
            label: establecimiento.NroSucursal + ' - ' + establecimiento.DomicilioCalle + ' ' + establecimiento.DomicilioNro + ' - ' + establecimiento.Provincia, 
            cuit: this.props.cuit, 
            razonsocial: this.props.razonSocial 
        }
    })

    //Cuando elijo, armo el label nuevo
    var currentSelection = []
    if (internoEstablecimiento !== 0 && this.state.establecimientos.length !== 0)
        currentSelection = [
            {
                label: 'Seleccione formulario para ' + this.props.cuit + ' - ' + this.props.razonSocial + ' - ' + this.establecimientos.Nombre, 
                value: parseInt(this.props.internoEstablecimiento)
            }
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