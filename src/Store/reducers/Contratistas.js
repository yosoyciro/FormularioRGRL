import * as tipoAcciones from '../acciones';
import update from 'react-addons-update';

const initialState = {
    contratistas: []
}

const contratistasReducer = (state = initialState, action) => {     
    switch (action.type) {
        case tipoAcciones.CONTRATISTA_NUEVO:
            const nuevoContratista = {
                $id: action.contratistaData.id + 510,
                Interno: 0,
                InternoRespuestaFormulario: 0,
                CUIT: 0,
                Contratista: ''
            }
            return {...state,
            contratistas: state.contratistas.concat( nuevoContratista )}

        case tipoAcciones.CONTRATISTA_ACTUALIZAR:
            //console.log('Contratistas-reducer action.contratistaData.cuit: ' + action.contratistaData.cuit)
            return update(state, { 
                contratistas: { 
                    [action.contratistaData.id-1]: {
                    CUIT: {$set: action.contratistaData.cuit},
                    Contratista: {$set: action.contratistaData.contratista}
                    }
                }
            });

        default:
            return state;
    }    
};

export default contratistasReducer;