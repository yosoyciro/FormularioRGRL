import Api from '../Api';

async function CantidadTrabajadores(props) {
    //console.log('props: ' + JSON.stringify(props))
    try {
        const response = await Api.get(`FormulariosRARDetalle/CantidadTrajabadores?pInternoFormulariosRAR=${props}`)
        //console.log('response.data: ' + response.data)
        return response.data
    }
    catch (error) {
        console.log('[FormularioRARDetalle] - CantidadTrabajadores: ' + error);        
    }     
}

export {CantidadTrabajadores};