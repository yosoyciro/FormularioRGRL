import React, { Component } from 'react';
import Select from 'react-select';
import Api from '../../../Api/Api';
import './ElegirEstablecimiento.css'

class ElegirEstablecimientoRAR extends Component{ 
    state = {
        selectedOption: 0,
        label: '',
        establecimientos: [],      
        cantTrabajadores: 0,
        superficie: 0
    }
        
    componentDidMount() {        
        //console.log('[ElegirEstablecimientoRAR] componendidmount - this.props.direccion: ' + this.props.direccion)
        switch(parseInt(this.props.internoEstablecimiento))
        {
            case 0:
                this.cargarEstablecimientos(1)
                break;

            default:
                this.cargarEstablecimientos(2)                
                break;
        }
        
    }

    handleChange = (selectedOption) => {
        //console.log('selectedoption: ' + selectedOption.cantTrabajadores + '-' + selectedOption.superficie)
        this.setState({ 
            selectedOption: selectedOption.value,
            label: selectedOption.label,
            cantTrabajadores: selectedOption.cantTrabajadores,
            superficie: selectedOption.superficie
        }) 
        this.props.seleccionEstablecimiento(parseInt(selectedOption.value), selectedOption.label, selectedOption.cantTrabajadores, selectedOption.superficie, false)
    }  
    
    handleChangeCantTrabajadores = (event) => {
        this.setState({
            cantTrabajadores: event.target.value,
        })
        this.props.seleccionEstablecimiento(this.state.selectedOption, this.state.label, event.target.value, this.state.superficie, false)
    }

    handleChangeSuperficie = (event) => {
        this.setState({
            superficie: event.target.value,
        })   
        this.props.seleccionEstablecimiento(this.state.selectedOption, this.state.label, this.state.cantTrabajadores, event.target.value, false)
    }

    cargarEstablecimientos = async opcion => {
        switch (opcion) {
            case 1:
                try {
                    const refEstablecimientos = await Api.get(`RefEstablecimiento/ListarPorCuit?pCuit=${this.props.cuit}`)             
                    //console.log(JSON.stringify(refEstablecimientos.data))
                    this.setState({establecimientos: refEstablecimientos.data})            
                }
                catch (error) {
                    console.log(error);
                }    
                break;
        
            case 2:
                try {
                    const refEstablecimientos = await Api.get(`RefEstablecimiento/ListarPorInterno?pInternoEstablecimiento=${this.props.internoEstablecimiento}`) 
                    //console.log('Nombre estabelcimiento: ' + refEstablecimientos.data.Nombre)

                    // Create a new array based on current state:
                    let establecimientos = [...this.state.establecimientos];

                    // Add item to it
                    establecimientos.push({ 
                        Interno: refEstablecimientos.data.Interno,
                        Nombre: refEstablecimientos.data.Nombre,
                        DomicilioCalle: refEstablecimientos.data.DomicilioCalle + ' ' + refEstablecimientos.data.DomicilioNro,
                        Superficie: refEstablecimientos.Superficie,
                        CantTrabajadores: refEstablecimientos.CantTrabajadores
                    });

                    this.setState({establecimientos})
                    this.props.seleccionEstablecimiento(parseInt(this.props.internoEstablecimiento), refEstablecimientos.data.Nombre, this.state.cantTrabajadores, this.state.superficie, false)

                } catch (error) {
                    console.log(error);
                }
                break;

            default:
                break;
        }
         
    }
    

render() {         
    const internoEstablecimiento = parseInt(this.props.internoEstablecimiento)  

    //Trabajadores y superficie
        const cantTrabajadores = this.props.cantTrabajadores
    const superficie = this.props.superficie
    
    //console.log('[ElegirEstablecimientoRAR] Nombre: ' + this.state.establecimientos.Nombre)
    //console.log('[ElegirEstablecimientoRAR] direccion: ' + this.props.direccion)
    const menuIsOpen= (internoEstablecimiento === 0 ? true : false)    
    const disable = (internoEstablecimiento !== 0)  ? true : false
    const opciones = this.state.establecimientos.map(establecimiento => {
        return {
            value: establecimiento.Interno, 
            label: establecimiento.Nombre + ' ' + establecimiento.DomicilioCalle + ' ' + establecimiento.DomicilioNro, 
            cuit: this.props.cuit, 
            razonsocial: this.props.razonSocial,
            cantTrabajadores: establecimiento.CantTrabajadores,
            superficie: establecimiento.Superficie
        }
    })

    //Cuando elijo, armo el label nuevo
    var currentSelection = []
    if (internoEstablecimiento !== 0)
        currentSelection = [
            {
                label: 'Seleccione formulario para ' + this.props.cuit + ' - ' + this.props.razonSocial + ' - ' + this.props.direccion, 
                value: parseInt(this.props.internoEstablecimiento),                
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
            {this.props.mostrarDatosEstablecimiento === false || this.props.mostrarDatosEstablecimiento == null ?
                null
            :
                <table className="table-datosEstablecimiento">
                    <tbody>
                        <td className="td-canttrabajadores">
                            <label>Cant trabajadores:</label>
                            <input 
                                type="number"
                                name="cantTrabajadores"
                                disabled={!disable}
                                onChange={this.handleChangeCantTrabajadores}
                                value={cantTrabajadores}
                            />
                        </td>
                        <td className="td-canttrabajadores">
                            <label>Superficie:</label>
                            <input 
                                type="number"
                                name="superficie"
                                disabled={!disable}
                                onChange={this.handleChangeSuperficie}
                                value={superficie}
                            />
                        </td>
                    </tbody>
                </table>           
            }
            
        </>                                                                                                      
    }
}

export default ElegirEstablecimientoRAR;