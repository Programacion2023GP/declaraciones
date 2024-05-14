import { memo, useEffect, useState } from "react";
import { GetAxios } from "../../../../../services/services";
import { AutoComplete } from "../../../../Reusables/autocomplete/autocomplete";
import { Text } from "../../../../Reusables/input/Input";
import { useDispatch } from "react-redux";
import { configValidationsDependiente } from "../../../../../redux/DependientesEconomicos7/DependientesEconomicos";
import { addExtranjeroPrestamo } from "../../../../../redux/PrestamoComodatoHoja15/PrestamoComodatoHoja15";
export const ComponenteExtranjero = memo(({}) => {
   const dispatch = useDispatch();

   const [paises, setPaises] = useState([]);
   useEffect(() => {
      dispatch(addExtranjeroPrestamo());
      const init = async () => {
         setPaises(await GetAxios("/paises/show"));
      };
      init();
   }, []);
   return (
      <>
         <AutoComplete col={12} label="Pais de nacimiento" name="V_Id_Pais" options={paises} color="green" />
         <Text col={12} name="EstadoProvincia" label="Estado / Provincia" color={"green"} />
      </>
   );
});
