import * as moment from 'moment';

function FormatearFechaSola(cell) {   
    switch (cell)
    {
        case null:
            return '';

        default:
            if (new Date(cell).getFullYear() !== 1800) 
                return `${moment(cell).format("DD/MM/YYYY")? moment(cell).format("DD/MM/YYYY"):moment(cell).format("DD/MM/YYYY") }`;
            else
                return ''
    }
    
}

export default FormatearFechaSola;