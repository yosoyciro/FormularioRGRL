import React from 'react';
import classes from './Inputs.modu';

const input = (props) => {
    let inputElemento = null;

    switch ( props.inputTipo ) {
        case ( 'input' ):
            inputElemento = <input className={classes.InputElemento} {...props} />;
            break;
        case ( 'select' ):
            inputElemento = <select className={classes.SelectElemento} {...props} />;
            break;
        default:
            inputElemento = <input className={classes.InputElemento} {...props} />;
    }

    return (
        <div className={classes.Label}>
            <label>{props.label}</label>
            {inputElemento}
        </div>
    );
};

export default input;