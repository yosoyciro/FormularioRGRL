import React, {Component} from 'react';
import ListaFormularios from '../components/ConsultaFormularios/ListaFormularios';
import './ConsultaFormularios.css';

export class ConsultaFormularios extends Component{
    constructor(props) {
        super(props)
        this.state = {
            cuit: 0,
            internoFormulario: 0,
            internoEstablecimiento: 0,
            razonSocial: null,
            direccion: null,
            estado: null
        }
        this.seleccionaRegistro = this.seleccionaRegistro.bind(this)
        
    }

    handleClick = () => {
        this.props.history.push('/NuevoFormularioRGRL/');
    }

    handleClickCerrar() {       
        window.history.back();
        //console.log('cerrar')
    }

    handleEdita = () => {
        this.props.history.push('/NuevoFormularioRGRL/' + this.state.cuit);
    }

    seleccionaRegistro = (cuit, internoFormulario, internoEstablecimiento, estado, razonSocial, direccion) => {
        //console.log('[ConsultaFormularios] - seleccionaRegistro - cuit: ' + cuit)
        this.setState({
            cuit,
            internoFormulario,
            internoEstablecimiento,
            estado,
            razonSocial,
            direccion
        })
        this.props.seleccionaRegistro(cuit, internoFormulario, internoEstablecimiento, estado, razonSocial, direccion)
    }
 
    render(){
        return <div>            
            <ListaFormularios 
                seleccionaRegistro={this.seleccionaRegistro}
            />            
        </div>
    }
}

export default ConsultaFormularios;