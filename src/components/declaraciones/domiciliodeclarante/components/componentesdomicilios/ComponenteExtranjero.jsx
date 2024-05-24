import { memo, useEffect, useState } from "react";
import { GetAxios } from "../../../../../services/services";
import { AutoComplete } from "../../../../Reusables/autocomplete/autocomplete";
import { Text } from "../../../../Reusables/input/Input";
import { useDispatch } from "react-redux";
import { validationDomicilioDeclarante } from "../../../../../redux/DomicilioDeclaranteHoja2/DomicilioDeclarante";
export const ComponenteExtranjero = memo(({}) => {
   const dispatch = useDispatch();

   const [paises, setPaises] = useState([]);
   useEffect(() => {
      dispatch(validationDomicilioDeclarante({ tipo: "NoesMexico" }));
      const init = async () => {
         setPaises(await GetAxios("paises/show"));
      };
      init();
   }, []);
   return (
      <>
         <AutoComplete col={6} label="Pais de nacimiento" name="Id_Pais" options={paises} color="green" />
         <Text textStyleCase={true} col={6} name="EstadoProvincia" label="Estado / Provincia" color={"green"} />
      </>
   );
});
