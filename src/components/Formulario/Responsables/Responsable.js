import React, { Component, Fragment } from 'react';
import Button from 'react-bootstrap/Button'
import './Responsable.css'
import BuscarPersona from '../../../Api/BuscarPersona'

//Componente que se conecta al web api y trae todas las preguntas
class Responsable extends Component{  
    constructor(props){
        super(props)
        this.handleBuscarPersona = this.handleBuscarPersona.bind(this)
        this.BuscarPersona = this.BuscarPersona.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.state = {
            loading: false,
            cuit: this.props.responsable.CUIT === 0 ? '' : this.props.responsable.CUIT,
        }
    } 
    

    handleChange = (event) => {
        //console.log('event.target.value: ' + event.target.value)
        //#region oldcode   
        /*switch(event) {                     
            case 'cuit':
                //this.setState({cuit: event.target.value})
                //this.props.actualizarResponsable(this.props.responsable.Interno, event.target.value, this.props.responsable.Responsable, this.props.responsable.Cargo, this.props.responsable.Representacion, this.props.responsable.EsContratado, this.props.responsable.TituloHabilitante, this.props.responsable.Matricula, this.props.responsable.EntidadOtorganteTitulo)                                
                const cuit = event.target.value === '' ? 0 : event.target.value
                this.props.cambioResponsable(this.props.responsable.Interno, cuit, '', 'R', 1, 0, '', '', '')                                
                break;

            case 'responsable':
                //this.setState({ responsable: event.target.value });
                //this.props.actualizarResponsable(this.props.responsable.Interno, this.props.cuit, event.target.value, this.props.responsable.Cargo, this.props.responsable.Representacion, this.props.responsable.EsContratado, this.props.responsable.TituloHabilitante, this.props.responsable.Matricula, this.props.responsable.EntidadOtorganteTitulo);
                this.props.cambioResponsable(this.props.responsable.Interno, this.props.responsable.CUIT, event.target.value, this.props.responsable.Cargo, this.props.responsable.Representacion, this.props.responsable.EsContratado, this.props.responsable.TituloHabilitante, this.props.responsable.Matricula, this.props.responsable.EntidadOtorganteTitulo);
                break;

            case 'cargo':
                //console.log('event.target.value: ' + event.target.value)
                //this.setState({ cargo: event.target.value });
                this.props.cambioResponsable(this.props.responsable.Interno, this.props.responsable.CUIT, this.props.responsable.Responsable, event.target.value, this.props.responsable.Representacion, this.props.responsable.EsContratado, this.props.responsable.TituloHabilitante, this.props.responsable.Matricula, this.props.responsable.EntidadOtorganteTitulo);
                break;

            case 'representacion':
                //this.setState({ representacion: event.target.value });
                this.props.cambioResponsable(this.props.responsable.Interno, this.props.responsable.CUIT, this.props.responsable.Responsable, this.props.responsable.Cargo, event.target.value, this.props.responsable.EsContratado, this.props.responsable.TituloHabilitante, this.props.responsable.Matricula, this.props.responsable.EntidadOtorganteTitulo)
                break;
                
            case 'escontratado':
                //this.setState({ escontratado: event.target.value });
                this.props.cambioResponsable(this.props.responsable.Interno, this.props.responsable.CUIT, this.props.responsable.Responsable, this.props.responsable.Cargo, this.props.responsable.Representacion, event.target.value, this.props.responsable.TituloHabilitante, this.props.responsable.Matricula, this.props.responsable.EntidadOtorganteTitulo);
                break;

            case 'titulohabilitante':
                //this.setState({ titulohabilitante: event.target.value });
                this.props.cambioResponsable(this.props.responsable.Interno, this.props.responsable.CUIT, this.props.responsable.Responsable, this.props.responsable.Cargo, this.props.responsable.Representacion, this.props.responsable.EsContratado, event.target.value, this.props.responsable.Matricula, this.props.responsable.EntidadOtorganteTitulo);
                break;

            case 'matricula':
                //this.setState({ matricula: event.target.value });
                this.props.cambioResponsable(this.props.responsable.Interno, this.props.responsable.CUIT, this.props.responsable.Responsable, this.props.responsable.Cargo, this.props.responsable.Representacion, this.props.responsable.EsContratado, this.props.responsable.TituloHabilitante, event.target.value, this.props.responsable.EntidadOtorganteTitulo);
                break;

            case 'entidadotorgantetitulo':
                //this.setState({ entidadotorgantetitulo: event.target.value });
                this.props.cambioResponsable(this.props.responsable.Interno, this.props.responsable.CUIT, this.props.responsable.Responsable, this.props.responsable.Cargo, this.props.responsable.Representacion, this.props.responsable.EsContratado, this.props.responsable.TituloHabilitante, this.props.responsable.Matricula, event.target.value);
                break;    

            default:
                break;
            
            
        }    */
        //#endregion 
        const cuit = event.target.value === '' ? 0 : event.target.value
        this.setState({ cuit })  
        
        if (cuit === 0)
        {
            this.props.cambioResponsable(this.props.responsable.Interno, cuit, '')
        }   
    }
    
