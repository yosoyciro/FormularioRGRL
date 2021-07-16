import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import logo from '../../images/Header.png'
import moment from 'moment';


//#region Estilos
const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
  },
  containerTitulo: {

  },
  titulo: {
    margin: 1,
    textAlign: 'center',
  },
  containerSeccion: {
    margin: '2%'
  },
  seccion: {
    fontWeight: 'semibold'
  },
  sectionImage: {
    alignContent: 'left',
    justifyContent: 'left',
    marginBottom: 10,
  },
  imagen: {
    height: 40,
    width: 125,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    left: 0,
  },
  containerTexto: {
    marginLeft: '2%',
  },
  texto: {
    fontSize: 12,
    textAlign: 'center'
  },  
  containerCabeceraForm: {
    backgroundColor: 'green'
  },
  textoCabeceraForm: {
    color: 'white'
  }
});
//#endregion

const anexoI = 'El presente relevamiento deberá ser completado obligatoriamente en todos sus campos por el empleador oprofesional responsable, revistiendo los datos allí consignados carácter de declaración jurada. El relevamientodeberáserrealizadoparacadaunodelosestablecimientosquedispongalaempresa.Paralosempleadorescuyaactividadsedesarrolleenembarcaciones,lasmismasseránconsideradascomoestablecimientos.'
//'Encasodeempresasdeservicioseventuales,elempleadordeberállenarladeclaraciónjuradaentodosloscamposcorrespondientesasuresponsabilidad,debiendoconsignarporseparadoelnombreorazónsocialydomiciliodelosempleadoresdondeestáprestandoservicio.' &
//'ElpresenterelevamientodeestadodecumplimientodelanormativadesaludhigieneyseguridadlaboraldeberáseractualizadodeacuerdoaloestipuladoenelAnexoIIypresentadoantelaARTalaqueseencuentreaﬁliado.'
const ley19587 = '"… los términos "establecimiento", "explotación", "centro de trabajo" o "puesto de trabajo" designan todo lugardestinadoalarealizaciónodondeserealicentareasdecualquieríndoleonaturalezaconlapresenciapermanente,circunstancialotransitoriaoeventualdepersonasfísicas,yalosdepósitosydependenciasanexasdetodotipoenque las mismas deban permanecer o a los que asistan o concurran por el hecho o en ocasión del trabajo o con elconsentimientoexpresootácitodelprincipal… Asímismoelespaciofísico,geográﬁcoodomiciliodondeserealicenlastareas,debenestarbajoelcontrolmaterialoresponsabilidaddelempleador.'

const ImpresionFormulario = (props) => {   
    console.log('[ImpresionFormulario] props', props)            
    
    return (              
      <Document>
      <Page style={styles.page}>
          <View style={styles.sectionImage}>
          <Image source={logo} style={styles.imagen} />
            <View style={styles.titulo}>          
            <Text style={styles.texto}>RELEVAMIENTO GENERAL DE</Text>
            <Text style={styles.texto}>RIESGOS LABORALES (RGRL)</Text>      
            </View>            
          </View>  
          <View style={styles.containerSeccion}>
          <Text style={styles.seccion}>Anexo I - Resolución463/2009</Text>
          </View>  
          <View style={styles.containerTexto}>
          <Text style={styles.texto}>{anexoI}</Text>
          </View>              
          <View style={styles.containerSeccion}>
          <Text style={styles.seccion}>Según lo establece el art.2° de la Ley n°19.587</Text>
          </View>  
          <View style={styles.containerTexto}>
          <Text style={styles.texto}>{ley19587}</Text>
          </View>         

          {/* CABECERA DEL FORMULARIO */}
          {/* DATOS DE LA EMPRESA */}
          <View style={styles.containerCabeceraForm}>
          <Text style={styles.textoCabeceraForm}>DATOS DE LA EMPRESA</Text>
          </View> 
          <View>
            <Text>Razón Social: {props.referenteDatos[0].RazonSocial}</Text>
          </View>
          <View>
            <Text>CUIT: {props.referenteDatos[0].CUIT}</Text>
            <Text>Contrato:</Text>
            <Text>CIIU:</Text>
          </View>

          {/* DATOS DEL ESTABLECIMIENTO */}
          <View style={styles.containerCabeceraForm}>
          <Text style={styles.textoCabeceraForm}>DATOS DEL ESTABLECIMIENTO</Text>
          </View>
          <View>
            <Text>Nro Establecimiento: {props.establecimiento.Codigo}</Text>
            <Text>CIIU:</Text>
            <Text>Dirección del Establecimiento: {props.establecimiento.DomicilioCalle} {props.establecimiento.DomicilioNumero}</Text>
            <Text>CP: </Text>
            <Text>Localidad: {props.establecimiento.Localidad}</Text>
            <Text>Provincia: {props.establecimiento.Provincia}</Text>
            <Text>Superficie M2: {props.establecimiento.Superficie}</Text>
            <Text>Cant. Trabajadores: {props.establecimiento.CantTrabajadores}</Text>
            <Text>Produccion:</Text>
            <Text>Administrativos:</Text>
          </View>

          <View style={styles.containerCabeceraForm}>
          <Text style={styles.textoCabeceraForm}>ESTADO DE CUMPLIMIENTO EN EL ESTABLECIMIENTO DE LA NORMATIVA VIGENTE (DECRETO XXXXX)</Text>
          </View> 

          {/* RENDERIZO EL FORMULARIO */}
      </Page>
      </Document>
    )
};

export default ImpresionFormulario;