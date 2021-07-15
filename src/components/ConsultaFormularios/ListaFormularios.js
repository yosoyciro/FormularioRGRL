import React, {Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter ,selectFilter } from 'react-bootstrap-table2-filter';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import CargarConsultaFormularios from '../../Api/CargarConsultaFormularios';
import MostrarRespuestas from './MostrarRespuestas';
import CargarSeccionesFormulario from '../../Api/CargarSeccionesFormulario';
import CargarRespuestasConsulta from '../../Api/FormulariosRGRL/CargarRespuestasConsulta';
import CargarPreguntas from '../../Api/CargarPreguntas';
import FormatearFechaCelda from '../Utiles/FormatearFechaCelda'
import './ListarFormularios.css'
import BotonesPaginaDinamicos from '../BotonesFormulario/BotonesPaginasDinamico';
import Spinner from '../UI/Spinner'

export class ListaFormularios extends Component{
    constructor(props) {
        super(props)
        this.handleLoadingRespuestas = this.handleLoadingRespuestas.bind(this)
        this.AccionFormat= this.AccionFormat.bind(this);
        this.handleEdita = this.handleEdita.bind(this);
        this.handleFinalizaCarga = this.handleFinalizaCarga.bind(this);
        this.state = {
            pagina: 1,
            formulariosCargados: [],
            internoFormulario: 0,
            internoEstablecimiento: 0,
            internoRespuestasFormulario: 0,
            secciones: [],
            preguntas: [],
            respuestasCuestionario: [],
            respuestasGremio: [],
            respuestasContratista: [],
            respuestasResponsable: [],
            paginas: [],
            loadingRespuestas: false,
            loadingFormularios: true,
            internoPresentacion: 0,
            cargarFormulario: false,
            finalizaCarga: false,
            /*referenteDatos: [],
            formularioRGRL: {
                internoRespuestaFormulario: 0,
                cuit: 0,
                internoEstablecimiento: 0,
                internoFormulario: 0,                
                estado: '',                
            }*/
        }
    }

    async componentDidMount() {  
        //console.log('[ListaFormularios] cuit: ' + this.props.cuit)
        //console.log('props', this.props)
        this.setState({internoPresentacion: this.props.internoPresentacion}) 
        const props = {
            CUIT: this.props.cuit,
            InternoPresentacion: this.props.internoPresentacion
        }     
        const formulariosCargados = await CargarConsultaFormularios(props)
        this.setState({
            formulariosCargados: formulariosCargados,
            loadingFormularios: !this.state.loadingFormularios
        });
    }

    componentDidUpdate() {
        if (this.state.internoPresentacion !== this.props.internoPresentacion)
        {
            this.setState({
                internoPresentacion: this.props.internoPresentacion,
                loadingFormularios: !this.state.loadingFormularios
            }) 

            //console.log('[ListaFormularios] componentDidUpdate')
            const props = {
                CUIT: this.props.cuit,
                InternoPresentacion: this.props.internoPresentacion
            }     
            CargarConsultaFormularios(props)
            .then(res => {
                this.setState({
                    formulariosCargados: res,
                    loadingFormularios: !this.state.loadingFormularios
                });
            })
        }
        
        
    }

    handleClick (e, row, rowIndex) {
        //console.log(`Interno: ${row.Interno}`);
        /*ReferenteDatos(row.CUIT)
        .then(res => {
            this.setState({
                referenteDatos: res,
                internoFormulario: row.InternoFormulario,
                internoEstablecimiento: row.InternoEstablecimiento,
                internoRespuestasFormulario: row.Interno,
                pagina: 1,
                loadingRespuestas: !this.state.loadingRespuestas,
                formularioRGRL: {
                    internoRespuestaFormulario: row.InternoFormulario,
                    cuit: row.CUIT,
                    internoEstablecimiento: row.InternoEstablecimiento,
                    internoFormulario: row.Interno,                    
                    estado: row.Estado
                }
            })

            this.cargarDatos(row.InternoFormulario, row.InternoEstablecimiento, row.Interno)
            .then(resp => {
                this.props.seleccionaRegistro(row.Interno, row.CUIT, row.InternoFormulario, row.InternoEstablecimiento, row.Estado, row.RazonSocial, row.Direccion, row.Descripcion)
                this.setState({ loadingRespuestas: !this.state.loadingRespuestas })
            }) 
        })*/
        this.setState({
            internoFormulario: row.InternoFormulario,
            internoEstablecimiento: row.InternoEstablecimiento,
            internoRespuestasFormulario: row.Interno,
            pagina: 1,
            loadingRespuestas: !this.state.loadingRespuestas,
            /*formularioRGRL: {
                internoRespuestaFormulario: row.InternoFormulario,
                cuit: row.CUIT,
                internoEstablecimiento: row.InternoEstablecimiento,
                internoFormulario: row.Interno,
                referenteDatos: [],
                estado: row.Estado
            }*/
        })
        this.cargarDatos(row.InternoFormulario, row.InternoEstablecimiento, row.Interno)
        .then(resp => {
            this.props.seleccionaRegistro(row.Interno, row.CUIT, row.InternoFormulario, row.InternoEstablecimiento, row.Estado, row.RazonSocial, row.Direccion, row.Descripcion)
            this.setState({ loadingRespuestas: !this.state.loadingRespuestas })
        })
    }

