import Api from '../Api';

async function FormulariosVerificarDuplicado(props) {   
    try {
        const respForm = await Api.get(`RespuestasFormulario/VerificarDuplicado?pInternoEstablecimiento=${props.internoEstablecimiento}&pInternoFormulario=${props.internoFormulario}`)
        
        return respForm.data
    }
    catch (error) {
        console.log('[FormulariosVerificarDuplicado] ' + error)
    }   
}

export default FormulariosVerificarDuplicado;