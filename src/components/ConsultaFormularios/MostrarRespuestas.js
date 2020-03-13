import React, {Component} from 'react';
import RenderizarPreguntas from './RenderizarPreguntas';
import RenderizarContratistas from '../../components/Formulario/Contratistas/RenderizarContratistas'
import RenderizarResponsables from '../../components/Formulario/Responsables/RenderizarResponsables'
import RenderizarGremios from '../Formulario/Gremios/RenderizarGremios';

export class MostrarRespuestas extends Component{  
    renderizarPagina(pagina) {
        switch (pagina) {
            case 40:
                return <div>
                    <h2>Gremios</h2>
                    {RenderizarGremios(this.props.gremios)}
                </div>

            case 50: 
                //Contratistas
                return <div>
                    <h2>Contratistas</h2>
                    {RenderizarContratistas(this.props.contratistas)}
                </div>

            case 60:
                //Responsables
                return <div>
                    <h2>Responsables</h2>
                    {RenderizarResponsables(this.props.responsables)}
                </div>

            default:
                const seccionesPagina = this.props.secciones.filter(seccion => seccion.Pagina === this.props.pagina)      
                return <div>
                    <h2>CONDICIONES A CUMPLIR</h2>
                    {seccionesPagina.map(seccion => 
                        <div>
                            <label>{seccion.Descripcion}</label>                                   
                            <RenderizarPreguntas
                                preguntas= {this.props.preguntas}
                                seccion={seccion}
                                respuestasCuestionario={this.props.respuestasCuestionario}
                            />
                        </div>
                    )}
                </div>
        }
    }

    render() {      
        return this.renderizarPagina(this.props.pagina)
    }
}

export default MostrarRespuestas;