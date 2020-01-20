import React from 'react';
import GremioConsulta from './GremioConsulta';

function RenderizarGremios (props) {    
    console.log('props: ' + props)
    console.log('props: ' + JSON.stringify(props))
    const GremiosList = JSON.stringify(props)    

    let gremiosRender = GremiosList.map(gremio => 
        <GremioConsulta 
            key={gremio.Interno} 
            gremio={gremio}
        />
    )

    return gremiosRender
}

export default RenderizarGremios;