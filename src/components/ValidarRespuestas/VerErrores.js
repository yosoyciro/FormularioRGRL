import React, { Fragment } from 'react'
import Collapse from 'react-bootstrap/Collapse'

class VerErrores extends React.Component {

    render() {
        return <Fragment>
            {this.props.verErrores === true ?
                <Collapse in={this.props.verErrores}>
                    <div id="example-collapse-text">
                        <div>
                            <label>Listadi de errores</label>
                            {this.props.errores.map(error =>                        
                                <ul>
                                    {error.error}
                                </ul>
                            )}
                        </div>	
                    </div>
                </Collapse> : null
            }
        </Fragment>
    }
    
}

export default VerErrores