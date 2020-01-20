import React from 'react';
import ContratistaConsulta from './ContratistaConsulta';

function RenderizarContratistas (props) {
    console.log('RenderizarContratistas props ' + props)
    console.log('RenderizarContratistas props ' + JSON.stringify(props))
    const contratistasList = props

    let contratistasRender = (
        contratistasList.map(contratista =>
            <ContratistaConsulta 
                key={contratista.Interno} 
                contratista={contratista}
            />)
    )
    return contratistasRender
}

export default RenderizarContratistas;