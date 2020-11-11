import Api from '../Api';

async function ReferenteDatos(props) {   
    console.log('[ReferenteDatos] CUIT: ' + props) 
    try {
        const preg = await Api.get(`ReferenteDatos/ListarPorCuit?pCuit=${props}`)
        return preg.data
    }
    catch (error) {
        console.log('[ReferenteDatos] ' + error)
    } 

}

export default ReferenteDatos;

