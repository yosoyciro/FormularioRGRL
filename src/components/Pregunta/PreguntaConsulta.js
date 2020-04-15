import React, {Component, Fragment} from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as moment from 'moment';


//Componente que se conecta al web api y trae todas las preguntas
class PreguntaConsulta extends Component{ 
    respuesta(respuesta, tieneNoAplica) {
        let ret = ''
        switch (respuesta) {
            case 'N':
                ret = 'No'
                break;
        
            case 'S':
                ret ='Sí'
                break;
            
            case 'A':
                ret = 'No Aplica'
                break;

            case '':
                if (parseInt(tieneNoAplica) === 1)
                    ret = ''
                else
                    ret = 'No'

                break;

            default:
                break;
        }

        return ret
    }
    mostrarPregunta = () => {  
        const respuesta = this.respuesta(this.props.respuesta.Respuesta, this.props.tieneNoAplica)      
        var fecha = new Date(this.props.respuesta.FechaRegularizacion)                      
        const isDisable = true

        return <Fragment>                        
            {(parseInt(this.props.tieneNoAplica) === 1) ?  
                <Fragment>  
                    <tr>
                    <td>
                        <label className="pregunta-lbl">{this.props.pregunta.Codigo}</label> 
                    </td>
                    <td className="celda">
                        <label className="pregunta-lbl">{this.props.pregunta.Pregunta}</label>
                    </td>
                    <td>
                        <label>{respuesta}</label> 
                    </td>
                    <td>  
                    {respuesta !== 'No' ?
                        null
                    :
                        <DatePicker
                            //locale="es"
                            className="datepicker-formato"
                            todayButton="Hoy"
                            dateFormat="dd/MM/yyyy"
                            selected={fecha}
                            placeholderText="Seleccione una fecha"
                            disable={isDisable}
                        />  
                    }
                    </td>
                    <td className="pregunta-comentario">
                        <label className="pregunta-comentario-label">{this.props.pregunta.Comentario}</label>             
                    </td>
                    </tr>                   
                </Fragment> 
            :
                <Fragment>
                        <tr>
                            <td>
                                <label className="pregunta-lbl">{this.props.pregunta.Codigo}</label> 
                            </td>
                            <td className="celda">
                                <label className="pregunta-lbl">{this.props.pregunta.Pregunta}</label>
                            </td>
                            <td>
                                <label>{respuesta}</label>
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


export default PreguntaConsulta;