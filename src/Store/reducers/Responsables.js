import * as tipoAcciones from '../acciones';
import update from 'react-addons-update';

const initialState = {
    responsables: []
}

const responsablesReducer = (state = initialState, action) => {     
    switch (action.type) {
        case tipoAcciones.RESPONSABLE_NUEVO:
            const nuevoResponsable = {
                $id: action.responsableData.id + 520,
                Interno: 0,
                InternoRespuestaFormulario: 0,
                CUIT: 0,
                Responsable: '',
                Cargo: action.responsableData.cargo,
                Representacion: '',
                EsContratado: 0,
                TituloHabilitante: '',
                Matricula: '',
                EntidadOtorganteTitulo: ''
            }
            return {...state,
                responsables: state.responsables.concat( nuevoResponsable )}

        case tipoAcciones.RESPONSABLE_ACTUALIZAR:
            console.log('action.responsableData.cargo: ' + action.responsableData.cargo)
            return update(state, { 
                responsables: { 
                    [action.responsableData.id-1]: {
                    CUIT: {$set: action.responsableData.cuit},
                    Responsable: {$set: action.responsableData.responsable},
                    Cargo: {$set: action.responsableData.cargo},
                    Representacion: {$set: action.responsableData.representacion},
                    EsContratado: {$set: action.responsableData.escontratado},
                    TituloHabilitante: {$set: action.responsableData.titulohabilitante},
                    Matricula: {$set: action.responsableData.matricula},
                    EntidadOtorganteTitulo: {$set: action.responsableData.entidadotorgantetitulo}
                    }
                }
            });

        default:
            return state;
    }    
};

export default responsablesReducer;