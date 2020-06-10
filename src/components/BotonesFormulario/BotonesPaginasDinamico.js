import React, {Component} from 'react'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import './BotonesFormulario.css'

class BotonesPaginaDinamicos extends Component {
    constructor(props) {
        super(props)
        this.handleCambioPagina = this.handleCambioPagina.bind(this)
    }

    handleCambioPagina = (event) => {
        this.props.cambioPagina(event.target.value)
    }

    errorPagina(pagina) {
        let ret = ''
        const seccionesError = this.props.erroresRespuestas.filter(error => error.Pagina === pagina)
        if (seccionesError.length > 0)
            ret = 'error'
        else
            ret = 'ok'
        return ret
    }

    render() { 
        //console.log('[BotonesPaginasDinamico - render] this.props.pagina: ' + this.props.pagina)              
        return <ButtonToolbar aria-label="Toolbar with button groups">
            <ButtonGroup className="botonesformulario" aria-label="Paginas">                
                {this.props.paginas.map(pagina => {
                    //nombre del boton
                    let textoBoton = pagina.toString()
                    switch (parseInt(pagina)) {
                        case 9:
                            textoBoton = 'Planilla A'
                            break;
                    
                        case 10:
                            textoBoton = 'Planilla B'
                            break;

                        case 11:
                            textoBoton = 'Planilla C'
                            break;

                        default:
                            break;
                    }
                    
                    let buttonProperties = [];
                    switch (this.props.confirmado) {
                        case true:
                            switch (this.errorPagina(pagina)) {
                                case 'ok':
                                    buttonProperties = {value:pagina, variant:"success"}
                                    break;

                                default:
                                    buttonProperties = {value:pagina, variant:"danger"}
                            }
                            break;
                    
                        default:
                            switch (pagina)
                            {
                                case this.props.pagina:
                                    buttonProperties = {value:pagina, variant:"info", size:"lg"}
                                    break;

                                default:
                                    buttonProperties = {value:pagina, variant:"info"}
                            }                             
                    }   
                    return <Button {...buttonProperties} onClick={this.handleCambioPagina} key={pagina}>{textoBoton}</Button>                                                                            
                })}  
            </ButtonGroup>

            <ButtonGroup aria-label="Adicionales">
                {this.props.confirmado === true ?
                <>                            
                    {this.errorPagina(40) === 'ok' ?
                    <>
                        {this.props.pagina === 40 ?
                            <Button value="40" variant="success" size="lg" onClick={this.handleCambioPagina}>Gremios</Button>
                        :
                            <Button value="40" variant="success" onClick={this.handleCambioPagina}>Gremios</Button>
                        }
                    </>
                    :
                    <>
                        {this.props.pagina === 40 ?
                            <Button value="40" variant="danger" size="lg" onClick={this.handleCambioPagina}>Gremios</Button>
                        :
                            <Button value="40" variant="danger" onClick={this.handleCambioPagina}>Gremios</Button>
                        }
                    </>
                    }
                    {this.errorPagina(50) === 'ok' ?
                    <>
                        {this.props.pagina === 50 ?
                            <Button value="50" variant="success" size="lg" onClick={this.handleCambioPagina}>Contratistas</Button>
                        :
                            <Button value="50" variant="success" onClick={this.handleCambioPagina}>Contratistas</Button>
                        }
                    </>
                    :
                    <>
                        {this.props.pagina === 50 ?
                            <Button value="50" variant="danger" size="lg" onClick={this.handleCambioPagina}>Contratistas</Button>
                        :
                            <Button value="50" variant="danger" onClick={this.handleCambioPagina}>Contratistas</Button>
                        }
                    </>
                    }
                    {this.errorPagina(60) === 'ok' ?
                    <>
                        {this.props.pagina === 60 ?
                            <Button value="60" variant="success" size="lg" onClick={this.handleCambioPagina}>Responsables</Button>
                        :
                            <Button value="60" variant="success" onClick={this.handleCambioPagina}>Responsables</Button>
                        }
                    </>
                    :
                    <>
                        {this.props.pagina === 60 ?
                            <Button value="60" variant="danger" size="lg" onClick={this.handleCambioPagina}>Responsables</Button>
                        :
                            <Button value="60" variant="danger" onClick={this.handleCambioPagina}>Responsables</Button>
                        }
                    </>
                    }
                </>
                :
                <>
                    {this.props.pagina === 40 ?
                        <Button value="40" variant="info" size="lg" onClick={this.handleCambioPagina}>Gremios</Button>
                    :
                        <Button value="40" variant="info" onClick={this.handleCambioPagina}>Gremios</Button>
                    }
                    {this.props.pagina === 50 ?
                        <Button value="50" variant="info" size="lg" onClick={this.handleCambioPagina}>Contratistas</Button>
                    :
                        <Button value="50" variant="info" onClick={this.handleCambioPagina}>Contratistas</Button>
                    }
                    {this.props.pagina === 60 ?
                        <Button value="60" variant="info" size="lg" onClick={this.handleCambioPagina}>Responsables</Button>
                    :
                        <Button value="60" variant="info" onClick={this.handleCambioPagina}>Responsables</Button>
                    }
                    
                    
                </>
                }
            </ButtonGroup>
        </ButtonToolbar>
    }
}

export default BotonesPaginaDinamicos;