import React, { Component, Fragment } from 'react';
import BuscarPersona from '../../../Api/BuscarPersona'
import ElegirEstablecimiento from '../ElegirEstablecimiento/ElegirEstablecimiento';
import Button from 'react-bootstrap/Button'
import './DatosGenerales.css'
import ElegirTipoFormulario from '../ElegirTipoFormulario/ElegirTipoFormulario';
import CustomizedSnackbars from '../../../components/UI/Snackbar/Snackbar'

//Componente que se conecta al web api y trae todas las preguntas
class DatosGenerales extends Component{
    constructor(props) {
        super(props)
        this.handleFinalizaCarga = this.handleFinalizaCarga.bind(this);
        this.state = {
            cuit: 0,
            cuitValido: false,
            nombre: '',
            showSnackBar: false,
            mensajeSnackbar: '',
            severitySnackbar: ''
        }
    } 
    
    componentDidMount() {
        /*//Limpio siempre todo del Redux
        this.props.datosGenerales(0, 0, '') 
        this.props.seleccionEstablecimiento(0, '');
        
        console.log('[DatosGenerales] this.props.cuit: ' + this.props.cuit)
        this.setState({cuit: parseInt(this.props.cuit)})*/
        console.log('[DatosGenerales] this.props.cuit: ' + this.props.cuit)
        this.setState({
            cuit: parseInt(this.props.cuit),            
        })

        switch (parseInt(this.props.cuit))
        {
            case 0:
                break;

            default:
                this.setState({ 
                    cuitValido: true,
                    razonSocial: this.props.razonSocial
                })

                this.props.seleccionCUIT(this.state.cuit, this.state.razonSocial)
                break;
        }
    }

    handleChange = (event) => {   
        this.setState({ cuit: event.target.value })  
        //this.props.nuevoCuit(event.target.value)       
    }

    handleSubmit = async event => {
        event.preventDefault();                
        this.state.isDisable = true        

        const param = {
            CUIT: this.state.cuit,
            BuscarEnAFIP: false
        }

        const respuesta = await BuscarPersona(param);
        console.log('respuesta: ' + respuesta[0].razonSocial)
        if (respuesta[0].id !== 0)
        {
            this.setState({ cuitValido: !this.state.cuitValido })  
            this.setState({ nombre: respuesta[0].razonSocial})                     
        }
        else
            this.setState({showSnackBar: !this.state.showSnackBar})                
            this.setState({mensajeSnackbar: 'Es imprescindible que el CUIT ingresado pertenezca a un empleador relacionado con esta ART'})
            this.setState({severitySnackbar: "warning"})

            //al redux
            this.props.datosGenerales(this.state.cuit, respuesta[0].id, respuesta[0].razonSocial)        
    }    
    
    handleCambioShowModal(){
        this.setState({showModal: !this.state.showModal})
    }

    handleFinalizaCarga() {
        this.props.finalizaCarga()
    }

    render() {       
        const disable = this.state.cuitValido === false ? false : true    
        let handleCerrarSnackbar=() => this.setState({showSnackBar: false})
    
        return <Fragment>
        <form className="form" onSubmit={this.handleSubmit}>
            <fieldset>
                <label>CUIT del Empleador a Registrar: </label>
                <input 
                    value={this.state.cuit}
                    className="cuit-input"
                    type="number" 
                    name="cuit" 
                    onChange={this.handleChange}
                    disabled={disable}
                ></input> 
                <Button variant="primary" type="submit" disabled={disable}>Verifica empleador</Button> 
                <Button onClick={this.handleFinalizaCarga} variant="primary">Finaliza</Button> 
            </fieldset>
        </form>       
        {this.state.showSnackBar === true ?
            <CustomizedSnackbars 
                show={this.state.showSnackBar}
                mensaje={this.state.mensajeSnackbar}
                onClose={handleCerrarSnackbar}
                severity={this.state.severitySnackbar}
                vertical="top"
                horizontal="right"
                timer={8000}
            />
        :
            null
        }  
        </Fragment>
        }
}

export default DatosGenerales;