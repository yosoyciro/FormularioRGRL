import React, { Component, Fragment } from 'react';
import Api from '../Api/Api';
import { connect } from 'react-redux';
import Pregunta from '../components/Pregunta/Pregunta';
import Gremio from '../components/Formulario/Gremios/Gremio';
import Contratista  from '../components/Formulario/Contratistas/Contratista';
import Responsable  from '../components/Formulario/Responsables/Responsable';
import update from 'react-addons-update';
import * as moment from 'moment';
import CustomizedSnackbars from '../components/UI/Snackbar/Snackbar'
import ValidarRespuestas from '../components/ValidarRespuestas/ValidarRespuestas'
import Spinner from '../components/UI/Spinner'
import './FormularioA.css'
import BotonesFormulario from '../components/BotonesFormulario/BotonesFormulario';
import BotonesPagina from '../components/BotonesFormulario/BotonesPaginas';
import ConfirmarFormulario from '../Api/ConfirmarFormulario';
import { Redirect } from 'react-router-dom';
import ReplicarFormulario from '../Api/ReplicarFormulario';
import CargarRespuestas from '../Api/CargarRespuestas';

class FormularioA extends Component{     
    constructor(props) {
        super(props);
        this.handleGenerar = this.handleGenerar.bind(this);        
        this.handleRespuesta = this.handleRespuesta.bind(this);
        this.handleFechaRegularizacion = this.handleFechaRegularizacion.bind(this);

        this.handleCambioGremio = this.handleCambioGremio.bind(this);
        this.handleCambioContratista = this.handleCambioContratista.bind(this)
        this.handleCambioResponsablesTodo = this.handleCambioResponsablesTodo.bind(this)

        this.handleCambioPagina = this.handleCambioPagina.bind(this)
        this.handleConfirmar = this.handleConfirmar.bind(this)
        this.handleVerErrores = this.handleVerErrores.bind(this)

        this.state = {
            saving: true,
            generado: false,
            confirmado: false,
            cancelar: false,
            secciones: [],
            preguntas: [],
            respuestasFormulario: [],
            respuestasCuestionario: [],
            respuestasGremio: [],
            respuestasContratista: [],
            respuestasResponsable: [],                     
            pagina: 1, //siempre pagina 1 por defecto del form
            respuesta: '',
            collapse: false,            
            showSnackBar: false,
            mensajeSnackbar: '',
            severitySnackbar: '',
            cambioAlgo: false,
            erroresRespuestas: [],
            verErrores: false,
            hayErrores: false,
            //#region SnackbarErrores,
            showSnackbarErrores: false,
            //#endregion
        }
    }

    componentDidMount() {
        //Vengan las preguntontas        
        this.cargarDatos()        
    }

    //#region CargaDatos
    cargarDatos = async event => {
        this.setState({saving: true})
        try {                                 
            const secc = await Api.get(`Secciones/ListarSeccionesFormulario?pInternoFormulario=${this.props.formSel}`)
            this.setState({ secciones: secc.data });

            const preg = await Api.get(`Cuestionarios/ListarPorFormulario?pInternoFormulario=${this.props.formSel}`)
            this.setState({ preguntas: preg.data });      

            //console.log('(this.props.formEstado: ' + (this.props.estadoForm))
            if (this.props.estadoForm === '(En proceso de carga)')
                this.cargarRespuestas()   
        }
        catch (error) {
            console.log('cargarDatos: ' + error);
        }     

        finally {
            this.setState({saving: false})
        }
    }

    cargarRespuestas = async() => {
        const respuestasCuestionario = await CargarRespuestas({
            internoFormulario: this.props.formSel, 
            internoEstablecimiento: this.props.establecimientoSeleccionado
        })
        this.setState({ respuestasFormulario: respuestasCuestionario, 
            respuestasCuestionario: respuestasCuestionario.RespuestasCuestionario,
            respuestasGremio: respuestasCuestionario.RespuestasGremio,
            respuestasContratista: respuestasCuestionario.RespuestasContratista,
            respuestasResponsable: respuestasCuestionario.RespuestasResponsable,
            generado: !this.state.generado
        })                    
    }
            
