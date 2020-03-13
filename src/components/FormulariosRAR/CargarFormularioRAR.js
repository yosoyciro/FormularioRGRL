import React, {Component, Fragment} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import Button from 'react-bootstrap/Button';
import DatePicker from "react-datepicker";
import GuardarFormularioRARDetalle from '../../Api/FormulariosRAR/GuardarFormularioRARDetalle';
import CargarFormulariosRARDetalle from '../../Api/FormulariosRAR/CargarFormulariosRARDetalle';
import BorrarFormularioRARDetalle from '../../Api/FormulariosRAR/BorrarFormularioRARDetalle';
import Spinner from '../UI/Spinner';
import * as moment from 'moment';
import FormatearFechaSola from '../Utiles/FormatearFechaSola'
import BuscarPersona from '../../Api/BuscarPersona';
import ConsultarRefAgenteCausante from '../../Api/FormulariosRAR/RefAgenteCausante';
import {ConsultarFormularioRARDetalleAgentes} from '../../Api/FormulariosRAR/FormulariosRARDetalleAgentes';
import FormulariosRARDetalleAgentes from './FormulariosRARDetalleAgentes';
import Select from 'react-select';
import { Form, Col, Row } from 'react-bootstrap';
import './FormulariosRAR.css'

export class CargarFormularioRAR extends Component{
    constructor(props) {
        super(props)   
        this.handleSubmit = this.handleSubmit.bind(this) 
        this.handleDataChange = this.handleDataChange.bind(this)    
        this.handleSeleccion = this.handleSeleccion.bind(this)
        this.handleLimpiar = this.handleLimpiar.bind(this)
        this.handleChangeCampos = this.handleChangeCampos.bind(this)
        this.handleBorrar = this.handleBorrar.bind(this)
        this.handleLoading = this.handleLoading.bind(this)
        this.handleChangeAgente = this.handleChangeAgente.bind(this)
        this.state = {
            loading: true,
            formulariosRARDetalle: [],
            formulariosRARDetalleAgentes: [],
            refAgenteCausante: [],
            //formulariosRARDetalleAgentes: [],
            internoFormulariosRAR: null,
            internoFormulariosRARDetalle: null,
            internoEstablecimiento: 0,
            cuil: null,
            nombre: null,
            sectorTarea: null,               
            fechaIngreso: null,
            horasExposicion: null,
            fechaUltimoExamenMedico: null,
            codigoAgente: null,
            cuilValido: false       
        }
    }

    componentDidMount() {        
        //podría ver si tiene algo y traer los datos
        //console.log('formularioGenerado.Interno: ' + JSON.stringify(this.props.formularioRARGenerado[0].Interno))
        console.log('this.props.formularioRARGenerado[0].Interno: ' + this.props.formularioRARGenerado[0].Interno)
        this.setState({             
            internoFormulariosRAR: this.props.formularioRARGenerado[0].Interno            
        })

        //Cargo los agentes causantes
        ConsultarRefAgenteCausante()
        .then(resp => {
            this.setState({ refAgenteCausante: resp })
            //Cargo el detalle del form
            CargarFormulariosRARDetalle(this.props.formularioRARGenerado[0].Interno)
            .then(detalle => {
                console.log('detalle: ' + detalle)            
                this.setState({ formulariosRARDetalle: detalle })
            })
        })
        
        this.setState({ loading: !this.state.loading })
    }

    //#region Handles
    handleDataChange(row, column) {
        //console.log('CUIL: ' + row.CUIL)
        //console.log('column: ' + column)
        this.setState({ loading: !this.state.loading })

        const props = {
            Interno: row.Interno,
            InternoFormulariosRAR: row.InternoFormulariosRAR,
            CUIL: row.CUIL,
            Nombre: row.Nombre,
            SectorTarea: row.SectorTarea,
            FechaIngreso: moment(row.FechaIngreso).format('YYYY-MM-DD') ,
            HorasExposicion: row.HorasExposicion,
            FechaUltimoExamenMedico: moment(row.FechaUltimoExamenMedico).format('YYYY-MM-DD'),
            CodigoAgente: row.CodigoAgente
        }
        //console.log('props: ' + Object.values(props))
        GuardarFormularioRARDetalle(props)
        .then(resp => {
            CargarFormulariosRARDetalle(resp.InternoFormulariosRAR)
            .then(detalle => {                
                this.setState({ 
                    loading: !this.state.loading,
                    formulariosRARDetalle: detalle
                })
            })            
        })
    }

