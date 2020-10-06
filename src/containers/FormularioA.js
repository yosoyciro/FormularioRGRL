import React, { Component, Fragment } from 'react';
import Api from '../Api/Api';
import Pregunta from '../components/Pregunta/Pregunta';
import RenderizarContratistas  from '../components/Formulario/Contratistas/RenderizarContratistas';
import update from 'react-addons-update';
//import * as moment from 'moment';
import CustomizedSnackbars from '../components/UI/Snackbar/Snackbar'
import ValidarRespuestas from '../components/ValidarRespuestas/ValidarRespuestas'
import Spinner from '../components/UI/Spinner'
import './FormularioA.css'
import BotonesFormulario from '../components/BotonesFormulario/BotonesFormulario';
import BotonesPagina from '../components/BotonesFormulario/BotonesPaginas';
import ConfirmarFormulario from '../Api/ConfirmarFormulario';
import { Redirect } from 'react-router-dom';
import ReplicarFormulario from '../Api/FormulariosRGRL/ReplicarFormulario';
import CargarRespuestas from '../Api/FormulariosRGRL/CargarRespuestas';
import GenerarFormulario from '../Api/FormulariosRGRL/GenerarFormulario';
import RenderizarGremios from '../components/Formulario/Gremios/RenderizarGremios';
import RenderizarResponsables from '../components/Formulario/Responsables/RenderizarResponsables';
import CargarFormulario from '../Api/FormulariosRGRL/CargarFormulario';