    //#endregion

    //#region grabarFormulario 
    grabarFormulario = async event => {
        //JSON final       
        const RespuestasCuestionario = this.state.respuestasCuestionario
        const RespuestasGremio = this.state.respuestasGremio
        const RespuestasContratista = this.state.respuestasContratista
        const RespuestasResponsable = this.state.respuestasResponsable

        const RespuestaFormulario = {
            Interno: this.state.respuestasFormulario.Interno,
            InternoFormulario: this.state.respuestasFormulario.InternoFormulario,
            InternoEstablecimiento: this.state.respuestasFormulario.InternoEstablecimiento,
            CreacionFechaHora: this.state.respuestasFormulario.CreacionFechaHora,
            CompletadoFechaHora: "1800-01-01",
            RespuestasCuestionario,
            RespuestasGremio,
            RespuestasContratista,
            RespuestasResponsable
        }
        //console.log('Responsables ' + JSON.stringify(RespuestasResponsable))

        //console.log('JSON: ' + JSON.stringify(RespuestaFormulario))
        try {
            //const resp = await Api.post(`RespuestasFormulario/GrabarRespuestasFormularios`, RespuestaFormulario, {
            await Api.post(`RespuestasFormulario/GrabarRespuestasFormularios`, RespuestaFormulario, {
                headers: {
                    'Content-Type': 'application/json',
                }            
            })     
            //console.log(resp);   
            this.setState(
                {
                    showSnackBar: !this.state.showSnackBar,
                    severitySnackbar: "success",
                    mensajeSnackbar: 'Formulario guardado!'
                }
            )                            
        }
        catch (error) {
            //alert('Error creando formulario! ' + error)
            this.setState(
                {
                    showSnackBar: !this.state.showSnackBar,
                    severitySnackbar: "error",
                    mensajeSnackbar: 'Formulario no guardado!'
                }
            ) 
        }

        finally {
            this.setState({saving: false})
        }
        //this.cargarRespuestas()
    }
    //#endregion

    //#region Generar
    handleGenerar(event) {
        this.setState({saving: !this.state.saving})        
        
        switch (this.props.estadoForm)
        {
            case '(No generado)':
                this.generarFormulario();
                break;

            case '(Nueva instancia)':
                ReplicarFormulario({internoFormulario: this.props.formSel, internoEstablecimiento: this.props.establecimientoSeleccionado})
                .then(res => {                        
                    this.cargarRespuestas();
                    this.setState({
                        saving: false                        
                    });
                })
                break;

            default:
                break;
        }                
    }

