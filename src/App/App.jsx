import React from 'react';
import Formularios from '../containers/Formularios';
import {BrowserRouter, Route, Switch, Router } from 'react-router-dom';
import { history } from '../components/Utiles/history';
import './App.css';
import FormulariosRAR from '../containers/FormulariosRAR';
import NuevoFormularioRAR from '../components/FormulariosRAR/NuevoFormularioRAR';
import NuevoFormularioRGRL from '../components/FormulariosRGRL/NuevoFormularioRGRL';

class App extends React.Component {    

    render() {
      
      return (
        <Router history={history}>    
          <BrowserRouter>
            <div className="App">                 
                <Switch>
                  <Route path='/ConsultaFormulariosRGRL' component={Formularios}/>
                  <Route path='/ConsultaFormulariosRAR' component={FormulariosRAR}/>
                  <Route path='/NuevoFormularioRGRL/:handle' component={NuevoFormularioRGRL}/>
                  <Route path='/NuevoFormularioRGRL' component={NuevoFormularioRGRL }/>                  
                  <Route path='/NuevoFormularioRAR' component={NuevoFormularioRAR}/>
                  <Route path='/NuevoFormularioRAR/:cuitSeleccionado' component={NuevoFormularioRAR}/>
                </Switch>   
            </div>
          </BrowserRouter>
        </Router>       
      );
  }
}

export default App;
