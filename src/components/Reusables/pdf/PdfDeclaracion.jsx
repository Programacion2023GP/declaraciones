import { Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { Ngif } from "../conditionals/Ngif";
import { DocumentPDF, ModalPDF } from "./PdfComponent";
import { Fragment, useEffect } from "react";

const styles = StyleSheet.create({
   container: {
      height: "100%",

      // page-break-before: always
   },
   section: {
      backgroundColor: "#ffffff",
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      minHeight: "675"
      // flexDirection: "row",
      // flexWrap: "wrap",
   },
   sectionHeader: {
      width:"100%",
      textAlign:"center",
      backgroundColor: "#d3d3d3",
      color: "#000000",
      fontSize: 16,
      fontWeight: "bold",
      padding: 20,
      lineHeight: 1,
      // width:"fit-content",
      // height:"fit-content",
      // marginBottom: 10,
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
   },
   row: {
      flexDirection: "row",
      flexWrap: "wrap", // Cambiado a wrap para permitir que las columnas se ajusten
      justifyContent: "space-between",
      marginBottom: 10,
      alignItems: "flex-start" // Ajustado para alinear los elementos en la parte superior
   },
   column: {
      flexBasis: "30%", // Ajustado según sea necesario
      marginBottom: 10,
      paddingLeft: 5, // Añadido para espacio izquierdo en las columnas
      paddingRight: 5 // Añadido para espacio derecho en las columnas
   },
   label: {
      fontSize: 12,
      fontWeight: "bold",
      color: "#000000",
      textAlign: "center"
   },
   input: {
      fontSize: 8,
      color: "#000000",
      borderBottomWidth: 1,
      borderLeftWidth: 1, // Añadido para corregir error en propiedades
      borderRightWidth: 1, // Añadido para corregir error en propiedades
      borderTopWidth: 0, // Añadido para corregir error en propiedades
      borderLeftColor: "#000000",
      borderRightColor: "#000000",
      borderBottomColor: "#000000",
      paddingLeft: 3,
      paddingRight: 1,
      paddingBottom: 0,
      textAlign: "center"
   },
   squardBox: {
      flexDirection: "row", // Asegura que los elementos se alineen en una fila
      justifyContent: "center", // Ajusta el centrado horizontal de los elementos
      alignItems: "center" // Ajusta el centrado vertical de los elementos
      // borderWidth: 1,
      // borderColor: "#000000",
      // borderRadius: 5,
      // padding: 10
   },
   squardText: {
      border: "1px solid black",
      padding: "1px",
      width: "15px",
      height: "15px",
      fontSize: 8,
      textAlign: "center",
      color: "#000000",
      justifyContent: "center", // Ajusta el centrado horizontal de los elementos
      alignItems: "center",
      display: "flex"
      // margin: 2,  // Añadido para espacio entre las letras
   },
   chekboxPdf: {
      flexDirection: "row", // Asegura que los elementos se alineen en una fila
      justifyContent: "center", // Ajusta el centrado horizontal de los elementos
      alignItems: "center", // Ajusta el centrado vertical de los elementos
      borderWidth: 1,
      borderColor: "#000000",
      borderRadius: 5,
      padding: 7
   },
   chekboxPdfText: {
      // border: "1px solid black",
      marginTop: "3px",
      padding: "1px",
      width: "20rem",
      height: "20rem",
      fontSize: 12,
      textAlign: "center",
      color: "#000000",
      justifyContent: "center", // Ajusta el centrado horizontal de los elementos
      alignItems: "center",
      display: "flex"
      // margin: 2,  // Añadido para espacio entre las letras
   },
   checkboxChecked: {
      backgroundColor: "black",
      //   backgroundImage: CheckedX,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center"
   }
});

const TablePdf = ({ title, children }) => {
   return (
      <>
            <Text style={styles.sectionHeader}>{title}</Text>
              {children}
      </>
   );
};

export const TextPdf = ({ title, text, width }) => {
   useEffect(()=>{},[title, text, width])
   return (
      <View 
      wrap={false}
         style={[
            styles.column,
            { flexBasis: `${width || 30}%` } // Ajustado el ancho predeterminado
         ]}
      >
         <Text style={styles.label}>{title}</Text>
         <Text style={styles.input}>{text}</Text>
      </View>
   );
};

export const SquardsTextPdf = ({ title, text, width }) => {
   useEffect(()=>{},[title, text, width])

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
   useEffect(()=>{},[title, options, width, value])

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
export const PdfDeclaracion = ({ open, setOpen, title, watermark, datas, children, subtitule }) => {
   // useEffect(()=>{},[])
   return (
      <>
         <ModalPDF open={open} setOpen={setOpen} formTitle={title} watermark={watermark} formData={{}}>
            {children}
         </ModalPDF>
      </>
   );
};
export const PagePdf = ({ title, children }) => {
   return (
      <>
         <DocumentPDF watermark={title} formData={{}} isOfficialDoc={false}>
            <TablePdf title={title}>{children}</TablePdf>
         </DocumentPDF>
      </>
   );
};
