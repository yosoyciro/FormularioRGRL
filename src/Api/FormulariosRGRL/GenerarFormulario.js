import * as moment from 'moment';
import Api from '../Api';

export default async function GenerarFormulario(props) {
    //Fecha
    var today = new Date(), date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const fechaCreacion = date //moment(date).format('YYYY-MM-DD')
    const fechaCompletado = null //'1800-01-01T00:00:00'
    const notificacionFecha = moment(props.notificacionFecha).format('YYYY-MM-DD')

    //RespuestasCuestionario        
    let RespuestasCuestionario = []
    let indice = 1
    props.preguntas.map(pregunta => { 
        indice++
        const nuevaPregunta = {
            $id: indice,
            Interno: 0,
            InternoCuestionario: pregunta.Interno,
            InternoRespuestaFormulario: 0,
            Respuesta: '',
            FechaRegularizacion: 0,
            Observaciones: '',
            FechaRegularizacionNormal: '2000-01-01T00:00:00',
            EstadoAccion: 'A',
            EstadoFecha: 0, //Se convierte a fecha juliana en el API
            EstadoSituacion: ' ',
            BajaMotivo: 0
        }  	
        RespuestasCuestionario.push(nuevaPregunta)            
        return RespuestasCuestionario
    })

    //Genero RespuestasGremio
    let RespuestasGremio = []
    const cantGremios = parseInt(props.gremios)
    for (var i = 1; i <= cantGremios; i++) {
        indice++
        const nuevoGremio = {
            $id: indice,
            Interno: 0,
            InternoRespuestaFormulario: 0,
            Legajo: 0,
            Nombre: '',
            EstadoAccion: 'A',
            EstadoFecha: 0, //Se convierte a fecha juliana en el API
            EstadoSituacion: ' ',
            BajaMotivo: 0,
            Renglon: i
        }

        RespuestasGremio.push(nuevoGremio)
    }

    //Genero RespuestasContratista
    let RespuestasContratista = []
    const cantContratistas = parseInt(props.contratistas)
    for (var c = 1; c <= cantContratistas; c++) {
        indice++
        const nuevoContratista = {
            $id: indice,
            Interno: 0,
            InternoRespuestaFormulario: 0,
            CUIT: 0,
            Nombre: '',
            EstadoAccion: 'A',
            EstadoFecha: 0, //Se convierte a fecha juliana en el API
            EstadoSituacion: ' ',
            BajaMotivo: 0,
            Renglon: c
        }

        RespuestasContratista.push(nuevoContratista)
    }

    
    //Genero RespuestasResponsable
    let RespuestasResponsable = []
    console.log('this.props.cantResponsables: ' + props.responsables)
    const cantResponsables = parseInt(props.responsables)
    for (var r = 1; r <= cantResponsables; r++) {
        indice++
        const nuevoResponsable = {
            $id: indice,
            Interno: 0,
            InternoRespuestaFormulario: 0,
            CUIT: 0,
            Responsable: '',
            Cargo: 'R',
            Representacion: 0,
            EsContratado: 0,
            TituloHabilitante: '',
            Matricula: '',
            EntidadOtorganteTitulo: '',
            EstadoAccion: 'A',
            EstadoFecha: 0, //Se convierte a fecha juliana en el API
            EstadoSituacion: ' ',
            BajaMotivo: 0,
            Renglon: r
        }

        RespuestasResponsable.push(nuevoResponsable)
    }       

    //JSON final
    const RespuestaFormulario = {
        $id: 1,
        Interno: 0,
        InternoFormulario: props.internoFormulario,
        InternoEstablecimiento: props.internoEstablecimiento,
        CreacionFechaHora: null, //fechaCreacion,
        CompletadoFechaHora: null, //fechaCompletado,
        NotificacionFecha: notificacionFecha,
        RespuestasCuestionario,
        RespuestasGremio,
        RespuestasContratista,
        RespuestasResponsable
    } 
    
    console.log('[GenerarFormulario] RespuestaFormulario: ' + JSON.stringify(RespuestaFormulario))
    console.log('props.refEstablecimientoActualizar: ' + JSON.stringify(props.refEstablecimientoActualizar))

    try {
        await Api.put(`RefEstablecimiento/Actualizar?pInternoEstablecimiento=${props.internoEstablecimiento}`, props.refEstablecimientoActualizar, {
            headers: {
                'Content-Type': 'application/json',
            }            
        })

        const response = await Api.post(`RespuestasFormulario/GrabarRespuestasFormularios`, RespuestaFormulario, {
            headers: {
                'Content-Type': 'application/json',
            }            
        }) 
        return response.data
    }
    catch (error) {
        console.log('[GenerarFormulario] ' + error)
        return false
    }  
}