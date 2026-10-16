import { View, Text, StyleSheet } from "@react-pdf/renderer";
import { Ngif } from "../../../Reusables/conditionals/Ngif";

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