export default class FormularioA extends Component{     
    constructor(props) {
        super(props);
        this.handleGenerar = this.handleGenerar.bind(this);        
        this.handleRespuesta = this.handleRespuesta.bind(this);
        this.handleRespuestaColumna = this.handleRespuestaColumna.bind(this);
        this.handleFechaRegularizacion = this.handleFechaRegularizacion.bind(this);

        this.handleCambioGremio = this.handleCambioGremio.bind(this);
        this.handleCambioContratista = this.handleCambioContratista.bind(this)
        this.handleCambioResponsable = this.handleCambioResponsable.bind(this)

        this.handleCambioPagina = this.handleCambioPagina.bind(this)
        this.handleConfirmar = this.handleConfirmar.bind(this)
        //this.handleVerErrores = this.handleVerErrores.bind(this)

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
            paginas: [],
            //#endregion
        }
    }

    componentDidMount() {
        this.setState({saving: true}) 
        this.cargarDatos() 
        .then(res => {
            this.setState({saving: false}) 
        })       
    }

    //#region CargaDatos
    cargarDatos = async event => {        
        console.log('[FormularioA] - cargarDatos - formularioRGRL: ' + JSON.stringify(this.props.formularioRGRL) + ' - internoRespuestaFormulario: ' + this.props.internoRespuestasFormulario)
        try {                                 
            const secc = await Api.get(`Secciones/ListarSeccionesFormulario?pInternoFormulario=${this.props.formularioRGRL.value}`)
            //cargar un array de paginas para pasarlo a BotonesPaginas
            const paginasSecciones = secc.data.map(seccion => {
                return seccion.Pagina
            })

            const paginas = [...new Set(paginasSecciones)]
            this.setState({
                secciones: secc.data,
                paginas
            });

            const preg = await Api.get(`Cuestionarios/ListarPorFormulario?pInternoFormulario=${this.props.formularioRGRL.value}`)
            this.setState({ preguntas: preg.data });      

            //console.log('(this.props.estado: ' + (this.props.formularioRGRL.estado))
            if (this.props.formularioRGRL.estado === '(En proceso de carga)')
            {
                this.setState({ loading: !this.state.saving })
                /*this.cargarRespuestas(this.props.internoRespuestasFormulario)
                .then(res => (
                    this.setState({ loading: !this.state.saving })
                )) */
                CargarRespuestas({ internoRespuestasFormulario: this.props.internoRespuestasFormulario })  
                .then(response => {   
                    //console.log('[FormularioA] - response: ' + JSON.stringify(response))                 
                    this.setState({ respuestasFormulario: response, 
                        respuestasCuestionario: response.RespuestasCuestionario,
                        respuestasGremio: response.RespuestasGremio,
                        respuestasContratista: response.RespuestasContratista,
                        respuestasResponsable: response.RespuestasResponsable,
                        generado: !this.state.generado,
                        loading: !this.state.saving
                    })  
                })                
            }
                
        }
        catch (error) {
            console.log('cargarDatos: ' + error);
        }             
    }

    cargarRespuestas = async(internoRespuestasFormulario) => {
        const respuestasCuestionario = await CargarRespuestas({ internoRespuestasFormulario: internoRespuestasFormulario })
        if (respuestasCuestionario !== null)
        {
            this.setState({ respuestasFormulario: respuestasCuestionario, 
                respuestasCuestionario: respuestasCuestionario.RespuestasCuestionario,
                respuestasGremio: respuestasCuestionario.RespuestasGremio,
                respuestasContratista: respuestasCuestionario.RespuestasContratista,
                respuestasResponsable: respuestasCuestionario.RespuestasResponsable,
                generado: !this.state.generado
            })  
        }                  
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
            CompletadoFechaHora: null,
            NotificacionFecha: this.state.respuestasFormulario.NotificacionFecha,
            RespuestasCuestionario,
            RespuestasGremio,
            RespuestasContratista,
            RespuestasResponsable
        }
        //console.log('Responsables ' + JSON.stringify(RespuestasResponsable))

        //console.log('[FormularioA] GrabarFormulario JSON: ' + JSON.stringify(RespuestaFormulario))
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
    }
    //#endregion

    //#region Generar / Replicar
    handleGenerar(event) {
        this.setState({saving: !this.state.saving})        
        
        switch (this.props.formularioRGRL.estado)
        {
            case '(No generado)':
                GenerarFormulario({
                    internoFormulario: this.props.formularioRGRL.value,
                    internoEstablecimiento: this.props.internoEstablecimiento,
                    notificacionFecha: this.props.notificacionFecha,
                    preguntas: this.state.preguntas,
                    gremios: this.props.formularioRGRL.gremios,
                    contratistas: this.props.formularioRGRL.contratistas,
                    responsables: this.props.formularioRGRL.responsables,
                    refEstablecimientoActualizar: {
                        Superficie: this.props.superficie,
                        CantTrabajadores: this.props.cantTrabajadores
                    }
                })
                .then(res => { 
                    CargarRespuestas({ internoRespuestasFormulario: res })
                        .then(response => {
                            this.setState({ respuestasFormulario: response, 
                                respuestasCuestionario: response.RespuestasCuestionario,
                                respuestasGremio: response.RespuestasGremio,
                                respuestasContratista: response.RespuestasContratista,
                                respuestasResponsable: response.RespuestasResponsable,
                                generado: !this.state.generado,
                                saving: false
                            })  
                        })                                                         
                })
                break;

            case '(Nueva instancia)':
                //Cuando es una Nueva Instancia, se cargan las respuestas del formulario confirmado
                //Se replica el form enun juego de datos nuevo
                //Se cargan las respuestas del nuevo formulario generado
                //Obtengo el Interno de la tabla RespuestasFormulario
                CargarFormulario({ 
                    internoEstablecimiento: this.props.internoEstablecimiento,
                    internoFormulario: this.props.formularioRGRL.value
                })
                .then(respForm => {
                    CargarRespuestas({ internoRespuestasFormulario: respForm.Interno })
                    .then(response => {      
                        //console.log('[FormularioA] response ' + JSON.stringify(response))               
                        ReplicarFormulario({ 
                            RespuestaFormulario: response,
                            notificacionFecha: this.props.notificacionFecha,
                            refEstablecimientoActualizar: {
                                Superficie: this.props.superficie,
                                CantTrabajadores: this.props.cantTrabajadores
                            }
                        })
                        .then(res => {    
                            //console.log('[FormularioA] - res: ' + JSON.stringify(res))                    
                            CargarRespuestas({ internoRespuestasFormulario: res.Interno })
                            .then(response => {
                                this.setState({ respuestasFormulario: response, 
                                    respuestasCuestionario: response.RespuestasCuestionario,
                                    respuestasGremio: response.RespuestasGremio,
                                    respuestasContratista: response.RespuestasContratista,
                                    respuestasResponsable: response.RespuestasResponsable,
                                    generado: !this.state.generado,
                                    saving: false
                                })  
                            })
                            
                        })
                    })        
                })
                                        
                break;

            default:
                break;
        }                
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
            CompletadoFechaHora: null, //lo maneja el server
            NotificacionFecha: this.state.respuestasFormulario.NotificacionFecha,
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
    paginaMostrar = (gremios, responsables, contratistas) => {
        const copiaSecciones = this.state.secciones.filter(seccion => seccion.Pagina === this.state.pagina)

        switch (this.state.pagina) {
            case 40:
                //Gremios
                return <RenderizarGremios
                    gremios={this.state.respuestasGremio}
                    esConsulta={false}
                    cambioGremio={this.handleCambioGremio}
                />

            case 50:
                //Contratistas
                return <RenderizarContratistas
                    contratistas={this.state.respuestasContratista}
                    esConsulta={false}
                    cambioContratista={this.handleCambioContratista}
                />

            case 60:
                //Responsables
                return <RenderizarResponsables
                    responsables={this.state.respuestasResponsable}
                    esConsulta={false}
                    cambioResponsable={this.handleCambioResponsable}
                />

            default: return <div>
                    {copiaSecciones.map(seccion => 
                        <div>
                        {seccion.Comentario !== '' ?
                            seccion.Comentario.split(".,").map(comentario =>
                                <p className="comentario">{comentario}</p>
                            )
                        :
                            null
                        }
                        {this.renderPreguntas(seccion)}
                        </div>
                    )}
                    </div>
        }
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
                                *<th className="cabecera-select" style={{'border-inline-end-style': 'none'}}>Sí</th>
                                {/*<th className="cabecera-select" style={{'border-inline-end-style': 'none'}}>
                                    <button type="button" onClick={() => this.handleRespuestaColumna(preguntasSeccion)}>Sí</button>
                                </th>*/}
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
                                <th className="cabecera-codigo">Código</th>
                                <th className="cabecera-pregunta">{seccion.Descripcion}</th>
                                <th className="cabecera-select">Sí/No</th>
                                <th className="cabecera-comentario">Norma Vigente</th>                                                
                            </tr>
                        :
                            <tr>
                                <th className="cabecera-codigo">Código</th>
                                <th className="cabecera-pregunta">{seccion.Descripcion}</th>
                                <th className="cabecera-select">Sí/No</th>                                         
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
        //console.log('handleFechaRegularizacion: ' + fechaRegularizacion)

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
        console.log('internoRespuestaCuestionario: ' + interno)
        console.log('respuesta: ' + respuesta)

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

    handleRespuestaColumna(preguntasSeccion, columna) {
        //const respuestasCuestionario = this.state.respuestasCuestionario
        //console.log('respuestasCuestionario: ' + JSON.stringify(respuestasCuestionario))
        //var respuestasSeccion = respuestasCuestionario.filter(respuesta => respuesta.Seccion === seccion.Interno)
        console.log('preguntasSeccion: ' + JSON.stringify(preguntasSeccion))
        preguntasSeccion.map(pregunta => this.handleRespuesta('S', pregunta.Interno))
        
        /*var updateRespuesta = update(respuestasCuestionario[commentIndex], {Respuesta: {$set: respuesta}})
        var newData = update(respuestasCuestionario, {
            $splice: [[commentIndex, 1, updateRespuesta]]
        });      
        this.setState({respuestasCuestionario: newData})*/
    }
    //#endregion

    //#region handles Gremios, Contratistas y Responsables
    handleCambioGremio(gremio) {            
        this.setState({respuestasGremio: gremio})
    }

    handleCambioContratista(contratista) {    
        this.setState({respuestasContratista: contratista})
    }
    
    handleCambioResponsable(responsable) {      
        this.setState({respuestasResponsable: responsable})
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

    //#region Render
    render() {
        let handleCerrarSnackbar=() => this.setState({showSnackBar: false})
        const disabledGenerar = this.state.generado === true ? true : false
        const disabledCancelar = false //this.state.generado === true ? true : false                      
        const disabledConfirmar = this.state.generado === false ? true : false

        if (this.state.cancelar === true) {
            return <Redirect to='/ConsultaFormulariosRGRL/' />
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
                                paginas={this.state.paginas}
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

//export default FormularioA;