import * as tipoAcciones from '../acciones';
import update from 'react-addons-update';

const initialState = {
    gremios: []
}

const gremiosReducer = (state = initialState, action) => {     
    switch (action.type) {
        case tipoAcciones.GREMIO_NUEVO:         
            const nuevoGremio = {
                $id: action.gremioData.id + 500,
                Interno: 0,
                InternoRespuestaFormulario: 0,
                Legajo: '',
                Nombre: ''
            }
            return {...state,
            gremios: state.gremios.concat( nuevoGremio )}

        case tipoAcciones.GREMIO_ACTUALIZAR:
            return update(state, { 
                gremios: { 
                    [action.gremioData.id-1]: {
                    Legajo: {$set: action.gremioData.legajo},
                    Nombre: {$set: action.gremioData.nombre}
                    }
                }
            });

        default:
            return state;
    }    
};

export default gremiosReducer;