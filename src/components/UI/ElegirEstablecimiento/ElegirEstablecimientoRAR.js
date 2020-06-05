import React, { Component } from 'react';
import Select from 'react-select';
import Api from '../../../Api/Api';
import './ElegirEstablecimiento.css'

//Componente que se conecta al web api y trae todas las preguntas
class ElegirEstablecimientoRAR extends Component{ 
    state = {
        selectedOption: 0,
        establecimientos: []      
    }
        
    componentDidMount() {        
        //console.log('[ElegirEstablecimientoRAR] componendidmount - this.props.direccion: ' + this.props.direccion)
        switch(parseInt(this.props.internoEstablecimiento))
        {
            case 0:
                this.cargarEstablecimientos()
                break;

            default:
                this.props.seleccionEstablecimiento(parseInt(this.props.internoEstablecimiento), this.props.direccion)
                break;
        }
        
    }

    handleChange = (selectedOption) => {
        //console.log('selectedoption: ' + selectedOption.value + '-' + selectedOption.label)
        this.setState({ 
            selectedOption: selectedOption.value
        }) 
        this.props.seleccionEstablecimiento(parseInt(selectedOption.value), selectedOption.label)
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
    const internoEstablecimiento = parseInt(this.props.internoEstablecimiento)  
    //console.log('[ElegirEstablecimientoRAR] internoEstablecimiento: ' + internoEstablecimiento)
    //console.log('[ElegirEstablecimientoRAR] direccion: ' + this.props.direccion)
    const menuIsOpen= (internoEstablecimiento === 0 ? true : false)    
    const disable = (internoEstablecimiento !== 0)  ? true : false
    const opciones = this.state.establecimientos.map(establecimiento => {
        return {
            value: establecimiento.Interno, 
            label: establecimiento.DomicilioCalle + ' ' + establecimiento.DomicilioNro, 
            cuit: this.props.cuit, 
            razonsocial: this.props.razonSocial 
        }
    })

    //Cuando elijo, armo el label nuevo
    var currentSelection = []
    if (internoEstablecimiento !== 0)
        currentSelection = [
            {
                label: 'Seleccione formulario para ' + this.props.cuit + ' - ' + this.props.razonSocial + ' - ' + this.props.direccion, 
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

export default ElegirEstablecimientoRAR;