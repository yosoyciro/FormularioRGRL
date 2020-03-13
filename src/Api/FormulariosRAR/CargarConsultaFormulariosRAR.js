import Api from '../Api';

async function CargarConsultaFormulariosRAR() {
    try {
        const response = await Api.get(`FormulariosRARCargados/ConsultarCargados`)
        //console.log('response.data: ' + response.data)
        return response.data
    }

    catch (error) {
        console.log('[CargarConsultaFormularios] ' + error)
    }    
}

export default CargarConsultaFormulariosRAR;