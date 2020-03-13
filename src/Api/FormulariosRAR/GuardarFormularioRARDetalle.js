import Api from '../Api';

async function GuardarFormularioRARDetalle(props) {
    let ret = []
    console.log('props: ' + JSON.stringify(props))
    try {
        ret = await Api.post(`FormulariosRARDetalle/Guardar`, props, {
            headers: {
                'Content-Type': 'application/json',
            }            
        })

        return ret.data
    }
    catch (error) {
        console.log('[GuardarFormulariosRAR]: ' + error);        
    }     
}

export default GuardarFormularioRARDetalle;