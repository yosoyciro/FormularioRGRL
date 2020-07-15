import * as moment from 'moment';

function FormatearFechaCelda(cell, row) {   
    
    switch (cell)
    {
        case "0001-01-01T00:00:00":
            return '';

        default:
            if (new Date(cell).getFullYear() !== 1800) 
                return `${moment(cell).format("DD-MM-YYYY HH:mm")? moment(cell).format("DD-MM-YYYY HH:mm"):moment(cell).format("DD-MM-YYYY HH:mm") }`;
            else
                return ''
    }
    
}

export default FormatearFechaCelda;