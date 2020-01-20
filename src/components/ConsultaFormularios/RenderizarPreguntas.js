import React from 'react';
import PreguntaConsulta from '../Pregunta/PreguntaConsulta';
import RespuestaPregunta from '../Utiles/RespuestaPregunta';

function respuestaPregunta(respuestasCuestionario, internoCuestionario) {
    return RespuestaPregunta({
        respuestasCuestionario: respuestasCuestionario,
        internoCuestionario: internoCuestionario
    })
}

function RenderizarPreguntas(props) {     
    const preguntasSeccion = props.preguntas.filter(pregunta => pregunta.InternoSeccion === props.seccion.Interno)                

    let preguntasRender = null
    switch (parseInt(props.seccion.TieneNoAplica)) {
        case 1:
            preguntasRender = (
                <table className="formularioa-table">
                    <thead className="cabecera">
                        <tr>
                            <th className="cabecera-codigo">Codigo</th>
                            <th className="cabecera-pregunta">Pregunta</th>
                            <th className="cabecera-select">Respuesta</th>
                            <th className="cabecera-fecha">Fecha Est. Realización</th>
                            <th className="cabecera-comentario">Observaciones</th>                                                
                        </tr>
                    </thead>
                    <tbody>
                        {preguntasSeccion.map(pregunta => (
                            //console.log(pregunta.Pregunta)          
                            <PreguntaConsulta 
                                key={pregunta.Interno} 
                                pregunta={pregunta}
                                tieneNoAplica={props.seccion.TieneNoAplica}
                                respuesta={respuestaPregunta(props.respuestasCuestionario, pregunta.Interno)}                                
                            />                                
                        ))}
                    </tbody>
                </table>
            )
            break;

        case 0:
            preguntasRender = (
                <table className="formularioa-table">
                    <thead className="cabecera">
                        <tr>
                            <th className="cabecera-codigo">Codigo</th>
                            <th className="cabecera-pregunta">Pregunta</th>
                            <th className="cabecera-select">Respuesta</th>
                            <th className="cabecera-comentario">Observaciones</th>                                                
                        </tr>
                    </thead>
                    <tbody>
                        {preguntasSeccion.map(pregunta => (
                            //console.log(pregunta.Pregunta)                
                            <PreguntaConsulta 
                                key={pregunta.Interno} 
                                pregunta={pregunta}
                                tieneNoAplica={props.tieneNoAplica}
                                respuesta={respuestaPregunta(props.respuestasCuestionario, pregunta.Interno)}
                            />
                        ))}
                    </tbody>
                </table>
            )
            break;

        default:
            break;
    }
    //console.log('[RenderizarPreguntas] preguntasRender: ' + preguntasRender)
    return preguntasRender
}

export default RenderizarPreguntas;