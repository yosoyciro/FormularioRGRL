import Api from './Api';

async function CargarRespuestasConsulta(props) {
    //console.log('props: ' + props.internoFormulario + ' ' + props.internoEstablecimiento)
    try {
        const respForm = await Api.get(`RespuestasFormulario/TraerRespuestasConsulta?pInternoRespuestaFormulario=${props.internoRespuestasFormulario}`)
        //console.log('[CargarRespuestas] respForm.data ' + JSON.stringify(respForm.data))
        //console.log('[CargarRespuestas] Gremios ' + JSON.stringify(respForm.data.RespuestasGremio))
        return respForm.data
    }
    catch (error) {
        console.log('[CargarRespuestas] ' + error)
    }    
}

export default CargarRespuestasConsulta;