import { Text } from "../../../Reusables/input/Input";

export const Totales = ({}) => {
   return (
      <>
         <Text disabled={true} name="IngresoMensualAnualConclusionNeto" label="II. Otros ingresos del declarante (Suma del II.1 al II.5)" />
         <Text
            disabled={true}
            name="IngresoNetoParejaDependiente"
            label="C. Total de ingresos anuales netos percibidos por el declarante, pareja y/o dependientes economicos (suma de los apartados A y B)."
         />

         <Text col={12} name="Aclaraciones" label="Aclaraciones" rows={10} color={"green"} />
      </>
   );
};
