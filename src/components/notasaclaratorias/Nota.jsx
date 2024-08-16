import { Image, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { useEffect } from "react";
import GomezLogo from "../../assets/icons/logo-gpd.png";

export const Nota = ({ data }) => {
   useEffect(() => {
      console.log(data);
   }, [data]);
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
         textAlign: "start",
         justifyContent: "flex-start",
         marginVertical: 10,
         padding: 10,
         fontSize: 8
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
      tableCol2: {
         textAlign: "center",
         width: "100%",
         borderStyle: "solid",
         borderWidth: 1,
         padding: 5
      },
      tableCell: {
         fontSize: 8
      },
      footer: {
         textAlign: "start",
         justifyContent: "flex-start",
         marginVertical: 10,
         padding: 10,
         fontSize: 10
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
   const formatSpanishDate = (dateStr) => {
      if (!dateStr) {
         return "Fecha de Aclaración: Fecha inválida";
      }

      const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

      const [day, month, year] = dateStr.split("/").map(Number);
      return ` ${day} de ${months[month - 1]} del ${year}`;
   };

   // Ejemplo de uso en React Native
   <Text style={styles.tableCell}>{formatSpanishDate(data?.Date)}</Text>;

   return (
      <>
         <Page style={styles.page}>
            <View style={styles.header}>
               <View style={styles.headerRow}>
                  <Image src={GomezLogo} style={styles.logo} />
                  <View style={styles.folioTextContainer}>
                     <Text style={styles.folioText}>FOLIO DE RECEPCIÓN DE INTERNET</Text>
                     <Text style={styles.folioText}>{data?.Folio}</Text>
                  </View>
               </View>
            </View>

            <View style={styles.title}>
               <Text>Nota Aclaratoria</Text>
            </View>
            {/* Id_SituacionPatrimonial */}
            <View style={styles.section}>
               <Text style={styles.subtitle}>Gómez Palacio, Dgo., 2024-7-1</Text>
               {/* <Text style={styles.subtitle}>TIPO DE RECEPCIÓN: INTERNET {fechaRegistro}</Text> */}
               {/* <Text style={styles.subtitle}>DECLARACIÓN: SITUACIÓN PATRIMONIAL - {declaracion}</Text> */}
               <Text style={styles.subtitle}>AÑO DECLARADO: </Text>
            </View>

            <View style={styles.section}>
               <Text style={styles.bold}>DEL FUNCIONARIO:</Text>
               <View style={styles.table}>
                  <View style={styles.tableRow}>
                     <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>Apellido Paterno:</Text>
                        <Text style={styles.tableCell}>{data?.Name}</Text>
                     </View>
                     <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>Apellido Materno:</Text>
                        <Text style={styles.tableCell}>{data?.PaternalSurname}</Text>
                     </View>
                     <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>Nombre(s):</Text>
                        <Text style={styles.tableCell}>{data?.MaternalSurname}</Text>
                     </View>
                  </View>
                  <View style={styles.tableRow}>
                     <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>Sexo</Text>
                        <Text style={styles.tableCell}>{localStorage.getItem("Sexo")}</Text>
                     </View>
                     <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>Área de adscripción (Dirección, Departamento o Coordinación):</Text>
                        <Text style={styles.tableCell}>{data?.AreaAdscripcion}</Text>
                     </View>
                     <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>#De la ultima declaración:</Text>
                        <Text style={styles.tableCell}>{data?.Id_SituacionPatrimonial}</Text>
                     </View>
                  </View>
                  <View style={styles.tableRow}>
                     <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>Asunto:</Text>
                        <Text style={styles.tableCell}>{data?.Title}</Text>
                     </View>
                     <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>Fecha de Aclaración:</Text>
                        <Text style={styles.tableCell}>{formatSpanishDate(data?.Date)}</Text>
                     </View>
                     <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>Nota:</Text>
                        <Text style={styles.tableCell}>{data?.Description}</Text>
                     </View>
                  </View>
               </View>
            </View>

            <View style={styles.section}>
               <Text>
                  Este documento valida el envío de información a traves de internet contine un identificador único para validar su nota aclaratoria en caso de
                  aclaraciones
               </Text>
            </View>

            <View style={styles.footer}>
               <Text>
                  BAJO PROTESTA DE DECIR VERDAD, REITERO QUE LA INFORMACIÓN VERTIDA EN ESTA NOTA ACLARATORIA ES VERAZ, DE CONFORMIDAD CON LOS ARTÍCULOS 32 Y33 DE LA
                  LEYDE RESPONSABILIDADES ADMINISTRATIVAS.
               </Text>
            </View>
            <View style={styles.signatureContainer}>
               <View style={styles.line} />
               <Text style={styles.name}>{data?.Name + " " + data?.PaternalSurname + " " + data?.MaternalSurname}</Text>
            </View>
         </Page>
      </>
   );
};
