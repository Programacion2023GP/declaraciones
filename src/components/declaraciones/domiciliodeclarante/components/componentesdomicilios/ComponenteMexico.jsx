import { memo, useEffect, useState } from "react";
import { AutoComplete } from "../../../../Reusables/autocomplete/autocomplete";
import { GetAxios } from "../../../../../services/services";
import { useDispatch } from "react-redux";
import { validationDomicilioDeclarante } from "../../../../../redux/DomicilioDeclaranteHoja2/DomicilioDeclarante";

export const ComponenteMexico = memo(({ mex, estado }) => {
   const dispatch = useDispatch();

   const [entidades, setEntidades] = useState([]);
   const [municipios, setMunicipios] = useState([]);
   const [activeMunicipios, setActiveMunicipios] = useState(!mex);
   const [loadingMuncipios, setLoadingMunicipios] = useState(false);
   const handleGetValue = async (name, value) => {
      setActiveMunicipios(false);
      setLoadingMunicipios(true);
      setMunicipios(await GetAxios(`municipios/show/${value}`));
      setLoadingMunicipios(false);
   };
   useEffect(() => {
      dispatch(validationDomicilioDeclarante({ tipo: "Mexico" }));

      const init = async () => {
         setEntidades(await GetAxios("entidades/show"));
      };
      init();
   }, []);
   useEffect(() => {
      if (!isNaN(parseInt(estado))) {
         handleGetValue("", estado);
      }
   }, [estado]);
   return (
      <>
         <AutoComplete col={6} label="Entidad Federativa" name="Id_EntidadFederativa" options={entidades} color="green" handleGetValue={handleGetValue} />
         <AutoComplete
            disabled={activeMunicipios}
            loading={loadingMuncipios}
            col={6}
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
