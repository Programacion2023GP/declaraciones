import { useEffect, useState } from "react";
import DataTable from "../Reusables/table/DataTable";
import { Box, Card } from "@mui/material";
import { Request } from "../Reusables/request/Request";
import VisibilityIcon from "@mui/icons-material/Visibility";
export const MisDeclaraciones = ({}) => {
   const [data, setData] = useState([]);
   const { apartados } = Request({ peticiones: ["apartados"] });
   const handleEditDeclaracion = (row) => {
      const { Folio, Tipo_declaracion, Declaracion, Hoja } = row;
      localStorage.setItem("id_SituacionPatrimonial", Folio);
      let number = Declara(Declaracion, Tipo_declaracion);
      let page = Hoja;
      if ((Declaracion == "Completa" && Tipo_declaracion == 1 && Hoja >= 9) || (Declaracion == "Completa" && Tipo_declaracion == 3 && Hoja >= 9)) {
         page--;
      }
      window.location.hash = `dashboard/declaraciones/${number}/${page}`;
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
                     options={["CHARTS", "PDF", "EXCEL"]}
                     moreButtons={[{ icon: VisibilityIcon, handleButton: handleEyes, color: "green", conditions: ["Status !='En proceso'"] }]}
                     buttonsMenu={false}
                     loading={apartados.length > 0 ? false : true}
                     filterGlobal={true}
                     filter={true}
                     headers={["Folio", "Nombre", "Apellido Paterno", "Apellido Materno", "Tipo Declaración", "Status", "Fecha", "Tipo de declaración"]}
                     data={apartados}
                     dataHidden={["Hoja"]}
                     pagination={[5, 10, 25]}
                     editButton={true}
                     deleteButton={true}
                     conditionExistEditButton={["Status !='Terminada'"]}
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
