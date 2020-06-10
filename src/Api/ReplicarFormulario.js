import Api from './Api';

async function ReplicarFormulario(props) {   
    let ret = true

    try {
        //await Api.get(`RespuestasFormulario/ReplicarFormulario?pInternoFormulario=${props.internoFormulario}&pInternoEstablecimiento=${props.internoEstablecimiento}`)
        await Api.get(`RespuestasFormulario/ReplicarFormulario?pInternoFormulario=${props.internoFormulario}&pInternoEstablecimiento=${props.internoEstablecimiento}`)
        //console.log('[ReplicarFormulario] respForm.data ' + JSON.stringify(respForm.data))
        return ret
    }
    catch (error) {
        console.log('[ReplicarFormulario] ' + error)
        ret = false
    }  
    
    return ret
}

export default ReplicarFormulario;