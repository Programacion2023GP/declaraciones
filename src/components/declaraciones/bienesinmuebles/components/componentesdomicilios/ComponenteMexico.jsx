import { memo, useEffect, useState } from "react";
import { AutoComplete } from "../../../../Reusables/autocomplete/autocomplete";
import { GetAxios } from "../../../../../services/services";
import { useDispatch } from "react-redux";
import { validationBienesInmuebles } from "../../../../../redux/BienesInmueblesHoja10/BienesInmueblesHoja10";

export const ComponenteMexico = memo(({ openMunicipio, setOpenMunicipio, setEstado, estado }) => {
   const dispatch = useDispatch();

   const [entidades, setEntidades] = useState([]);
   const [municipios, setMunicipios] = useState([]);
   const [activeMunicipios, setActiveMunicipios] = useState(openMunicipio);
   const [loadingMuncipios, setLoadingMunicipios] = useState(false);
   const handleGetValue = async (name, value) => {
      setOpenMunicipio(false);
      setActiveMunicipios(false);
      setLoadingMunicipios(true);
      setEstado(value);
      setMunicipios(await GetAxios(`municipios/show/${value}`));
      setLoadingMunicipios(false);
   };
   useEffect(() => {
      dispatch(validationBienesInmuebles({ tipo: "Mexico" }));

      const init = async () => {
         if (estado > 0) {
            setLoadingMunicipios(true);

            setMunicipios(await GetAxios(`municipios/show/${estado}`));
            setLoadingMunicipios(false);
         }
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
            label="Municipio / Alcaldía"
            name="Id_MunicipioAlcaldia"
            options={municipios}
            color="green"
            // getValue={getValue}
         />
      </>
   );
});
