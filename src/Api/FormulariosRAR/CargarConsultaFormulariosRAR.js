import Api from '../Api';

async function CargarConsultaFormulariosRAR(props) {
    try {
        const response = await Api.get(`FormulariosRARCargados/ConsultarCargados?pCUIT=${props}`)
        //console.log('response.data: ' + response.data)
        return response.data
    }

    catch (error) {
        console.log('[CargarConsultaFormularios] ' + error)
    }    
}

export default CargarConsultaFormulariosRAR;