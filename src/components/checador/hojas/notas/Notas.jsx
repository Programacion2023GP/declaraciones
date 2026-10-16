import { View, Text, StyleSheet } from "@react-pdf/renderer";
import { Ngif } from "../../../Reusables/conditionals/Ngif";
export const MiniNota = ({ testada = true, message, firmante, declaracion, datosSubrayados }) => {
   return (
      <Ngif condition={testada}>
         <View style={ministyles.container}>
            <Text style={ministyles.text}>
               <Text style={ministyles.nota}>NOTA: </Text>
               {message}
            </Text>

            {firmante && (
               <Text style={ministyles.text}>{firmante}</Text>
            )}

            {declaracion && (
               <Text style={ministyles.text}>{declaracion}</Text>
            )}

            {datosSubrayados && (
               <Text style={ministyles.subrayado}>{datosSubrayados}</Text>
            )}
         </View>
      </Ngif>
   );
};

const ministyles = StyleSheet.create({
   container: {
      marginBottom: 6,
      marginTop: 4,
   },
   nota: {
      fontSize: 6,
      fontWeight: "bold",
      color: "#000000",
   },
   text: {
      fontSize: 6,
      color: "#333",
      lineHeight: 1.4,
      textAlign: "justify",
      marginBottom: 3,
   },
   subrayado: {
      fontSize: 6,
      color: "#333",
      lineHeight: 1.4,
      textAlign: "justify",
      backgroundColor: "#d3d3d3", // gris bajito como marcatextos
   },
});
export const Notas = ({ testada = true, message }) => {
   return (
      <Ngif condition={testada}>
         <View wrap style={styles.container}>
            <View style={styles.header}>
               <Text style={styles.headerText}>Nota:</Text>
            </View>
            <View style={styles.messageContainer}>
               <Text style={styles.messageText}>
                  {message}
               </Text>
            </View>
         </View>
      </Ngif>
   );
};

const styles = StyleSheet.create({
   container: {
      marginBottom: 10,
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 5,
      padding: 10
   },
   header: {
      backgroundColor: "#f0f0f0",
      padding: 5,
      marginBottom: 5,
      borderBottomWidth: 1,
      borderBottomColor: "#ddd"
   },
   headerText: {
      fontSize: 12,
      fontWeight: "bold",
      color: "#000000"
   },
   messageContainer: {
      padding: 5,

   },
   messageText: {
    lineHeight: 1.5,
      fontSize: 10,
      textTransform: "capitalize",
      textAlign: "justify",

    }
});