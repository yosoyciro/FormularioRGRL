import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as tiposAcciones from '../../../Store/acciones';
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
        //Limpio siempre todo del Redux
        this.props.datosGenerales(0, 0, '') 
        this.props.seleccionEstablecimiento(0, '');
        
        console.log('[DatosGenerales] this.props.cuit: ' + this.props.cuit)
        this.setState({cuit: parseInt(this.props.cuit)})
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

render() {       
    //console.log('this.state.cuitValido: ' + this.state.cuitValido) 
    
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
        </fieldset>
    </form>  
    {this.state.cuitValido === true ?
        <ElegirEstablecimiento 
            cuit={this.state.cuit}
            razonSocial={this.state.nombre}
        />                         
    :
        null
    }  
    {this.props.establecimientoSeleccionado ?
        <ElegirTipoFormulario
            cuit={this.state.cuit}
            establecimiento={this.props.establecimientoSeleccionado}
        />
    :
        null
    }
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

const mapStateToProps = state => {
    return {
        datGen: state.datos.cuit,
        establecimientoSeleccionado: state.establecimiento.interno, 
    };
}

const mapDispatchToProps = dispatch => {
    return {
        datosGenerales: (cuit, interno, razonsocial) => dispatch({type: tiposAcciones.DATOSGENERALES_CUIT, cuit: cuit, interno: interno, razonsocial: razonsocial}),
        seleccionEstablecimiento: (internoEstablecimiento, descripcion) => dispatch({type: tiposAcciones.ESTABLECIMIENTO_SELECCION, internoEstablecimiento: internoEstablecimiento, descripcion: descripcion})
    };
}

export default connect(mapStateToProps,mapDispatchToProps) (DatosGenerales);