    handleChangeCampos(event) {
        switch (event.target.name)
        {
            case 'cuil': 
                if (event.target.value.length === 11)
                {
                    this.handleBuscarPersona(event.target.value)
                }

                this.setState({ 
                    cuil: event.target.value,

                });
                break;

            case 'sectortarea':
                this.setState({ sectorTarea: event.target.value });
                break;

            case 'horasexposicion':
                this.setState({ horasExposicion: event.target.value });
                break;

            case 'fechaingreso':
                switch (event.target.value)
                {
                    case null:
                        this.setState({ fechaIngreso: null});        
                        break;
        
                    default:
                        /*const fecha = new Date(event.target.value)
                        console.log('fecha: ' + fecha)
                        this.setState({ fechaIngreso:  moment(fecha).format('DD/MM/YYYY')})*/
                        this.setState({ fechaIngreso: event.target.value})
                }
                break;

            case 'fechaultimoexamenmedico':
                switch (event.target.value)
                {
                    case null:
                        this.setState({ fechaUltimoExamenMedico: null});        
                        break;
        
                    default:
                        this.setState({ fechaUltimoExamenMedico: event.target.value})
                }
                break;
                
            default:
                break;
        }
    }

    handleSubmit(event){                
        event.preventDefault();
        this.setState({ loading: !this.state.loading })
        
        const props = {
            Interno: this.state.internoFormulariosRARDetalle === null ? 0 : this.state.internoFormulariosRARDetalle,
            InternoFormulariosRAR: this.state.internoFormulariosRAR === null ? 0 : this.state.internoFormulariosRAR,
            CUIL: event.target.cuil.value,
            Nombre: event.target.nombre.value,
            SectorTarea: event.target.sectortarea.value,
            FechaIngreso: moment(this.state.fechaIngreso).format('YYYY-MM-DD') ,
            HorasExposicion: event.target.horasexposicion.value,
            FechaUltimoExamenMedico: moment(this.state.fechaUltimoExamenMedico).format('YYYY-MM-DD'),
            CodigoAgente: this.state.codigoAgente
        }
        //console.log('props: ' + Object.values(props))
        GuardarFormularioRARDetalle(props)
        .then(resp => {
            CargarFormulariosRARDetalle(resp.InternoFormulariosRAR)
            .then(detalle => {                
                this.setState({ 
                    loading: !this.state.loading,
                    formulariosRARDetalle: detalle
                })
            }) 
            this.handleLimpiar()           
        })
    }

    handleBorrar(){
        this.setState({ loading: !this.state.loading })

        //console.log('props: ' + Object.values(props))
        BorrarFormularioRARDetalle(this.state.internoFormulariosRARDetalle)
        .then(resp => {
            CargarFormulariosRARDetalle(this.state.internoFormulariosRAR)
            .then(detalle => {                
                this.setState({ 
                    loading: !this.state.loading,
                    formulariosRARDetalle: detalle
                })
            }) 
            this.handleLimpiar()           
        })
    }

    handleLimpiar(){
        this.setState({
            internoFormulariosRARDetalle: null,
            internoFormulariosRAR: null,
            cuil: null,
            nombre: null,
            sectorTarea: null,
            fechaIngreso: null,
            horasExposicion: null,
            fechaUltimoExamenMedico: null,
            codigoAgente: null,
            cuilValido: false
        })
    }

    handleSeleccion(e, row, rowIndex){
        console.log('row.FechaIngreso: ' + row.FechaIngreso)
        this.setState({             
            internoFormulariosRARDetalle: row.Interno,
            internoFormulariosRAR: row.InternoFormulariosRAR,
            cuil: row.CUIL,
            nombre: row.Nombre,
            sectorTarea: row.SectorTarea,
            fechaIngreso: moment(row.FechaIngreso).format('YYYY-MM-DD'), //row.FechaIngreso,
            horasExposicion: row.HorasExposicion,
            fechaUltimoExamenMedico: moment(row.FechaUltimoExamenMedico).format('YYYY-MM-DD'),
            codigoAgente: row.CodigoAgente
        })

        ConsultarFormularioRARDetalleAgentes(row.Interno)
        .then(detalle => {                
            this.setState({ formulariosRARDetalleAgentes: detalle }) 
        })
    }

