import Api from '../Api';

async function CargarRespuestas(props) {
    //console.log('[CargarRespuestas] props: ' + props.internoFormulario + ' ' + props.internoEstablecimiento)
    try {
        const respForm = await Api.get(`RespuestasFormulario/TraerRespuestas?pInternoRespuestasFormulario=${props.internoRespuestasFormulario}`)
        
        return respForm.data
    }
    catch (error) {
        console.log('[CargarRespuestas] ' + error)
    }    
}

export default CargarRespuestas;