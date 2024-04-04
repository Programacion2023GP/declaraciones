import { memo, useEffect, useState } from "react";
import { CustomRadio } from "../../../Reusables/radiobutton/Radio";
import { Ngif } from "../../../Reusables/conditionals/Ngif";
import { ComponetPrivadouOtro } from "./componentsectores/ComponetPrivadouOtro";
import { ComponentPublico } from "./componentsectores/ComponentPublico";
import { Text } from "../../../Reusables/input/Input";
import { configValidationsDependiente } from "../../../../redux/DependientesEconomicos7/DependientesEconomicos";
import { useDispatch, useSelector } from "react-redux";
// import { configValidationsDependiente } from "../../../../redux/DependientesEconomicos7/DependientesEconomicos";

export const Sectores = memo(({ validations}) => {
   const [sector, setSector] = useState(1);

   const dispatch = useDispatch();
   useEffect(() => {
   }, [useSelector((state) => state.DependientesEconomicos.validationSchema)]);
   const handleGetValue = (name, value) => {
      setSector(value);
      switch (value) {
         case 1:
            dispatch(configValidationsDependiente({ tipo: "Privado", validaciones: validations }));
            break;
         case 2:
            dispatch(configValidationsDependiente({ tipo: "Publico", validaciones: validations }));
            break;
         case 3:
            dispatch(configValidationsDependiente({ tipo: "Ninguno", validaciones: validations }));
            break;
         case 4:
            dispatch(configValidationsDependiente({ tipo: "Otro", validaciones: validations }));
            break;
      }
   };
   return (
      <>
         <CustomRadio
            col={12}
            name="Id_ActividadLaboral" // Nombre del campo en el formulario
            title="Actividad laboral"
            options={[
               { value: 1, label: "Privado" },
               { value: 2, label: "Público" },
               { value: 3, label: "Ninguno" },
               { value: 4, label: "Otro" }
            ]} // Opciones para los radio buttons
            handleGetValue={handleGetValue}
         />
         <Ngif condition={sector == 1 || sector == 4}>
            <ComponetPrivadouOtro />
         </Ngif>
         <Ngif condition={sector == 2}>
            <ComponentPublico />
         </Ngif>
         <Text col={12} name="Aclaraciones" label="Aclaraciones/Observaciones" rows={10} color={"green"} />
      </>
   );
});
