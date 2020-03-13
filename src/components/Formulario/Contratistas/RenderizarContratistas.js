import React from 'react';
import ContratistaConsulta from './ContratistaConsulta';

function RenderizarContratistas (props) {
    //console.log('RenderizarContratistas props ' + props)
    //console.log('RenderizarContratistas props ' + JSON.stringify(props))
    const contratistasList = props

    let contratistasRender = null
    contratistasRender = (
        <table className="gremios-table">
                <thead className="cabecera">
                    <tr>
                        <th className="cabecera-gremioslegajo">CUIT</th>
                        <th className="cabecera-gremiosgremio">Contratista</th>
                    </tr>
                </thead>
                <tbody>
                    {contratistasList.map(contratista =>
                        <ContratistaConsulta 
                            key={contratista.Interno} 
                            contratista={contratista}
                        />
                    )}
            </tbody>
        </table>
    )
    return contratistasRender
}

export default RenderizarContratistas;