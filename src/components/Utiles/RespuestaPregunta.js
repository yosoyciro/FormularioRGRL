function RespuestaPregunta(props) {

    var respuestasCuestionario = Object.values(props.respuestasCuestionario) //props.respuestasCuestionario
    const respuesta = respuestasCuestionario.find(resp => resp.InternoCuestionario === props.internoCuestionario)
    if (respuesta === null)
        return null

    else
        return {
            Respuesta: respuesta.Respuesta,
            FechaRegularizacion: respuesta.FechaRegularizacionNormal
        }
    
}

export default RespuestaPregunta;