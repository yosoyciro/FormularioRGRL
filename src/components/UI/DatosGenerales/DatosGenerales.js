import React, { Component, Fragment } from 'react';
import BuscarPersona from '../../../Api/BuscarPersona'
import Button from 'react-bootstrap/Button'
import './DatosGenerales.css'
import CustomizedSnackbars from '../../../components/UI/Snackbar/Snackbar'
import DatePicker from "react-datepicker";
import * as moment from 'moment';

//Componente que se conecta al web api y trae todas las preguntas
class DatosGenerales extends Component{
    constructor(props) {
        super(props)
        this.handleFinalizaCarga = this.handleFinalizaCarga.bind(this);
        this.handleChangeNotificacionFecha = this.handleChangeNotificacionFecha.bind(this);
        this.state = {
            cuit: this.props.cuit,
            cuitValido: false,
            razonSocial: '',
            showSnackBar: false,
            mensajeSnackbar: '',
            severitySnackbar: ''
        }
    } 
    
    componentDidMount() {
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

                this.props.seleccionCUIT(this.state.cuit, this.state.razonSocial, this.state.notificacionFecha)
                break;
        }
    }

    handleChange = (event) => {   
        this.setState({ cuit: event.target.value })  
        //this.props.nuevoCuit(event.target.value)       
    }

    handleChangeNotificacionFecha (date){
        const fecha = moment(date).format('YYYY-MM-DD')
        this.props.changeNotificacionFecha(fecha)
    }

    handleSubmit = async event => {
        event.preventDefault();                
        this.state.isDisable = true        

        const param = {
            CUIT: this.state.cuit,
            BuscarEnAFIP: false
        }

        const respuesta = await BuscarPersona(param);
        //console.log('respuesta: ' + respuesta[0].razonSocial)
        if (respuesta[0].id !== 0)
        {
            this.setState({ 
                cuitValido: !this.state.cuitValido,
                razonSocial: respuesta[0].razonSocial
            })                      
            this.props.seleccionCUIT(this.state.cuit, this.state.razonSocial)      
        }
        else
            this.setState({
                showSnackBar: !this.state.showSnackBar,
                mensajeSnackbar: 'Es imprescindible que el CUIT ingresado pertenezca a un empleador relacionado con esta ART',
                severitySnackbar: "warning"
            })                

            //al redux
            //this.props.datosGenerales(this.state.cuit, respuesta[0].id, respuesta[0].razonSocial)              
    }    
    
    handleCambioShowModal(){
        this.setState({showModal: !this.state.showModal})
    }

    handleFinalizaCarga() {
        this.props.finalizaCarga()
    }

    render() {     
        //console.log('[DatosGenerales] referenteDatos: ' + JSON.stringify(this.props.referenteDatos))
        //console.log('[DatosGenerales] NotificacionRGRL: ' + this.props.referenteDatos[0].NotificacionRGRL) 
        const disable = this.state.cuitValido === false ? false : true  
        const notificacionFechaDisable = parseInt(this.props.cuit) !== 0 ? true : false  
        let handleCerrarSnackbar=() => this.setState({showSnackBar: false})
        var notificacionFecha = this.props.referenteDatos[0].NotificacionRGRL === null ? new Date() : new Date(this.props.referenteDatos[0].NotificacionRGRL)
        //notificacionFecha = this.props.notificacionFecha === null ? notificacionFecha : notificacionFecha.setDate(notificacionFecha.getDate() + 1)
        
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
                <label>{this.props.referenteDatos[0].RazonSocial}</label>                                
                {/*<Button variant="primary" type="submit" disabled={disable}>Verifica empleador</Button>*/}
                <Button onClick={this.handleFinalizaCarga} variant="primary">Finaliza</Button> 
                
            </fieldset>
            <fieldset>
                <label className="notificacionFecha-label">Notificación Fecha:</label>
                <DatePicker
                    //locale="es"
                    className="datepicker-formato"
                    todayButton="Hoy"
                    dateFormat="dd/MM/yyyy"
                    selected={notificacionFecha}
                    onChange={this.handleChangeNotificacionFecha}
                    disabled={notificacionFechaDisable}
                    placeholderText="Seleccione una fecha"
                /> 
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