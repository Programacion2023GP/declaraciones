import React from "react";
import { Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import GomezLogo from "../../../../assets/icons/logo-gpd.png";

// Definir estilos
const styles = StyleSheet.create({
   page: {
      padding: 30
   },
   header: {
      textAlign: "center",
      marginBottom: 5
   },
   title: {
      fontSize: 14,
      textAlign: "center",
      marginBottom: 10
   },
   subtitle: {
      fontSize: 12,
      textAlign: "center",
      marginBottom: 5
   },
   section: {
      marginVertical: 10,
      padding: 10,
      fontSize: 10
   },
   bold: {
      fontWeight: "bold"
   },
   table: {
      display: "table",
      width: "auto",
      borderStyle: "solid",
      borderWidth: 1,
      marginBottom: 10
   },
   tableRow: {
      flexDirection: "row"
   },
   tableCol: {
      width: "33.33%",
      borderStyle: "solid",
      borderWidth: 1,
      padding: 5
   },
   tableCell: {
      fontSize: 8
   },
   footer: {
      fontSize: 8,
      textAlign: "center",
      marginTop: 10
   },
   logo: {
      width: 200,
      height: 100,
      marginBottom: 10
   }
});

export const Acuse = ({ data = [],declaracion="", }) => {
   const {
      Nombre = "",
      PrimerApellido = "",
      SegundoApellido = "",
      Curp = "",
      Rfc = "",
      FechaRegistro="",
      Homoclave = "",
      CorreoInstitucional = "",
      CorreoPersonal = "",
      TelefonoCasa = "",
      TelefonoCelularPersonal = "",
      Id_EstadoCivil = "",
      Aclaraciones = "",
      Id_Nacionalidad = "",
      Id_PaisNacimiento = "",
      Id_RegimenMatrimonial = ""
   } = data[0] || {};
   return (
      <Page style={styles.page}>
         <View style={styles.header}>
            <Image src={GomezLogo} style={styles.logo} />
         </View>

         <View style={styles.title}>
            <Text>DECLARACIÓN DE SITUACIÓN PATRIMONIAL</Text>
         </View>

         <View style={styles.section}>
            <Text style={styles.subtitle}>Gómez Palacio, Dgo., 2024-7-1</Text>
            <Text style={styles.subtitle}>TIPO DE RECEPCIÓN: INTERNET 2024-3-11</Text>
            <Text style={styles.subtitle}>DECLARACIÓN: SITUACIÓN PATRIMONIAL - {declaracion}</Text>
            <Text style={styles.subtitle}>AÑO DECLARADO: {new Date(FechaRegistro).getFullYear()}</Text>
         </View>

         <View style={styles.section}>
            <Text style={styles.bold}>DEL FUNCIONARIO:</Text>
            <View style={styles.table}>
               <View style={styles.tableRow}>
                  <View style={styles.tableCol}>
                     <Text style={styles.tableCell}>REGISTRO FEDERAL DEL CONTRIBUYENTE:</Text>
                     <Text style={styles.tableCell}>{Rfc}</Text>
                  </View>
                  <View style={styles.tableCol}>
                     <Text style={styles.tableCell}>CLAVE ÚNICA DEL REGISTRO POBLACIONAL:</Text>
                     <Text style={styles.tableCell}>{Curp}</Text>
                  </View>
                  <View style={styles.tableCol}>
                     <Text style={styles.tableCell}>Apellido Paterno:</Text>
                     <Text style={styles.tableCell}>{PrimerApellido}</Text>
                  </View>
               </View>
               <View style={styles.tableRow}>
                  <View style={styles.tableCol}>
                     <Text style={styles.tableCell}>Apellido Materno:</Text>
                     <Text style={styles.tableCell}>{SegundoApellido}</Text>
                  </View>
                  <View style={styles.tableCol}>
                     <Text style={styles.tableCell}>Nombre(s):</Text>
                     <Text style={styles.tableCell}>{Nombre}</Text>
                  </View>
               </View>
            </View>
         </View>

         <View style={styles.section}>
            <Text style={styles.bold}>DEL SERVICIO PÚBLICO:</Text>
            <Text>Cargo: Síndico Municipal</Text>
            <Text>Dependencia: Republicano Ayuntamiento de Gómez Palacio, Durango</Text>
            <Text>Área de adscripción (Dirección, Departamento o Coordinación): Sindicatura Municipal</Text>
         </View>

         <View style={styles.footer}>
            <Text>
               ESTE DOCUMENTO VALIDA EL ENVÍO DE INFORMACIÓN A TRAVÉS DE INTERNET CONTINE UN IDENTIFICADOR ÚNICO PARA VALIDAR SU DECLARACIÓN EN CASO DE ACLARACIONES
            </Text>
            <Text>La fecha y hora de recepción efectiva de su declaración es la fecha y hora del servidor.</Text>
         </View>
      </Page>
   );
};
