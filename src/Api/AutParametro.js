import Api from './Api';
import moment from "moment";

export async function BuscarParametro(props) {    
    try {
        const res = await Api.get(`AutParametro/Buscar?pParametro=${props}`)
        //console.log('[BuscarParametro] ' + res.data)
        if (res.data === null) {
            return null
        }
        else {
            const esValido = await ValidarAutParametro(res.data.Fecha)
            switch (esValido) {
                case true:
                    return res.data
                
                case false:
                    await BorrarAutParametro(res.data.Interno)
                    return null

                default:
                    break;
            }     
        }
           
    }
    catch (error) {
        console.log('[BuscarParametro] ' + error)
    } 

}

async function BorrarAutParametro(props) {    
    try {
        await Api.delete(`AutParametro/Borrar?pInterno=${props}`)
    }
    catch (error) {
        console.log('[BuscarParametro] ' + error)
    } 

}

async function ValidarAutParametro(props) {    
    try {
        var format = 'hh:mm A'
        var horaAutParametro = moment(props) //, format).add(-3, 'hours');
        var horaLimite = moment(props).add(60, 'minutes');
        var now = moment();

        var hora = moment(now,format)
        console.log('[AutParametro] hora: ' + hora.format(format) + ' - horaLimite: ' + horaLimite.format(format) + ' - horaAutParametro: ' + horaAutParametro.format(format))
        if (hora.isBetween(horaAutParametro, horaLimite)) {
            console.log('[AutParametro] compara: ' + true)
            return true
        }
        else {
            console.log('[AutParametro] compara: ' + false)
            return false
        }        
    }
    catch (error) {
        console.log('[BuscarParametro] ' + error)
    } 

}

export default BuscarParametro;

