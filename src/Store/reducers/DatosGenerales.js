import * as tipoAcciones from '../acciones';

const initialState = {
    cuit: 0,
    interno: 0,
    razonSocial: ''
}

const datosGeneralesReducer = (state = initialState, action) => {     
    switch (action.type) {
        case tipoAcciones.DATOSGENERALES_CUIT:             
            const nuevoEstado = Object.assign({}, state)
            nuevoEstado.cuit = action.cuit 
            nuevoEstado.interno = action.interno
            nuevoEstado.razonSocial = action.razonSocial
            
            return nuevoEstado

        default:
            return state;
    }    
};

export default datosGeneralesReducer;