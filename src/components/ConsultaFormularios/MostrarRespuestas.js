import React, {Component, Fragment } from 'react';
import RenderizarPreguntas from './RenderizarPreguntas';
import RenderizarContratistas from '../../components/Formulario/Contratistas/RenderizarContratistas'
import RenderizarResponsables from '../../components/Formulario/Responsables/RenderizarResponsables'
import RenderizarGremios from '../Formulario/Gremios/RenderizarGremios';
import './MostrarRespuestas.css'

export class MostrarRespuestas extends Component{
    constructor(props) {
        super (props)
        this.state ={
            pagina: 0
        }
    }

    renderizarPagina(pagina) {                     
        //let paginaRender = null      
        switch (pagina) {
            case 40:
                return <RenderizarGremios
                            key={pagina}
                            gremios={this.props.gremios}
                            esConsulta={true}
                        />

            case 50: 
                //Contratistas
                return <RenderizarContratistas
                    key={pagina}
                    contratistas={this.props.contratistas}
                    esConsulta={true}
                />

            case 60:
                //Responsables
                return <RenderizarResponsables
                    key={pagina}
                    responsables={this.props.responsables}
                    esConsulta={true}
                />

            default:
                const seccionesPagina = this.props.secciones.filter(seccion => seccion.Pagina === this.props.pagina)   
                
                let respuestas = <div>
                    {pagina >= 1 && pagina <= 8 ?
                        <h3>CONDICIONES A CUMPLIR</h3>
                    :
                        null
                    }
                    {seccionesPagina.map(seccion => 
                        <div>                            
                            {seccion.Comentario !== '' ?
                                seccion.Comentario.split(".,").map(comentario =>
                                    <p className="comentario">{comentario}</p>
                                )
                            :
                                null
                            }                                 
                            <RenderizarPreguntas
                                key={seccion.Interno}
                                preguntas= {this.props.preguntas}
                                seccion={seccion}
                                respuestasCuestionario={this.props.respuestasCuestionario}
                            />
                        </div>
                    )}
                </div>                  
                return respuestas
                //paginaRender = (respuestas)
        }
        
        //return paginaRender
    }
    

    render() {      
        return <Fragment>
            {this.renderizarPagina(this.props.pagina)}
        </Fragment>        
    }
}

export default MostrarRespuestas;