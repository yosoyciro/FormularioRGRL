import Api from '../Api';

async function ReplicarFormulario(props) {      
    //const RespuestaFormulario = props.RespuestaFormulario
    //console.log('[ReplicarFormulario] RespuestaFormulario: ' + JSON.stringify(RespuestaFormulario)) 

    try {
        /*await Api.put(`RefEstablecimiento/Actualizar?pInternoEstablecimiento=${RespuestaFormulario.InternoEstablecimiento}`, props.refEstablecimientoActualizar, {
            headers: {
                'Content-Type': 'application/json',
            }            
        })*/

        const response = await Api.post(`RespuestasFormulario/ReplicarFormulario?pInternoRespuestaFormulario=${props.InternoRespuestaFormulario}&pInternoEstablecimientoDestino=${props.InternoEstablecimientoDestino}`, {
            headers: {
                'Content-Type': 'application/json',
            }            
        }) 

        return response
    }
    catch (error) {
        console.log('[ReplicarFormulario] ' + error)
    }  
}

export default ReplicarFormulario;