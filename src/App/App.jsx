import React from 'react';
import Formularios from '../containers/Formularios';
import ConsultaFormularios from '../containers/ConsultaFormularios';
import {BrowserRouter, Route, Switch, Router, Redirect} from 'react-router-dom';
import { history } from '../components/Utiles/history';
import './App.css';

class App extends React.Component {    

    render() {
      
      return (
        <Router history={history}>
        <BrowserRouter>
          <div className="App"> 
              <Redirect
                  from="/"
                  to="/ConsultaFormularios" 
              />      
              <Switch>                
                <Route path='/NuevoFormulario/:handle' component={Formularios}/>
                <Route path='/NuevoFormulario' component={Formularios}/>
                <Route path='/ConsultaFormularios' component={ConsultaFormularios}/>
              </Switch>   
          </div>
        </BrowserRouter>
        </Router>         
      );
  }
}

export default App;
