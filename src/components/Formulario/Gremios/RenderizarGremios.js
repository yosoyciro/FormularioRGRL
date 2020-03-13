import React from 'react';
import GremioConsulta from './GremioConsulta';

function RenderizarGremios (props) {  
    const GremiosList = props
      
    let gremiosRender = null
        gremiosRender = (
            <table className="gremios-table">
                <thead className="cabecera">
                    <tr>
                        <th className="cabecera-gremioslegajo">Legajo</th>
                        <th className="cabecera-gremiosgremio">Gremio</th>
                    </tr>
                </thead>
                <tbody>
                    {GremiosList.map(gremio =>
                        <GremioConsulta 
                            key={gremio.Interno} 
                            gremio={gremio}
                        />
                    )}
                </tbody>
            </table>
        )
        return gremiosRender

    /*let gremiosRender = GremiosList.map(gremio => 
        <GremioConsulta 
            key={gremio.Interno} 
            gremio={gremio}
        />
    )

    return gremiosRender*/
}

export default RenderizarGremios;