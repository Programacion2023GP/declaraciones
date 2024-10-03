import React, { useEffect, useState } from "react";
import { Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import GomezLogo from "../../../../assets/icons/logo-gpd.png";
import moment from "moment-timezone";
import { GetAxios } from "../../../../services/services";

// Definir estilos
const styles = StyleSheet.create({
   signatureContainer: {
      marginTop: 100, // Ajusta para posicionar la firma
      textAlign: "center"
   },
   line: {
      borderBottom: "1pt solid black",
      width: "200pt",
      marginBottom: 10,
      marginHorizontal: "auto"
   },
   name: {
      fontSize: 9,
      color: "gray"
   },
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
   },
   headerRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 10
   },
   folioTextContainer: {
      flexDirection: "column",
      alignItems: "flex-end"
   },
   folioText: {
      fontSize: 12,
      textAlign: "right",
      marginLeft: 10
   }
});

export const Acuse = ({ data = [], declaracion = "", row, adscripcion = [] }) => {
   const [ads, setAds] = useState(null);
   useEffect(() => {}, [row, adscripcion]);

   const {
      Nombre = "",
      PrimerApellido = "",
      SegundoApellido = "",
      Curp = "",
      Rfc = "",
      FechaRegistro = "",
      Gender = "",
      AreaAdscripcion = "",
      valor = "",
      EmpleoCargoComision = "",
      CorreoPersonal = "",
      TelefonoCasa = "",
      TelefonoCelularPersonal = "",
      Id_EstadoCivil = "",
      Aclaraciones = "",
      Id_Nacionalidad = "",
      Id_PaisNacimiento = "",
      Id_RegimenMatrimonial = "",
      Id_SituacionPatrimonial = ""
   } = data[0] || {};

   const formatFecha = (fecha, time = false) => {
      const date = moment.tz(fecha, "America/Monterrey"); // Asegúrate de que fecha tenga la zona horaria correcta

      if (!date.isValid()) {
         return ""; // Si la fecha no es válida, retorna una cadena vacía
      }

      const year = date.format("YYYY");
      const month = date.format("MM");
      const day = date.format("DD");
      const hours = date.format("hh"); // Usa 'hh' para horas en formato 12 horas
      const minutes = date.format("mm");
      const seconds = date.format("ss");
      const ampm = date.format("a"); // 'a' para indicar am/pm
      const dateHour = time ? `${year}-${month}-${day} ${hours}:${minutes}:${seconds} ${ampm}` : `${year}-${month}-${day}`;

      return dateHour;
   };

   const hoy = formatFecha(moment(), true); // Usando moment() para obtener la fecha y hora actual
   const fechaRegistro = formatFecha(FechaRegistro, true);
   const EmpleadoFechaAlta = formatFecha(row?.EmpleadoFechaAlta);

   return (
      <Page style={styles.page}>
         <View style={styles.header}>
            <View style={styles.headerRow}>
               <Image src={GomezLogo} style={styles.logo} />
               <View style={styles.folioTextContainer}>
                  <Text style={styles.folioText}>Fecha de impresión</Text>
                  <Text style={styles.folioText}>{hoy}</Text>

                  <Text style={styles.folioText}>Folio de impresión</Text>
                  <Text style={styles.folioText}>{Id_SituacionPatrimonial}</Text>

                  <Text style={styles.folioText}>Fecha de alta del empleado</Text>
                  <Text style={styles.folioText}>{EmpleadoFechaAlta}</Text>
               </View>
            </View>
         </View>

         <View style={styles.title}>
            <Text>DECLARACIÓN DE SITUACIÓN PATRIMONIAL</Text>
         </View>
         {/* Id_SituacionPatrimonial */}
         <View style={styles.section}>
            <Text style={styles.subtitle}>Gómez Palacio, Dgo., {hoy}</Text>
            <Text style={styles.subtitle}>Fecha de presentación {fechaRegistro}</Text>
            <Text style={styles.subtitle}>
               DECLARACIÓN: SITUACIÓN PATRIMONIAL - {declaracion} - {row?.Declaracion}
            </Text>
            <Text style={styles.subtitle}>AÑO DECLARADO: {new Date(FechaRegistro).getFullYear() - 1}</Text>
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
                     <Text style={styles.tableCell}>Genero</Text>
                     <Text style={styles.tableCell}>{row?.Gender}</Text>
                  </View>
               </View>

               <View style={styles.tableRow}>
                  <View style={styles.tableCol}>
                     <Text style={styles.tableCell}>Apellido Paterno:</Text>
                     <Text style={styles.tableCell}>{PrimerApellido}</Text>
                  </View>
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
            <Text>Cargo: {EmpleoCargoComision}</Text>
            <Text>Dependencia: {valor}</Text>
            <Text>Área de adscripción (Dirección, Departamento o Coordinación): {AreaAdscripcion}</Text>
         </View>

         <View style={styles.footer}>
            <Text>
               ESTE DOCUMENTO VALIDA EL ENVÍO DE INFORMACIÓN A TRAVÉS DE INTERNET CONTINE UN IDENTIFICADOR ÚNICO PARA VALIDAR SU DECLARACIÓN EN CASO DE ACLARACIONES
            </Text>
            <Text>La fecha y hora de recepción efectiva de su declaración es la fecha y hora del servidor.</Text>
         </View>
         <View style={styles.signatureContainer}>
            <View style={styles.line} />
            <Text style={styles.name}>{row?.Nombre + " " + row?.ApPaterno + " " + row?.ApMaterno}</Text>
         </View>
      </Page>
   );
};
