import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Select from 'react-select';
import Modal from 'react-modal';
import './PresentacionesSelect.css'
import { PresentacionesGenerar, PresentacionesValidar, PresentacionesVerificarCompletados } from '../../../Api/Presentaciones/Presentaciones';
import { PDFViewer } from '@react-pdf/renderer';
import ComprobantePresentacion from '../../Presentaciones/ComprobantePresentacion';

class ElegirEstablecimientoRAR extends Component{ 
    constructor() {
        super() 
        this.handleChange = this.handleChange.bind(this)
        this.handleChangeEstado = this.handleChangeEstado.bind(this)
        this.handleModal = this.handleModal.bind(this)
        this.handleModalPDF = this.handleModalPDF.bind(this)
        this.handleConfirmar = this.handleConfirmar.bind(this)
        this.handleComprobante = this.handleComprobante.bind(this)
        this.state = {
            selectedOption: 0,
            estado: '', 
            modalIsOpen: false,
            modalPDFIsOpen: false,
            mensajeError: '',
            presentacion: []
        }            
    }

    componentWillMount() {
        Modal.setAppElement('body');
    }

    handleModal() {
        this.setState({
            modalIsOpen: !this.state.modalIsOpen,
            mensajeError: ''
        })
    }

    handleModalPDF() {
        this.setState({
            modalPDFIsOpen: !this.state.modalPDFIsOpen,
        })
    }

    handleChange(selectedOption) {
        //console.log('selectedoption: ' + selectedOption.value)
        this.setState({ 
            presentacion: selectedOption,
            selectedOption: selectedOption.value,
        }) 
        this.props.seleccionaPresentacion(selectedOption, false);
    }  

    handleChangeEstado(estado) {
        this.setState({ estado: estado.value })
    }

    async handleConfirmar() {
        switch (this.props.internoPresentacion) {
            case 0:
                this.setState({ estado: 'A'});
                break;
        
            default:
                break;
        }
        const presentacion = {
            Interno: this.props.internoPresentacion,
            CUIT: this.props.cuit,
            Nombre: `${new Date().getFullYear()}`,
            Estado: 'A', //this.state.estado,
            Tipo: this.props.tipo === 'RGRL' ? 'R' : 'A',
        }
        console.log('[PresentacionesSelect] presentacion: ' + JSON.stringify(presentacion))

        //Llamo los metodos para validar
        const resValidarPresentacion = await PresentacionesValidar(presentacion)
        console.log('[PresentacionesSelect] resValidarPresentacion: ' + resValidarPresentacion)
        const resVerificarCompletados = await PresentacionesVerificarCompletados(presentacion) 
        console.log('[PresentacionesSelect] resVerificarCompletados: ' + resVerificarCompletados)

        if (!resValidarPresentacion)
        {
            this.setState({ mensajeError: 'La presentación ya existe' })
            return
        }

        if (!resVerificarCompletados)
        {
            this.setState({ mensajeError: 'Debe completar un formulario para todos los establecimientos' })
            return
        }

        //Paso todas las validaciones
        if (resValidarPresentacion && resVerificarCompletados)
        {
            const res = await PresentacionesGenerar(presentacion)
            switch (res) {
                case null:
                    
                    break;
            
                default:
                    //console.log('[PresentacionesSelect] res: ' + JSON.stringify(res))
                    this.handleModal();
                    this.props.seleccionaPresentacion(res, true);
                    break;
            }
                
        } 
    }

    handleComprobante() {

    }
            

render() {      
    //console.log('[PresentacionesSelect] internoPresentacion: ' + this.props.internoPresentacion)
    
    const disableGenera = this.props.cuit === 99999999999 ? true : false   
    const disableComprobante = this.props.cuit === 99999999999 || this.props.internoPresentacion === 0 ? true : false       
    const presentaciones = this.props.presentaciones.map(presentacion => {
        return {
            value: presentacion.Interno,
            label: presentacion.Nombre,
            estado: presentacion.Estado,
            tipo: presentacion.Tipo,
            cuit: presentacion.CUIT,
            fechaHoraGeneracion: presentacion.FechaHoraGeneracion,
            cantidadEstablecimientos: presentacion.CantidadEstablecimientos
        }
    })

    var currentSelection = presentaciones.find(presentacion => presentacion.value === this.props.internoPresentacion)
    console.log('[PresentacionesSelect] currenSelection ' + JSON.stringify(currentSelection))
    var estadoPresentacion = []
    if (this.props.internoPresentacion === 0)
    {
        estadoPresentacion = [ 
            { value: "A", label: "Aceptada" },
        ]
    }
    else
    {
        estadoPresentacion = [ 
            { value: "R", label: "En Revisión" },
            { value: "E", label: "Enviada a SRT" }
        ]
    }
    
    //const selectedOption = this.state.selectedOption;
    //#region Estilos
    const customStyles = {
        content : {
            height: '30%',
            width: '40%',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)'
        },                
      };

