import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { PDFViewer } from '@react-pdf/renderer';
import ImpresionFormulario from './ImpresionFormulario';

//estilos del pdf
const styles = {
    modal: {
        top: '35%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        width: '60%',
        transform: 'translate(-40%, -10%)'      
    },
    pdf: {
        height: '100%',
        width: '90%'
    }
} 

const VentaImpresionFormulario = (props) => {
    const [modalPDFIsOpen, setModalPDFIsOpen] = useState( props.modalPDFIsOpen );   

    const handleModalPDF = () => {
        setModalPDFIsOpen( !props.modalPDFIsOpen )

        //vuelve el valor en false a ListaFormularios
        props.handleCerrarVentanaImpresion(modalPDFIsOpen);
    };

    return (
        <Modal
            isOpen={modalPDFIsOpen}
            //onAfterOpen={afterOpenModal}
            onRequestClose={handleModalPDF}
            style={styles.modal}
            contentLabel="Impresion Formulario RGRL"
        >            
            <PDFViewer style={styles.pdf}>
                <ImpresionFormulario 
                    {...props}
                    //referenteDatos={referenteDatos}
                    //establecimiento={establecimiento}
                />
            </PDFViewer>
        </Modal>
    )
    
}

export default VentaImpresionFormulario;