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
            internoEstablecimiento: 0,
            razonSocial: '',
            direccion: '',
            cargarFormulario: false
        }
        this.seleccionaRegistro = this.seleccionaRegistro.bind(this)
        this.handleFinalizaCarga = this.handleFinalizaCarga.bind(this)
    }

    handleClick = () => {
        this.setState({ 
            cargarFormulario: true,
            cuit: 0,
            internoEstablecimiento: 0,
            razonSocial: null,
            direccion: null,
            estado: ''
        })
    }

    handleClickCerrar() {       
        window.history.back();
        //console.log('cerrar')
    }

    handleEdita = () => {
        //this.props.history.push('/NuevoFormularioRAR/' + this.state.cuit);
        this.setState({ 
            cargarFormulario: true
        })
    }

    seleccionaRegistro = (cuit, internoEstablecimiento, razonSocial, direccion, estado) => {
        //console.log('[FormulariosRAR] - direccion: ' + direccion)
        this.setState({
            cuit,
            internoEstablecimiento,
            razonSocial,
            direccion,
            estado
        })
    }

    handleFinalizaCarga() {
        this.setState({ 
            cargarFormulario: !this.state.cargarFormulario,
            cuit: 0,
            estado: ''
        })
    }
 
    render(){
        //console.log('[FormulariosRAR] - establecimiento: ' + Object.values(this.state.establecimiento))
        return <div>
            {this.state.cargarFormulario === false ?
                <div>
                    <h1>Consulta de Formularios RAR</h1>
                    {this.state.cuit !== 0 && this.state.estado !== 'Confirmado' ?
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
                        cargarFormulario={this.state.cargarFormulario}
                    />
                </div>       
            :
                <NuevoFormularioRAR
                    cuit={this.state.cuit}
                    internoEstablecimiento={this.state.internoEstablecimiento}
                    razonSocial={this.state.razonSocial}
                    direccion={this.state.direccion}
                    finalizaCarga={this.handleFinalizaCarga}
                />
            }               
        </div>
    }
}

export default FormulariosRAR;