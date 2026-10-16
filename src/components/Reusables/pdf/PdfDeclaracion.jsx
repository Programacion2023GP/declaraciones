import { Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { Ngif } from "../conditionals/Ngif";
import { DocumentPDF, ModalPDF } from "./PdfComponent";
import { Fragment, useEffect } from "react";
import { MiniNota } from "../../checador/hojas/notas/Notas";

const styles = StyleSheet.create({
   container: {
      height: "100%",
      padding: 20,
      fontFamily: "Helvetica",
      backgroundColor: "#f5f5f5",
   },
   section: {
      width: "100%",
      marginBottom: 15,
      padding: 10,
      borderRadius: 8,
      backgroundColor: "#ffffff",
      borderWidth: 1,
      borderColor: "#ddd",
   },
   sectionHeader: {
      width: "100%",
      textAlign: "center",
      backgroundColor: "#4a90e2",
      color: "#ffffff",
      fontSize: 16,
      fontWeight: "bold",
      paddingVertical: 10,
      borderRadius: 5,
      marginBottom: 12,
   },
   row: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      marginBottom: 12,
      alignItems: "flex-start",
   },
   column: {
      flexBasis: "30%",
      marginBottom: 12,
      paddingHorizontal: 5,
   },
   label: {
      fontSize: 11,
      fontWeight: "bold",
      color: "#333",
      width: "100%",
      textAlign: "center",
      marginBottom: 6,
   },
   input: {
      fontSize: 12,
      color: "#000",
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 4,
      paddingVertical: 5,
      paddingHorizontal: 4,
      textAlign: "center",
      backgroundColor: "#fafafa",
   },
   squardBox: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "wrap",
      gap: 2,
   },
   squardText: {
      border: "1px solid #999",
      borderRadius: 4,
      width: 18,
      height: 18,
      fontSize: 10,
      textAlign: "center",
      lineHeight: 1.8,
      color: "#333",
      marginRight: 2,
   },
   chekboxPdf: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      width: 20,
      height: 20,
      borderWidth: 1,
      borderColor: "#999",
      borderRadius: 4,
      marginLeft: 5,
   },
   chekboxPdfText: {
      fontSize: 12,
      marginRight: 5,
      textAlign: "center",
      color: "#333",
   },
   checkboxChecked: {
      backgroundColor: "#4a90e2",
   },
});


const TablePdf = ({ title, children }) => {
   return (
      <>
         <View style={styles.section}>

            {title && <Text style={styles.sectionHeader}>{title}</Text>}
         </View>
         {children}
      </>
   );
};

export const TextPdf = ({ title, text, width }) => {
   useEffect(() => { }, [title, text, width])
   return (
      <View
         wrap={false}
         style={[
            styles.column,
            { flexBasis: `${width || 50}%` } // Ajustado el ancho predeterminado
         ]}
      >
         <Text style={styles.label}>{title}</Text>
         <Text style={styles.input}>{text}</Text>
      </View>
   );
};

export const SquardsTextPdf = ({ title, text, width }) => {
   useEffect(() => { }, [title, text, width])

   return (
      <View
         wrap={false}

         style={[
            styles.column,
            { flexBasis: `${width || 100}%` } // Ajustar el ancho predeterminado si es necesario
         ]}
      >
         <Text style={styles.label}>{title}</Text>
         <View style={styles.squardBox}>
            {text.split("").map((letter, index) => (
               <Text key={index} style={styles.squardText}>
                  {letter}
               </Text>
            ))}
         </View>
      </View>
   );
};
export const OptionsPdf = ({ title, width, options = [], value }) => {
   useEffect(() => { }, [title, options, width, value])

   return (
      <View
         wrap={false}

         style={[
            styles.column,
            { flexBasis: `${width || 100}%` } // Ajustar el ancho predeterminado si es necesario
         ]}
      >
         <Text style={styles.label}>{title}</Text>
         <View style={styles.squardBox}>
            {options.map((letter, index) => (
               <>
                  <Text key={index} style={styles.chekboxPdfText}>
                     {letter}
                  </Text>
                  <View style={{ ...styles.chekboxPdf, backgroundColor: letter === value && "black" }}>
                     {/* {value === letter && <Text style={styles.checkboxX}>X</Text>} */}
                  </View>
               </>
            ))}
         </View>
      </View>
   );
};
export const PdfDeclaracion = ({ fileName, open, setOpen, title, watermark, datas, children, subtitule }) => {
   // useEffect(()=>{},[])
   return (
      <>
         <ModalPDF fileName={fileName} open={open} setOpen={setOpen} formTitle={title} watermark={watermark} formData={{}}>
            {children}
         </ModalPDF>
      </>
   );
};
export const PagePdf = ({ title, children, nota = false }) => {
   return (
      <>
         <DocumentPDF watermark={''} formData={{}} nota={nota} isOfficialDoc={false}>
            {nota && (
               <MiniNota
                  message="SIRVASE A REVISAR LAS NORMAS E INSTRUCTIVO PARA EL LLENADO Y PRESENTACION DEL FORMATO DE DECLARANTE DE SITUACION PATRIMONIAL Y DE INTERESES"
                  firmante="C.____________________________________________________________________________________________________________"
                  declaracion="BAJO PROTESTA DE DECIR VERDAD, PRESENTO A USTED MI DECLARACIÓN DE SITUACIÓN PATRIMONIAL Y DE INTERESES, CONFORME A LO DISPUESTO EN LA LEY GENERAL DE RESPONSABILIDADES ADMINISTRATIVAS, LA LEY GENERAL DEL SISTEMA NACIONAL ANTICORRUPCION Y LA NORMATIVIDAD APLICABLE"
                  datosSubrayados="LOS DATOS DEL TERCER, SIEMPRE Y CUANDO SEAN PERSONAS FISICAS, Y LOS DATOS RESALTADOS NO SEAN PUBLICOS"
               />
            )}
            <TablePdf title={title}>{children}</TablePdf>
         </DocumentPDF>
      </>
   );
};
