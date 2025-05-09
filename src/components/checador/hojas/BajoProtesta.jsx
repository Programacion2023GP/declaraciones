import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Crear estilos para el documento
const styles = StyleSheet.create({
   page: {
      padding: 30,
      fontFamily: "Helvetica"
   },
   container: {
      padding: 20
   },
   title: {
      fontSize: 16,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 20
   },
   paragraph: {
      marginBottom: 15,
      fontSize: 12,
      lineHeight: 1.5
   },
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
   signature: {
      fontSize: 12
   }
});

const DeclarationDocument = ({row,interes,message=""}) => {
   console.log("nombre de info",row)
   return (
      <Page style={styles.page}>
         <View style={styles.container}>
            <Text style={styles.title}>BAJO PROTESTA</Text>
            <Text style={styles.paragraph}>
               BAJO PROTESTA DE DECIR VERDAD, PRESENTO MI DECLARACION DE 
               {interes ? " INTERES ":" SITUACION PATRIMONIAL DE "}
               
                {message}, DE CONFORMIDAD CON LOS ARTICULOS 32 Y 33 CONFORME A LO
               DISPUESTO EN LA LEY GENERAL DE RESPONSABILIDADES ADMINISTRATIVAS, LA LEY GENERAL DEL SISTEMA NACIONAL ANTICORRUPCION Y LA NORMATIVIDAD APLICABLE.
            </Text>
            <View style={styles.signatureContainer}>
               <View style={styles.line} />
               <Text style={styles.name}>
  {`${row?.Nombre || ''} ${row?.ApPaterno || row?.PrimerApellido || ''} ${row?.ApMaterno || row?.SegundoApellido || ''}`.trim()}
</Text>
            </View>
         </View>
      </Page>
   )
};

export default DeclarationDocument;