      const errorText = {
        error: {
            color: 'red',
        }
      }

      const pdfStyle = {
        content : {
            height: '70%',
            width: '47%',
            top: '60%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)'
        },
      } 
      
    //#endregion

    //console.log('[PresentacionesSelect] currentSelection: ' + JSON.stringify(currentSelection))
    return <>    
            <table className="table-establecimiento">
                <thead className="elegirestablecimiento-thead">
                    <tr className="elegirestablecimiento-tr">
                        <th className="elegirestablecimiento-th"></th>
                        <th className="selectestablecimiento-th"></th>
                        <th className="generapresentacion-th"></th>
                        <th className="generapresentacion-th"></th>
                    </tr>
                </thead>
                <tbody className="elegirestablecimiento-tbody">
                    <td className="elegirestablecimiento-td">
                        <label>Presentación: </label>
                    </td>
                    <td className="selectestablecimiento-td">
                        <Select 
                            value={currentSelection}
                            //defaultValue={presentaciones[seleccion]}
                            name="form-field-name"
                            onChange={this.handleChange}                     
                            options={presentaciones}
                            isSearchable={false}
                            placeholder='Seleccione presentación...'
                            formatCreateLabel={userInput => `Search for ${userInput}`}
                        />
                    </td>
                    <td className="generapresentacion-td">
                        <Button 
                            onClick={this.handleModal}
                            className="btn-generapresentacion"
                            disabled={disableGenera}
                        >
                            {this.props.internoPresentacion === 0 ? 'Genera' : 'Edita'}
                        </Button>
                    </td>
                    <td className="generapresentacion-td">
                        <Button 
                            onClick={this.handleModalPDF}
                            className="btn-generapresentacion"
                            disabled={disableComprobante}
                        >
                            Comprobante
                        </Button>
                        
                    </td>                    
                </tbody>
            </table>  
            <Modal
                isOpen={this.state.modalIsOpen}
                //onAfterOpen={afterOpenModal}
                onRequestClose={this.handleModal}
                style={customStyles}
                contentLabel="Presentaciones"
            >
                <h2>{this.props.internoPresentacion === 0 ? 'Genera Presentación' : 'Edita Presentación'}</h2>                                                        
                <div>
                    <label>CUIT: </label>
                    <label>{this.props.cuit}</label>
                </div>
                <div>
                    <label>Presentación: </label>
                    <label>{new Date().getFullYear()}</label>
                </div>
                <div>
                    <label>Estado: </label>
                    <Select                         
                        defaultValue={estadoPresentacion[0]}
                        name="form-field-name"
                        onChange={this.handleChangeEstado}                     
                        options={estadoPresentacion}
                        isSearchable={false}
                    />
                </div>
                {this.state.mensajeError ?
                    <div>
                        <label style={errorText.error}>{this.state.mensajeError}</label>
                    </div>
                :
                    null
                }
                <Button onClick={this.handleConfirmar}>Confirmar</Button>
                <Button onClick={this.handleModal}>Cerrar</Button>
            </Modal>  
            <Modal
                isOpen={this.state.modalPDFIsOpen}
                //onAfterOpen={afterOpenModal}
                onRequestClose={this.handleModalPDF}
                style={pdfStyle}
                contentLabel="Presentaciones"
            >
                <PDFViewer style={{display: "inline", height: "450px", width: "600px"}}>
                    <ComprobantePresentacion 
                        presentacion={this.state.presentacion}
                        cuit={this.props.cuit}
                    />
                </PDFViewer>
            </Modal>          
        </>                                                                                                      
    }
}

export default ElegirEstablecimientoRAR;