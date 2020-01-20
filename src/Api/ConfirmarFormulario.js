import Api from './Api';

async function ConfirmarFormulario(props) {
    let ret = true
    //console.log('props: ' + JSON.stringify(props))
    try {
        await Api.post(`RespuestasFormulario/ConfirmarFormulario`, props, {
            headers: {
                'Content-Type': 'application/json',
            }            
        })
        .then(resp => resp.data)   
    }
    catch (error) {
        console.log('[ConfirmarFormulario]: ' + error);
        ret = false
    } 

    return ret
}

export default ConfirmarFormulario;