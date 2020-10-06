import React, {Component} from 'react';
import Button from 'react-bootstrap/Button'
import './BotonesFormulario.css'

class BotonesFormulario extends Component {    
    constructor(props){
        super(props);

        this.handleCancelar = this.handleCancelar.bind(this);
        this.handleGenerar = this.handleGenerar.bind(this);
        this.handleConfirmar = this.handleConfirmar.bind(this);
    }

    handleCancelar = (event) => {
        this.props.onDisabledCancelar()
    }
    handleGenerar = (event) => {
        this.props.onDisabledGenerar()
    }
    handleConfirmar = (event) => {
        this.props.onDisabledConfirmar()
    }

    render () {
            return <div>
            {this.props.disabledGenerar === false ?
                <Button 
                    className="botonesformulario"
                    variant="primary" 
                    size="sm"
                    onClick={this.handleGenerar}>
                        Genera Formulario
                </Button> : null
            }                  
            {this.props.disabledConfirmar === false ?
                <Button
                    className="botonesformulario"
                    variant="primary" 
                    size="sm"
                    onClick={this.handleConfirmar} 
                >
                        Confirma Formulario
                </Button> : null
            }
            {/*this.props.disabledCancelar === false ? 
                <Button
                    className="botonesformulario"
                    variant="primary" 
                    size="sm"
                    onClick={this.handleCancelar}
                >
                    Finaliza
                </Button> : null
            */}      
        </div>
    }

}

export default BotonesFormulario