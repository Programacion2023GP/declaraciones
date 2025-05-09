import { memo, useEffect, useState } from "react";
import { CustomRadio } from "../../../Reusables/radiobutton/Radio";
import { Ngif } from "../../../Reusables/conditionals/Ngif";
import { Text } from "../../../Reusables/input/Input";
import { ComponenteMexico } from "./componentesdomicilios/ComponenteMexico";
import { ComponenteExtranjero } from "./componentesdomicilios/ComponenteExtranjero";
import { useDispatch } from "react-redux";
import { configValidationsDependiente } from "../../../../redux/DependientesEconomicos7/DependientesEconomicos";
import { configValidationsEmpleo } from "../../../../redux/DatosEmpleoHoja4/DatosEmpleo";
import { Grid } from "@mui/material";
import { AutoComplete } from "../../../Reusables/autocomplete/autocomplete";
import { useFormikContext } from "formik";
import { GetPostales } from "../../../../services/services";
export const DomicilioDeclarante = memo(({ mex, activeState, idEntidad, CodigoPostal,setLoadData }) => {
   const [mexico, setMexico] = useState(mex);
   const [datas, setDatas] = useState([]);
   const [loading, setLoading] = useState(false);
   const formik = useFormikContext();
   useEffect(() => {
      dispatch(configValidationsEmpleo({ tipo: mex == true ? "Mexico" : "NoesMexico" }));
   }, [mexico]);
   useEffect(() => {
      console.log('info',CodigoPostal)
      if (!isNaN(parseInt(CodigoPostal))) {
         codigo("", String(CodigoPostal), false);
      }
   }, [CodigoPostal]);
   const dispatch = useDispatch();
   const handleGetValue = (name, value) => {
      setMexico(value == 1 ? true : false);
      dispatch(configValidationsEmpleo({ tipo: value == 1 ? "Mexico" : "NoesMexico" }));
   };
   const codigo = async (name, value, nullable = true) => {
      nullable && formik.setFieldValue("ColoniaLocalidad", null);
      if (value.length == 5) {
         setLoading(true);
         const response = await GetPostales(value);

         const newDatas = response.map((item) => ({ id: item.Colonia, text: item.Colonia }));

         setLoading(false);
         setLoadData((prev)=>{
            return {
               ...prev,
               CodigoPostal:value
            }
         })
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
         <Text
            textStyleCase={true}
            col={6}
            name="Calle"
            label="Calle"
            color={"green"}
            // Otras props opcionales como color, mask, etc., si es necesario
         />
         <Text textStyleCase={true} col={6} name="NumeroExterior" label="Número Exterior" type={"number"} color={"green"} />
         <Text textStyleCase={true} col={6} name="NumeroInterior" label="Número Interior" type={"number"} color={"green"} />
         <Text textStyleCase={true} col={6} name="CodigoPostal" label="Código Postal" type={"number"} color={"green"} handleGetValue={codigo} />
         <Ngif condition={mexico}>
            <ComponenteMexico activeState={activeState} idEntidad={idEntidad} />
         </Ngif>
         <Ngif condition={!mexico}>
            <ComponenteExtranjero />
         </Ngif>

         <AutoComplete disabled={datas.length == 0} loading={loading} col={12} name={"ColoniaLocalidad"} label={"Colonia / Localidad"} options={datas} />
      </Grid>
   );
});
