import React from "react";
import { Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import moment from "moment-timezone";
import GomezLogo from "../../../../assets/icons/logo-gpd.png";

// Estilos modernizados
const styles = StyleSheet.create({
   page: {
      padding: 30,
      fontFamily: "Helvetica",
      fontSize: 10,
      lineHeight: 1.4,
      color: "#333"
   },
   headerRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20
   },
   logo: { width: 100, height: 60 },
   folioContainer: { alignItems: "flex-end" },
   folioText: { fontSize: 9 },
   title: { fontSize: 16, textAlign: "center", marginBottom: 10, fontWeight: "bold" },
   subtitle: { fontSize: 11, textAlign: "center", marginBottom: 3 },
   section: { marginVertical: 10 },
   bold: { fontWeight: "bold" },
   table: { display: "table", width: "100%", borderStyle: "solid", borderWidth: 1, borderColor: "#ccc", marginBottom: 10 },
   tableRow: { flexDirection: "row" },
   tableCol: { width: "33%", borderRightWidth: 1, borderColor: "#ccc", padding: 5 },
   tableCell: { fontSize: 9 },
   footer: { fontSize: 8, textAlign: "center", marginTop: 20, color: "#666" },
   signatureContainer: { marginTop: 50, textAlign: "center" },
   line: { borderBottom: "1pt solid #000", width: "200pt", marginBottom: 5, marginHorizontal: "auto" },
   name: { fontSize: 9, color: "#555" }
});

const formatFecha = (fecha, showTime = false) => {
   const date = moment.tz(fecha, "America/Monterrey");
   if (!date.isValid()) return "";
   return showTime
      ? date.format("YYYY-MM-DD hh:mm:ss A")
      : date.format("YYYY-MM-DD");
};

export const Acuse = ({ data }) => {
   if (!data) return null;

   const {
      Id_SituacionPatrimonial,
      Rfc,
      Curp,
      Gender,
      Name,
      PaternalSurname,
      MaternalSurname,
      FechaRegistro,
      Adscripcion,
      Empleo,
      TipoDeclaracion,
      fechaAlta,
      FullName,
      Dependencia
   } = data;

   const hoy = formatFecha(moment(), true);
   const fechaRegistro = formatFecha(FechaRegistro, true);
   const fechaAltaEmpleado = formatFecha(fechaAlta);

   const añoDeclaracion =
      TipoDeclaracion === "Modificación"
         ? new Date(FechaRegistro).getFullYear() - 1
         : new Date(FechaRegistro).getFullYear();

   return (
      <Page style={styles.page}>
         <View style={styles.headerRow}>
            <Image src={GomezLogo} style={styles.logo} />
            <View style={styles.folioContainer}>
               <Text style={styles.folioText}>Fecha de impresión: {hoy}</Text>
               <Text style={styles.folioText}>Folio: {Id_SituacionPatrimonial}</Text>
               <Text style={styles.folioText}>Fecha de alta del empleado: {fechaAltaEmpleado}</Text>
            </View>
         </View>

         <Text style={styles.title}>DECLARACIÓN DE SITUACIÓN PATRIMONIAL</Text>

         <View style={styles.section}>
            <Text style={styles.subtitle}>Gómez Palacio, Dgo., {hoy}</Text>
            <Text style={styles.subtitle}>Fecha de presentación: {fechaRegistro}</Text>
            <Text style={styles.subtitle}>DECLARACIÓN: SITUACIÓN PATRIMONIAL - {TipoDeclaracion}</Text>
            <Text style={styles.subtitle}>AÑO DECLARADO: {añoDeclaracion}</Text>
         </View>

         <View style={styles.section}>
            <Text style={styles.bold}>DEL FUNCIONARIO:</Text>
            <View style={styles.table}>
               <View style={styles.tableRow}>
                  <View style={styles.tableCol}>
                     <Text style={styles.tableCell}>RFC</Text>
                     <Text style={styles.tableCell}>{Rfc}</Text>
                  </View>
                  <View style={styles.tableCol}>
                     <Text style={styles.tableCell}>CURP</Text>
                     <Text style={styles.tableCell}>{Curp}</Text>
                  </View>
                  <View style={styles.tableCol}>
                     <Text style={styles.tableCell}>Género</Text>
                     <Text style={styles.tableCell}>{Gender}</Text>
                  </View>
               </View>

               <View style={styles.tableRow}>
                  <View style={styles.tableCol}>
                     <Text style={styles.tableCell}>Apellido Paterno</Text>
                     <Text style={styles.tableCell}>{PaternalSurname}</Text>
                  </View>
                  <View style={styles.tableCol}>
                     <Text style={styles.tableCell}>Apellido Materno</Text>
                     <Text style={styles.tableCell}>{MaternalSurname}</Text>
                  </View>
                  <View style={styles.tableCol}>
                     <Text style={styles.tableCell}>Nombre(s)</Text>
                     <Text style={styles.tableCell}>{Name}</Text>
                  </View>
               </View>
            </View>
         </View>

         <View style={styles.section}>
            <Text style={styles.bold}>DEL SERVICIO PÚBLICO:</Text>
            <Text>Cargo: {Empleo}</Text>
            <Text>Dependencia: {Dependencia}</Text>
            <Text>Área de adscripción: {Adscripcion}</Text>
         </View>

         <View style={styles.footer}>
            <Text>
               Este documento valida el envío de información a través de internet y contiene un identificador único.
            </Text>
            <Text>
               La fecha y hora de recepción efectiva de su declaración es la fecha y hora del servidor.
            </Text>
         </View>

         <View style={styles.signatureContainer}>
            <View style={styles.line} />
            <Text style={styles.name}>{FullName}</Text>
         </View>
      </Page>
   );
};
