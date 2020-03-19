import React from 'react';
import Formularios from '../containers/Formularios';
import ConsultaFormularios from '../containers/ConsultaFormularios';
import {BrowserRouter, Route, Switch, Router, Redirect} from 'react-router-dom';
import { history } from '../components/Utiles/history';
import './App.css';
import FormulariosRAR from '../containers/FormulariosRAR';
import NuevoFormularioRAR from '../components/FormulariosRAR/NuevoFormularioRAR';

class App extends React.Component {    

    render() {
      
      return (
        <Router history={history}>
        <BrowserRouter>
          <div className="App"> 
              <Redirect
                  from="/"
                  to="/ConsultaFormulariosRAR" 
              />      
              <Switch>                
                <Route path='/NuevoFormulario/:handle' component={Formularios}/>
                <Route path='/NuevoFormulario' component={Formularios}/>
                <Route path='/ConsultaFormularios' component={ConsultaFormularios}/>
                <Route path='/ConsultaFormulariosRAR' component={FormulariosRAR}/>
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
