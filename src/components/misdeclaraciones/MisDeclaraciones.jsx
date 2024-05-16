import { useEffect, useState } from "react";
import DataTable from "../Reusables/table/DataTable";
import { Box, Card } from "@mui/material";
import { Request } from "../Reusables/request/Request";

export const MisDeclaraciones = ({}) => {
   const [data, setData] = useState([]);
   const { apartados } = Request({peticiones:["apartados"]});

   return (
      <>
         <Card sx={{ maxWidth: "90%", overflow: "auto", margin: "auto", padding: ".8rem" }}>
            <Box alignItems={"center"} justifyContent={"center"} display={"flex"}>
               <DataTable
               filterGlobal={true}
                  filter={true}
                  headers={["Folio", "Nombre", "Apellido Paterno", "Apellido Materno", "Tipo Declaración", "Status", "Hoja", "Fecha", "Tipo de declaración"]}
                  data={apartados}
                  pagination={[5,10,25]}
                  editButton={true}
                  
                  conditionExistEditButton ={
                     ["Status !='Terminada'"]
                  }
               />
            </Box>
         </Card>
      </>
   );
};
