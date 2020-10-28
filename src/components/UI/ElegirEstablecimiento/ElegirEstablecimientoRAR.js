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
        superficie: 0,
        isLoading: true,
    }
        
    componentDidMount() {        
        switch(parseInt(this.props.internoEstablecimiento))
        {
            case 0:
                this.cargarEstablecimientos(1)
                .then(res => {
                    this.setState({isLoading: !this.state.isLoading})
                    this.props.loadingEstablecimientos(false)
                })
                break;

            default:
                this.cargarEstablecimientos(2) 
                .then(res => {
                    this.setState({isLoading: !this.state.isLoading})
                    this.props.loadingEstablecimientos(false)
                })               
                break;
        }
        
    }

    handleChange = (selectedOption) => {
        console.log('selectedoption: ' + selectedOption.cantTrabajadores + '-' + selectedOption.superficie)
        this.setState({ 
            selectedOption: selectedOption.value,
            label: selectedOption.label,
            cantTrabajadores: selectedOption.cantTrabajadores,
            superficie: selectedOption.superficie
        }) 
        this.props.seleccionEstablecimiento(parseInt(selectedOption.value), selectedOption.label, selectedOption.cantTrabajadores, selectedOption.superficie, false)
    }  
    
    handleChangeCantTrabajadores = (event) => {
        console.log('[ElegirEstableciminetoRAR] internoEstablecimiento: ' + this.props.internoEstablecimiento)
        this.setState({
            cantTrabajadores: event.target.value,
        })
        this.props.seleccionEstablecimiento(this.props.internoEstablecimiento, this.state.label, event.target.value, this.state.superficie, false)
    }

    handleChangeSuperficie = (event) => {
        this.setState({
            superficie: event.target.value,
        })   
        this.props.seleccionEstablecimiento(this.props.internoEstablecimiento, this.state.label, this.state.cantTrabajadores, event.target.value, false)
    }

    cargarEstablecimientos = async opcion => {
        switch (opcion) {
            case 1:
                console.log('opcion1')
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
                console.log('opcion2')
                try {
                    const refEstablecimientos = await Api.get(`RefEstablecimiento/ListarPorInterno?pInternoEstablecimiento=${this.props.internoEstablecimiento}`) 
                    //console.log('Nombre estabelcimiento: ' + JSON.stringify(refEstablecimientos.data))

                    // Create a new array based on current state:
                    let establecimientos = [...this.state.establecimientos];

                    // Add item to it
                    establecimientos.push({ 
                        Interno: refEstablecimientos.data.Interno,
                        Numero: refEstablecimientos.data.Numero,
                        CodEstabEmpresa: refEstablecimientos.data.CodEstabEmpresa,
                        Nombre: refEstablecimientos.data.Nombre,
                        DomicilioCalle: refEstablecimientos.data.DomicilioCalle,
                        DomicilioNro: refEstablecimientos.data.DomicilioNro,
                        Localidad: refEstablecimientos.data.Localidad,
                        Provincia: refEstablecimientos.data.Provincia,
                        Superficie: refEstablecimientos.data.Superficie,
                        CantTrabajadores: refEstablecimientos.data.CantTrabajadores
                    });

                    this.setState({
                        establecimientos,
                        cantTrabajadores: refEstablecimientos.data.CantTrabajadores,
                        superficie: refEstablecimientos.data.Superficie                    
                        //selectedOption: this.props.internoEstablecimiento
                    })
                    this.props.seleccionEstablecimiento(parseInt(this.props.internoEstablecimiento), refEstablecimientos.data.Nombre, refEstablecimientos.data.CantTrabajadores, refEstablecimientos.data.Superficie, false)

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
    //console.log('[ElegirEstablecimientoRAR] referenteDatos: ' + JSON.stringify(this.props.referenteDatos)) 
    //console.log('[ElegirEstableciminetoRAR] render - internoEstablecimiento: ' + this.state.selectedOption)
    //console.log('[ElegirEstableciminetoRAR] render - internoEstablecimiento: ' + this.props.internoEstablecimiento)
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
            label: establecimiento.Numero + ' - ' + establecimiento.CodEstabEmpresa + ' - ' + establecimiento.Nombre + ' ' + establecimiento.DomicilioCalle + ' ' + establecimiento.DomicilioNro + ' - ' + establecimiento.Localidad + ' - ' + establecimiento.Provincia, 
            cuit: this.props.cuit, 
            razonsocial: this.props.referenteDatos.RazonSocial,
            cantTrabajadores: establecimiento.CantTrabajadores,
            superficie: establecimiento.Superficie
        }
    })

    var currentSelection = opciones.find(establecimiento => establecimiento.value === internoEstablecimiento)
   
    return <>
            <table className="tbl-establecimiento">
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
                    <td className="selecestablecimiento-td">
                        <Select 
                            //defaultValue={currentSelection[0]}
                            value={currentSelection}
                            name="form-field-name"
                            onChange={this.handleChange}                     
                            options={opciones}
                            isSearchable={false}
                            isDisabled={disable}
                            placeholder='Seleccione establecimiento...'
                            menuIsOpen={menuIsOpen}
                            formatCreateLabel={userInput => `Search for ${userInput}`}
                            isLoading={this.state.isLoading}
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