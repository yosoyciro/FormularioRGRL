import Api from '../Api';

async function ReplicarFormulario(props) {   
    try {
        const response = await Api.post(`RespuestasFormulario/ReplicarFormulario`, props.RespuestaFormulario, {
            headers: {
                'Content-Type': 'application/json',
            }            
        }) 

        return response.data
    }
    catch (error) {
        console.log('[ReplicarFormulario] ' + error)
    }  
}

export default ReplicarFormulario;