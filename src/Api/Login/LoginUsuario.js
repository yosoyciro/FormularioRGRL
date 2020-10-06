import Api from '../Api';

async function LoginUsuario(props) {
    //console.log('[Login - props]]: ' + JSON.stringify(props))
    
    try {
        const response = await Api.post(`Login/Login`, props, {
            headers: {
                'Content-Type': 'application/json',
            }            
        })
        //console.log('[Login] status ' + JSON.stringify(response))
        return response;
    }
    catch (error) {
        //console.log('[Login] error: ' + error)

        if (error.response) {
            console.log('client received an error response (5xx, 4xx) ' + JSON.stringify(error.response))
            return error.response;
        } else if (error.request) {
            console.log('client never received a response, or request never left')
        } else {
            console.log('anything else')
        }
    }    
}

export default LoginUsuario;