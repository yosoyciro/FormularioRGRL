import Api from './Api';

async function CargarRespuestas(props) {
    console.log('[CargarRespuestas] props: ' + props.internoFormulario + ' ' + props.internoEstablecimiento)
    try {
        const respForm = await Api.get(`RespuestasFormulario/TraerRespuestas?pInternoFormulario=${props.internoFormulario}&pInternoEstablecimiento=${props.internoEstablecimiento}`)
        //console.log('[CargarRespuestas] respForm.data ' + JSON.stringify(respForm.data))
        //console.log('[CargarRespuestas] Gremios ' + JSON.stringify(respForm.data.RespuestasGremio))
        return respForm.data
    }
    catch (error) {
        console.log('[CargarRespuestas] ' + error)
    }    
}

export default CargarRespuestas;