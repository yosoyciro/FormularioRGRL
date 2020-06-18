import Api from './Api';

async function CargarFormularios(props) {
    let respuestaFormularios = []

    try {
        const response = await Api.get(`Formulario/ListarDisponibles?pInternoEstablecimiento=${props}`)
        //console.log('response.data: ' + response.data)
        response.data.map(formulario => {
            //console.log('response.data: ' + formulario.Descripcion) 
            const isDisabled = false //formulario.Estado === '(Confirmado)' ? true : false
            respuestaFormularios.push({value: formulario.Interno, label: formulario.Descripcion + ' ' + formulario.Estado, isDisabled: isDisabled, gremios: formulario.CantidadGremios, contratistas: formulario.CantidadContratistas, responsables: formulario.CantidadResponsables, estado: formulario.Estado })

            //return formulario            
        })
        return respuestaFormularios
                
    }
    catch (error) {
        console.log('[CargarFormularios]: ' + error);
        //respuestaFormularios.push({value: 0, label: 'Error cargando formularios', isDisabled: true, gremios: 0, contratistas: 0, responsables: 0, estado: 0 })

        //return respuestaFormularios
    } 
}

export default CargarFormularios;