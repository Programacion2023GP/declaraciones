import { memo, useState } from "react";
import { CustomRadio } from "../../../Reusables/radiobutton/Radio";
import { Ngif } from "../../../Reusables/conditionals/Ngif";
import { ComponetPrivadouOtro } from "./componentsectores/ComponetPrivadouOtro";
import { ComponentPublico } from "./componentsectores/ComponentPublico";
import { Text } from "../../../Reusables/input/Input";

export const Sectores = memo(({}) => {
   const [sector, setSector] = useState(1);
   const handleGetValue = (name, value) => {
      setSector(value);
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
