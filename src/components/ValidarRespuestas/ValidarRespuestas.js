import * as moment from 'moment';

async function ValidarRespuestas(secciones, preguntas, respuestasCuestionario, respuestasGremio, respuestasContratista, respuestasResponsable) {
    //Aqui devuelvo los errores
    let erroresRespuestas = []   
    
    //Copio las preguntas y secciones aqui
    const seccionesTodas = Object.values(secciones)
    const preguntasTodas = Object.values(preguntas)

    //Variables que necesito
    const fechaHoy = moment(new Date()).format('YYYY-MM-DD')

    //Recorro respuestas cuestionario
    respuestasCuestionario.map(respuesta => {        
        //Me paro sobre la pregunta        
        const preguntaAsociada = preguntasTodas.find(preg => preg.Interno === respuesta.InternoCuestionario)
        //console.log('preguntaAsociada: ' + preguntaAsociada.Interno)

        //Veo si la seccion tiene no aplica
        const seccionPregunta = seccionesTodas.find(seccion => seccion.Interno === preguntaAsociada.InternoSeccion)
        //console.log('seccionPregunta: ' + seccionPregunta.TieneNoAplica)

        const fechaRegularizacion = moment(respuesta.FechaRegularizacionNormal).format('YYYY-MM-DD')
        switch (parseInt(seccionPregunta.TieneNoAplica)) {
            case 1:
                /*if (respuesta.Respuesta === 'N')
                    console.log('fechaHoy: ' + fechaHoy + ' fechaRegularizacion: ' + fechaRegularizacion)*/

                if (respuesta.Respuesta === '')
                {
                    erroresRespuestas.push({InternoRespuestaCuestionario: respuesta.Interno, InternoCuestionario: preguntaAsociada.Interno, Pagina: seccionPregunta.Pagina})
                }

                if (respuesta.Respuesta === 'N' && fechaHoy > fechaRegularizacion)
                {                    
                    erroresRespuestas.push({InternoRespuestaCuestionario: respuesta.Interno, InternoCuestionario: preguntaAsociada.Interno, Pagina: seccionPregunta.Pagina})
                }
                break;
        
            default:
                break;
        } 

        return respuesta
    })    

    //Recorro respuestasGremio
    respuestasGremio.map(respGre => {
        if (respGre.Legajo === '' || respGre.Gremio === '')
            erroresRespuestas.push({InternoRespuestaCuestionario: respGre.Interno, InternoCuestionario: 0, Pagina: 40})

        return respGre
    })

    //Recorro respuestasContratista
    respuestasContratista.map(respCon => {
        if (respCon.CUIT === 0 || respCon.Contratista === '')
            erroresRespuestas.push({InternoRespuestaCuestionario: respCon.Interno, InternoCuestionario: 0, Pagina: 50})
            
        return respCon
    })

    //Recorro respuestasResponsable
    respuestasResponsable.map(respRes => {
        if (respRes.CUIT === 0 || respRes.Responsable === '' ||respRes.Representacion === '' || respRes.TituloHabilitante === '' || respRes.Matricula === '' || respRes.EntidadOtorganteTitulo === '')
            erroresRespuestas.push({InternoRespuestaCuestionario: respRes.Interno, InternoCuestionario: 0, Pagina: 60})
            
        return respRes
    })

    return erroresRespuestas
}

export default ValidarRespuestas;