    handleEdita = () => {
        //this.props.history.push('/NuevoFormularioRAR/' + this.state.cuit);
        this.setState({ 
            cargarFormulario: true,
        })
    }

    editarFormularioRGRL = (interno) => {
        this.props.history.push('/EditarFormularioRGRL/'+interno)
    }

    handleFinalizaCarga() {
        this.setState({ 
            cargarFormulario: false,
            formularioRGRL: {
                internoRespuestaFormulario: 0,
                internoFormulario: 0,
                internoEstablecimiento: 0,
                estado: '',
            }
        })
    }

    cargarDatos = async (internoFormulario, internoEstablecimiento, internoRespuestasFormulario) => {
        const secciones = await CargarSeccionesFormulario(internoFormulario)
        const preguntas = await CargarPreguntas(internoFormulario)
        const respuestasCuestionario = await CargarRespuestasConsulta({internoRespuestasFormulario})        

        //cargar un array de paginas para pasarlo a BotonesPaginas
        const paginasSecciones = secciones.map(seccion => {
            return seccion.Pagina
        })
        //console.log('paginasSeeciones: ' + paginasSecciones)
        const paginas = [...new Set(paginasSecciones)]
        //console.log('paginas: ' + paginas)

        this.setState({
            secciones,
            preguntas,
            respuestasCuestionario: respuestasCuestionario.RespuestasCuestionario,
            respuestasGremio: respuestasCuestionario.RespuestasGremio,
            respuestasContratista: respuestasCuestionario.RespuestasContratista,
            respuestasResponsable: respuestasCuestionario.RespuestasResponsable,
            paginas
            //loading: !this.state.loading
        })
        //console.log('respuestasGremio: ' + JSON.stringify(this.state.respuestasGremio))        
    }

    limpiarSeleccion = () => {
        this.props.seleccionaRegistro(0, 0, 0, 0, '', '', '')
    }

    handleCambioPagina = (pagina) => {
        //console.log('pagina: ' + pagina)
        this.setState({
            pagina: parseInt(pagina)   
        })
        //this.limpiarSeleccion()
    }

    handleDataChange = ({ dataSize }) => {
        //this.setState({ rowCount: dataSize });
        //console.log('cambia la tabla')
        this.setState({
            internoFormulario: 0,
            internoEstablecimiento: 0,
            internoRespuestasFormulario: 0
        })
        this.limpiarSeleccion()
    }  

    handlePagChange = () => {
        //this.setState({ rowCount: dataSize });
        //console.log('cambia la pagina')
        this.setState({
            internoFormulario: 0,
            internoEstablecimiento: 0,
            internoRespuestasFormulario: 0
        })
        this.limpiarSeleccion()
    } 

    handleLoadingRespuestas(estadoNum) {      
        //console.log('[ListaFormularios] handleLoadingRespuestas ' + estadoNum)    
        var estado = false
        switch (parseInt(estadoNum)) {
            case 1:
                estado = true
                break;
        
            case 0:
                estado = false
                break;
            default:
                break;
        }     
        this.setState({ loadingRespuestas: estado })        
    }

    AccionFormat = (cell, row) => {                     
        return (
            <div>
                <button type="button" className="btn btn-outline-primary btn-sm ts-buttom" size="sm" onClick={() => this.editarFormularioRGRL(this.state.internoRespuestasFormulario)} >
                    Editar
                </button>
                <button type="button" className="btn btn-outline-danger btn-sm ml-2 ts-buttom" size="sm">
                    Borrar
                </button>
                <button type="button" className="btn btn-outline-danger btn-sm ml-2 ts-buttom" size="sm" >
                    Imprimir
                </button>
            </div>
        );
    }    

