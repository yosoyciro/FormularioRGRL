import React, {Component} from 'react';
import { Button } from 'react-bootstrap';
import ReferenteDatos from '../Api/ReferenteDatos/ReferenteDatos';
import ListaFormulariosRAR from '../components/FormulariosRAR/ListaFormulariosRAR';
import NuevoFormularioRAR from '../components/FormulariosRAR/NuevoFormularioRAR';
import Spinner from '../components/UI/Spinner';

export class FormulariosRAR extends Component{
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            referenteDatos: [],
            internoEstablecimiento: 0,
            cargarFormulario: false,
            estado: '',
        }
        this.seleccionaRegistro = this.seleccionaRegistro.bind(this)
        this.handleFinalizaCarga = this.handleFinalizaCarga.bind(this)
    }

    componentDidMount() {
        ReferenteDatos(this.props.match.params.CUIT)
        .then(res => {
            //console.log('[Formularios] - res: ' + JSON.stringify(res))
            this.setState({
                referenteDatos: res,
                isLoading: !this.state.isLoading,
            })
        })
    }  

    handleClick = () => {
        this.setState({ 
            cargarFormulario: true,
            internoEstablecimiento: 0,
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
            internoEstablecimiento,
            estado
        })
    }

    handleFinalizaCarga() {
        this.setState({ 
            cargarFormulario: !this.state.cargarFormulario,
            estado: ''
        })
    }
 
    render(){
        //console.log('[FormulariosRAR] - establecimiento: ' + Object.values(this.state.establecimiento))
        return <div>
            {this.state.isLoading === true ?
                <Spinner />
            :
            <>
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
                            cuit={this.props.match.params.CUIT}
                            seleccionaRegistro={this.seleccionaRegistro}
                            cargarFormulario={this.state.cargarFormulario}
                        />
                    </div>       
                :
                    <NuevoFormularioRAR
                        cuit={this.props.match.params.CUIT}
                        internoEstablecimiento={this.state.internoEstablecimiento}
                        referenteDatos={this.state.referenteDatos}
                        finalizaCarga={this.handleFinalizaCarga}
                    />
                }  
            </>
        }
        </div>
    }
}

export default FormulariosRAR;