import React, { Component } from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import logo from '../../images/Header.png'
import moment from 'moment';

// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
  },
  section: {
    margin: 5,
    textAlign: 'center',
  },
  sectionImage: {
    alignContent: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  imagen: {
    height: 80,
    width: 200,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    left: 160,
  },
  texto: {
    fontSize: 12,
    textAlign: 'center'
  }
});

class ComprobantePresentacion extends Component { 
  componentDidMount() {
    //cantidad de establecimientos
  }
  render() {
    console.log('[ComprobantePresentacion] presentacion: ' + JSON.stringify(this.props.presentacion))
    console.log('[ComprobantePresentacion] props: ' + JSON.stringify(this.props))
    const tipo = this.props.presentacion.tipo === 'R' ? 'RGRL' : 'RAR'
    return (
      <Document>
        <Page size={[500,200]} style={styles.page}>
          <View style={styles.sectionImage}>
            <Image source={logo} style={styles.imagen} />
          </View>        
          <View style={styles.section}>          
          <Text style={styles.texto}>Formulario: {tipo}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.texto}>CUIT: {this.props.cuit}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.texto}>Periodo: {this.props.presentacion.label}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.texto}>Fecha de Presentación: {moment(this.props.presentacion.fechaHoraGeneracion).format('DD/MM/YYYY HH:mm')}</Text>
          </View>
        </Page>
      </Document>
    )
  }
}
export default ComprobantePresentacion;