import { Numeric } from "../../../Reusables/numeric/Numeric";

export const IngresosIII = ({}) => {
   return (
      <Numeric
         col={12}
         name={"TotalIngresosNetos"}
         color="green"
         label={"B. Ingresos anual neto de la pareja y o dependientes economicos (despues de impuestos)."}
         placeholder={`B. Ingresos anual neto de la pareja y o dependientes economicos (despues de impuestos)`}
      />
   );
};
