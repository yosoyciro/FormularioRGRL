import React from 'react';
import ResponsableConsulta from './ResponsableConsulta';

function RenderizarResponsables (props) {
    const responsablesList = props

        let responsablesRender = (
            responsablesList.map(responsable =>
                <ResponsableConsulta 
                    key={responsable.Interno} 
                    id={responsable.Interno}
                    responsable={responsable}
                    entidadOtorganteTitulo={responsable.EntidadOtorganteTitulo}
                />)
        )
        return responsablesRender
}

export default RenderizarResponsables;