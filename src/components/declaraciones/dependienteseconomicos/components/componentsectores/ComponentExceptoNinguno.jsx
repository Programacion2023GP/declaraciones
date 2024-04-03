import { memo, useEffect, useState } from "react";
import { Text } from "../../../../Reusables/input/Input";
import { AutoComplete } from "../../../../Reusables/autocomplete/autocomplete";
import { GetAxios } from "../../../../../services/services";

export const ComponentExceptoNinguno = memo(() => {
   const [monedas, setMonedas] = useState([]);
   useEffect(() => {
      const init = async () => {
         setMonedas(await GetAxios("/monedas/show"));
      };
      init();
   }, []);
   return (
      <>
         <Text col={12} type={"number"} name="ValorSalarioMensualNeto" label="Salario mensual neto" color={"green"} placeholder={"No debe llevar centavos"} />
         <AutoComplete col={12} label="Moneda" name="Id_MonedaSalarioMensualNeto" options={monedas} color="green" />
      </>
   );
});
