import Api from '../Api';

async function ConfirmarFormularioRAR(props) {
    console.log('props: ' + JSON.stringify(props))    
    try {
        const response = await Api.post(`FormulariosRAR/Confirmar?pInternoFormulariosRAR=${props}`, {
            headers: {
                'Content-Type': 'application/json',
            }                              
        })     
        console.log('[ConfirmarFormularioRAR] - response: ' + response.status + ' - ' + response.statusText)
        switch(response.status)
        {
            case 200:
                return true
    
            default:
                return false
        }       
    }

    catch(error) {
        console.log('[ConfirmarFormularioRAR] - error: ' + error)
        return false;
    }
    
    
}

export {ConfirmarFormularioRAR};