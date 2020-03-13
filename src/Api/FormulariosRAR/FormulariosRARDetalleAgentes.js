import Api from '../Api';

async function GuardarFormularioRARDetalleAgentes(props) {
    let ret = []
    //console.log('props: ' + JSON.stringify(props))
    try {
        ret = await Api.post(`FormulariosRARDetalleAgentes/Guardar`, props, {
            headers: {
                'Content-Type': 'application/json',
            }            
        })

        return ret.data
    }
    catch (error) {
        console.log('[GuardarFormularioRARDetalleAgentes]: ' + error);        
    }     
}

async function BorrarFormularioRARDetalleAgentes(props) {
    let ret = []
    //console.log('props: ' + JSON.stringify(props))
    try {
        ret = await Api.post(`FormulariosRARDetalle/Guardar`, props, {
            headers: {
                'Content-Type': 'application/json',
            }            
        })

        return ret.data
    }
    catch (error) {
        console.log('[BorrarFormularioRARDetalleAgentes]: ' + error);        
    }     
}

async function ConsultarFormularioRARDetalleAgentes(props) {
    try {
        console.log('ConsultarFormularioRARDetalleAgentes - props: ' + props)
        const response = await Api.get(`FormulariosRARDetalleAgentes/Consultar?pInternoFormulariosRARDetalle=${props}`)
        //console.log('response.data: ' + response.data)
        return response.data
    }
    catch (error) {
        console.log('[ConsultarFormularioRARDetalleAgentes]: ' + error);        
    }     
}

export {GuardarFormularioRARDetalleAgentes, BorrarFormularioRARDetalleAgentes, ConsultarFormularioRARDetalleAgentes};