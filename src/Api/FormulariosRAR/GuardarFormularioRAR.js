import Api from '../Api';

async function GuardarFormularioRAR(props) {
    let ret = []
    //console.log('props: ' + JSON.stringify(props))
    try {
        const response = await Api.post(`FormulariosRAR/Guardar`, props, {
            headers: {
                'Content-Type': 'application/json',
            }                        
        })  
        return response.data
    }
    catch (error) {
        console.log('[GuardarFormulariosRAR]: ' + error);        
    } 

    return ret
}

export default GuardarFormularioRAR;