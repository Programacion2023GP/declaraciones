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

export const Acuse = ({ item}) => {
   const [row, setRow] = useState({});

   const init = async () => {
      console.log(item)
      const datosGenerales = await GetAxios(`datosgenerales/index/${item.Folio}`)
    if (Array.isArray(datosGenerales) && datosGenerales.length > 0) {
      setRow(datosGenerales[0]);
    }

   }
   useEffect(() => { init() },[]);

 
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
   const fechaRegistro = formatFecha(item?.FechaRegistroFormateada, true);
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
                  <Text style={styles.folioText}>{item?.Folio}</Text>

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
               DECLARACIÓN: SITUACIÓN PATRIMONIAL - {item?.Declaracion} - {item?.Tipo_declaracion}
            </Text>
            <Text style={styles.subtitle}>
AÑO DECLARADO: {
  (() => {
    const fechaStr = item?.FechaRegistroFormateada; 
    if (!fechaStr) return ""; // Si no hay fecha aún
    const [dia, mes, anio] = fechaStr.split("/").map(Number); // convierte a número
    if (!dia || !mes || !anio) return ""; // si algo falla
    const fecha = new Date(anio, mes - 1, dia); // mes-1 porque JS usa 0-index
    return item?.Tipo_declaracion === "Modificación"
      ? fecha.getFullYear() - 1
      : fecha.getFullYear();
  })()
}



            </Text>
         </View>

         <View style={styles.section}>
            <Text style={styles.bold}>DEL FUNCIONARIO:</Text>
            <View style={styles.table}>
               <View style={styles.tableRow}>
                  <View style={styles.tableCol}>
                     <Text style={styles.tableCell}>REGISTRO FEDERAL DEL CONTRIBUYENTE:</Text>
                     <Text style={styles.tableCell}>{row?.Rfc}</Text>
                  </View>
                  <View style={styles.tableCol}>
                     <Text style={styles.tableCell}>CLAVE ÚNICA DEL REGISTRO POBLACIONAL:</Text>
                     <Text style={styles.tableCell}>{row?.Curp}</Text>
                  </View>
                  <View style={styles.tableCol}>
                     <Text style={styles.tableCell}>Genero</Text>
                     <Text style={styles.tableCell}>{item?.Gender}</Text>
                  </View>
               </View>

               <View style={styles.tableRow}>
                  <View style={styles.tableCol}>
                     <Text style={styles.tableCell}>Apellido Paterno:</Text>
                     <Text style={styles.tableCell}>{item?.ApPaterno}</Text>
                  </View>
                  <View style={styles.tableCol}>
                     <Text style={styles.tableCell}>Apellido Materno:</Text>
                     <Text style={styles.tableCell}>{item?.ApMaterno}</Text>
                  </View>
                  <View style={styles.tableCol}>
                     <Text style={styles.tableCell}>Nombre(s):</Text>
                     <Text style={styles.tableCell}>{item?.Nombre}</Text>
                  </View>
               </View>
            </View>
         </View>

         <View style={styles.section}>
            <Text style={styles.bold}>DEL SERVICIO PÚBLICO:</Text>
            <Text>Cargo: {item?.DenominacionPuesto || ""}</Text>
            <Text>Dependencia: {item?.Dependencia || ""}</Text>
            <Text>Área de adscripción: {item?.AereaAdscripcion || ""}</Text>
         </View>

         <View style={styles.footer}>
            <Text>
               ESTE DOCUMENTO VALIDA EL ENVÍO DE INFORMACIÓN A TRAVÉS DE INTERNET CONTIENE UN IDENTIFICADOR ÚNICO PARA VALIDAR SU DECLARACIÓN EN CASO DE ACLARACIONES
            </Text>
            <Text>La fecha y hora de recepción efectiva de su declaración es la fecha y hora del servidor.</Text>
         </View>
         <View style={styles.signatureContainer}>
            <View style={styles.line} />
            <Text style={styles.name}>{item?.Nombre + " " + item?.ApPaterno + " " + item?.ApMaterno}</Text>
         </View>
      </Page>
   );
};
