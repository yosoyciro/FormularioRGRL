import React, { Component } from 'react';
import { CargarEstablecimientosReplica } from '../../Api/CargarEstablecimientos';

class ReplicarFormularioRGRL extends Component {
    constructor(props) {
        super(props)
        //this.handleFinalizaCarga = this.handleFinalizaCarga.bind(this);
        this.state = {            
            loading: true,            
        }
    }

    componentDidMount() {
        CargarEstablecimientosReplica({
            cuit: this.props.cuit,
            internoEstablecimiento: this.props.internoEstablecimiento
        })
    }

    render() {
        //console.log('replicar')
        const formulario = 'Formulario a replicar ' + this.props.formulario
        const establecimientoOrigen = 'Establecimiento origen: ' + this.props.establecimiento
        return (
            <div>
                <div>
                    <label>{formulario}</label>
                </div>            
                <div>
                    <label>{establecimientoOrigen}</label>
                </div>
                
            </div>
        )
    }
}

export default ReplicarFormularioRGRL