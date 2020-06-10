import React, { Component, Fragment } from 'react';
import './Responsable.css'

//Componente que se conecta al web api y trae todas las preguntas
class ResponsableConsulta extends Component{    
    render() {      
        const isDisable = true

        const cuit = this.props.responsable.CUIT
        const responsable = this.props.responsable.Responsable
        //const cargo = this.props.responsable.Cargo
        let cargo = ''
        switch (this.props.responsable.Cargo)
        {
            case 'R':
                cargo = 'Responsable de los datos del formulario';
                break;

            case 'H': 
                cargo = 'Profesional de Higiene y Seguridad en trabajo';
                break;

            case 'M':
                cargo = 'Profesional de Medicina Laboral';
                break;

            default:
                break;
        }
        
        let representacion = ''
        switch (parseInt(this.props.responsable.Representacion)) {
            case 1:
                representacion = 'Representante Legal'
                break;

            case 2:
                representacion = 'Presidente'
                break;
            
            case 3:
                representacion = 'Director General'
                break;

            case 4:
                representacion = 'Administrador General'
                break;

            case 5:
                representacion = 'VicePresidente'
                break;

            case 6:
                representacion = 'Gerente General'
                break;

            case 99:
                representacion = 'Otros'
                break;

            default:
                representacion = 'No especificado'
                break;
        }
        
        
        //const esContratado = this.props.responsable.EsContratado
        let esContratado = ''
        switch (parseInt(this.props.responsable.EsContratado))
        {
            case 0:
                esContratado = 'Propio';
                break;

            case 1:
                esContratado = 'Contratado';
                break;

            default:
                break;
        }
        const tituloHabilitante = this.props.responsable.TituloHabilitante
        const matricula = this.props.responsable.Matricula
        const entidadOtorganteTitulo = this.props.responsable.EntidadOtorganteTitulo

        return <Fragment>
            <tr>
                <td className="td-responsable-cuit">
                    <input type="text" name="cuit" value={cuit}disabled={isDisable}></input>                    
                </td>
                <td>
                    <input type="text" name="responsable" disabled={true} value={responsable}></input>
                </td>                    
                <td>
                    <input type="text" name="cargo" disabled={isDisable} value={cargo}></input>
                </td>
                <td>
                    <input type="text" name="representacion" disabled={isDisable} value={representacion}></input>
                </td>
                <td>
                    <input type="text" name="escontratado" disabled={isDisable} value={esContratado}></input>
                </td>
                <td>
                    <input type="text" name="titulohabilitante" disabled={isDisable} value={tituloHabilitante}></input>
                </td>
                <td>
                    <input type="text" name="matricula" disabled={isDisable} value={matricula}></input>
                </td>
                <td>
                    <input type="text" name="entidadotorgantetitulo" disabled={isDisable} value={entidadOtorganteTitulo}></input>
                </td>                   
            </tr>
        </Fragment>
    }
}

export default ResponsableConsulta;