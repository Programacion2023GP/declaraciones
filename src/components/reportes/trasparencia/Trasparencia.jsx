import { Box, Card } from "@mui/material";
import DataTable from "../../Reusables/table/DataTable";
import { useEffect, useState } from "react";
import { GetAxios } from "../../../services/services";

const Trasparencia = ({}) => {
   const [data, setData] = useState([]);
   const [loading, setLoading] = useState(false);
   const init = async (anio, trimestre) => {
      setLoading(true);
      setData(await GetAxios(`reportes/trasparencia${anio ? "/" + anio : ""}${trimestre ? "/" + trimestre : ""}`));
      setLoading(false);
   };
   useEffect(() => {
      init(new Date().getFullYear(), 1);
   }, []);

   return (
      <Card sx={{ maxWidth: "95%", margin: "auto" }}>
         <Box sx={{ minWidth: "100%", overflowX: "auto" }}>
            <DataTable
               options={["CHARTS", "EXCEL", "COLORS"]}
               //   Trbacground={[
               //      { color: "#D6EDC9", conditions: ["Declaracion =='Completa' && Tstatus == 'Terminada'"], text: "Declaraciones completas terminadas" },
               //      { color: "#EAF4E1", conditions: ["Declaracion =='Simplificada' && Tstatus == 'Terminada'"], text: "Declaraciones simplificadas terminadas" },
               //      { color: "#F2F2CC", conditions: ["Tstatus == 'En proceso'"], text: "Declaraciones sin finalizar" }
               //   ]}
               buttonsMenu={false}
               loading={loading}
               filterGlobal={true}
               filter={true}
               dataHidden={["Trimestre"]}
               headers={[
                  "Ejercicio",
                  "Fecha de inicio del periodo que se informa",
                  "Fecha de término del periodo que se informa",
                  "ESTE CRITERIO APLICA PARA EJERCICIOS ANTERIORES AL 01/07/2023 -> Tipo de integrante del sujeto obligado (catálogo)",
                  'ESTE CRITERIO APLICA A PARTIR DEL 01/07/2023 -> Tipo de integrante del sujeto obligado (catálogo)',
                  "Clave o nivel del puesto",
                  "Denominación del puesto (Redactados con perspectiva de género)",
                  "Denominación del cargo",
                  "Área de adscripción",
                  "Nombre(s) del(la) servidor(a) público(a)",
                  "Primer apellido del(la) servidor(a) público(a)",
                  "Segundo apellido del(la) servidor(a) público(a)",
                  "Modalidad de la Declaración Patrimonial (catálogo)",
                  "Hipervínculo a la versión pública Declaración de Situación Patrimonial",
                  "Área(s) responsable(s) que genera(n), posee(n), publica(n) y actualizan la información",
                  "Nota"
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
   );
};
export default Trasparencia;
