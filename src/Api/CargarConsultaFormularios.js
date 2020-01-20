import Api from './Api';

async function CargarConsultaFormularios() {
    try {
        const response = await Api.get(`FormulariosCargados/Consultar`)
        //console.log('response.data: ' + response.data)
        return response.data
    }

    catch (error) {
        console.log('[CargarConsultaFormularios] ' + error)
    }    
}

export default CargarConsultaFormularios;