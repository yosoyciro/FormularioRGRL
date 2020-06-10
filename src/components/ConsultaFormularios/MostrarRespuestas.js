import React, {Component, Fragment } from 'react';
import RenderizarPreguntas from './RenderizarPreguntas';
import RenderizarContratistas from '../../components/Formulario/Contratistas/RenderizarContratistas'
import RenderizarResponsables from '../../components/Formulario/Responsables/RenderizarResponsables'
import RenderizarGremios from '../Formulario/Gremios/RenderizarGremios';

export class MostrarRespuestas extends Component{
    constructor(props) {
        super (props)
        this.state ={
            pagina: 0
        }
    }

    renderizarPagina(pagina) {                     
        let paginaRender = null      
        switch (pagina) {
            case 40:
                paginaRender = (<div>
                    <h2>Representación Gremial</h2>
                    {RenderizarGremios(this.props.gremios)}
                    <h4 style={{textAlign: "initial"}}>En caso de contar con delegados gremiales indicar número de legajo conforme a la inscripción en el Ministerio de Trabajo, Empleo y Seguiridad Social</h4>
                    <a style={{display: "table-cell", fontSize: "initial"}} href="http://www.trabajo.gov.ar" target="_blank" rel="noopener noreferrer">(http://www.trabajo.gov.ar)</a>
                    </div>)
                break;

            case 50: 
                //Contratistas
                paginaRender = (<div>
                    <h2>Contratistas</h2>
                    {RenderizarContratistas(this.props.contratistas)}
                    <h4 style={{textAlign: "initial"}}>En caso de tener contratistas, indicar nro de CUIT y Nombre - Razón Social</h4>
                </div>)
                break;

            case 60:
                //Responsables
                paginaRender = (<div>
                    <h2>Datos Laborales del Profesional o Responsable del Formulario</h2>
                    {RenderizarResponsables(this.props.responsables)}
                    <h4 style={{textAlign: "initial"}}>Cargos:</h4>
                    <h4 style={{textAlign: "initial", marginLeft: "1%"}}>Profesional de Higiene y Seguridad en el Trabajo</h4>
                    <h4 style={{textAlign: "initial", marginLeft: "1%"}}>Profesional de Medicina Laboral</h4>
                    <h4 style={{textAlign: "initial", marginLeft: "1%"}}>Responsable de Datos del Formulario</h4>
                    <h4 style={{textAlign: "initial", marginLeft: "2%"}}>En Representación ingresar</h4>
                    <h4 style={{textAlign: "initial", marginLeft: "3%"}}>Representante Legal</h4>
                    <h4 style={{textAlign: "initial", marginLeft: "3%"}}>Presidente</h4>
                    <h4 style={{textAlign: "initial", marginLeft: "3%"}}>VicePresidente</h4>
                    <h4 style={{textAlign: "initial", marginLeft: "3%"}}>Director General</h4>
                    <h4 style={{textAlign: "initial", marginLeft: "3%"}}>Gerente General</h4>
                    <h4 style={{textAlign: "initial", marginLeft: "3%"}}>Administrador General</h4>
                    <h4 style={{textAlign: "initial", marginLeft: "3%"}}>Otros</h4>
                </div>)
                break;

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
                                <p key={seccion.Interno}>Comentario: {seccion.Comentario}</p>
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
                //return respuestas
                paginaRender = (respuestas)
        }
        
        return paginaRender
    }

    comentarioSeccion(comentario) {
        /*{this.props.text.split('\n').map((item, key) => {
            return <Fragment key={key}>{item}<br/></Fragment>
        })}*/

    }

    render() {      
        return <Fragment>
            {this.renderizarPagina(this.props.pagina)}
        </Fragment>        
    }
}

export default MostrarRespuestas;