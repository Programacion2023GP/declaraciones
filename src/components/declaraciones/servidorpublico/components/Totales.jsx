import { useParams } from "react-router-dom";
import { Text } from "../../../Reusables/input/Input";
import { Numeric } from "../../../Reusables/numeric/Numeric";
import { labelSumaIyII, labelTotal } from "../../funciones/ingresosEservidor/labels";

export const Totales = ({}) => {
   let { declaracion } = useParams();
   declaracion = parseInt(declaracion);
   return (
      <>
         <Numeric disabled={true} name="IngresoMensualConclusionNeto" label={labelSumaIyII(declaracion)} placeholder={labelSumaIyII(declaracion)} />
         <Numeric
            disabled={true}
            name="TotalIngresosNetos"
            label={labelTotal(declaracion)}
            placeholder={labelTotal(declaracion)}

         />

         <Text col={12} name="Aclaraciones" label="Aclaraciones" rows={10} color={"green"} />
      </>
   );
};
