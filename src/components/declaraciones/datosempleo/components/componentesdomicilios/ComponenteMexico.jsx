import { memo, useEffect, useState } from "react";
import { AutoComplete } from "../../../../Reusables/autocomplete/autocomplete";
import { GetAxios } from "../../../../../services/services";
import { useDispatch } from "react-redux";
import { configValidationsDependiente } from "../../../../../redux/DependientesEconomicos7/DependientesEconomicos";
import { isNumber } from "highcharts";

export const ComponenteMexico = memo(({ activeState, idEntidad }) => {
   const dispatch = useDispatch();

   const [entidades, setEntidades] = useState([]);
   const [municipios, setMunicipios] = useState([]);
   const [activeMunicipios, setActiveMunicipios] = useState(activeState);
   const [loadingMuncipios, setLoadingMunicipios] = useState(false);
   const handleGetValue = async (name, value) => {
      setActiveMunicipios(false);
      setLoadingMunicipios(true);
      setMunicipios(await GetAxios(`municipios/show/${value}`));
      setLoadingMunicipios(false);
   };
   const updatedData = async () => {
      isNumber(parseInt(idEntidad)) && setMunicipios(await GetAxios(`municipios/show/${idEntidad}`));

   };
   useEffect(() => {
      dispatch(configValidationsDependiente({ tipo: "Mexico" }));
      updatedData();
      const init = async () => {
         setEntidades(await GetAxios("entidades/show"));
      };
      init();
   }, []);
   return (
      <>
         <AutoComplete col={12} label="Entidad Federativa" name="Id_EntidadFederativa" options={entidades} color="green" handleGetValue={handleGetValue} />
         <AutoComplete
            disabled={activeMunicipios}
            loading={loadingMuncipios}
            col={12}
            otro={23}
            label="Municipio / Alcaldía"
            name="Id_MunicipioAlcaldia"
            options={municipios}
            color="green"
            // getValue={getValue}
         />
      </>
   );
});
