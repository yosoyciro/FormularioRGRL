import * as tipoAcciones from '../acciones';
import update from 'react-addons-update';

const initialState = {
    respuestas: []
}

const respuestasReducer = (state = initialState, action) => {   
    switch (action.type) {
        case tipoAcciones.NUEVA_RESPUESTA:             
            const nuevaRespuesta = {
                $id: action.respuestaData.intCuestionario,
                Interno: 0,
                InternoCuestionario: action.respuestaData.intCuestionario,
                InternoRespuestaFormulario: 0,
                Respuesta: '', //action.respuestaData.resp,
                FechaRegularizacion: 0,
                Observaciones: '',
                FechaRegularizacionNormal: action.respuestaData.fecha,
                Codigo: action.respuestaData.codigo,
                Pregunta: action.respuestaData.pregunta
            }             
            return {
                ...state,
                respuestas: state.respuestas.concat( nuevaRespuesta )
            }

        case tipoAcciones.ACTUALIZAR_RESPUESTA:
            //Actualizo la respuesta con [action.intCuestionario-1]
            //Tengo que hacer -1 porque sino se para sobre un indice mas
            let fecha = '1800-01-01'
            if (action.fecha !== '')
                fecha = action.fecha

            return update(state, { 
                respuestas: { 
                  [action.intCuestionario-1]: {
                    Respuesta: {$set: action.resp},
                    FechaRegularizacionNormal: {$set: fecha}
                  }
                }
              });
        
        case tipoAcciones.GENERAR_RESPUESTAS:
            //console.log('[reducer - GENERAR_RESPUESTAS] JSON.stringify(state): ' + JSON.stringify(state));
            return state;

        default:
            return state;
    }    
};

export default respuestasReducer;