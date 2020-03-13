import React, {Component, Fragment} from 'react';
import Button from 'react-bootstrap/Button'
import GuardarFormularioRAR from '../../Api/FormulariosRAR/GuardarFormularioRAR';
import ConsultarPendientes from '../../Api/FormulariosRAR/ConsultarPendientes';
import Spinner from '../UI/Spinner';
import * as moment from 'moment';

//Componente que llama al metodo Guardar del API y devuelve el objeto generado
export class GenerarFormularioRAR extends Component{
    constructor(props) {
        super(props)
        this.state = {
            guardando: false,
            cantTrabajadoresExpuestos: 0,
            cantTrabajadoresNoExpuestos: 0
        }
    }

    componentDidMount() {
        //Verifico si hay un formulario en proceso de carga
        this.setState({guardando: !this.state.guardando})
        ConsultarPendientes(this.props.establecimiento)
        .then(resp => {                
            console.log('resp.Interno: ' + resp[0].Interno)                 
            this.setState({
                guardando: !this.state.guardando                
            })
            switch (resp[0].Interno)
            {
                case undefined:
                    break;

                default:
                    this.setState({
                        cantTrabajadoresExpuestos: resp[0].CantTrabajadoresExpuestos,
                        cantTrabajadoresNoExpuestos: resp[0].CantTrabajadoresNoExpuestos,
                    })
                    this.props.formularioGenerado(resp) 
            }            
        })
    }

    handleChange = (event) => {   
        switch (event.target.name)
        {
            case 'cantTrabajadoresExpuestos':
                this.setState({ cantTrabajadoresExpuestos: event.target.value });
                break;

            case 'cantTrabajadoresNoExpuestos':
                this.setState({ cantTrabajadoresNoExpuestos: event.target.value });
                break;

            default:
                break;
        }   
    }

    handleSubmit = async event => {
        event.preventDefault();                
        this.setState({
            guardando: !this.state.guardando,
        })
    
        const props = {            
            Interno: 0,
            InternoEstablecimiento: this.props.establecimiento,
            CantTrabajadoresExpuestos: this.state.cantTrabajadoresExpuestos,
            CantTrabajadoresNoExpuestos: this.state.cantTrabajadoresNoExpuestos,
            FechaCreacion: moment(new Date()).format('YYYY-MM-DDTHH:mm:ss'),
            FechaPresentacion: ''
        }
        GuardarFormularioRAR(props)
        .then(resp => {
            this.setState({
                guardando: !this.state.guardando,
            })
            this.props.formularioGenerado(resp)                
        })
    }    

    render(){
        const disabled = this.props.disabled
        return <Fragment>
            {this.state.guardando === true ?
                <Spinner />
            :
                <form className="form" onSubmit={this.handleSubmit}>
                    <fieldset>
                        <label>Cantidad Trabajadores Expuestos: </label>
                        <input 
                            value={this.state.cantTrabajadoresExpuestos}
                            className="cuit-input"
                            type="number" 
                            name="cantTrabajadoresExpuestos" 
                            onChange={this.handleChange}
                            disabled={disabled}
                        ></input> 
                        <label>Cantidad Trabajadores NO Expuestos: </label>
                        <input 
                            value={this.state.cantTrabajadoresNoExpuestos}
                            className="cuit-input"
                            type="number" 
                            name="cantTrabajadoresNoExpuestos" 
                            onChange={this.handleChange}
                            disabled={disabled}
                        ></input> 
                        <Button variant="primary" type="submit" disabled={disabled}>Genera</Button>  
                        <Button variant="primary" type="submit" disabled={!disabled}>Confirma</Button>  
                    </fieldset> 
                </form>       
            }
        </Fragment>
    }
}

export default GenerarFormularioRAR;