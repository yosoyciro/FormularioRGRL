import Api from './Api';

async function CargarConsultaFormularios(props) {
    try {
        const response = await Api.get(`FormulariosCargados/Consultar?pCuit=${props.CUIT}&pInternoPresentacion=${props.InternoPresentacion}`)
        //console.log('response.data: ' + response.data)
        return response.data
    }

    catch (error) {
        console.log('[CargarConsultaFormularios] ' + error)
    }    
}

export default CargarConsultaFormularios;