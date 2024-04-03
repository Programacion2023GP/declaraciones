import { memo, useEffect, useState } from "react";
import { Text } from "../../../../Reusables/input/Input";
import { AutoComplete } from "../../../../Reusables/autocomplete/autocomplete";
import DatePickerComponent from "../../../../Reusables/datepicker/DatePickerComponent";
import { CustomRadio } from "../../../../Reusables/radiobutton/Radio";
import { useFormikContext } from "formik";
import { GetAxios } from "../../../../../services/services";
import { ComponentExceptoNinguno } from "./ComponentExceptoNinguno";

export const ComponetPrivadouOtro = memo(({}) => {
   const formik = useFormikContext();
   const [sectores, setSectores] = useState([]);
   useEffect(() => {
      const init = async () => {
         setSectores(await GetAxios("/sectores/show"));
      };
      init();
   }, []);
   return (
      <>
         <Text col={12} name="NombreEmpresaSociedadAsociacion" label="Nombre de la empresa, sociedad o asociación" color={"green"} />
         <Text col={12} name="RfcEmpresa" label="RFC (empresa)" color={"green"} />
         <Text col={12} name="EmpleoCargoComision" label="Empleo, cargo o comisión" color={"green"} />
         <AutoComplete col={12} label="Sector al que pertenece" name="Id_Sector" options={sectores} color="green" />
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

         <CustomRadio
            col={12}
            name="EsProveedorContratistaGobierno" // Nombre del campo en el formulario
            title="¿Es proveedor o contratista del gobierno?"
            options={[
               { value: 1, label: "Si" },
               { value: 0, label: "No" }
            ]} // Opciones para los radio buttons
         />
         <ComponentExceptoNinguno />
      </>
   );
});
