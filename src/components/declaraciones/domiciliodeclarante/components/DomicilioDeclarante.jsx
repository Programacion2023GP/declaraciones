import { memo, useEffect, useState } from "react";
import { CustomRadio } from "../../../Reusables/radiobutton/Radio";
import { Ngif } from "../../../Reusables/conditionals/Ngif";
import { Text } from "../../../Reusables/input/Input";
import { ComponenteMexico } from "./componentesdomicilios/ComponenteMexico";
import { ComponenteExtranjero } from "./componentesdomicilios/ComponenteExtranjero";
import { Numeric } from "../../../Reusables/numeric/Numeric";
import { Grid } from "@mui/material";
import { GetPostales } from "../../../../services/services";
import { AutoComplete } from "../../../Reusables/autocomplete/autocomplete";
import { useFormikContext } from "formik";
// import { useDispatch } from "react-redux";
// import { configValidationsDependiente } from "../../../../redux/DependientesEconomicos7/DependientesEconomicos";
export const DomicilioDeclaranteGeneral = memo(({ mex, estado, CodigoPostal }) => {
   const formik = useFormikContext();
   const [mexico, setMexico] = useState(mex);
   const [datas, setDatas] = useState([]);
   const [loading, setLoading] = useState(false);
   useEffect(() => {
      setMexico(mex ? true : false);
      if (!isNaN(parseInt(CodigoPostal))) {
         codigo("", CodigoPostal, false);
      }
   }, [mex, estado, CodigoPostal]);
   const handleGetValue = (name, value) => {
      setMexico(value == 1 ? true : false);

      // dispatch(configValidationsDependiente({ tipo: (value = 1 ? "Mexico" : "NoesMexico") }));
   };

   const codigo = async (name, value, nullable = true) => {
      nullable && formik.setFieldValue("ColoniaLocalidad", null);
      if (value.length == 5) {
         setLoading(true);
         const response = await GetPostales(value);
         const newDatas = response.map((item) => ({ id: item.Colonia, text: item.Colonia }));
         setLoading(false);

         setDatas(newDatas);
      } else {
         setDatas([]);
      }
   };

   return (
      <Grid container spacing={1}>
         <CustomRadio
            hidden={false}
            col={12}
            name="EsEnMexico"
            title="¿Es de México el dependiente economicó?"
            options={[
               { value: 1, label: "Si" },
               { value: 0, label: "No" }
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
            <ComponenteMexico mex={mexico} estado={estado} />
         </Ngif>
         <Ngif condition={!mexico}>
            <ComponenteExtranjero />
         </Ngif>
         <AutoComplete disabled={datas.length == 0} loading={loading} col={12} name={"ColoniaLocalidad"} label={"Colonia / Localidad"} options={datas} />
      </Grid>
   );
});
