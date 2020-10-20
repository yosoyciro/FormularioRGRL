import React from 'react';
import Formularios from '../containers/Formularios';
import {BrowserRouter, Route, Switch, Router } from 'react-router-dom';
import { history } from '../components/Utiles/history';
import './App.css';
import FormulariosRAR from '../containers/FormulariosRAR';
import packageJson from "../../package.json";
import { getBuildDate } from "../components/Utiles/getBuildDate";
import withClearCache from "../ClearCache";

const ClearCacheComponent = withClearCache(MainApp);

function App() {    
  return <ClearCacheComponent />;
}

function MainApp()  {
    return (
      <Router history={history}>    
        <BrowserRouter>
          <div className="App">           
              <Switch>
                <Route path='/ConsultaFormulariosRGRL/:Param' component={Formularios}/>
                <Route path='/ConsultaFormulariosRAR/:Param' component={FormulariosRAR}/>
              </Switch> 
              <footer className="App-footer">
                <p>Versión: {getBuildDate(packageJson.buildDate)}</p>
              </footer>  
          </div>
        </BrowserRouter>
      </Router>       
    );
  
}



export default App;
