import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App';
import * as serviceWorker from './serviceWorker';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import respuestasReducer from './Store/reducers/Respuestas';
import formSeleccionadoReducer from './Store/reducers/FormularioSeleccionado';
import datosGeneralesReducer from './Store/reducers/DatosGenerales';
import establecimientoReducer from './Store/reducers/Establecimiento';
import gremiosReducer from './Store/reducers/Gremios';
import contratistasReducer from './Store/reducers/Contratistas';
import responsablesReducer from './Store/reducers/Responsables';

const rootReducer = combineReducers({
    res: respuestasReducer,
    form: formSeleccionadoReducer,
    datos: datosGeneralesReducer,
    establecimiento: establecimientoReducer,
    gre: gremiosReducer,
    contr: contratistasReducer,
    respon: responsablesReducer,
});
const store = createStore(rootReducer);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
