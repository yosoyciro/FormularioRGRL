import Api from './Api';

async function CargarSeccionesFormulario(props) {    
    try {
        const secc = await Api.get(`Secciones/ListarSeccionesFormulario?pInternoFormulario=${props}`)
        //console.log('[CargarSeccionesFormulario] secc: ' + secc.data)
        return secc.data
    }
    catch (error) {
        console.log('[CargarSeccionesFormulario] ' + error)
    } 

}

export default CargarSeccionesFormulario;