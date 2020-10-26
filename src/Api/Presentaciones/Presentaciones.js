import Api from '../Api';

export async function PresentacionesListar(data) {    
    try {
        const response = await Api.get(`Presentaciones/Listar?pCUIT=${data}`)
        return response.data
    }
    catch (error) {
        console.log('[Presentaciones] ' + error)
    } 

}

export async function PresentacionesGenerar(data) {
    try {
        const response = await Api.post(`Presentaciones/Generar`, data, {
            headers: {
                'Content-Type': 'application/json',
            }            
        })
        return response.data;   
    }
    catch (error) {
        console.log('[Presentaciones]: ' + error);
        return false
    } 
}

export async function PresentacionesValidar(data) {
    try {
        const response = await Api.get(`Presentaciones/VerificarPresentacion?pCUIT=${data.CUIT}&pNombre=${data.Nombre}`, {
            headers: {
                'Content-Type': 'application/json',
            }            
        })
        return response.data;   
    }
    catch (error) {
        console.log('[Presentaciones]: ' + error);
        return false
    } 
}

export async function PresentacionesVerificarCompletados(data) {
    try {
        const response = await Api.get(`Presentaciones/VerificarCompletados?pCUIT=${data.CUIT}&pTipo=${data.Tipo}`, {
            headers: {
                'Content-Type': 'application/json',
            }            
        })
        return response.data;   
    }
    catch (error) {
        console.log('[Presentaciones]: ' + error);
        return false
    } 
}
