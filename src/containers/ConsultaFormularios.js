import React, {Component} from 'react';
import ListaFormularios from '../components/ConsultaFormularios/ListaFormularios';
import { Button } from 'react-bootstrap';
import './ConsultaFormularios.css';

export class ConsultaFormularios extends Component{
    constructor(props) {
        super(props)
        this.state = {
            cuit: 0
        }
        this.seleccionaRegistro = this.seleccionaRegistro.bind(this)
        
    }

    handleClick = () => {
        this.props.history.push('/NuevoFormulario/');
    }

    handleClickCerrar() {       
        window.history.back();
        console.log('cerrar')
    }

    handleEdita = () => {
        this.props.history.push('/NuevoFormulario/' + this.state.cuit);
    }

    seleccionaRegistro = (cuit) => {
        console.log('[ConsultaFormulario] cuit: ' + cuit)
        this.setState({cuit})
    }
 
    render(){
        return <div>
            <div>
                <h1>Consulta de Formularios RGRL</h1>
                {this.state.cuit !== 0 ?
                    <Button 
                        onClick={this.handleEdita}
                        className="btn-consultaformulario"
                    >
                        Edita Formulario
                    </Button>
                :
                    null
                }
                <Button 
                    onClick={this.handleClick}
                    className="btn-consultaformulario"
                >
                    Genera Formulario
                </Button>
                <Button 
                    onClick={this.handleClickCerrar}
                    className="btn-consultaformulario"
                >
                    Finaliza
                </Button>
            </div>            
            <ListaFormularios 
                seleccionaRegistro={this.seleccionaRegistro}
            />            
        </div>
    }
}

export default ConsultaFormularios;