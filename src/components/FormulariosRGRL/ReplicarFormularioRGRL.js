import Select from 'react-select';
import React, { Component } from 'react';
import Spinner from '../UI/Spinner';
import { CargarEstablecimientos } from '../../Api/CargarEstablecimientos';
import { Button } from 'react-bootstrap';
import ReplicarFormulario from '../../Api/FormulariosRGRL/ReplicarFormulario';
import CustomizedSnackbars from '../UI/Snackbar/Snackbar';
import FormulariosVerificarDuplicado from '../../Api/FormulariosRGRL/VerificarDuplicado';

class ReplicarFormularioRGRL extends Component {
    constructor() {
        super()
        this.handleChange = this.handleChange.bind(this);
        this.handleConfirmar = this.handleConfirmar.bind(this)
        this.handleFinaliza = this.handleFinaliza.bind(this)
        this.state = {            
            loading: true,  
            loadingEstablecimientos: true,
            establecimientos: [], 
            establecimientoSeleccionado: null,    
            showSnackBar: false,
            mensajeSnackbar: '',
            showSnackbarErrores: false,   
        }
    }

    componentDidMount() {
        CargarEstablecimientos({
            cuit: this.props.cuit,
            opcion: 0
        })
        .then(establecimientos => {
            this.setState({ 
                establecimientos,
                loading: !this.state.loading,
                loadingEstablecimientos: !this.state.loadingEstablecimientos
            })
        })
    }

    handleChange(establecimientoSeleccionado) {
        this.setState({ 
            establecimientoSeleccionado,            
        })
    }

    handleConfirmar() {
        this.setState({ loading: !this.state.loading, })

        //Verifico que no exista ya el formulario para el estabelcimiento
        FormulariosVerificarDuplicado({ 
            internoEstablecimiento: this.state.establecimientoSeleccionado.value,
            internoFormulario: this.props.internoFormulario,
        })
        .then(res => {
            switch (res) {
                case null:
                    //todo ok
                    const data = {
                        InternoRespuestaFormulario: this.props.internoRespuestaFormulario,
                        InternoEstablecimientoDestino: this.state.establecimientoSeleccionado.value
                    }
                    console.log('data: ' + JSON.stringify(data))
                    ReplicarFormulario(data)
                    .then(res => {
                        this.setState({ loading: !this.state.loading, })

                        console.log('[ReplicarFormularioRGRL] res: ' + res)
                        switch (res.data) {
                            case null:
                                console.log('Error')
                                this.setState({
                                    showSnackBar: !this.state.showSnackBar,
                                    severitySnackbar: "error",
                                    mensajeSnackbar: 'Formulario no replicado!'
                                }) 
                                break;
                        
                            default:
                                this.setState(
                                    {
                                        showSnackBar: !this.state.showSnackBar,
                                        severitySnackbar: "success",
                                        mensajeSnackbar: 'Formulario replicado!'
                                    }
                                )
                                break;
                        }            
                    })
                    break;

                default:
                    //existe
                    this.setState({ loading: !this.state.loading, })
                    alert('Ya hay un formulario existente para el establecimineto')
                    break;
            }
        })

        
    }

    handleFinaliza() {
        this.props.finalizaCarga()        
    }

    render() {
        let handleCerrarSnackbar=() => this.setState({showSnackBar: false})

        const customStyles = {
            select : {
              width: '50%',
              marginBottom: '2%',
            }
        };
        if (!this.state.loading)
        {
            var establecimientos = this.state.establecimientos.map(establecimiento => {
                //console.log('[ReplicarFormularioRGRL] establecimiento: ' + JSON.stringify(establecimiento))
                return {
                    value: establecimiento.Interno,
                    label: establecimiento.Numero + ' - ' + establecimiento.Codigo + ' - ' + establecimiento.Nombre + ' ' + establecimiento.DomicilioCalle + ' ' + establecimiento.DomicilioNro + ' - ' + establecimiento.Provincia, 
                    isDisabled: this.props.internoEstablecimiento === establecimiento.Interno ? true : false
                }
            })
        }
        

        //console.log('Establecimientos: ' + JSON.stringify(this.state.establecimientoSeleccionado))
        const disabled = this.state.establecimientoSeleccionado !== null ? false : true
        const formulario = 'Formulario a replicar: ' + this.props.formulario
        const establecimientoOrigen = 'Establecimiento origen: ' + this.props.establecimiento
        return (
            <div>
                <h1>Replicar Formulario RGRL</h1>
                <div>
                    <h3>{formulario}</h3>
                </div>            
                <div>
                    <h3>{establecimientoOrigen}</h3>
                </div>
                {!this.state.loading ?
                <>    
                    {this.state.showSnackBar ?
                        <CustomizedSnackbars 
                            show={this.state.showSnackBar}
                            mensaje={this.state.mensajeSnackbar}
                            onClose={handleCerrarSnackbar}
                            severity={this.state.severitySnackbar}
                            vertical="bottom"
                            horizontal="center"
                            timer={5000}
                        />
                    :
                        null
                    }                 
                    <form style={customStyles.select}>
                        <label>Establecimiento: </label>
                        <Select                         
                            name="form-field-name"
                            onChange={this.handleChange}                     
                            options={establecimientos}
                            placeholder={'Seleccione establecimiento'}
                            isLoading={this.state.loadingEstablecimientos}
                        />
                    </form>
                    <div>
                        <Button 
                            onClick={this.handleConfirmar}
                            disabled={disabled}
                        >Confirma
                        </Button>

                        <Button 
                            onClick={this.handleFinaliza}
                        >Finaliza
                        </Button>
                    </div>
                    
                </>
                :
                    <Spinner />
                }
            </div>
        )
    }
}

export default ReplicarFormularioRGRL