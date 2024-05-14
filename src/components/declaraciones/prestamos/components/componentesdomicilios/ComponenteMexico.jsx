import { memo, useEffect, useState } from "react";
import { AutoComplete } from "../../../../Reusables/autocomplete/autocomplete";
import { GetAxios } from "../../../../../services/services";
import { useDispatch } from "react-redux";
import { configValidationsDependiente } from "../../../../../redux/DependientesEconomicos7/DependientesEconomicos";
import { addMexicoPrestamo } from "../../../../../redux/PrestamoComodatoHoja15/PrestamoComodatoHoja15";

export const ComponenteMexico = memo(({}) => {
   const dispatch = useDispatch();

   const [entidades, setEntidades] = useState([]);
   const [municipios, setMunicipios] = useState([]);
   const [activeMunicipios, setActiveMunicipios] = useState(true);
   const [loadingMuncipios, setLoadingMunicipios] = useState(false);
   const handleGetValue = async (name, value) => {
      setActiveMunicipios(false);
      setLoadingMunicipios(true);
      setMunicipios(await GetAxios(`municipios/show/${value}`));
      setLoadingMunicipios(false);
   };
   useEffect(() => {
            dispatch(addMexicoPrestamo());

      const init = async () => {
         setEntidades(await GetAxios("/entidades/show"));
      };
      init();
   }, []);
   return (
      <>
         <AutoComplete
            col={12}
            label="Entidad Federativa"
            name="Id_EntidadFederativa"
            options={entidades}
            color="green"
            handleGetValue={handleGetValue}
         />
         <AutoComplete
            disabled={activeMunicipios}
            loading={loadingMuncipios}
            col={12}
            otro={23}
            label="Municipio / Alcaldía"
            name="V_Id_EntidadFederativa"
            options={municipios}
            color="green"
            // getValue={getValue}
         />
      </>
   );
});
