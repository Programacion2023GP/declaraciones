import { useRef } from "react";
import { Numeric } from "../../../Reusables/numeric/Numeric";

export const IngresosI = ({}) => {
   return (
      <Numeric
         col={12}
         name={"RemuneracionMensualAnualConclusionCargoPublico"}
         label={"I. Remuneración anual neta del declarante por su cargo público"}
         placeholder={`I. Remuneración anual neta del declarante por su cargo público (por concepto de sueldos,honorarios,compensaciones,bonos,aguinaldos y otras prestaciones) (cantidades netas después de impuestos).`}
      />
   );
};
