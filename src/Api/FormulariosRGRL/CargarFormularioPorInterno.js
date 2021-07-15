import Api from '../Api';

async function CargarFormularioPorInterno(props) {   
    try {
        const respForm = await Api.get(`RespuestasFormulario/CargarFormularioPorInterno?pInterno=${props}`)
        
        return respForm.data
    }
    catch (error) {
        console.log('[CargarFormularioPorInterno] ' + error)
    }   
}

export default CargarFormularioPorInterno;