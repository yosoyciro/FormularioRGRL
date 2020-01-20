import React, { Component } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Portal from '@material-ui/core/Portal';
import { makeStyles } from '@material-ui/core/styles';
import './Snackbar.css'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class SnackbarErrores extends Component {    
    render() { 
        const vertical = this.props.vertical.toString()
        const horizontal = this.props.horizontal.toString()
        const severity = this.props.severity.toString()
        const timer = parseInt(this.props.timer)
        //console.log(...this.props)

        return <Snackbar
                anchorOrigin={{vertical, horizontal}}
                key={`${vertical},${horizontal}`}
                open={this.props.show} 
                autoHideDuration={timer}           
                onClose={this.props.onClose}
                >
                <Alert onClose={this.props.onClose} severity={severity}>
                    {this.props.mensaje}
                </Alert>
            </Snackbar>    
    };
}

export default SnackbarErrores;
