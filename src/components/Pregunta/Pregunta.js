import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import * as tiposAcciones from '../../Store/acciones'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './Pregunta.css'
import * as moment from 'moment';
import { RadioGroup, Radio } from '@material-ui/core';


//Componente que se conecta al web api y trae todas las preguntas
class Pregunta extends Component{ 
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeFecha = this.handleChangeFecha.bind(this);
        this.handleChangeRespuesta = this.handleChangeRespuesta.bind(this);
    }    

    handleChange = (event) => {
        console.log(event.target.name)
        this.props.cambioRespuesta(event.target.value, this.props.internoRespuestaCuestionario);

        //por defecto cuando pongo No, también actualizo la fecha
        switch (event.target.value) {
            case 'N':                
                const fecha = fecha.setDate(new Date().getDate() + 90);
                this.handleChangeFecha(fecha)
                break;
                
            default:
                break;
        }
    }

    handleChangeFecha = date => {        
        const fecha = moment(date).format('YYYY-MM-DDTHH:mm:ss')
        console.log('fecha--: ' + fecha)
        this.props.cambioFechaRegularizacion(fecha, this.props.internoRespuestaCuestionario);            
    }

    cambioCheck = (event) => {
        switch(event.target.checked) {
            case true:
                //this.setState({respuesta: "S"}); 
                this.props.cambioRespuesta("S", this.props.internoRespuestaCuestionario);
                break;
            
            case false:
                //this.setState({respuesta: "N"}); 
                this.props.cambioRespuesta("", this.props.internoRespuestaCuestionario);
                break;

            default:
                //this.setState({respuesta: ""}); 
                this.props.cambioRespuesta("", this.props.internoRespuestaCuestionario);
        }   
    }

    handleChangeRespuesta = (event) => {
        console.log('Event: ' + event.target.value + ' interno: ' + this.props.internoRespuestaCuestionario)
        this.props.cambioRespuesta(event.target.value, this.props.internoRespuestaCuestionario);
    }

    mostrarPregunta = () => {  
        const respuesta = this.props.respuesta.toString()
        var fechaHoy = new Date()
        
        //console.log('this.props.fechaRegularizacion: ' + this.props.fechaRegularizacion)
        var fecha = new Date(this.props.fechaRegularizacion)
        var anio = moment(fecha).format('YYYY')
        console.log('respuesta: ' + respuesta + ' anio: ' + anio)
        switch (respuesta) {
            case 'N':
                //console.log('No')
                switch (anio) {
                    case '2000':     
                        fecha = new Date();                   
                        fecha.setDate(fechaHoy.getDate() + 90);
                        //console.log('fecha 2000: ' + fecha)
                        break;
                
                    default:
                        break;
                }
                break;
        
            case 'S':
                fecha = new Date(2000,1,1)
                break;

            default:
                break;
        }
        //console.log('fecha: ' + fecha)
        
        var fechaMin = fechaHoy
        var fechaMax = new Date(fechaHoy.getDate + 365)
        
        const isDisable = (respuesta === "N") && (parseInt(this.props.tieneNoAplica) === 1) ? false : true

        return <Fragment>                        
            {(parseInt(this.props.tieneNoAplica) === 1) ?  
                <Fragment>  
                    <tr>
                    <td>
                        <label className="pregunta-lbl">{this.props.pregunta.Codigo}</label> 
                    </td>
                    <td className="celda">
                        {this.props.error === false ?
                            <label className="pregunta-lbl">{this.props.pregunta.Pregunta}</label>
                        :
                            <label className="pregunta-lbl-error">{this.props.pregunta.Pregunta}</label>
                        }
                    </td>
                    <td colSpan={3}>
                        <div style={{display: 'inline'}}>
                            <Radio
                                style={{float: 'left'}}
                                checked={respuesta === 'S'}
                                onChange={this.handleChangeRespuesta}
                                value="S"
                                name="radio-button-demo"
                                color="default"
                                size="small"
                            />
                            <Radio
                                /*style={{margin: '0% 10%'}}*/
                                checked={respuesta === 'N'}
                                onChange={this.handleChangeRespuesta}
                                value="N"
                                name="radio-button-demo"
                                color="default"
                                size="small"
                            />
                            <Radio           
                                style={{float: 'right'}}                     
                                checked={respuesta === 'A'}
                                onChange={this.handleChangeRespuesta}
                                value="A"
                                name="radio-button-demo"
                                color="default"
                                size="small"
                            />
                        </div>	
                    </td>
                    <td>                    
                    {respuesta === 'N' ?
                    <Fragment>
                    <DatePicker
                        //locale="es"
                        className="datepicker-formato"
                        todayButton="Hoy"
                        dateFormat="dd/MM/yyyy"
                        selected={fecha}
                        onChange={this.handleChangeFecha}
                        disabled={isDisable}
                        minDate={fechaMin}
                        maxDate={fechaMax}
                        placeholderText="Seleccione una fecha"
                    /> 
                    </Fragment>  
                    :
                        null
                    }                                         
                    </td>
                    <td className="pregunta-comentario">
                        <label className="pregunta-comentario-label">{this.props.pregunta.Comentario}</label>             
                    </td>
                    </tr>                   
                </Fragment> :
                <Fragment>
                        <tr>
                        <td>
                            <label className="pregunta-lbl">{this.props.pregunta.Codigo}</label> 
                        </td>
                        <td className="celda">
                            <label className="pregunta-lbl">{this.props.pregunta.Pregunta}</label>
                        </td>
                        <td>
                            <input type="checkbox" checked={respuesta} onChange={this.cambioCheck}></input>                                            
                        </td>
                        {parseInt(this.props.pregunta.InternoSeccion) === 37 || parseInt(this.props.pregunta.InternoSeccion) === 101 || parseInt(this.props.pregunta.InternoSeccion) === 120 ?
                            <td className="pregunta-comentario">
                                <label className="pregunta-comentario-label">{this.props.pregunta.Comentario}</label>             
                            </td>
                        :
                            null
                        }
                        </tr>
                </Fragment>  
            }                                             
        </Fragment>                         
    }

    //recorro el arreglo de preguntas 
    render() {      
        return this.mostrarPregunta()        
    }    
}

const mapStateToProps = state => {
    return {
        formSel: state.form.formSeleccionado,          
    };
}

const mapDispatchToProps = dispatch => {
    return {        
        actualizaRespuesta: (intCuestionario, resp, fecha) => dispatch({type: tiposAcciones.ACTUALIZAR_RESPUESTA, intCuestionario: intCuestionario, resp: resp, fecha: fecha})
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Pregunta);