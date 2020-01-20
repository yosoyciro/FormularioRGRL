import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import * as tiposAcciones from '../../Store/acciones'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './Pregunta.css'
import * as moment from 'moment';


//Componente que se conecta al web api y trae todas las preguntas
class Pregunta extends Component{ 
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeFecha = this.handleChangeFecha.bind(this);
    }    

    handleChange = (event) => {
        console.log(event.target.name)
        this.props.cambioRespuesta(event.target.value, this.props.internoRespuestaCuestionario);
    }

    handleChangeFecha = date => {        
        const fecha = moment(date).format('YYYY-MM-DDTHH:mm:ss')
        //console.log('fecha: ' + fecha)
        this.props.cambioFechaRegularizacion(fecha, this.props.internoRespuestaCuestionario);            
    }

    cambioCheck = (event) => {
        /*console.log('event.target: ' + event.target.value + ' - event.target.checked: ' + event.target.checked);
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({opcion: value});*/
        switch(event.target.checked) {
            case true:
                //this.setState({respuesta: "S"}); 
                this.props.cambioRespuesta("S", this.props.internoRespuestaCuestionario);
                break;
            
            case false:
                //this.setState({respuesta: "N"}); 
                this.props.cambioRespuesta("N", this.props.internoRespuestaCuestionario);
                break;

            default:
                //this.setState({respuesta: ""}); 
                this.props.cambioRespuesta("", this.props.internoRespuestaCuestionario);
        }   
    }

    mostrarPregunta = () => {  
        const respuesta = this.props.respuesta.toString()
        var fechaHoy = new Date()
        
        //console.log('this.props.fechaRegularizacion: ' + this.props.fechaRegularizacion)
        var fecha = new Date(this.props.fechaRegularizacion)
        var anio = moment(fecha).format('YYYY')
        //console.log('respuesta: ' + respuesta + ' anio: ' + anio)
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
                    <td>
                    <select name="respuesta-select" className="respuesta-select" onChange={this.handleChange} value={respuesta}>
                        <option value="">Elegir...</option>
                        <option value="S">Sí</option>
                        <option value="N">No</option>
                        <option value="A">No aplica</option>
                    </select> 
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
                        <td className="pregunta-comentario">
                            <label className="pregunta-comentario-label">{this.props.pregunta.Comentario}</label>             
                        </td>
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

const mapDispatchToProps = dispatch => {
    return {        
        actualizaRespuesta: (intCuestionario, resp, fecha) => dispatch({type: tiposAcciones.ACTUALIZAR_RESPUESTA, intCuestionario: intCuestionario, resp: resp, fecha: fecha})
    };
}

export default connect(null, mapDispatchToProps)(Pregunta);