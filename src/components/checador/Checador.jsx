import { useEffect, useState } from "react";
import DataTable from "../Reusables/table/DataTable";
import { Box, Card } from "@mui/material";
import { Request } from "../Reusables/request/Request";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Axios, GetAxios } from "../../services/services";
import { Error, Success } from "../../toasts/toast";
import { ModalPDF } from "../Reusables/pdf/PdfComponent";
import { StyleSheet, Text, View } from "@react-pdf/renderer";
export const Checador = ({}) => {
   useEffect(() => {
      init();
   }, []);
   const [data, setData] = useState([]);
   const [loading, setLoading] = useState(false);
   const [open, setOpen] = useState(true);

   const init = async () => {
      setLoading(true);
      setData(await GetAxios(`apartados/all`));
      setLoading(false);
   };
   const datosGenerales = [
      { title: "Nombre", text: "Luis" },
      { title: "App Paterno", text: "GTZ" },
      { title: "App Materno", text: "HDZ" }
   ];
   return (
      <>
         <Box
            alignItems={"center"}
            justifyContent={"center"}
            display={"flex"}
            sx={{
               overflow: "hidden", // Cambiar overflow a "hidden" para evitar que la tabla se desborde
               border: "2px solid #007bff",
               borderRadius: "10px",
               margin: "1rem",
               padding: "1rem",

               boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)"
            }}
         >
            <Card sx={{ maxWidth: "100%", margin: "auto" }}>
               <Box sx={{ minWidth: "100%", overflowX: "auto" }}>
                  <DataTable
                     options={["CHARTS", "EXCEL", "COLORS"]}
                     // , "PDF",
                     moreButtons={[{ icon: VisibilityIcon, handleButton: () => {}, color: "green", conditions: [] }]}
                     // captionButtons={[
                     //    {text:"mas",handleButton:()=>{alert("dd")},icon:VisibilityIcon}
                     // ]}
                     Trbacground={[
                        { color: "#D6EDC9", conditions: ["Declaracion =='Completa' && Status == 'Terminada'"], text: "Declaraciones completas terminadas" },
                        { color: "#EAF4E1", conditions: ["Declaracion =='Simplificada' && Status == 'Terminada'"], text: "Declaraciones simplificadas terminadas" },
                        { color: "#F2F2CC", conditions: ["Status == 'En proceso'"], text: "Declaraciones sin finalizar" }
                     ]}
                     buttonsMenu={false}
                     loading={loading}
                     filterGlobal={true}
                     filter={true}
                     headers={[
                        "Folio",
                        "Nombre",
                        "Apellido Paterno",
                        "Apellido Materno",
                        "Modalidad de la declaración",
                        "Status",
                        "Fecha",
                        "Modalidad de la declaración"
                     ]}
                     data={data}
                     // por hacer  getUrl ={}
                     // refreshRequest ={}
                     //
                     pagination={[8, 20, 40, 60, 100]}
                     //  conditionExistEditButton={["Status !='Terminada'"]}
                     speakRow
                     // conditionExistDeleteButton={["Status !='Terminada'"]}
                     // options={true}
                  />
               </Box>
            </Card>
            <ModalPDF open={true} setOpen={setOpen} formTitle={"OFICIO DE VALES"} watermark={"Control Vehícular"} formData={{}}>
               <TablePdf data={datosGenerales} />
            </ModalPDF>
         </Box>
      </>
   );
};

const styles = StyleSheet.create({
   container: {
     flexDirection: 'row',
     flexWrap: 'wrap',
   },
   column: {
     width: '33.33%', // Ajusta el ancho de cada columna
     marginBottom: 10,
     padding: 5,
     boxSizing: 'border-box',
   },
   title: {
      backgroundColor:"black",
      color:"white",
      fontSize:"15px",
      lineHeight:"2px",
      padding:".2rem",
      textAlign:"center",
     fontWeight: 'bold',
     marginBottom: 4,
   },
   text: {
     fontSize: 12,
   },
 });
 
 const TablePdf = ({ data }) => {
   return (
     <View style={styles.container}>
       {data.map((item, index) => (
         <View key={index} style={styles.column}>
           <Text style={styles.title}>{item.title}</Text>
           <Text style={styles.text}>{item.text}</Text>
         </View>
       ))}
     </View>
   );
 };
 
 
