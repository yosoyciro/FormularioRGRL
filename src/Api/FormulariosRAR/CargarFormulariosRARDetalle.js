import Api from '../Api';

async function CargarFormulariosRARDetalle(props) {
    try {  
        console.log('CargarFormulariosRARDetalle - props: ' + props)
        const response = await Api.get(`FormulariosRARDetalle/Consultar?pInternoFormularioRAR=${props}`)
        //console.log('response.data: ' + response.data)
        return response.data
    }

    catch (error) {
        console.log('[CargarFormulariosRARDetalle] ' + error)
    }    
}

export default CargarFormulariosRARDetalle;