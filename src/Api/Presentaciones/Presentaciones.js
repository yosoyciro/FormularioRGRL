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