    render(){
        //console.log('this.state.InternoFormulario', this.state.internoFormulario)
        
        //console.log('diable', disable)
        
        //console.log('formularioRGRL', this.state.formularioRGRL)
        //console.log('referenteDatos', this.state.referenteDatos)
        const { SearchBar } = Search;

        const selectOptions = {
            'En proceso de carga': 'En proceso de carga',
            'Confirmado': 'Confirmado'
        };

        const options = {           
            custom: true,
            sizePerPage: 25,
            hideSizePerPage: true,
            hidePageListOnlyOnePage: true,
            totalSize: this.state.formulariosCargados ? this.state.formulariosCargados.length : 0,
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

        //#region  Columnas
        console.log('[ListaFormularios] cuit: ' + this.props.cuit)
        let columns = 
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
                filter: textFilter({
                    placeholder: 'Ingrese Establecimiento...',
                    className: 'test1'
                })
            },
            {
                dataField: 'Descripcion',
                text: 'Formulario'
            },
            {
                dataField: 'Estado',
                text: 'Estado   ',
                sort: true,
                formatter: cell => selectOptions[cell],
                filter: selectFilter({
                    options: selectOptions,
                    placeholder: 'Todos',
                    className: 'test1',
                })
            },
            {
                dataField: 'CreacionFechaHora',
                text: 'Fecha Hora Creacion',
                formatter: FormatearFechaCelda,
                sort: true           
            },
            {
                dataField: 'CompletadoFechaHora',
                text: 'Fecha Hora Confirmado',
                formatter: FormatearFechaCelda
            },
            {
                dataField: 'InternoFormulario',
                text: 'InternoFormulario',
                hidden: true
            },
            {
                dataField: 'InternoEstablecimiento',
                text: 'InternoEstablecimiento',
                hidden: true
            },
            {
                text: "",
                dataField: "",
                formatter: this.AccionFormat,
            },
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
                sort: true,                            
            },
            {
                dataField: 'RazonSocial',
                text: 'Razon Social',
                sort: true
            }, 
            {
                dataField: 'Direccion',
                text: 'Establecimiento',
                sort: true
            },
            {
                dataField: 'Descripcion',
                text: 'Formulario'
            },
            {
                dataField: 'Estado',
                text: 'Estado   ',
                sort: true,
                formatter: cell => selectOptions[cell],
                filter: selectFilter({
                    options: selectOptions,
                    placeholder: 'Todos',
                    className: 'test1',
                })
            },
            {
                dataField: 'CreacionFechaHora',
                text: 'Fecha Hora Creacion',
                formatter: FormatearFechaCelda,
                sort: true           
            },
            {
                dataField: 'CompletadoFechaHora',
                text: 'Fecha Hora Confirmado',
                formatter: FormatearFechaCelda
            },
            {
                dataField: 'InternoFormulario',
                text: 'InternoFormulario',
                hidden: true
            },
            {
                dataField: 'InternoEstablecimiento',
                text: 'InternoEstablecimiento',
                hidden: true
            },
            {
                text: "",
                dataField: "",
                formatter: this.AccionFormat,
            },
        ];
        //#endregion

        //#region Tabla
        const contentTable = ({ paginationProps, paginationTableProps }) => (
            <div>
                <PaginationListStandalone 
                    { ...paginationProps}
                />
              <ToolkitProvider
                keyField="Interno"
                columns={ columns }
                data={ this.state.formulariosCargados }
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
                        />:
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
        
        //#region Return
        //console.log('this.state.loadingRespuestas', this.state.loadingRespuestas)
        return <div>
                {this.state.loadingFormularios === true ?
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
                            {this.state.loadingRespuestas === true ?
                                <Spinner />
                            :
                            <>
                                <BotonesPaginaDinamicos
                                    confirmado={false}                            
                                    pagina={this.state.pagina}
                                    cambioPagina={this.handleCambioPagina}
                                    paginas={this.state.paginas}
                                /> 
                        
                                <MostrarRespuestas
                                    secciones={this.state.secciones}
                                    preguntas={this.state.preguntas}
                                    respuestasCuestionario={this.state.respuestasCuestionario}
                                    gremios={this.state.respuestasGremio}
                                    contratistas={this.state.respuestasContratista}
                                    responsables={this.state.respuestasResponsable}
                                    pagina={this.state.pagina}     
                                    handleLoadingRespuestas={this.handleLoadingRespuestas}                           
                                />
                            </>
                            }
                        </>
                    :
                        null                    
                    }
                </>
                }
        </div>
        //#endregion
    }
}


export default ListaFormularios;