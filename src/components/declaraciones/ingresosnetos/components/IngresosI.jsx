import { useRef } from "react";
import { Numeric } from "../../../Reusables/numeric/Numeric";
import { useParams } from "react-router-dom";

export const IngresosI = ({}) => {
   let { declaracion } = useParams();
   declaracion = parseInt(declaracion);
   return (
      <Numeric
         col={12}
         name={"RemuneracionMensualAnualConclusionCargoPublico"}
         label={`I. Remuneración ${declaracion === 2 || declaracion === 4 ? "mensual" : declaracion === 1 || declaracion === 3 ? "anual" : "hasta la fecha"} neta del declarante por su cargo público`}
         placeholder={`I. Remuneración ${declaracion === 2 || declaracion === 4 ? "mensual" : declaracion === 1 || declaracion === 3 ? "anual" : "hasta la fecha"} neta del declarante por su cargo público (por concepto de sueldos,honorarios,compensaciones,bonos,aguinaldos y otras prestaciones) (cantidades netas después de impuestos).`}
      />
   );
};
