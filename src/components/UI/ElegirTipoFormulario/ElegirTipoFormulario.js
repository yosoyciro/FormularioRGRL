import React, { Component } from 'react';
import Select from 'react-select';
import CargarFormularios from '../../../Api/CargarFormularios'
import './ElegirTipoFormulario.css'

class ElegirTipoFormulario extends Component{ 
    state = {
        selectedOption: 0,
        formularios: [],
        formSeleccionado: [],
        loading: true
    }

    componentDidMount() {     
        this.props.loading(true)        

        CargarFormularios(this.props.internoEstablecimiento) 
        .then(formularios => {
            this.setState({ 
                formularios,
                loading: !this.state.loading
            })

            switch (this.props.internoFormulario) {
                case 0:    
                    break;    
            
                default:
                    const formSeleccionado = this.state.formularios.find(form => form.value === this.props.internoFormulario)
                    this.setState({
                        formSeleccionado
                    })
                    
                    this.props.seleccionFormulario(this.state.formSeleccionado, this.props.internoFormulario); 
                    break;
            }
        })

        this.props.loading(false)
    }

    handleChange = (selectedOption) => {
        //console.log('estado: ' + selectedOption.estado)
        this.setState({ selectedOption: selectedOption.value })
        const formSeleccionado = this.state.formularios.find(form => form.value === selectedOption.value)        
        this.setState({
            formSeleccionado
        })
        //console.log('[ElegirTipoFormulario] handleChange - formSeleccionado: ' + JSON.stringify(this.state.formSeleccionado))
        this.props.seleccionFormulario(formSeleccionado, selectedOption.value);                                    
    }

    handleSubmit (event) {
        event.preventDefault();                
    }       

render() {     
    const internoFormulario = this.props.internoFormulario
    const tiposForm = this.state.formularios
    //console.log('internoFormulario: ' + internoFormulario)

    //Cuando elijo, armo el label nuevo
    var currentSelection = []    
    const estado = this.props.internoFormulario === 0 ? ' (Nueva Presentación)' : ' (En Proceso de Carga)'
    if (internoFormulario !== 0 && this.state.formularios.length !== 0)        
    {
        const formSel = this.state.formularios.filter(form => form.value === internoFormulario)
        //console.log('formSel: ' + formSel[0].label)
        if (formSel.length !== 0)
            currentSelection = [
                {
                    label: formSel[0].label + estado,
                    value: parseInt(this.props.internoEstablecimiento)
                }
            ];   
    }
    //Habilitado o no
    const disable = (this.props.internoEstablecimiento !== 0 && this.props.internoFormulario !== 0)  ? true : false
    const menuIsOpen = (this.props.internoEstablecimiento !== 0 && this.props.internoFormulario === 0)  ? true : false

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
                value={currentSelection}
                isLoading={this.state.loading}
            />                              
        </table>                                                                                                             
    }
}

export default ElegirTipoFormulario;