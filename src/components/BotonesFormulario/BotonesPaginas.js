import React, {Component} from 'react'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import './BotonesFormulario.css'

class BotonesPagina extends Component {
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

        //console.log('Pagina: ' + pagina + ' ret: ' + ret)
        return ret
    }

    render() {               
        return <ButtonToolbar aria-label="Toolbar with button groups">
            <ButtonGroup className="botonesformulario" aria-label="Paginas">
                {this.props.confirmado === true ?
                <>
                    {this.props.pagina === 1?
                    <>
                        {this.errorPagina(1) === 'ok' ?
                            <Button value="1" variant="success" size="lg" onClick={this.handleCambioPagina}>1</Button>
                        :
                            <Button value="1" variant="danger" size="lg" onClick={this.handleCambioPagina}>1</Button>
                        }
                    </>
                    :
                    <>
                        {this.errorPagina(1) === 'ok' ?
                            <Button value="1" variant="success" onClick={this.handleCambioPagina}>1</Button>
                        :
                            <Button value="1" variant="danger" onClick={this.handleCambioPagina}>1</Button>
                        }
                    </>
                    }                    
                    {this.errorPagina(2) === 'ok' ?
                    <>
                        {this.props.pagina === 2 ?                        
                            <Button value="2" variant="success" size="lg" onClick={this.handleCambioPagina}>2</Button>
                        :
                            <Button value="2" variant="success" onClick={this.handleCambioPagina}>2</Button>
                        }
                    </>
                    :
                    <>
                        {this.props.pagina === 2 ?                        
                            <Button value="2" variant="danger" size="lg" onClick={this.handleCambioPagina}>2</Button>
                        :
                            <Button value="2" variant="danger" onClick={this.handleCambioPagina}>2</Button>
                        }
                    </>
                    }
                    {this.errorPagina(3) === 'ok' ?
                    <>
                        {this.props.pagina === 3 ?                        
                            <Button value="3" variant="success" size="lg" onClick={this.handleCambioPagina}>3</Button>
                        :
                            <Button value="3" variant="success" onClick={this.handleCambioPagina}>3</Button>
                        }
                    </>
                    :
                    <>
                        {this.props.pagina === 3 ?                        
                            <Button value="3" variant="danger" size="lg" onClick={this.handleCambioPagina}>3</Button>
                        :
                            <Button value="3" variant="danger" onClick={this.handleCambioPagina}>3</Button>
                        }
                    </>
                    }
                    {this.errorPagina(4) === 'ok' ?
                    <>
                        {this.props.pagina === 4 ?                        
                            <Button value="4" variant="success" size="lg" onClick={this.handleCambioPagina}>4</Button>
                        :
                            <Button value="4" variant="success" onClick={this.handleCambioPagina}>4</Button>
                        }
                    </>
                    :
                    <>
                        {this.props.pagina === 4 ?                        
                            <Button value="4" variant="danger" size="lg" onClick={this.handleCambioPagina}>4</Button>
                        :
                            <Button value="4" variant="danger" onClick={this.handleCambioPagina}>4</Button>
                        }
                    </>
                    }
                    {this.errorPagina(5) === 'ok' ?
                    <>
                        {this.props.pagina === 5 ?                        
                            <Button value="5" variant="success" size="lg" onClick={this.handleCambioPagina}>5</Button>
                        :
                            <Button value="5" variant="success" onClick={this.handleCambioPagina}>5</Button>
                        }
                    </>
                    :
                    <>
                        {this.props.pagina === 5 ?                        
                            <Button value="5" variant="danger" size="lg" onClick={this.handleCambioPagina}>5</Button>
                        :
                            <Button value="5" variant="danger" onClick={this.handleCambioPagina}>5</Button>
                        }
                    </>
                    }
                    {this.errorPagina(6) === 'ok' ?
                    <>
                        {this.props.pagina === 6 ?                        
                            <Button value="6" variant="success" size="lg" onClick={this.handleCambioPagina}>6</Button>
                        :
                            <Button value="6" variant="success" onClick={this.handleCambioPagina}>6</Button>
                        }
                    </>
                    :
                    <>
                        {this.props.pagina === 6 ?                        
                            <Button value="6" variant="danger" size="lg" onClick={this.handleCambioPagina}>6</Button>
                        :
                            <Button value="6" variant="danger" onClick={this.handleCambioPagina}>6</Button>
                        }
                    </>
                    }
                    {this.errorPagina(7) === 'ok' ?
                    <>
                        {this.props.pagina === 7 ?                        
                            <Button value="7" variant="success" size="lg" onClick={this.handleCambioPagina}>7</Button>
                        :
                            <Button value="7" variant="success" onClick={this.handleCambioPagina}>7</Button>
                        }
                    </>
                    :
                    <>
                        {this.props.pagina === 7 ?                        
                            <Button value="7" variant="danger" size="lg" onClick={this.handleCambioPagina}>7</Button>
                        :
                            <Button value="7" variant="danger" onClick={this.handleCambioPagina}>7</Button>
                        }
                    </>
                    }
                    {this.errorPagina(8) === 'ok' ?
                    <>
                        {this.props.pagina === 8 ?                        
                            <Button value="8" variant="success" size="lg" onClick={this.handleCambioPagina}>8</Button>
                        :
                            <Button value="8" variant="success" onClick={this.handleCambioPagina}>8</Button>
                        }
                    </>
                    :
                    <>
                        {this.props.pagina === 8 ?                        
                            <Button value="8" variant="danger" size="lg" onClick={this.handleCambioPagina}>8</Button>
                        :
                            <Button value="8" variant="danger" onClick={this.handleCambioPagina}>8</Button>
                        }
                    </>
                    }
                    {this.errorPagina(9) === 'ok' ?
                    <>
                        {this.props.pagina === 9 ?                        
                            <Button value="9" variant="success" size="lg" onClick={this.handleCambioPagina}>Planilla A</Button>
                        :
                            <Button value="9" variant="success" onClick={this.handleCambioPagina}>Planilla A</Button>
                        }
                    </>
                    :
                    <>
                        {this.props.pagina === 9 ?                        
                            <Button value="9" variant="danger" size="lg" onClick={this.handleCambioPagina}>Planilla A</Button>
                        :
                            <Button value="9" variant="danger" onClick={this.handleCambioPagina}>Planilla A</Button>
                        }
                    </>
                    }   
                    {this.errorPagina(10) === 'ok' ?
                    <>
                        {this.props.pagina === 10 ?                        
                            <Button value="10" variant="success" size="lg" onClick={this.handleCambioPagina}>Planilla B</Button>
                        :
                            <Button value="10" variant="success" onClick={this.handleCambioPagina}>Planilla B</Button>
                        }
                    </>
                    :
                    <>
                        {this.props.pagina === 10 ?                        
                            <Button value="10" variant="danger" size="lg" onClick={this.handleCambioPagina}>Planilla B</Button>
                        :
                            <Button value="10" variant="danger" onClick={this.handleCambioPagina}>Planilla B</Button>
                        }
                    </>
                    }    
                    {this.errorPagina(11) === 'ok' ?
                    <>
                        {this.props.pagina === 11 ?                        
                            <Button value="11" variant="success" size="lg" onClick={this.handleCambioPagina}>Planilla C</Button>
                        :
                            <Button value="11" variant="success" onClick={this.handleCambioPagina}>Planilla C</Button>
                        }
                    </>
                    :
                    <>
                        {this.props.pagina === 11 ?                        
                            <Button value="11" variant="danger" size="lg" onClick={this.handleCambioPagina}>Planilla C</Button>
                        :
                            <Button value="11" variant="danger" onClick={this.handleCambioPagina}>Planilla C</Button>
                        }
                    </>
                    }                       
                </>
                :
                <>
                    {this.props.pagina === 1 ?
                        <Button value="1" variant="info" size="lg" onClick={this.handleCambioPagina}>1</Button>                            
                    :
                        <Button value="1" variant="info" onClick={this.handleCambioPagina}>1</Button>
                    }
                    {this.props.pagina === 2 ?
                        <Button value="2" variant="info" size="lg" onClick={this.handleCambioPagina}>2</Button>
                    :
                        <Button value="2" variant="info" onClick={this.handleCambioPagina}>2</Button>
                    }
                    {this.props.pagina === 3 ?
                        <Button value="3" variant="info" size="lg" onClick={this.handleCambioPagina}>3</Button>
                    :
                        <Button value="3" variant="info" onClick={this.handleCambioPagina}>3</Button>
                    }
                    {this.props.pagina === 4 ?
                        <Button value="4" variant="info" size="lg" onClick={this.handleCambioPagina}>4</Button>
                    :
                        <Button value="4" variant="info" onClick={this.handleCambioPagina}>4</Button>
                    }
                    {this.props.pagina === 5 ?
                        <Button value="5" variant="info" size="lg" onClick={this.handleCambioPagina}>5</Button>
                    :
                        <Button value="5" variant="info" onClick={this.handleCambioPagina}>5</Button>
                    }
                    {this.props.pagina === 6 ?
                        <Button value="6" variant="info" size="lg" onClick={this.handleCambioPagina}>6</Button>
                    :
                        <Button value="6" variant="info" onClick={this.handleCambioPagina}>6</Button>
                    }
                    {this.props.pagina === 7 ?
                        <Button value="7" variant="info" size="lg" onClick={this.handleCambioPagina}>7</Button>
                    :
                        <Button value="7" variant="info" onClick={this.handleCambioPagina}>7</Button>
                    }
                    {this.props.pagina === 8 ?
                        <Button value="8" variant="info" size="lg" onClick={this.handleCambioPagina}>8</Button>
                    :
                        <Button value="8" variant="info" onClick={this.handleCambioPagina}>8</Button>
                    }
                    {this.props.pagina === 9 ?
                        <Button value="9" variant="info" size="lg" onClick={this.handleCambioPagina}>Planilla A</Button>
                    :
                        <Button value="9" variant="info" onClick={this.handleCambioPagina}>Planilla A</Button>
                    }
                    {this.props.pagina === 10 ?
                        <Button value="10" variant="info" size="lg" onClick={this.handleCambioPagina}>Planilla B</Button>
                    :
                        <Button value="10" variant="info" onClick={this.handleCambioPagina}>Planilla B</Button>
                    }
                    {this.props.pagina === 11 ?
                        <Button value="11" variant="info" size="lg" onClick={this.handleCambioPagina}>Planilla C</Button>
                    :
                        <Button value="11" variant="info" onClick={this.handleCambioPagina}>Planilla C</Button>
                    }
                </>
                }
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

export default BotonesPagina;