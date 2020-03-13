import React, {Component} from 'react';
import { Button } from 'react-bootstrap';
import './ConsultaFormularios.css';
import ListaFormulariosRAR from '../components/FormulariosRAR/ListaFormulariosRAR';

export class FormulariosRAR extends Component{
    constructor(props) {
        super(props)
        this.state = {
            cuit: 0
        }
        this.seleccionaRegistro = this.seleccionaRegistro.bind(this)
        
    }

    handleClick = () => {
        this.props.history.push('/NuevoFormularioRAR/');
    }

    handleClickCerrar() {       
        window.history.back();
        //console.log('cerrar')
    }

    handleEdita = () => {
        this.props.history.push('/NuevoFormularioRAR/' + this.state.cuit);
    }

    seleccionaRegistro = (cuit) => {
        this.setState({cuit})
    }
 
    render(){
        return <div>
            <div>
                <h1>Consulta de Formularios RAR</h1>
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
                <ListaFormulariosRAR
                    seleccionaRegistro={this.seleccionaRegistro}
                />
            </div>                      
        </div>
    }
}

export default FormulariosRAR;