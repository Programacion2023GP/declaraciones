import { memo, useState } from "react";
import { CustomRadio } from "../../../Reusables/radiobutton/Radio";
import { Ngif } from "../../../Reusables/conditionals/Ngif";
import { Text } from "../../../Reusables/input/Input";
import { ComponenteMexico } from "./componentesdomicilios/ComponenteMexico";
import { ComponenteExtranjero } from "./componentesdomicilios/ComponenteExtranjero";
import { useDispatch } from "react-redux";
import { configValidationsDependiente } from "../../../../redux/DependientesEconomicos7/DependientesEconomicos";
import { AutoComplete } from "../../../Reusables/autocomplete/autocomplete";
import { useFormikContext } from "formik";
import { GetPostales } from "../../../../services/services";
export const DomicilioDeclarante = memo(({}) => {
   const [mexico, setMexico] = useState(true);
   const [datas, setDatas] = useState([]);
   const [loading, setLoading] = useState(false);
   const formik = useFormikContext();
   const dispatch = useDispatch();
   const handleGetValue = (name, value) => {
      setMexico(value == 1 ? true : false);
      dispatch(configValidationsDependiente({ tipo: value == 1 ? "DomicilioDeclaranteNULL" : "DomicilioDeclarante" }));
   };
   const codigo = async (name, value, nullable = true) => {
      nullable && formik.setFieldValue("CiudadLocalidad", null);

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
      <>
         <CustomRadio
            hidden={false}
            col={12}
            name="Id_LugarDondeReside"
            title="¿Es de México el dependiente economicó?"
            options={[
               { value: 1, label: "Si" },
               { value: 0, label: "No" }
            ]}
            handleGetValue={handleGetValue}
         />
         <Text
            col={12}
            name="Calle"
            label="Calle"
            color={"green"}
            // Otras props opcionales como color, mask, etc., si es necesario
         />
         <Text col={12} name="NumeroExterior" label="Número Exterior" type={"text"} color={"green"} />
         <Text col={12} name="NumeroInterior" label="Número Interior" type={"text"} color={"green"} />
         <Text col={12} name="CodigoPostal" label="Código Postal" type={"number"} color={"green"} handleGetValue={codigo} />
         <Ngif condition={mexico}>
            <ComponenteMexico />
         </Ngif>
         <Ngif condition={!mexico}>
            <ComponenteExtranjero />
         </Ngif>
         {/* <Text
            col={12}
            name="CiudadLocalidad"
            label="Colonia / Localidad"
            color={"green"}
            // Otras props opcionales como color, mask, etc., si es necesario
         /> */}
         <AutoComplete disabled={datas.length == 0} loading={loading} col={12} name={"CiudadLocalidad"} label={"Colonia / Localidad"} options={datas} />
      </>
   );
});
