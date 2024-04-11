import { Text } from "../../../Reusables/input/Input";
import { Numeric } from "../../../Reusables/numeric/Numeric";

export const Totales = ({}) => {
   return (
      <>
         <Numeric disabled={true} name="IngresoMensualAnualConclusionNeto" label="II. Otros ingresos del declarante (Suma del II.1 al II.5)" />
         <Numeric
            disabled={true}
            name="TotalIngresosNetos"
            label="C. Total de ingresos anuales netos percibidos por el declarante, pareja y/o dependientes economicos (suma de los apartados A y B)."
         />

         <Text col={12} name="Aclaraciones" label="Aclaraciones" rows={10} color={"green"} />
      </>
   );
};