    handleBuscarPersona (cuil){        
        this.setState({ loading: !this.state.loading })
        const param = {
            CUIT: cuil,
            BuscarEnAFIP: true
        }

        BuscarPersona(param)
        .then(resp => {
            //console.log('resp[0].razonSocial: ' + resp[0].razonSocial) 
            this.setState({ loading: !this.state.loading })    

            switch(resp[0].razonSocial)
            {
                case '':
                    break;

                default:
                    this.setState({ 
                        cuilValido: true,
                        nombre: resp[0].razonSocial
                     })
            }
        })
    }    

    handleChangeAgente = (selectedOption) => {
        this.setState({ codigoAgente: selectedOption.value })   
    } 
    //#endregion    

    //#region Metodos propiedades
    handleLoading(){
        this.setState({ loading: !this.state.loading })
    }
    //#endregion

    render(){
        //campos a cargar
        const CUIL = this.state.cuil === null ? '' : this.state.cuil
        const Nombre = this.state.nombre === null ? '' : this.state.nombre
        const SectorTarea = this.state.sectorTarea === null ? '' : this.state.sectorTarea
        const FechaIngreso = this.state.fechaIngreso === null ? '' : this.state.fechaIngreso
        const HorasExposicion = this.state.horasExposicion === null ? '' : this.state.horasExposicion
        const FechaUltimoExamenMedico = this.state.fechaUltimoExamenMedico === null ? '' : this.state.fechaUltimoExamenMedico
        const CodigoAgente = this.state.codigoAgente === null ? '' : this.state.codigoAgente

        //Disabled botones
        const disableBorrar = this.state.internoFormulariosRARDetalle !== null && this.state.internoFormulariosRARDetalle !== 0 ? false : true
        const disableCUIL = (this.state.internoFormulariosRARDetalle !== null && this.state.internoFormulariosRARDetalle !== 0) || (this.state.cuilValido === true) ? true : false

        //Propiedades de la tabla
        //#region Columnas
        const columns = [
            {
                dataField: 'Interno',
                text: 'Interno',
                hidden: true
            }, 
            {
                dataField: 'InternoFormulariosRAR',
                text: 'Interno Formulario RAR',
                hidden: true
            }, 
            {
                dataField: 'CUIL',
                text: 'CUIL',
                editable: true,
            }, 
            {
                dataField: 'Nombre',
                text: 'Nombre',
            },
            {
                dataField: 'SectorTarea',
                text: 'Sector/Tarea',
                editable: true,
            },
            {
                dataField: 'FechaIngreso',
                text: 'Fecha de Ingreso',
                editable: true,
                formatter: FormatearFechaSola,
                editor: {
                    type: Type.DATE
                },
            },
            {
                dataField: 'HorasExposicion',
                text: 'Hs de Exposición',
                editable: true,
            },
            {
                dataField: 'FechaUltimoExamenMedico',
                text: 'Fecha Ult. Exámen Médico',                
                formatter: FormatearFechaSola,
            },
            {
                dataField: 'CodigoAgente',
                text: 'Codigo Agente',
            }        
        ];
        //#endregion

        //Caption
        const caption = 'Trabajadores cargados ' + this.state.formulariosRARDetalle.length + ' de ' + this.props.formularioRARGenerado[0].CantTrabajadoresExpuestos
        const CaptionElement = () => <h4 style={{ borderRadius: '0.25em', textAlign: 'center', color: 'blue', border: '1px solid purple', padding: '0.5em' }}>{caption}</h4>;        

        //Seleccion
        const selectRow = {
            mode: 'radio',
            clickToSelect: true,
            clickToExpand: true,            
            bgColor: '#00BFFF',
            hidden: true
        };

        //Evento de fila
        const rowEvents = {
            onClick: (e, row, rowIndex) => {
                this.handleSeleccion(e, row, rowIndex)
            }
        };

        //#region expandRow y adentro llamo al componente que maneja los agentes de riesgo
        /*const expandRow = {
            renderer: row => (
                <>
                    <FormulariosRARDetalleAgentes 
                        refAgenteCausante={this.state.refAgenteCausante}
                        internoFormulariosRARDetalle={this.state.internoFormulariosRARDetalle}
                        handleLoading={this.handleLoading}
                        formulariosRARDetalleAgentes={this.state.formulariosRARDetalleAgentes}
                    />
                </>
            ),
            showExpandColumn: true,            
        };*/
        //#endregion

        //#region return
        return <div>
            {this.state.loading === true ?
                <Spinner/>
            :
                <>
                <h3>Datos del trabajador</h3>
                <div>
                <Form onSubmit={this.handleSubmit}>
                    <Row>
                        <Col lg={2}>
                            <Form.Group controlId="formGridCUIL">
                                <Form.Label>CUIL</Form.Label>
                                <Form.Control 
                                    className="form-control-size"
                                    value={CUIL}
                                    type="number" 
                                    name="cuil" 
                                    placeholder="CUIT del trabajador"
                                    onChange={this.handleChangeCampos}
                                    disabled={disableCUIL}
                                    required
                                >
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col lg={2}>
                            <Form.Group as={Col} controlId="formGridNombre">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control 
                                    className="form-control-size"
                                    value={Nombre}
                                    type="text" 
                                    name="nombre" 
                                    disabled={true}
                                >
                                </Form.Control>
                            </Form.Group>
                        </Col>                            
                        <Col lg={2}>
                            <Form.Group controlId="formGridSectorTarea">
                                <Form.Label>Sector/Tarea</Form.Label>
                                <Form.Control 
                                    className="form-control-size"
                                    value={SectorTarea}
                                    type="text" 
                                    name="sectortarea"
                                    placeholder="Sector/Tarea" 
                                    onChange={this.handleChangeCampos}
                                >
                                </Form.Control>
                            </Form.Group>
                        </Col>   
                        <Col lg={2}>
                            <Form.Group controlId="formGridFechaIngreso">
                                <Form.Label>Fecha Ingreso</Form.Label>
                                <Form.Control 
                                    className="form-control-size"
                                    value={FechaIngreso}
                                    type="date" 
                                    name="fechaingreso"
                                    onChange={this.handleChangeCampos}
                                    placeholderText="Fecha de ingreso"
                                >
                                </Form.Control>
                            </Form.Group>
                        </Col> 
                        <Col lg={2}>
                            <Form.Group controlId="formGridHorasExposicion">
                                <Form.Label>Hs Exposición</Form.Label>
                                <Form.Control 
                                    className="form-control-size"
                                    value={HorasExposicion}
                                    type="number" 
                                    name="horasexposicion"
                                    placeholder="Hs Exposición" 
                                    onChange={this.handleChangeCampos}
                                >
                                </Form.Control>
                            </Form.Group>
                        </Col>  
                        <Col lg={2}>
                            <Form.Group controlId="formGridFechaUltimoExamenMedico">
                                <Form.Label>Fecha Ult. Exámen Médico</Form.Label>
                                <Form.Control 
                                    className="form-control-size"
                                    value={FechaUltimoExamenMedico}
                                    type="date" 
                                    name="fechaultimoexamenmedico"
                                    onChange={this.handleChangeCampos}
                                    placeholderText="Fecha de ultimo exámen médico"
                                >
                                </Form.Control>
                            </Form.Group>
                        </Col> 
                    </Row>
                    <Col lg={5}>
                        <Form.Group controlId="formGridCodigoAgente">
                            <Form.Label>Cód. Agente</Form.Label>
                            <Form.Control 
                                value={CodigoAgente}
                                className="form-control-size"
                                as="select" 
                                name="codigoagente" 
                                onChange={event => this.handleChangeAgente(event.target)}
                            >                                            
                                {this.state.refAgenteCausante.map(agente => {        
                                    return <option value={agente.Codigo}>{'Código: ' + agente.Codigo + ' - Agente: ' + agente.AgenteCausante + ' - Tipo: ' + agente.AgenteTipo}</option>
                                })}
                            </Form.Control>
                        </Form.Group>
                    </Col> 
                    <Button variant="primary" type="submit" disabled={false}>Carga</Button>  
                    <Button variant="danger" onClick={this.handleBorrar} disabled={disableBorrar}>Borra</Button>
                    <Button variant="light" onClick={this.handleLimpiar} disabled={false}>Limpia</Button>                                             
                </Form>
                </div>
                <BootstrapTable
                    keyField="Interno"
                    caption={<CaptionElement />}
                    data={ this.state.formulariosRARDetalle }
                    columns={ columns }                    
                    rowEvents={ rowEvents } 
                    selectRow={ selectRow }
                />
                </>
            }
        </div>
        //#endregion
    }
}


export default CargarFormularioRAR;