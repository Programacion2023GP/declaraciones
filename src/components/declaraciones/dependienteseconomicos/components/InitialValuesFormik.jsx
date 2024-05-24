import { memo, useEffect, useState } from "react";
import DatePickerComponent from "../../../Reusables/datepicker/DatePickerComponent";
import { Text } from "../../../Reusables/input/Input";
import { useFormikContext } from "formik";
import { GetAxios } from "../../../../services/services";
import { AutoComplete } from "../../../Reusables/autocomplete/autocomplete";
import { CustomRadio } from "../../../Reusables/radiobutton/Radio";

export const InitialValuesFormik = memo(({ handleGetValue, getParentescos }) => {
   const formik = useFormikContext(); // Obtiene el contexto de Formik
   const [relacionDeclarante, setRelacionDeclarante] = useState([]);

   useEffect(() => {
      const init = async () => {
         const relacionData = await GetAxios("relacioncondeclarante/show");
         setRelacionDeclarante(relacionData);
         getParentescos(relacionData);
      };
      init();
   }, []);
   return (
      <>
         <Text marginBoton={".1rem"} col={12} name="Nombre" label="Nombre (s)" placeholder="Sin abreviaturas, sin acentos, ni signos especiales." color={"green"} />
         <Text
            marginBoton={".1rem"}
            col={12}
            name="PrimerApellido"
            label="Primer apellido"
            placeholder="Sin abreviaturas, sin acentos, ni signos especiales. "
            color={"green"}
         />
         <Text
            marginBoton={".1rem"}
            col={12}
            name="SegundoApellido"
            label="Segundo apellido"
            placeholder={`
                              Si se tiene un sólo apellido deberá colocarse en el espacio del “primer apellido” y dejar el espacio del “segundo apellido” 
                              en blanco. Sin abreviaturas, sin acentos, ni signos especiales.`}
            color={"green"}
         />
         <DatePickerComponent
            idName={"FechaNacimiento"}
            label={"Fecha de nacimiento"}
            format={"DD/MM/YYYY"}
            setFieldValue={formik.setFieldValue}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            //   value={values.FechaEngreso}
            error={formik.errors.FechaEngreso}
            touched={formik.touched.FechaEngreso}
            showErrorInput={null}
         />
         <Text col={12} name="RfcDependiente" label="RFC" color={"green"} />
         <Text col={12} name="Curp" label="Curp" color={"green"} />
         <AutoComplete
            col={12}
            label="Parentesco o relación con el declarante"
            name="Id_ParentescoRelacion"
            options={relacionDeclarante}
            handleGetValue={handleGetValue}
         />
         <CustomRadio
            hidden={false}
            col={12}
            name="EsCiudadanoExtranjero" // Nombre del campo en el formulario
            title="¿Es de México?"
            options={[
               { value: 0, label: "Si" },
               { value: 1, label: "No" }
            ]} // Opciones para los radio buttons
         />
         <CustomRadio
            col={12}
            name="HabitaDomicilioDeclarante"
            title="¿Habita en el domicilio de declarante?"
            options={[
               { value: 1, label: "Si" },
               { value: 0, label: "No" }
            ]}
            handleGetValue={handleGetValue}
         />
      </>
   );
});
