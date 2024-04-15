import { IngresosII } from "./IngresosII";
import { Segmento, tabSegmento } from "./Segmentos";
import { Totales } from "./Totales";
import { IngresosI } from "./IngresosI";
import { IngresosIII } from "./IngresosIII";
import { useState } from "react";
import { useParams } from "react-router-dom";

export const FormikInitialValues = ({}) => {
   //   const [names,setNames]=useState([])
   let { declaracion } = useParams();
   declaracion = parseInt(declaracion);
   return (
      <>
         <Segmento>
            <tabSegmento
               label={`Renumeración  ${
                  declaracion === 1 || declaracion === 4
                     ? `
                     mensual neta del
declarante por su cargo público (por
concepto de sueldos, honorarios,
compensaciones, bonos y otras
prestaciones) (cantidades netas después de
impuestos)

                     `
                     : declaracion === 2 || declaracion === 5
                       ? `Anual neta del declarante
                       por su cargo público (por concepto de
                       sueldos, honorarios, compensaciones, bonos
                       y otras prestaciones) (cantidades netas
                       después de impuestos)
                       `
                       : `
               del año en curso a la
               fecha de conclusión del empleo, cargo o
               comisión del declarante por su cargo
               público (por concepto de sueldos,
               honorarios, compensaciones, bonos y otras
               prestaciones) (cantidades netas después de
               impuestos)
               `
               }`}
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
