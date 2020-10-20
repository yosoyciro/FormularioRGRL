import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Select from 'react-select';
import './PresentacionesSelect.css'

class ElegirEstablecimientoRAR extends Component{ 
    state = {
        selectedOption: 0,        
    }            

    handleChange = (selectedOption) => {
        console.log('selectedoption: ' + selectedOption.value)
        this.setState({ 
            selectedOption: selectedOption.value,
        }) 
        this.props.seleccionaPresentacion(selectedOption.value);
    }  
        
    

render() {      
    const disableGenera = this.props.cuit === 99999999999 ? true : false   
    const disableEdita = this.props.cuit !== 99999999999 ? true : false       
    const presentaciones = this.props.presentaciones.map(presentacion => {
        return {
            value: presentacion.Interno,
            label: presentacion.Nombre,
        }
    })

    //const selectedOption = this.state.selectedOption;

    //console.log('[PresentacionesSelect] currentSelection: ' + JSON.stringify(currentSelection))
    return <>
            <table className="table-establecimiento">
                <thead className="elegirestablecimiento-thead">
                    <tr className="elegirestablecimiento-tr">
                        <th className="elegirestablecimiento-th"></th>
                        <th className="selectestablecimiento-th"></th>
                        <th className="generapresentacion-th"></th>
                        <th className="generapresentacion-th"></th>
                    </tr>
                </thead>
                <tbody className="elegirestablecimiento-tbody">
                    <td className="elegirestablecimiento-td">
                        <label>Presentación: </label>
                    </td>
                    <td className="selectestablecimiento-td">
                        <Select 
                            //value={currentSelection.Interno}
                            defaultValue={presentaciones[0]}
                            name="form-field-name"
                            onChange={this.handleChange}                     
                            options={presentaciones}
                            isSearchable={false}
                            placeholder='Seleccione presentación...'
                            formatCreateLabel={userInput => `Search for ${userInput}`}
                        />
                    </td>
                    <td className="generapresentacion-td">
                    <Button 
                            onClick={this.handleGeneraPresentacion}
                            className="btn-generapresentacion"
                            disabled={disableGenera}
                        >
                            Genera
                        </Button>
                    </td>
                    <td className="generapresentacion-td">
                    <Button 
                            onClick={this.handleEditaPresentacion}
                            className="btn-generapresentacion"
                            disabled={disableEdita}
                        >
                            Edita
                        </Button>
                    </td>
                </tbody>
            </table>              
        </>                                                                                                      
    }
}

export default ElegirEstablecimientoRAR;