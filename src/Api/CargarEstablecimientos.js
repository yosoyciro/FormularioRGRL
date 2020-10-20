import Api from './Api';

export async function CargarEstablecimientos(props) {
    let respuestaEstablecimientos = []
    //console.log('[CargarEstablecimientos] opcion: ' + props.opcion + ' - cuit: ' + props.cuit + ' - internoEstbalecimiento: ' + props.internoEstablecimiento)
    try {
        switch (parseInt(props.opcion)) {
            case 0:
                //console.log('[CargarEstablecimientos] 0')
                const responseCUIT = await Api.get(`RefEstablecimiento/ListarPorCuit?pCuit=${props.cuit}`)
                /*responseCUIT.data.map(establecimiento => {
                    //console.log('response.data: ' + formulario.Descripcion) 
                    const isDisabled = false //formulario.Estado === '(Confirmado)' ? true : false
                    respuestaEstablecimientos.push({value: establecimiento.Interno, label: establecimiento.Nombre , isDisabled: isDisabled })
        
                    return respuestaEstablecimientos
                })    */
                return responseCUIT.data;            
                //break;

            case 1:
                //console.log('[CargarEstablecimientos] 1')
                const responseInterno = await Api.get(`RefEstablecimiento/ListarPorInterno?pInternoEstablecimiento=${props.internoEstablecimiento}`) 
                console.log('responseInterno: ' + JSON.stringify(responseInterno.data.Interno))
                const isDisabled = false //formulario.Estado === '(Confirmado)' ? true : false
                respuestaEstablecimientos.push({value: responseInterno.data.Interno, label: responseInterno.data.Nombre , isDisabled: isDisabled })
                
                return responseInterno.data; //respuestaEstablecimientos                

            default:
                break;
        }                
    }
    catch (error) {
        console.log('[CargarEstablecimientos]: ' + error);
        respuestaEstablecimientos.push({value: 0, label: 'Error cargando establecimientos', isDisabled: true })
    } 
    //respuestaFormularios.map(form => console.log('form: ' + form.Descripcion))
    //console.log('respuestaFormularios: ' + respuestaFormularios)
    return respuestaEstablecimientos
}

export async function CargarEstablecimientosReplica(props) {
    //console.log('[CargarEstablecimientos] opcion: ' + props.opcion + ' - cuit: ' + props.cuit + ' - internoEstbalecimiento: ' + props.internoEstablecimiento)
    try {
            //console.log('[CargarEstablecimientos] 0')
            const response = await Api.get(`RefEstablecimiento/ListarParaReplica?pCuit=${props.cuit}&?pInternoEstablecimiento=${props.internoEstablecimiento}`)
            return response.data;                        
                      
    }
    catch (error) {
        console.log('[CargarEstablecimientos]: ' + error);
    } 
}

//export default CargarEstablecimientos;