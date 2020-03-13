import React, {Component, Fragment} from 'react';
import Button from 'react-bootstrap/Button';
import BootstrapTable from 'react-bootstrap-table-next';
import {GuardarFormularioRARDetalleAgentes, BorrarFormularioRARDetalleAgentes, ConsultarFormularioRARDetalleAgentes} from '../../Api/FormulariosRAR/FormulariosRARDetalleAgentes';
import Select from 'react-select';

export class FormulariosRARDetalleAgentes extends Component{
    constructor(props){
        super(props)
        this.handleSubmitAgente = this.handleSubmitAgente.bind(this)
        this.handleChangeAgente = this.handleChangeAgente.bind(this)
        this.state = {
            formulariosRARDetalleAgentes: this.props.formulariosRARDetalleAgentes,
            agenteSeleccionado: 0
        }
    }

    handleChangeAgente = (selectedOption) => {
        this.setState({ agenteSeleccionado: selectedOption.value })   
    } 

    handleSubmitAgente(event) {
        event.preventDefault()

        this.props.handleLoading()

        const props = {
            Interno: 0,
            InternoFormulariosRARDetalle: this.props.internoFormulariosRARDetalle,
            CodigoAgente: this.state.agenteSeleccionado
        }

        GuardarFormularioRARDetalleAgentes(props)
        .then(resp => {
            ConsultarFormularioRARDetalleAgentes(resp.InternoFormulariosRARDetalle)
            .then(detalle => {                
                this.setState({ 
                    formulariosRARDetalleAgentes: detalle
                })
                this.props.handleLoading()
            })          
        })        
    }

    render() {
        //#region Columnas agente
        const columnsAgentes = [
            {
                dataField: 'Interno',
                text: 'Interno',
                hidden: true
            }, 
            {
                dataField: 'InternoFormulariosRARDetalle',
                text: 'Interno Formulario RAR Detalle',
                hidden: true
            },
            {
                dataField: 'CodigoAgente',
                text: 'Cód.Agente'
            }
        ]
        //#endregion
          
        const optionsAgentes = {
            //insertBtn: this.createCustomInsertButton
        };
        
        //Caption
        const CaptionElementAgentes = () => <h5 style={{ borderRadius: '0.1em', textAlign: 'center', color: 'blue', padding: '0.2em' }}>Agentes</h5>;

        //Datos select
        const opciones = this.props.refAgenteCausante.map(agente => {        
            return {value: agente.Codigo, label: 'Agente: ' + agente.AgenteCausante + ' - Tipo: ' + agente.AgenteTipo }
        })

        return <Fragment>
        <div style={{width: '50%', marginLeft: '3%', border: 'solid 1px black'}}> 
            <form className="form" onSubmit={this.handleSubmitAgente}>
                <fieldset>
                    <Select 
                        value={this.state.agenteSeleccionado}
                        name="form-field-name"
                        onChange={this.handleChangeAgente}                     
                        options={opciones}
                        isSearchable={false}
                        placeholder={'Seleccione agente de riesgo'}
                        formatCreateLabel={userInput => `Search for ${userInput}`}
                    /> 
                </fieldset>
                <Button variant="primary" type="submit" disabled={false}>Agrega</Button>  
            </form>
        </div>
        <div>
            <BootstrapTable
                keyField="Interno"
                caption={<CaptionElementAgentes />}
                data={ this.state.formulariosRARDetalleAgentes }
                columns={ columnsAgentes }                   
            />                    
        </div>
        </Fragment>
    }
}

export default FormulariosRARDetalleAgentes;