    generarFormulario() {
        //Fecha
        var today = new Date(), date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        const fechaCreacion = moment(date).format('YYYY-MM-DDTHH:mm:ss')
        const fechaCompletado = '1800-01-01T00:00:00'

        //RespuestasCuestionario        
        let RespuestasCuestionario = []
        let indice = 1
        this.state.preguntas.map(pregunta => {
            indice++
            const nuevaPregunta = {
                $id: indice,
                Interno: 0,
                InternoCuestionario: pregunta.Interno,
                InternoRespuestaFormulario: 0,
                Respuesta: '',
                FechaRegularizacion: 0,
                Observaciones: '',
                FechaRegularizacionNormal: '2000-01-01T00:00:00'
            }  	
            RespuestasCuestionario.push(nuevaPregunta)            
            return RespuestasCuestionario
        })

        //Genero RespuestasGremio
        let RespuestasGremio = []
        const cantGremios = parseInt(this.props.cantGremios)
        for (var i = 1; i <= cantGremios; i++) {
            indice++
            const nuevoGremio = {
                $id: indice,
                Interno: 0,
                InternoRespuestaFormulario: 0,
                Legajo: '',
                Nombre: ''
            }

            RespuestasGremio.push(nuevoGremio)
        }

        //Genero RespuestasContratista
        let RespuestasContratista = []
        const cantContratistas = parseInt(this.props.cantContratistas)
        for (var c = 1; c <= cantContratistas; c++) {
            indice++
            const nuevoContratista = {
                $id: indice,
                Interno: 0,
                InternoRespuestaFormulario: 0,
                CUIT: 0,
                Nombre: ''
            }

            RespuestasContratista.push(nuevoContratista)
        }

        
        //Genero RespuestasResponsable
        let RespuestasResponsable = []
        console.log('this.props.cantResponsables: ' + this.props.cantResponsables)
        const cantResponsables = parseInt(this.props.cantResponsables)
        for (var r = 1; r <= cantResponsables; r++) {
            indice++
            const nuevoResponsable = {
                $id: indice,
                Interno: 0,
                InternoRespuestaFormulario: 0,
                CUIT: 0,
                Responsable: '',
                Cargo: 'R',
                Representacion: '',
                EsContratado: 0,
                TituloHabilitante: '',
                Matricula: '',
                EntidadOtorganteTitulo: ''
            }

            RespuestasResponsable.push(nuevoResponsable)
        }       

        //JSON final
        const RespuestaFormulario = {
            $id: 1,
            Interno: 0,
            InternoFormulario: this.props.formSel,
            InternoEstablecimiento: this.props.establecimientoSeleccionado,
            CreacionFechaHora: fechaCreacion,
            CompletadoFechaHora: fechaCompletado,
            RespuestasCuestionario,
            RespuestasGremio,
            RespuestasContratista,
            RespuestasResponsable
        }     

        Api.post(`RespuestasFormulario/GrabarRespuestasFormularios`, RespuestaFormulario, {
            headers: {
                'Content-Type': 'application/json',
            }            
        })     
        .then(res => {            
            this.cargarRespuestas()
            .then(res => {
                this.setState({
                    saving: !this.state.saving
                });
            })
            
        })
        
    }
    //#endregion

    //#region Confirmar
    handleConfirmar = async event => {
        //event.preventDefault()
        this.setState({
            saving: true,
            hayErrores: false,
            confirmado: true
        });        

        //Grabo el formulario
        await this.grabarFormulario()

        const erroresRespuestas = await ValidarRespuestas(this.state.secciones, this.state.preguntas, this.state.respuestasCuestionario, this.state.respuestasGremio, this.state.respuestasContratista, this.state.respuestasResponsable)
        this.setState({ erroresRespuestas: erroresRespuestas })
        if (this.state.erroresRespuestas.length > 0)
        {
            this.setState({
                hayErrores: true,
                severitySnackbar: "warning",
                mensajeSnackbar: 'Formulario guardado, pero no confirmado!'
            })
        }
        //console.log('JSON erroresRespuestas: ' + JSON.stringify(this.state.erroresRespuestas))

        //JSON final       
        const RespuestasCuestionario = this.state.respuestasCuestionario
        const RespuestasGremio = this.state.respuestasGremio
        const RespuestasContratista = this.state.respuestasContratista
        const RespuestasResponsable = this.state.respuestasResponsable

        const RespuestaFormulario = {
            Interno: this.state.respuestasFormulario.Interno,
            InternoFormulario: this.state.respuestasFormulario.InternoFormulario,
            InternoEstablecimiento: this.state.respuestasFormulario.InternoEstablecimiento,
            CreacionFechaHora: this.state.respuestasFormulario.CreacionFechaHora,
            CompletadoFechaHora: "1800-01-01",
            RespuestasCuestionario,
            RespuestasGremio,
            RespuestasContratista,
            RespuestasResponsable
        }
        if (this.state.erroresRespuestas.length === 0)
            if (await ConfirmarFormulario(RespuestaFormulario) === true)
                window.location.reload();
    }

    //#endregion

    //#region Cancelar
    handleCancelar = () => {
        this.setState({cancelar: true})
    }
    //#endregion

