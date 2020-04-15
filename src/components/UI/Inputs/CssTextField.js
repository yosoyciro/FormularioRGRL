import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const styles = {
    root: {        
        fontFamily: "sans-serif",        
    },
    input: {
        color: "white", 
        fontSize: "12px"       
    }
};

function CustomTextfield(props) {
    const { classes } = props;
    console.log('props.width: ' + props.width)
    return (
        <TextField
            className={classes.root}
            required
            variant="outlined"
            margin= "dense"
            type={props.type}
            id={props.id}
            label={props.label}
            defaultValue={props.defaultValue}
            //value={props.value}          
            //onChange={this.handleChangeCampos}                                      
            disabled={props.disabled}
            style={{ width: props.width }}                                
            InputProps={{
                className: classes.input
            }}
        />
    );
}

CustomTextfield.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CustomTextfield);