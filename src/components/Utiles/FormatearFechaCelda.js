import * as moment from 'moment';

function FormatearFechaCelda(cell, row) {   
    if (new Date(cell).getFullYear() !== 1800) 
        return `${moment(cell).format("DD-MM-YYYY HH:mm")? moment(cell).format("DD-MM-YYYY HH:mm"):moment(cell).format("DD-MM-YYYY HH:mm") }`;
    else
        return ''
}

export default FormatearFechaCelda;