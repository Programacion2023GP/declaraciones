import { useEffect, useState } from "react";
import DataTable from "../Reusables/table/DataTable";
import { Box, Card } from "@mui/material";
import { Request } from "../Reusables/request/Request";

export const MisDeclaraciones = ({}) => {
   const [data, setData] = useState([]);
   const { apartados } = Request({ peticiones: ["apartados"] });

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
                     // options
                     filterGlobal={true}
                     filter={true}
                     headers={["Folio", "Nombre", "Apellido Paterno", "Apellido Materno", "Tipo Declaración", "Status", "Fecha", "Tipo de declaración"]}
                     data={apartados}
                     pagination={[5, 10, 25]}
                     editButton={true}
                     conditionExistEditButton={["Status !='Terminada'"]}

                  />
               </Box>
            </Card>
         </Box>
      </>
   );
};
