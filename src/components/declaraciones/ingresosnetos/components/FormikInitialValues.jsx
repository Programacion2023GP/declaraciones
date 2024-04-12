import { IngresosII } from "./IngresosII";
import { Segmento, tabSegmento } from "./Segmentos";
import { Totales } from "./Totales";
import { IngresosI } from "./IngresosI";
import { IngresosIII } from "./IngresosIII";
import { useState } from "react";

export const FormikInitialValues = ({}) => {
   //   const [names,setNames]=useState([])
   let { declaracion } = useParams();
   declaracion = parseInt(declaracion);
   return (
      <>
         <Segmento>
            <tabSegmento label={`Renumeración  ${declaracion === 2 || declaracion === 4 ? "mensual" : declaracion === 1 || declaracion === 3 ? "anual" : "hasta la fecha"}`}>
               <IngresosI />
            </tabSegmento>
            <tabSegmento label="Otros ingresos del declarante">
               <IngresosII />
            </tabSegmento>
            <tabSegmento label="Ingresos netos de la pareja y/o dependientes economicos">
               <IngresosIII />
            </tabSegmento>
            <tabSegmento label="Aclaraciones y totales">
               <Totales />
            </tabSegmento>
         </Segmento>
      </>
   );
};
