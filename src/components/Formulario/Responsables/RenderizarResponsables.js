import React from 'react';
import ResponsableConsulta from './ResponsableConsulta';

function RenderizarResponsables (props) {
    const responsablesList = props

        let responsablesRender = null
        responsablesRender = (
            <table className="gremios-table">
                <thead className="cabecera">
                    <tr>
                        <th>CUIT/CUIL/CUIP</th>
                        <th>Nombre y apellido</th>
                        <th>Cargo</th>
                        <th>Representación</th>
                        <th>Propio/contratado</th>
                        <th>Título habilitante</th>
                        <th>N° matrícula</th>
                        <th>Entidad que otorgó el título habilitante</th>
                    </tr>
                </thead>
                <tbody>
                    {responsablesList.map(responsable =>
                    <ResponsableConsulta 
                        key={responsable.Interno} 
                        id={responsable.Interno}
                        responsable={responsable}
                        entidadOtorganteTitulo={responsable.EntidadOtorganteTitulo}
                    />)}
                </tbody>
            </table>
            
        )
        return responsablesRender
}

export default RenderizarResponsables;