import React, {Component} from 'react';
import { Button } from 'react-bootstrap';
import './ConsultaFormularios.css';
import ListaFormulariosRAR from '../components/FormulariosRAR/ListaFormulariosRAR';
import NuevoFormularioRAR from '../components/FormulariosRAR/NuevoFormularioRAR';

export class FormulariosRAR extends Component{
    constructor(props) {
        super(props)
        this.state = {
            cuit: 0,
            cargarFormulario: false
        }
        this.seleccionaRegistro = this.seleccionaRegistro.bind(this)
        this.handleFinalizaCarga = this.handleFinalizaCarga.bind(this)
    }

    handleClick = () => {
        //console.log('cuit seleccionado: ' + this.state.cuit)
        //this.props.history.push('/NuevoFormularioRAR/' + this.state.cuit);
        //this.props.history.push('/NuevoFormularioRAR/3071');
        this.setState({ cargarFormulario: true })
    }

    handleClickCerrar() {       
        window.history.back();
        //console.log('cerrar')
    }

    /*handleEdita = () => {
        this.props.history.push('/NuevoFormularioRAR/' + this.state.cuit);
    }*/

    seleccionaRegistro = (cuit) => {
        //console.log('cuit seleccionado: ' + cuit)
        this.setState({cuit})
    }

    handleFinalizaCarga() {
        this.setState({ cargarFormulario: !this.state.cargarFormulario })
    }
 
    render(){
        return <div>
            {this.state.cargarFormulario === false ?
                <div>
                    <h1>Consulta de Formularios RAR</h1>
                    {/*{this.state.cuit !== 0 ?
                        <Button 
                            onClick={this.handleEdita}
                            className="btn-consultaformulario"
                        >
                            Edita Formulario
                        </Button>
                    :
                        null
                    }*/}
                    <Button 
                        onClick={this.handleClick}
                        className="btn-consultaformulario"
                    >
                        Genera/Edita Formulario
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
            :
                <NuevoFormularioRAR
                    cuit={this.state.cuit}
                    finalizaCarga={this.handleFinalizaCarga}
                />
            }               
        </div>
    }
}

export default FormulariosRAR;