    //#region Renderizados
    paginaMostrar(gremios, responsables, contratistas) {
        const copiaSecciones = this.state.secciones.filter(seccion => seccion.Pagina === this.state.pagina)

        switch (this.state.pagina) {
            case 40:
                //Gremios
                return <div>
                    <h2>Gremios</h2>
                    <h4 style={{textAlign: "initial"}}>EN CASO DE CONTAR CON DELEGADOS GREMIALES INDIQUE EL N° DE LEGAJO CONFORME A LA INSCRIPCION EN EL MINISTERIO DE TRABAJO, EMPLEO Y SEGURIDAD SOCIAL</h4>
                    <a style={{display: "table-cell", fontSize: "initial"}} href="http://www.trabajo.gov.ar/left/sindicales/dnas2/Entidades/entidades.asp" target="_blank">(http://www.trabajo.gov.ar/left/sindicales/dnas2/Entidades/entidades.asp)</a>
                    {this.renderGremios()}
                </div>


            case 50:
                //Contratistas
                return <div>
                    <h2>Contratistas</h2>
                    {this.renderContratistas()}
                </div>

            case 60:
                //Responsables
                return <div>
                    <h2>Responsables</h2>
                    {this.renderResponsables()}
                </div>

            default: return <div>
                    {copiaSecciones.map(seccion => 
                        <div>
                        {/*<label key={seccion.Interno}>{seccion.Descripcion}</label>*/}
                        {seccion.Comentario !== '' ?
                            <label>Comentario: {seccion.Comentario}</label>
                        :
                            null
                        }
                        {this.renderPreguntas(seccion)}
                        </div>
                    )}
                    </div>
        }
    }

    renderGremios = () => {
        const GremiosList = this.state.respuestasGremio

        /*let gremiosRender = (        
            GremiosList.map(gremio =>
                <Gremio 
                    key={gremio.Interno} 
                    gremio={gremio}
                    cambioGremio={this.handleCambioGremio}
                />)
        )*/

        let gremiosRender = null
        gremiosRender = (
            <table className="gremios-table">
                <thead className="cabecera">
                    <tr>
                        <th className="cabecera-gremioslegajo">Legajo</th>
                        <th className="cabecera-gremiosgremio">Gremio</th>
                    </tr>
                </thead>
                <tbody>
                    {GremiosList.map(gremio =>
                    <Gremio 
                        key={gremio.Interno} 
                        gremio={gremio}
                        cambioGremio={this.handleCambioGremio}
                    />)}
                </tbody>
            </table>
        )
        return gremiosRender
    }

    renderContratistas = () => {
        const contratistasList = this.state.respuestasContratista

        let contratistasRender = null
        contratistasRender = (
            <table className="gremios-table">
                <thead className="cabecera">
                    <tr>
                        <th className="cabecera-gremioslegajo">CUIT</th>
                        <th className="cabecera-gremiosgremio">Contratista</th>
                        <th className="cabecera-verificar"></th>
                    </tr>
                </thead>
                <tbody>
                    {contratistasList.map(contratista =>
                    <Contratista 
                        key={contratista.Interno}                     
                        contratista={contratista}
                        cambioContratista={this.handleCambioContratista}
                    />)}
                </tbody>
            </table>
        )
        return contratistasRender
    }

    renderResponsables = () => {
        const responsablesList = this.state.respuestasResponsable

        let responsablesRender = null
        responsablesRender = (
            <table className="gremios-table">
                <thead className="cabecera">
                    <tr>
                        <th>CUIT/CUIL/CUIP</th>
                        <th>Nombre y apellido</th>
                        <th>Cargo</th>
                        <th>Representación</th>
                        <th>Propio/contratado</th>
                        <th>Título habilitante</th>
                        <th>N° matrícula</th>
                        <th>Entidad que otorgó el título habilitante</th>
                    </tr>
                </thead>
                <tbody>
                    {responsablesList.map(responsable =>
                    <Responsable 
                        key={responsable.Interno} 
                        id={responsable.Interno}
                        responsable={responsable}
                        entidadOtorganteTitulo={responsable.EntidadOtorganteTitulo}
                        cambioResponsablesTodo={this.handleCambioResponsablesTodo}
                    />)}
                </tbody>
            </table>
        )
        return responsablesRender
    }

    renderPreguntas = (seccion) => {
        const preguntasSeccion = this.state.preguntas.filter(pregunta => pregunta.InternoSeccion === seccion.Interno)                

        let preguntasRender = null
        switch (parseInt(seccion.TieneNoAplica)) {
            case 1:
                preguntasRender = (
                    <table className="formularioa-table">
                        <thead className="cabecera">
                            <tr>
                                <th className="cabecera-codigo">Nro</th>
                                <th className="cabecera-pregunta">{seccion.Descripcion}</th>
                                <th className="cabecera-select" style={{'border-inline-end-style': 'none'}}>Sí</th>
                                <th className="cabecera-select" style={{'border-inline-end-style': 'none'}}>No</th>
                                <th className="cabecera-select">No Aplica</th>
                                <th className="cabecera-fecha">Fecha de Regularización</th>
                                <th className="cabecera-comentario">Norma Vigente</th>                                                
                            </tr>
                        </thead>
                        <tbody>
                            {preguntasSeccion.map(pregunta => (
                                //console.log(pregunta.Pregunta)          
                                <Pregunta 
                                    key={pregunta.Interno} 
                                    pregunta={pregunta}
                                    tieneNoAplica={seccion.TieneNoAplica}
                                    respuesta={this.respuesta(pregunta)}
                                    fechaRegularizacion={this.fechaRegularizacion(pregunta)}
                                    internoRespuestaCuestionario={this.internoRespuestaCuestionario(pregunta)}
                                    cambioRespuesta={this.handleRespuesta}
                                    cambioFechaRegularizacion={this.handleFechaRegularizacion}
                                    error={this.tieneError(pregunta.Interno)}
                                />                                
                            ))}
                        </tbody>
                    </table>
                )
                break;

            case 0:
                preguntasRender = (
                    <table className="formularioa-table">
                        <thead className="cabecera">
                        {parseInt(seccion.Interno) === 37 || parseInt(seccion.Interno) === 101 || parseInt(seccion.Interno) === 120 ?
                            <tr>
                                <th className="cabecera-codigo">Cod</th>
                                <th className="cabecera-pregunta">{seccion.Descripcion}</th>
                                <th className="cabecera-select">Sí</th>
                                <th className="cabecera-comentario">Norma Vigente</th>                                                
                            </tr>
                        :
                            <tr>
                                <th className="cabecera-codigo">Cod</th>
                                <th className="cabecera-pregunta">{seccion.Descripcion}</th>
                                <th className="cabecera-select">Sí</th>                                         
                            </tr>
                        }
                        </thead>
                        <tbody>
                            {preguntasSeccion.map(pregunta => (       
                                <Pregunta 
                                    key={pregunta.Interno} 
                                    pregunta={pregunta}
                                    tieneNoAplica={seccion.TieneNoAplica}
                                    respuesta={this.respuesta(pregunta)}
                                    fechaRegularizacion={this.fechaRegularizacion(pregunta)}
                                    internoRespuestaCuestionario={this.internoRespuestaCuestionario(pregunta)}
                                    cambioRespuesta={this.handleRespuesta}
                                    cambioFechaRegularizacion={this.handleFechaRegularizacion}
                                    error={false}
                                />
                            ))}
                        </tbody>
                    </table>
                )
                break;

            default:
                break;
        }
        

        return preguntasRender
    }
    //#endregion

    //#region Handles RespuestasCuestionatrios
    handleFechaRegularizacion(fechaRegularizacion, interno) {
        //console.log('internoRespuestaCuestionario: ' + interno)
        console.log('handleFechaRegularizacion: ' + fechaRegularizacion)

        const respuestasCuestionario = this.state.respuestasCuestionario
        //console.log('respuestasCuestionario: ' + JSON.stringify(respuestasCuestionario))
        var commentIndex = respuestasCuestionario.findIndex(function(c) { 
            return c.Interno == interno; 
        });
        //console.log('commentIndex: ' + commentIndex)
        
        var updateRespuesta = update(respuestasCuestionario[commentIndex], {FechaRegularizacionNormal: {$set: fechaRegularizacion}})
        var newData = update(respuestasCuestionario, {
            $splice: [[commentIndex, 1, updateRespuesta]]
        });      
        this.setState({respuestasCuestionario: newData})
    }

    handleRespuesta(respuesta, interno) {
        //console.log('internoRespuestaCuestionario: ' + interno)
        //console.log('respuesta: ' + respuesta)

        const respuestasCuestionario = this.state.respuestasCuestionario
        //console.log('respuestasCuestionario: ' + JSON.stringify(respuestasCuestionario))
        var commentIndex = respuestasCuestionario.findIndex(function(c) { 
            return c.Interno == interno; 
        });
        //console.log('commentIndex: ' + commentIndex)
        
        var updateRespuesta = update(respuestasCuestionario[commentIndex], {Respuesta: {$set: respuesta}})
        var newData = update(respuestasCuestionario, {
            $splice: [[commentIndex, 1, updateRespuesta]]
        });      
        this.setState({respuestasCuestionario: newData})
        /*this.setState({
            respuestasCuestionario: update(this.state.respuestasCuestionario, {: {Respuesta: {$set: respuesta}}})
        })*/
    }
    //#endregion

    //#region handles Gremios
    handleCambioGremio(legajo, gremio, interno) {
        const respuestasGremio = this.state.respuestasGremio
        
        var commentIndex = respuestasGremio.findIndex(function(c) { 
            return c.Interno == interno; 
        });
        //console.log('commentIndex: ' + commentIndex)
        
        var updateRespuesta = update(respuestasGremio[commentIndex], {Legajo: {$set: legajo},
            Nombre: {$set: gremio}
        })
        var newData = update(respuestasGremio, {
            $splice: [[commentIndex, 1, updateRespuesta]]
        });      
        this.setState({respuestasGremio: newData})
    }    
    //#endregion

    //#region Handles Contratistas
    handleCambioContratista(interno, cuit, contratista) {
        const respuestasContratista = this.state.respuestasContratista
        
        var commentIndex = respuestasContratista.findIndex(function(c) { 
            return c.Interno == interno; 
        });
        //console.log('commentIndex: ' + commentIndex)
        
        var updateRespuesta = update(respuestasContratista[commentIndex], {CUIT: {$set: cuit},
            Contratista: {$set: contratista}
        })
        var newData = update(respuestasContratista, {
            $splice: [[commentIndex, 1, updateRespuesta]]
        });      
        this.setState({respuestasContratista: newData})
    }
    
    //#endregion

    //#region Handles Responsables
    handleCambioResponsablesTodo(interno, cuit, responsable, cargo, representacion, esContratado, tituloHabilitante, matricula, entidadOtorganteTitulo) {
        const respuestasResponsable = this.state.respuestasResponsable
        //console.log('CUIT: ' + cuit)
        
        var commentIndex = respuestasResponsable.findIndex(function(c) { 
            return c.Interno == interno; 
        });
        //console.log('commentIndex: ' + commentIndex)
        
        var updateRespuesta = update(respuestasResponsable[commentIndex], {CUIT: {$set: cuit}, 
            Responsable: {$set: responsable},
            Cargo: {$set: cargo},
            Representacion: {$set: representacion},
            EsContratado: {$set: esContratado},            
            TituloHabilitante: {$set: tituloHabilitante},
            Matricula: {$set: matricula},
            EntidadOtorganteTitulo: {$set: entidadOtorganteTitulo}
        })

        var newData = update(respuestasResponsable, {
            $splice: [[commentIndex, 1, updateRespuesta]]
        });      
        this.setState({respuestasResponsable: newData})
    }    
    //#endregion

    //#region Respuestas
    respuesta(pregunta) {        
        var respuestasCuestionario = this.state.respuestasCuestionario
        const respuesta = respuestasCuestionario.find(resp => resp.InternoCuestionario === pregunta.Interno)
        if (respuesta === null)
            return null
        else
            return respuesta.Respuesta
    }

    fechaRegularizacion(pregunta) {
        var respuestasCuestionario = this.state.respuestasCuestionario
        const respuesta = respuestasCuestionario.find(resp => resp.InternoCuestionario === pregunta.Interno)
        return respuesta.FechaRegularizacionNormal
    }

    internoRespuestaCuestionario(pregunta) {
        var respuestasFormulario = {...this.state.respuestasFormulario}

        const respuestas = respuestasFormulario.RespuestasCuestionario.find(resp => resp.InternoCuestionario === pregunta.Interno)
        return respuestas.Interno
    }
    //#endregion

    //#region Funciones
    tieneError(internoCuestionario) {
        //console.log('internoCuestionario: ' + internoCuestionario)
        var erroresRespuestas = this.state.erroresRespuestas
        //console.log('erroresRespuestas: ' + erroresRespuestas.length)
        if (erroresRespuestas.length > 0)
        {
            const respuestas = erroresRespuestas.find(resp => resp.InternoCuestionario === internoCuestionario)
            if (respuestas)
                return true 
            else
                return false
        }
        else
            return false
    }
    //#endregion

    //#region Handle cambio paginas
    handleCambioPagina = (pagina) => {
        console.log('[cambioPagina] pagina: ' + pagina)
        this.setState({
            pagina: parseInt(pagina),
            saving: true
        })

        //Guardo los resultados
        this.grabarFormulario()
    }

    //#endregion

    //#region handleVerErrores
    handleVerErrores() {
        this.setState({verErrores: !this.state.verErrores})
    }
    //#endregion

    //#region Render
    render() {
        let handleCerrarSnackbar=() => this.setState({showSnackBar: false})
        const disabledGenerar = this.state.generado === true ? true : false
        const disabledCancelar = false //this.state.generado === true ? true : false                      
        const disabledConfirmar = this.state.generado === false ? true : false

        if (this.state.cancelar === true) {
            return <Redirect to='/ConsultaFormularios/' />
        }

        return <div className="container">
            {this.state.saving === true ?
                <Spinner />
            :
                <Fragment>
                    <BotonesFormulario
                        disabledGenerar={disabledGenerar}
                        onDisabledGenerar={this.handleGenerar}
                        disabledCancelar={disabledCancelar}
                        onDisabledCancelar={this.handleCancelar}
                        disabledConfirmar={disabledConfirmar}
                        onDisabledConfirmar={this.handleConfirmar}
                    />                                               
                    {(this.state.generado) === true ?
                        <>
                            <BotonesPagina 
                                confirmado={this.state.confirmado}
                                erroresRespuestas={this.state.erroresRespuestas}
                                pagina={this.state.pagina}
                                cambioPagina={this.handleCambioPagina}
                            />
                            {this.state.pagina >= 1 && this.state.pagina <= 8 ?
                                <h3>CONDICIONES A CUMPLIR</h3>
                            :
                                null
                            }
                            {this.paginaMostrar(this.props.cantGremios, this.props.cantResponsables, this.props.cantContratistas)}
                        </>
                    :
                        null
                    }
                    {this.state.showSnackBar === true ?
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
                </Fragment>  
            }
        </div>
    }
    //#endregion
}

const mapStateToProps = state => {
    return {
        formSel: state.form.formSeleccionado,
        cantGremios: state.form.cantGremios,
        cantContratistas: state.form.cantContratistas,
        cantResponsables: state.form.cantResponsables,
        estadoForm: state.form.estado,
        establecimientoSeleccionado: state.establecimiento.interno  
    };
}

export default connect(mapStateToProps, null) (FormularioA);