import { memo, useEffect, useState } from "react";
import { GetAxios } from "../../../../../services/services";
import { AutoComplete } from "../../../../Reusables/autocomplete/autocomplete";
import { Text } from "../../../../Reusables/input/Input";

export const ComponenteExtranjero = memo(({}) => {
   const [paises, setPaises] = useState([]);
   useEffect(() => {
      const init = async () => {
         setPaises(await GetAxios("/paises/show"));
      };
      init();
   }, []);
   return (
      <>
         <AutoComplete col={12} label="Pais de nacimiento" name="Id_Pais" options={paises} color="green" />
         <Text col={12} name="EstadoProvincia" label="Estado / Provincia" type={"number"} color={"green"} />
      </>
   );
});
