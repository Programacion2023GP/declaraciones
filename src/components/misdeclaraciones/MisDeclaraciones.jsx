import { useEffect, useState } from "react";
import DataTable from "../Reusables/table/DataTable";
import { Box, Card } from "@mui/material";
import { Request } from "../Reusables/request/Request";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Axios, GetAxios } from "../../services/services";
import { Error, Success } from "../../toasts/toast";
const MisDeclaraciones = ({}) => {
   useEffect(() => {
      init();
   }, []);
   const [data, setData] = useState([]);
   const [loading, setLoading] = useState(false);
   const init = async () => {
      setLoading(true);
      setData(await GetAxios(`apartados/show/${parseInt(localStorage.getItem("Id_User"))}`));
      setLoading(false);
   };
   const handleEditDeclaracion = (row) => {
      const { Folio, Tipo_declaracion, Declaracion, Hoja } = row;
      localStorage.setItem(Declaracion == "Interes" ? "id_Intereses" : "id_SituacionPatrimonial", Folio);
      let number = Declara(Declaracion, Tipo_declaracion);
      let page = Hoja;
      if (Declaracion == "Interes") {
         window.location.hash = `dashboard/declaraciones/2/${parseInt(page) + (+15 - 1)}`;
         // console.log("aqui",`dashboard/declaraciones/2/${parseInt(page) + (Hoja ==1 ?1:0) + (+14- 1)}`);
         return;
      }
      if ((Declaracion == "Completa" && Tipo_declaracion == 1 && Hoja >= "Inicial") || (Declaracion == "Completa" && Tipo_declaracion == "Conclusión" && Hoja >= 9)) {
         page = parseInt(page) - 1;
      }

      if (Declaracion == "Completa" && Tipo_declaracion == "Modificación") {
         page = parseInt(page) + 1;
      }
      if (Declaracion == "Simplificada") {
         page = parseInt(page) + 1;
      }
      window.location.hash = `dashboard/declaraciones/${number}/${parseInt(page) - 1}`;
   };
   const handleDelete = async (row) => {
      const { Declaracion } = row;

      setLoading(true);

      try {
         const response = await Axios.delete(`situacionpatrimonial/${Declaracion === "Interes" ? "interes/" : "delete/"}${row.Folio}`);
         init();
         setLoading(false);

         Success(response.data.data.message);
      } catch (error) {
         setLoading(false);

         Error(error.response.data.data.message);
      }
   };
   const Declara = (tipo_declaracion, declaracion) => {
      let number = 0;
      if (declaracion == "Inicial") {
         number = tipo_declaracion == "Simplificada" ? 4 : 1;
      } else if (declaracion == "Modificación") {
         number = tipo_declaracion == "Simplificada" ? 5 : 2;
      } else if (declaracion == "Conclusión") {
         number = tipo_declaracion == "Simplificada" ? 6 : 3;
      }
      return number;
   };
   const handleEyes = () => {
      alert("hola");
   };
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
                     //  options={["CHARTS", "PDF", "EXCEL"]}
                     // moreButtons={[{ icon: VisibilityIcon, handleButton: handleEyes, color: "green", conditions: ["Status !='En proceso'"] }]}
                     // captionButtons={[
                     //    {text:"mas",handleButton:()=>{alert("dd")},icon:VisibilityIcon}
                     // ]}
                     buttonsMenu={false}
                     loading={loading}
                     filterGlobal={true}
                     filter={true}
                     headers={["Folio", "Nombre", "Apellido Paterno", "Apellido Materno", "Tipo Declaración", "Status", "Fecha", "Tipo de declaración"]}
                     data={data}
                     dataHidden={["Hoja"]}
                     pagination={[5, 10, 25]}
                     editButton={true}
                     deleteButton={true}
                     handleDelete={handleDelete}
                     conditionExistEditButton={["Status !='Terminada'"]}
                     speakRow
                     // conditionExistDeleteButton={["Status !='Terminada'"]}
                     handleEdit={handleEditDeclaracion}
                     // options={true}
                  />
               </Box>
            </Card>
         </Box>
      </>
   );
};
export default MisDeclaraciones;
