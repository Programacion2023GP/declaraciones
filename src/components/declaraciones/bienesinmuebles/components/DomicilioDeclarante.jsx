import { memo, useEffect, useState } from "react";
import { CustomRadio } from "../../../Reusables/radiobutton/Radio";
import { Ngif } from "../../../Reusables/conditionals/Ngif";
import { Text } from "../../../Reusables/input/Input";
import { ComponenteMexico } from "./componentesdomicilios/ComponenteMexico";
import { ComponenteExtranjero } from "./componentesdomicilios/ComponenteExtranjero";
import { useDispatch } from "react-redux";
import { Grid } from "@mui/material";
import { useFormikContext } from "formik";
import { AutoComplete } from "../../../Reusables/autocomplete/autocomplete";
import { GetPostales } from "../../../../services/services";
export const DomicilioDeclarante = ({ openMunicipio, setOpenMunicipio, estado, setEstado,cp,setCp }) => {
   const [mexico, setMexico] = useState(true);
   const dispatch = useDispatch();
   const [datas, setDatas] = useState([]);
   const [loading, setLoading] = useState(false);
   const formik = useFormikContext();
   const handleGetValue = (name, value) => {
      setMexico(value == 1 ? true : false);
      // dispatch(configValidationsDependiente({ tipo: (value == 1 ? "DomicilioDeclaranteNULL" : "DomicilioDeclarante") }));
   };
   useEffect(()=>{
      cp && codigo("",cp,false)
   },[cp])
   const codigo = async (name, value, nullable = true) => {

      nullable && formik.setFieldValue("ColoniaLocalidad", null);
      if (value.length == 5) {
         setLoading(true);
         const response = await GetPostales(value);
         const newDatas = response.map((item) => ({ id: item.Colonia, text: item.Colonia }));
         setLoading(false);
         setCp(value)
         setDatas(newDatas);
      } else {
         setDatas([]);
      }
   };
   return (
      <Grid container spacing={1}>
         <CustomRadio
            col={12}
            title={"Ubicación del Inmueble"}
            name={"EsEnMexico"}
            options={[
               { value: 1, label: "En México" },
               { value: 0, label: "En el extranjero" }
            ]}
            handleGetValue={handleGetValue}
         />
         <Text col={4} name="Calle" label="Calle" color={"green"} />
         <Text col={4} name="NumeroExterior" label="Número Exterior" type={"number"} color={"green"} />
         <Text col={4} name="NumeroInterior" label="Número Interior" type={"number"} color={"green"} />
         <Text col={4} name="CodigoPostal" label="Código Postal" type={"number"} color={"green"} handleGetValue={codigo} />
         <Ngif condition={mexico}>
            <ComponenteMexico setEstado={setEstado} estado={estado} openMunicipio={openMunicipio} setOpenMunicipio={setOpenMunicipio} />
         </Ngif>
         <Ngif condition={!mexico}>
            <ComponenteExtranjero />
         </Ngif>
         {/* <Text
            col={12}
            name="ColoniaLocalidad"
            label="Colonia / Localidad"
            color={"green"}
            // Otras props opcionales como color, mask, etc., si es necesario
         /> */}
         <AutoComplete disabled={datas.length == 0} loading={loading} col={12} name={"ColoniaLocalidad"} label={"Colonia / Localidad"} options={datas} />
      </Grid>
   );
};
