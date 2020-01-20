import * as tipoAcciones from '../acciones';

const initialState = {
    interno: 0,
    descripcion: ''
}

const establecimientoReducer = (state = initialState, action) => {     
    switch (action.type) {
        case tipoAcciones.ESTABLECIMIENTO_SELECCION:             
            const nuevoEstado = Object.assign({}, state)
            nuevoEstado.interno = action.internoEstablecimiento 
            nuevoEstado.descripcion = action.descripcion
            return nuevoEstado

        default:
            return state;
    }    
};

export default establecimientoReducer;