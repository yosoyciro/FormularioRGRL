import Api from '../Api';

async function ConsultarRefAgenteCausante(props) {
    try {        
        const response = await Api.get(`RefAgenteCausante/Consultar`)
        //console.log('response.data: ' + response.data)
        return response.data
    }

    catch (error) {
        console.log('[ConsultarRefAgenteCausante] ' + error)
    }    
}

export default ConsultarRefAgenteCausante;