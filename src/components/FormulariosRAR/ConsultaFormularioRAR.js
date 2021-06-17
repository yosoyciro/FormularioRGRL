import React, {Component, Fragment} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import Spinner from '../UI/Spinner';
import FormatearFechaSola from '../Utiles/FormatearFechaSola'
import { Type } from 'react-bootstrap-table2-editor';

export class ConsultaFormularioRAR extends Component{    
    render() {
        //#region Columnas de la grilla
        const columns = [
            {
                dataField: 'Interno',
                text: 'Interno',
                hidden: true
            }, 
            {
                dataField: 'InternoFormulariosRAR',
                text: 'Interno Formulario RAR',
                hidden: true
            }, 
            {
                dataField: 'CUIL',
                text: 'CUIL',
                editable: true,
            }, 
            {
                dataField: 'Nombre',
                text: 'Nombre',
            },
            {
                dataField: 'SectorTarea',
                text: 'Sector/Tarea',
                editable: true,
            },
            {
                dataField: 'FechaIngreso',
                text: 'Fecha de Ingreso',
                editable: true,
                formatter: FormatearFechaSola,
                editor: {
                    type: Type.DATE
                },
            },
            {
                dataField: 'HorasExposicion',
                text: 'Hs de Exposición',
                editable: true,
            },
            {
                dataField: 'FechaUltimoExamenMedico',
                text: 'Fecha Ult. Exámen Médico',                
                formatter: FormatearFechaSola,
            },
            {
                dataField: 'CodigoAgente',
                text: 'Codigo Agente',
            },
            {
                dataField: 'AgenteCausante.Descripcion',
                text: 'Descripcion Agente',
            }  
        ];
        //#endregion    
        console.log("Detalle", this.props.formulariosRARDetalle)
        return ( 
            <div>                              
                <>
                {this.props.formulariosRARDetalle.length === 0 ?
                    <h3>Sin Trabajadores Expuestos</h3>
                :
                    <BootstrapTable
                        keyField="Interno"
                        //caption={<CaptionElement />}
                        data={ this.props.formulariosRARDetalle }
                        columns={ columns }                    
                    />     
                }  
                </>                    
            </div>
        )
    }
}

export default ConsultaFormularioRAR;