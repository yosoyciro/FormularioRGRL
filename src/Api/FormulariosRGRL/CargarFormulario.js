import Api from '../Api';

async function CargarFormulario(props) {   
    try {
        const respForm = await Api.get(`RespuestasFormulario/CargarFormulario?pInternoEstablecimiento=${props.internoEstablecimiento}&pInternoFormulario=${props.internoFormulario}`)
        
        return respForm.data
    }
    catch (error) {
        console.log('[CargarFormulario] ' + error)
    }   
}

export default CargarFormulario;