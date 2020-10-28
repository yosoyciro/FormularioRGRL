import React, {Component} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import FormatearFechaCelda from '../Utiles/FormatearFechaCelda'
import './ListarFormulariosRAR.css'
import CargarConsultaFormulariosRAR from '../../Api/FormulariosRAR/CargarConsultaFormulariosRAR';
import Spinner from '../UI/Spinner';

export class ListaFormulariosRAR extends Component{
    constructor(props) {
        super(props)
        this.state = {
            loading: null,
            formulariosRAR: [],
            formulariosRARDetalle: [],
            internoFormulariosRAR: 0,
            internoEstablecimiento: 0
        }
    }

    componentDidMount() {        
        this.setState({ loading: true })

        const data = {
            CUIT: this.props.cuit,
            InternoPresentacion: this.props.internoPresentacion
        }
        CargarConsultaFormulariosRAR(data)
        .then(response => {
            switch (response)
            {
                case undefined:
                    break;

                default:
                    console.log('response: ' + response)
                    this.setState({
                        loading: !this.state.loading,
                        formulariosRAR: response
                    })
            }        
        })
        //console.log('JSON: ' + JSON.stringify(response))        
    }

    handleClick (e, row, rowIndex) {
        console.log(`Interno: ${row.Interno}`);
        this.setState({
            internoFormulariosRAR: row.InternoFormulariosRAR,
            internoEstablecimiento: row.internoEstablecimiento,
        })
        //this.cargarDatos(row.Interno)
        this.props.seleccionaRegistro(row.Interno, row.InternoEstablecimiento, row.Estado)
    }

    cargarDatos = async (internoFormulario, internoEstablecimiento) => {
        //Aqui traigo los detalles del formulario
    }

    handleCambioPagina = (pagina) => {
        this.setState({pagina: parseInt(pagina)})
        this.props.seleccionaRegistro(0, 0, '')
    }

    handleDataChange = ({ dataSize }) => {
        this.setState({
            internoFormulariosRAR: 0,
            internoEstablecimiento: 0
        })
        this.props.seleccionaRegistro(0, 0, '')
    }  

    handlePagChange = () => {
        //this.setState({ rowCount: dataSize });
        this.setState({
            internoFormulariosRAR: 0,
            internoEstablecimiento: 0
        })
        this.props.seleccionaRegistro(0, 0, '')
    } 
    

    render(){
        const { SearchBar } = Search;

        /*const selectOptions = {
            'En proceso de carga': 'En proceso de carga',
            'Confirmado': 'Confirmado'
        };*/

        const options = {           
            custom: true,
            sizePerPage: 25,
            hideSizePerPage: true,
            hidePageListOnlyOnePage: true,
            totalSize: this.state.formulariosRAR.length,
            onClick: (e) => {
                //console.log('click en pagina')
            },
            onPageChange: () => this.handlePagChange()
        };             

        const rowEvents = {
            onClick: (e, row, rowIndex) => {
                this.handleClick(e, row, rowIndex)
            }
        };

        const selectRow = {
            mode: 'radio',
            clickToSelect: true,
            style: { backgroundColor: '#c8e6c9' },
            hideSelectColumn: true,
          };

        //#region Columnas
        const columns = 
        this.props.cuit === 99999999999 ?
        [
            {
                dataField: 'Interno',
                text: '#',
                hidden: true
            }, 
            {
                dataField: 'CUIT',
                text: 'CUIT',
                sort: true,  
                filter: textFilter({
                    placeholder: 'Ingrese CUIT...',
                    className: 'test1'
                })              
            },
            {
                dataField: 'RazonSocial',
                text: 'Razon Social',
                sort: true,
                filter: textFilter({
                    placeholder: 'Ingrese Razón Social...',
                    className: 'test1'
                })
            }, 
            {
                dataField: 'Direccion',
                text: 'Establecimiento',
                sort: true,
            },
            {
                dataField: 'CantTrabajadoresExpuestos',
                text: 'Cant. Trabajadores Expuestos',
            },
            {
                dataField: 'CantTrabajadoresNoExpuestos',
                text: 'Cant. Trabajadores NO Expuestos',
            },
            {
                dataField: 'Estado',
                text: 'Estado'
            },            
            {
                dataField: 'FechaCreacion',
                text: 'Fecha Hora Creacion',
                formatter: FormatearFechaCelda,
                sort: true           
            },
            {
                dataField: 'FechaPresentacion',
                text: 'Fecha Hora Confirmado',
                formatter: FormatearFechaCelda
            },            
            {
                dataField: 'InternoEstablecimiento',
                text: 'InternoEstablecimiento',
                hidden: true
            }            
        ]
        :
        [
            {
                dataField: 'Interno',
                text: '#',
                hidden: true
            }, 
            {
                dataField: 'CUIT',
                text: 'CUIT',
                sort: true    
            },
            {
                dataField: 'RazonSocial',
                text: 'Razon Social',
                sort: true
            }, 
            {
                dataField: 'Direccion',
                text: 'Establecimiento',
                sort: true,
            },
            {
                dataField: 'CantTrabajadoresExpuestos',
                text: 'Cant. Trabajadores Expuestos',
            },
            {
                dataField: 'CantTrabajadoresNoExpuestos',
                text: 'Cant. Trabajadores NO Expuestos',
            },
            {
                dataField: 'Estado',
                text: 'Estado'
            },            
            {
                dataField: 'FechaCreacion',
                text: 'Fecha Hora Creacion',
                formatter: FormatearFechaCelda,
                sort: true           
            },
            {
                dataField: 'FechaPresentacion',
                text: 'Fecha Hora Confirmado',
                formatter: FormatearFechaCelda
            },            
            {
                dataField: 'InternoEstablecimiento',
                text: 'InternoEstablecimiento',
                hidden: true
            }            
        ];
        //#endregion

        //#region definicion Tabla
        const contentTable = ({ paginationProps, paginationTableProps }) => (
            <div>
                <PaginationListStandalone 
                    { ...paginationProps}
                />
              <ToolkitProvider
                keyField="Interno"
                columns={ columns }
                data={ this.state.formulariosRAR }
                search
              >
                {
                  toolkitprops => (
                    <div>
                        {this.props.cuit === 99999999999 ?
                            <SearchBar { ...toolkitprops.searchProps } 
                                { ...toolkitprops.searchProps }
                                className="search"
                                placeholder="Ingrese parte de CUIT, Razón Social, Establecimiento..."
                            />
                        :
                            null
                        }
                        <BootstrapTable
                            rowEvents={ rowEvents }   
                            selectRow={ selectRow }         
                            filter={ filterFactory() } 
                            noDataIndication="No hay datos para mostrar" 
                            onDataSizeChange={ this.handleDataChange }
                            striped
                            hover
                            { ...toolkitprops.baseProps }
                            { ...paginationTableProps }
                        />
                    </div>
                  )
                }
              </ToolkitProvider>
            </div>
        );
        //#endregion
        
        return <div>
            {this.state.loading === true ?
                <Spinner />
            :
                <>
                    <PaginationProvider
                        className="paginacion"
                        pagination={
                            paginationFactory(options)
                        }
                    >
                        { contentTable }
                    </PaginationProvider>
                    {this.state.internoFormulario !== 0 && this.state.internoEstablecimiento !== 0 ?
                        <>
                            
                        </>
                    :
                        null                    
                    }
                </> 
            }
        </div>
    }
}


export default ListaFormulariosRAR;