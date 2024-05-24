import { memo, useEffect, useState } from "react";
import { AutoComplete } from "../../../../Reusables/autocomplete/autocomplete";
import { Text } from "../../../../Reusables/input/Input";
import DatePickerComponent from "../../../../Reusables/datepicker/DatePickerComponent";
import { useFormikContext } from "formik";
import { GetAxios } from "../../../../../services/services";
import { ComponentExceptoNinguno } from "./ComponentExceptoNinguno";

export const ComponentPublico = memo(({}) => {
   const formik = useFormikContext();
   const [ambitosPublicos, setAmbitosPublicos] = useState([]);
   const [nivelGobierno, setNivelGobiernos] = useState([]);
   useEffect(() => {
      const init = async () => {
         setAmbitosPublicos(await GetAxios("ambitospublicos/show"));
         setNivelGobiernos(await GetAxios("nivelordengobierno/show"));
      };
      init();
   }, []);
   return (
      <>
         <AutoComplete col={12} label="Nivel / orden de gobierno" name="Id_NivelOrdenGobierno" options={nivelGobierno} color="green" />
         <AutoComplete col={12} label="Ámbito público" name="Id_AmbitoPublico" options={ambitosPublicos} color="green" />
         <Text col={12} name="NombreEntePublico" label="Nombre del ente público" color={"green"} />
         <Text col={12} name="AreaAdscripcion" label="Área de adscripción" color={"green"} />
         <Text col={12} name="EmpleoCargoComision" label="Empleo, cargo o comisión" color={"green"} />
         <Text col={12} name="FuncionPrincipal" label="Especifique función principal" color={"green"} />
         <DatePickerComponent
            idName={"FechaIngreso"}
            label={"Fecha de ingreso"}
            format={"DD/MM/YYYY"}
            // value={values.FechaIngreso}
            setFieldValue={formik.setFieldValue}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.FechaIngreso}
            touched={formik.touched.FechaIngreso}
            showErrorInput={null}
         />
         <ComponentExceptoNinguno/>
      </>
   );
});