    BuscarPersona = async event => {
        this.setState({ loading: !this.state.loading })      
        const param = {
            CUIT: this.state.cuit,
            BuscarEnAFIP: true,
            Tipo: 'RGRL'
        }

        const respuesta = await BuscarPersona(param);               
        this.props.cambioResponsable(this.props.responsable.Interno, this.state.cuit, respuesta[0].razonSocial)
        this.setState({ loading: !this.state.loading })
    }

    handleBuscarPersona = async event => {    
        console.log('responsables: ' + JSON.stringify(this.props.responsables))
        const cuitRepetido = this.props.responsables.find(responsable => parseInt(responsable.CUIT) === parseInt(this.state.cuit))
        console.log('cuitRepetido: ' + JSON.stringify(cuitRepetido))
        switch (cuitRepetido) {
            case undefined:
                await this.BuscarPersona()
                break;
        
            default:
                alert('CUIT repetido ' + cuitRepetido.CUIT)
                this.setState({ cuit: 0 })
                this.props.cambioResponsable(this.props.responsable.Interno, 0, '')
                break;
        }      
    }

    render() {      
        const isDisable = this.state.cuit === 0 ? true : false

        const cuit = this.state.cuit === 0 ? '' : this.state.cuit
        const disableVerificar = cuit === '' ? true : false
        const responsable = this.props.responsable.Responsable
        const cargo = this.props.responsable.Cargo
        const representacion = this.props.responsable.Representacion
        const esContratado = this.props.responsable.EsContratado
        const tituloHabilitante = this.props.responsable.TituloHabilitante
        const matricula = this.props.responsable.Matricula
        const entidadOtorganteTitulo = this.props.responsable.EntidadOtorganteTitulo

        return <Fragment>
                <tr>
                    <td className="td-responsable-cuit">
                        <input               
                            type="text" 
                            name="cuit" 
                            onChange={this.handleChange} 
                            value={cuit}>                        
                        </input>
                        <Button 
                            onClick={this.handleBuscarPersona}
                            variant="primary" 
                            size="sm"
                            disabled={disableVerificar}
                        >
                            Verifica
                        </Button>
                    </td>
                    <td>
                        <input type="text" name="responsable" disabled={true} onChange={this.handleChange} value={responsable}></input>
                    </td>                    
                    <td>
                        <select className="Select" name="cargo" disabled={isDisable} onChange={this.handleChange} value={cargo}>
                            <option value="R">Responsable de los datos del formulario</option>
                            <option value="H">Profesional de Higiene y Seguridad en trabajo</option>
                            <option value="M">Profesional de Medicina Laboral</option>
                        </select>
                    </td>
                    <td>
                        <select className="Select" name="representacion" disabled={isDisable} onChange={this.handleChange} value={representacion}>
                            <option value={1}>Representante Legal</option>
                            <option value={2}>Presidente</option>
                            <option value={5}>Vicepresidente</option>
                            <option value={6}>Gerente General</option>
                            <option value={3}>Director General</option>
                            <option value={4}>Administrador General</option>
                            <option value={99}>Otro</option>
                        </select>
                    </td>
                    <td>
                        <select className="Select" name="escontratado" disabled={isDisable} onChange={this.handleChange} value={esContratado}>
                            <option value={0}>Propio</option>
                            <option value={1}>Contratado</option>
                        </select>
                    </td>
                    <td>
                        <input type="text" name="titulohabilitante" disabled={isDisable} onChange={this.handleChange} value={tituloHabilitante}></input>
                    </td>
                    <td>
                        <input type="text" name="matricula" disabled={isDisable} onChange={this.handleChange} value={matricula}></input>
                    </td>
                    <td>
                        <input type="text" name="entidadotorgantetitulo" disabled={isDisable} onChange={this.handleChange} value={entidadOtorganteTitulo}></input>
                    </td>                   
                </tr>
        </Fragment>
    }
}

export default Responsable;