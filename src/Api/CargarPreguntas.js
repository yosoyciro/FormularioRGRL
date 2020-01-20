import Api from './Api';

async function CargarPreguntas(props) {    
    try {
        const preg = await Api.get(`Cuestionarios/ListarPorFormulario?pInternoFormulario=${props}`)
        return preg.data
    }
    catch (error) {
        console.log('[CargarSeccionesFormulario] ' + error)
    } 

}

export default CargarPreguntas;

