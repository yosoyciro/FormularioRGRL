import * as tipoAcciones from '../acciones';

const initialState = {
    formSeleccionado: 0,
    cantGremios: 0,
    cantContratistas: 0,
    cantResponsables: 0,
    estado: ''
}

const formSeleccionadoReducer = (state = initialState, action) => {     
    switch (action.type) {
        case tipoAcciones.FORMULARIO_SELECCION:
            console.log('[redux FormularioSeleccionado] action.estado: ' + action.estado)
            const nuevoEstado = Object.assign({}, state)
            nuevoEstado.formSeleccionado = action.formSeleccionado 
            nuevoEstado.cantGremios = action.cantGremios
            nuevoEstado.cantContratistas = action.cantContratistas
            nuevoEstado.cantResponsables = action.cantResponsables
            nuevoEstado.estado = action.estado
            
            return nuevoEstado  

        default:            
            return state
            
    }    
};

export default formSeleccionadoReducer;