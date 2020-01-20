import Api from './Api';

async function BuscarPersona(props) {
    console.log('[BuscarPersona - props.CUIT]]: ' + props.CUIT)
    let respuesta = []
    let encontro = false

    //Primero busco en ReferentesDatos
    try {
        const referenteDatos = await Api.get(`ReferenteDatos/ListarPorCuit?pCuit=${props.CUIT}`)       
        //console.log('referenteDatos.data: ' + )
        const personaReferente = referenteDatos.data

        personaReferente.map(referente => {
            console.log(' referente.Interno: ' + referente.Interno)
            encontro = true;
            respuesta.push({id: referente.Interno, razonSocial:referente.RazonSocial})

            return referente
        })          

        //Si no econtro referentes datos y le indico que busque en AFIP
        if (encontro === false && props.BuscarEnAFIP === true)
        {
            const response = await Api.get(`Padron/ConsultaPadron?pCUIT=${props.CUIT}`)
            console.log(response.data.Apellido); 
            if (response.data.IdPersona !== 0)
            {
                encontro = true
                respuesta.push({id: response.data.IdPersona, razonSocial: response.data.Apellido + ' ' + response.data.Nombre})
            }                    
        }
    }

    catch (error) {
        console.log('BuscarPersona: ' + error)
    }
          
    if (encontro === false && props.BuscarEnAFIP === false)
        respuesta.push({id: 0, razonSocial: 'No existe Razon Social'})
    else
        respuesta.push({id: 0, razonSocial: ''})
        
    return respuesta
}

export default BuscarPersona;