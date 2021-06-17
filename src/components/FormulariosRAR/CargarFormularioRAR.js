import React, {Component} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { Type } from 'react-bootstrap-table2-editor';
import Button from 'react-bootstrap/Button';
import GuardarFormularioRARDetalle from '../../Api/FormulariosRAR/GuardarFormularioRARDetalle';
import CargarFormulariosRARDetalle from '../../Api/FormulariosRAR/CargarFormulariosRARDetalle';
import BorrarFormularioRARDetalle from '../../Api/FormulariosRAR/BorrarFormularioRARDetalle';
import Spinner from '../UI/Spinner';
import * as moment from 'moment';
import FormatearFechaSola from '../Utiles/FormatearFechaSola'
import BuscarPersona from '../../Api/BuscarPersona';
import ConsultarRefAgenteCausante from '../../Api/FormulariosRAR/RefAgenteCausante';
import {ConsultarFormularioRARDetalleAgentes} from '../../Api/FormulariosRAR/FormulariosRARDetalleAgentes';
import './FormulariosRAR.css'
import { ConfirmarFormularioRAR } from '../../Api/FormulariosRAR/FormularioRAR';
import TextField from '@material-ui/core/TextField';


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
        this.handleConfirmar = this.handleConfirmar.bind(this);
        this.agenteDuplicado = this.agenteDuplicado.bind(this)
        this.state = {
            loading: true,
            formulariosRARDetalle: [],
            formulariosRARDetalleAgentes: [],
            refAgenteCausante: [],
            //formulariosRARDetalleAgentes: [],
            internoFormulariosRAR: null,
            internoFormulariosRARDetalle: null,
            cantTrabajadoresExpuestos: 0,
            internoEstablecimiento: 0,
            cuil: null,
            nombre: null,
            sectorTarea: null,               
            fechaIngreso: null,
            horasExposicion: null,
            fechaUltimoExamenMedico: null,
            codigoAgente: null,
            cuilValido: true,
            trabajadorExiste: false,
            errorAgente: false
        }
    }

    componentDidMount() {        
        //console.log('ComponenDidMount - this.props.formularioRARGenerado: ' + this.props.formularioRARGenerado)
        //podría ver si tiene algo y traer los datos
        //console.log('formularioGenerado.Interno: ' + JSON.stringify(this.props.formularioRARGenerado[0].Interno))
        //console.log('this.props.formularioRARGenerado[0].Interno: ' + this.props.formularioRARGenerado[0].Interno)
        this.props.formularioRARGenerado.map(form => (
            this.setState({             
                internoFormulariosRAR: form.Interno,
                cantTrabajadoresExpuestos: form.CantTrabajadoresExpuestos
            })
        ))
        
        //Cargo los agentes causantes
        ConsultarRefAgenteCausante()
        .then(resp => {
            this.setState({ 
                refAgenteCausante: resp,
                codigoAgente: resp[0].Codigo
            })
            //Cargo el detalle del form
            CargarFormulariosRARDetalle(this.props.formularioRARGenerado[0].Interno)
            .then(detalle => {
                //console.log('detalle: ' + detalle)            
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
            InternoFormulariosRAR: this.state.internoFormulariosRAR, //row.InternoFormulariosRAR,
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

    //#region  handlechangecampos
    handleChangeCampos(event) {
        //console.log('event: ' + event.target.id)
        switch (event.target.id)
        {
            case 'cuil': 
                this.setState({ 
                    foco: 
                    {
                        cuil: true,
                        sector: false,
                        fechaIngreso: false,
                        horas: false,
                        fechaUltimoExamenMedico: false
                    }
                })
                if (event.target.value.length === 11)
                {
                    this.handleBuscarPersona(event.target.value)
                }
                else
                {
                    this.setState({ cuilValido: true }) 
                }

                this.setState({ 
                    cuil: event.target.value,

                });
                break;

            case 'sectortarea':
                this.setState({ 
                    foco: 
                    {
                        cuil: false,
                        sector: true,
                        fechaIngreso: false,
                        horas: false,
                        fechaUltimoExamenMedico: false
                    }
                })
                this.setState({ sectorTarea: event.target.value });
                break;

            case 'horasexposicion':
                this.setState({ 
                    foco: 
                    {
                        cuil: false,
                        sector: false,
                        fechaIngreso: false,
                        horas: true,
                        fechaUltimoExamenMedico: false
                    }
                })
                this.setState({ horasExposicion: event.target.value });
                break;

            case 'fechaingreso':
                this.setState({ 
                    foco: 
                    {
                        cuil: false,
                        sector: false,
                        fechaIngreso: true,
                        horas: false,
                        fechaUltimoExamenMedico: false
                    }
                })
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
                this.setState({ 
                    foco: 
                    {
                        cuil: false,
                        sector: false,
                        fechaIngreso: false,
                        horas: false,
                        fechaUltimoExamenMedico: true
                    }
                })
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
    //#endregion

    handleSubmit(event){                
        event.preventDefault();        

        //Verifico que el agente no se haya cargado para el trabajador
        switch(this.agenteDuplicado(this.state.cuil, this.state.codigoAgente))
        {
            case true:
                this.setState({ 
                    errorAgente:true,
                    //loading: !this.state.loading
                })
                break;

            case false:
                this.setState({ loading: !this.state.loading })

                const props = {
                    Interno: this.state.internoFormulariosRARDetalle === null ? 0 : this.state.internoFormulariosRARDetalle,
                    InternoFormulariosRAR: this.state.internoFormulariosRAR === null ? 0 : this.state.internoFormulariosRAR,
                    CUIL: this.state.cuil,
                    Nombre: this.state.nombre,
                    SectorTarea: this.state.sectorTarea,
                    FechaIngreso: moment(this.state.fechaIngreso).format('YYYY-MM-DD') ,
                    HorasExposicion: this.state.horasExposicion,
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

                break;

            default:

        }                
    }

    agenteDuplicado(cuil, agente) {
        console.log('parseInt(cuil): ' + parseInt(cuil) + ' - parseInt(agente): ' + parseInt(agente))
        const detalle = this.state.formulariosRARDetalle
        const trabajadoresCargados = detalle.find(trabajador => parseInt(trabajador.CUIL) === parseInt(cuil) && parseInt(trabajador.CodigoAgente) === parseInt(agente))
        console.log('trabajadoresCargados: ' + trabajadoresCargados)
        switch (trabajadoresCargados)
        {            
            case undefined: //si no esta el trabajador, busco la persona normalmente
                console.log('agenteDuplicado false')
                return false
           
            case trabajadoresCargados:
                console.log('agenteDuplicado true')
               return true

            default: //existe  
                console.log('agenteDuplicado false')
                return false
        }                
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
                    formulariosRARDetalle: detalle,
                    codigoAgente: 40001,
                })
            }) 
            this.handleLimpiar()           
        })
    }

    handleLimpiar(){
        this.setState({
            internoFormulariosRARDetalle: null,
            //internoFormulariosRAR: null,
            cuil: null,
            nombre: null,
            sectorTarea: null,
            fechaIngreso: null,
            horasExposicion: null,
            fechaUltimoExamenMedico: null,
            codigoAgente: 40001,
            cuilValido: true,
            trabajadorExiste: false,
            errorAgente: false
        })
    }

    handleSeleccion(e, row, rowIndex){
        //Veo cuantas veces fue cargado el CUIL, si es mas de 1 bloqueo las fechas
        let cont = 0
        this.state.formulariosRARDetalle.map(detalle => {            
            if (detalle.CUIL === row.CUIL)
            {
                cont++
            }
            return cont        
        })
        //console.log('repetidos: ' + cont)


        this.setState({             
            internoFormulariosRARDetalle: row.Interno,
            //internoFormulariosRAR: row.InternoFormulariosRAR,
            cuil: row.CUIL,
            nombre: row.Nombre,
            sectorTarea: row.SectorTarea,
            fechaIngreso: moment(row.FechaIngreso).format('YYYY-MM-DD'), //row.FechaIngreso,
            horasExposicion: row.HorasExposicion,
            fechaUltimoExamenMedico: moment(row.FechaUltimoExamenMedico).format('YYYY-MM-DD'),
            codigoAgente: row.CodigoAgente,
            trabajadorExiste: cont > 1 ? true : false
        })

        ConsultarFormularioRARDetalleAgentes(row.Interno)
        .then(detalle => {                
            this.setState({ formulariosRARDetalleAgentes: detalle }) 
        })
    }

    handleBuscarPersona (cuil){        
        this.setState({ 
            loading: !this.state.loading,
            cuilValido: false
        })

        //Busco si el cuit ya se cargo en los trabajadores y traigo nombre y hs exposicion, y pongo las hs en disabled
        const detalle = this.state.formulariosRARDetalle
        const trabajadoresCargados = detalle.find(trabajador => parseInt(trabajador.CUIL) === parseInt(cuil))
        //console.log('resul: ' + trabajadoresCargados)
        switch (trabajadoresCargados)
        {            
            case undefined: //si no esta el trabajador, busco la persona normalmente
                console.log('undefined')
                const param = {
                    CUIT: cuil,
                    BuscarEnAFIP: true,
                    Tipo: 'RAR',
                }
        
                BuscarPersona(param)
                .then(resp => {           
                    this.setState({ loading: false })         
                    //console.log('resp[0].razonSocial: ' + resp[0].razonSocial)                                 
                    switch(resp[0].razonSocial)
                    {
                        case '':
                            break;
        
                        default:
                            this.setState({ 
                                cuilValido: true,
                                nombre: resp[0].razonSocial,
                             })
                    }
                })
                break;
           
            case trabajadoresCargados:
                console.log('cuil')                
                this.setState({
                    nombre: trabajadoresCargados.Nombre,
                    fechaIngreso: moment(trabajadoresCargados.FechaIngreso).format('YYYY-MM-DD'), //trabajadoresCargados.FechaIngreso,
                    fechaUltimoExamenMedico: moment(trabajadoresCargados.FechaUltimoExamenMedico).format('YYYY-MM-DD'), //trabajadoresCargados trabajadoresCargados.FechaUltimoExamenMedico,
                    cuilValido: true,
                    trabajadorExiste: true,
                    loading: false
                })
                break;

            default: //existe  
                console.log('DEFAULT')    
                this.setState({ loading: false })
                break;
        }                
    }    

    handleChangeAgente = (selectedOption) => {
        this.setState({ 
            codigoAgente: selectedOption.value,
            errorAgente: false
        })   
    } 
    //#endregion    

    //#region Metodos propiedades
    handleLoading(){
        this.setState({ loading: !this.state.loading })
    }
    //#endregion

    cantidadTrabajadoresCargados = () => {
        const detalleCUIL = this.state.formulariosRARDetalle.map(detalle => {
            return detalle.CUIL
        })
        //Filtro CUILs duplicados
        const trabajadores = [...new Set(detalleCUIL)]
        //console.log('trabajadores: ' + JSON.stringify(trabajadores))
        return trabajadores.length
    }

    handleConfirmar(){
        this.setState({ loading: !this.state.loading })

        const props = this.state.internoFormulariosRAR

        ConfirmarFormularioRAR(props)
        .then(resp => {                            
            this.setState({ 
                loading: !this.state.loading
            })
            //console.log('[CargarFormularioRAR] - ConfirmarFormularioRAR - resp: ' + resp)
            switch(resp)
            {
                case true:
                    this.props.finalizaCarga()
                    break;

                case false:
                    break;

                default:
                    break;
            }
        })
    }

    
    render(){      
        //console.log('[CargarFormularioRAR] formularioRARGenerado: ' + JSON.stringify(this.props.formularioRARGenerado))
        //campos a cargar
        const CUIL = this.state.cuil === null ? '' : this.state.cuil
        const Nombre = this.state.nombre === null ? '' : this.state.nombre
        const SectorTarea = this.state.sectorTarea === null ? '' : this.state.sectorTarea
        const FechaIngreso = this.state.fechaIngreso === null ? '' : this.state.fechaIngreso
        const HorasExposicion = this.state.horasExposicion === null ? '' : parseInt(this.state.horasExposicion)
        const FechaUltimoExamenMedico = this.state.fechaUltimoExamenMedico === null ? '' : this.state.fechaUltimoExamenMedico
        const CodigoAgente = this.state.codigoAgente === null ? 40001 : this.state.codigoAgente

        //Disabled botones
        const disableBorrar = this.state.internoFormulariosRARDetalle !== null && this.state.internoFormulariosRARDetalle !== 0 ? false : true  
        const disableConfirma = this.cantidadTrabajadoresCargados() !== this.state.cantTrabajadoresExpuestos ? true : false

        //Cantidad trabajadores cargados
        //const cantidadTrabajadoresCargados = this.cantidadTrabajadoresCargados(this.state.formulariosRARDetalle)

        //Propiedades de la tabla
        //#region Columnas de la grilla
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
        const caption = 'Trabajadores cargados ' + this.cantidadTrabajadoresCargados(this.state.formulariosRARDetalle) + ' de ' + this.state.cantTrabajadoresExpuestos
        const CaptionElement = () => <h4 style=
        {{ 
            borderRadius: '0.25em', 
            textAlign: 'center', 
            color: '#000080',
            border: '1px solid purple', 
            padding: '0.5em' 
        }}>{caption}</h4>;        

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
        return ( 
            <div>
                {this.state.loading === true ?
                    <Spinner/>
                :                    
                    <>
                    {this.props.formularioRARGenerado[0].CantTrabajadoresExpuestos === 0 ?
                        <h3>Sin Trabajadores Expuestos</h3>
                    :
                        <>
                        <h3>Datos del Trabajador Expuesto</h3>
                        <form autoComplete="off" onSubmit={this.handleSubmit} className="form-datostrabajador">
                            <div>
                                {this.state.cuilValido === true ?
                                    <TextField
                                        required
                                        type="number"
                                        id="cuil"
                                        label="CUIL"
                                        defaultValue=""
                                        value={CUIL}
                                        variant="outlined"
                                        onChange={this.handleChangeCampos}                            
                                        margin="dense"
                                        disabled={this.state.trabajadorExiste}
                                        style={{ width: "10%", fontFamily: "sans-serif" }}  
                                        InputProps={{
                                            style: {fontSize: "12px"} 
                                        }}                              
                                        InputLabelProps={{ 
                                            shrink: true,                                       
                                            style: {
                                                fontSize: "14px",
                                                color: "blue",
                                            }
                                        }}
                                    />
                                :
                                    <TextField
                                        error
                                        required
                                        type="number"
                                        id="cuil"
                                        label="CUIL"
                                        defaultValue=""
                                        value={CUIL}
                                        variant="outlined"
                                        onChange={this.handleChangeCampos}                            
                                        margin="dense"
                                        disabled={this.state.trabajadorExiste}
                                        helperText="CUIL incorrecto/inexistente"
                                        style={{ width: "10%", fontFamily: "sans-serif"}}
                                        InputProps={{
                                            style: {fontSize: "12px"} 
                                        }}
                                        InputLabelProps={{
                                            shrink: true,
                                            style: {
                                                fontSize: "14px",
                                            }
                                        }}
                                    />
                                }                        
                                <TextField
                                    disabled
                                    id="nombre"
                                    label="Nombre"
                                    value={Nombre}
                                    defaultValue=""
                                    variant="outlined"                            
                                    margin="dense"
                                    style={{ width: "15%", fontFamily: "sans-serif"}}  
                                    InputProps={{
                                        style: {fontSize: "12px"} 
                                    }}
                                    InputLabelProps={{
                                        shrink: true,
                                        style: {
                                            fontSize: "14px",
                                            color: "blue",
                                            borderColor: "blue"
                                        }
                                    }}
                                />
                                <TextField
                                    required
                                    id="sectortarea"
                                    label="Sector/Tarea"
                                    value={SectorTarea}
                                    defaultValue=""
                                    variant="outlined"
                                    onChange={this.handleChangeCampos}                                
                                    margin="dense"      
                                    style={{ width: "11%", fontFamily: "sans-serif" }} 
                                    InputProps={{
                                        style: {fontSize: "12px"} 
                                    }}  
                                    InputLabelProps={{
                                        shrink: true,
                                        style: {
                                            fontSize: "14px",
                                            color: "blue",
                                        }
                                    }}             
                                />
                                <TextField
                                    required
                                    type="date"
                                    id="fechaingreso"  
                                    label="Ingreso"                          
                                    value={FechaIngreso}
                                    defaultValue=""
                                    variant="outlined"
                                    onChange={this.handleChangeCampos}
                                    InputLabelProps={{
                                        shrink: true,
                                        style: {
                                            fontSize: "14px",
                                            color: "blue",
                                            borderColor: "blue"
                                        }
                                    }}
                                    disabled={this.state.trabajadorExiste}
                                    margin="dense"
                                    style={{ width: "11%", fontFamily: "sans-serif" }}
                                    InputProps={{
                                        style: {fontSize: "12px"} 
                                    }}
                                />
                                <TextField
                                    required
                                    type="number"
                                    id="horasexposicion"
                                    label="Exposición"
                                    helperText="Horas"
                                    value={HorasExposicion}
                                    variant="outlined"
                                    onChange={this.handleChangeCampos}    
                                    margin="dense"                              
                                    style={{ width: "7%", fontFamily: "sans-serif"}}
                                    InputProps={{
                                        style: {fontSize: "12px"} 
                                    }}
                                    InputLabelProps={{
                                        shrink: true,
                                        style: {
                                            fontSize: "14px",
                                            color: "blue",
                                            borderColor: "blue"
                                        }
                                    }}  
                                />
                                <TextField
                                    required
                                    type="date"
                                    id="fechaultimoexamenmedico"   
                                    label="Ult. Examen Médico"                         
                                    value={FechaUltimoExamenMedico}
                                    variant="outlined"
                                    onChange={this.handleChangeCampos}
                                    InputLabelProps={{
                                        shrink: true,
                                        style: {
                                            fontSize: "14px",
                                            color: "blue",
                                            borderColor: "blue"
                                        }
                                    }}  
                                    margin="dense"
                                    disabled={this.state.trabajadorExiste}
                                    style={{ width: "11%", fontFamily: "sans-serif" }}
                                    InputProps={{
                                        style: {fontSize: "12px"} 
                                    }}
                                />
                                {this.state.errorAgente === false ?
                                    <TextField
                                        required
                                        select
                                        id="codigoagente"
                                        value={CodigoAgente}
                                        SelectProps={{
                                            native: true,
                                        }}
                                        label="Codigo Agente Riesgo"
                                        variant="outlined"
                                        onChange={event => this.handleChangeAgente(event.target)}
                                        InputLabelProps={{
                                            shrink: true,
                                            style: {
                                                fontSize: "14px",
                                                color: "blue",
                                                borderColor: "blue"
                                            }
                                        }}  
                                        margin="dense"
                                        style={{ width: "25%", fontFamily: "sans-serif" }}
                                        InputProps={{
                                            style: {fontSize: "12px"} 
                                        }}
                                    >                                            
                                        {this.state.refAgenteCausante.map(agente => {        
                                            return <option key={agente.Interno} value={agente.Codigo}>{agente.Codigo + ' - ' + agente.Descripcion}</option>
                                        })}
                                    </TextField>
                                :
                                    <TextField
                                        error
                                        required
                                        select
                                        id="codigoagente"
                                        value={CodigoAgente}
                                        SelectProps={{
                                            native: true,
                                        }}
                                        label="Codigo Agente Riesgo"
                                        variant="outlined"
                                        onChange={event => this.handleChangeAgente(event.target)}
                                        InputLabelProps={{
                                            shrink: true,
                                            style: {
                                                fontSize: "14px",                                            
                                            }
                                        }}  
                                        margin="dense"
                                        style={{ width: "25%", fontFamily: "sans-serif" }}
                                        InputProps={{
                                            style: {fontSize: "12px"} 
                                        }}
                                        helperText="Ya se cargó el Codigo de Agente al trabajador"
                                        FormHelperTextProps={{
                                            style: {
                                                fontSize: "10px",
                                            }
                                        }}
                                    >                                            
                                        {this.state.refAgenteCausante.map(agente => {        
                                            return <option key={agente.Interno} value={agente.Codigo}>{agente.Codigo + ' - ' + agente.Descripcion}</option>
                                        })}
                                    </TextField>
                                }
                            </div>
                        <Button variant="primary" type="submit" disabled={false}>Carga</Button>  
                        <Button variant="danger" onClick={this.handleBorrar} disabled={disableBorrar}>Borra</Button>
                        <Button variant="light" onClick={this.handleLimpiar} disabled={false}>Limpia</Button>
                        </form>
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
                    <Button variant="primary" onClick={this.handleConfirmar} disabled={disableConfirma}>Confirma</Button>  
                    </>
                }
            </div>
        )
        //#endregion
    }
}


export default CargarFormularioRAR;