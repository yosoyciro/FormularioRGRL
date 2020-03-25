import React, { Component, Fragment } from 'react';
import BuscarPersona from '../../../Api/BuscarPersona'
import Button from 'react-bootstrap/Button'
import './DatosGenerales.css'
import CustomizedSnackbars from '../Snackbar/Snackbar'

//Componente que se conecta al web api y trae todas las preguntas
class DatosGeneralesRAR extends Component{
    constructor(props) {
        super(props)
        this.handleFinalizaCarga = this.handleFinalizaCarga.bind(this);
        this.state = {
            cuit: 0,
            razonSocial: '',
            cuitValido: false,            
            showSnackBar: false,
            mensajeSnackbar: '',
            severitySnackbar: '',
        }
    } 
    
    componentDidMount() {
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
            this.setState({ 
                cuitValido: !this.state.cuitValido,                
            })    
            
            this.props.seleccionCUIT(this.state.cuit, respuesta[0].razonSocial)
        }
        else
            this.setState({
                showSnackBar: !this.state.showSnackBar,
                mensajeSnackbar: 'Es imprescindible que el CUIT ingresado pertenezca a un empleador relacionado con esta ART',
                severitySnackbar: "warning"
            })                
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

export default DatosGeneralesRAR;