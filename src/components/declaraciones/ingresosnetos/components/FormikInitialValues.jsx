import { IngresosII } from "./IngresosII";
import { Segmento, tabSegmento } from "./Segmentos";
import { Totales } from "./Totales";
import { IngresosI } from "./IngresosI";
import { IngresosIII } from "./IngresosIII";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { labelRenumeracion } from "../../funciones/ingresosEservidor/labels";

export const FormikInitialValues = ({messageButton}) => {
   //   const [names,setNames]=useState([])
   let { declaracion } = useParams();
   declaracion = parseInt(declaracion);
   return (
      <>
         <Segmento messageButton={messageButton}>
            <tabSegmento
               label={labelRenumeracion(declaracion)}
            >
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
