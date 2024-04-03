import { memo, useState } from "react";
import { CustomRadio } from "../../../Reusables/radiobutton/Radio";
import { Ngif } from "../../../Reusables/conditionals/Ngif";
import { Text } from "../../../Reusables/input/Input";
import { ComponenteMexico } from "./componentesdomicilios/ComponenteMexico";
import { ComponenteExtranjero } from "./componentesdomicilios/ComponenteExtranjero";

export const DomicilioDeclarante = memo(({}) => {
   const [mexico, setMexico] = useState(true);
   const handleGetValue = (name, value) => {
      setMexico(value == 1 ? true : false);
   };
   return (
      <>
         <CustomRadio
            hidden={false}
            col={12}
            name="Id_LugarDondeReside" // Nombre del campo en el formulario
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
         <Text col={12} name="NumeroExterior" label="Número Exterior" type={"number"} color={"green"} />
         <Text col={12} name="NumeroInterior" label="Número Interior" type={"number"} color={"green"} />
         <Text col={12} name="CodigoPostal" label="Código Postal" type={"number"} color={"green"} />
         <Ngif condition={mexico}>
            <ComponenteMexico />
         </Ngif>
         <Ngif condition={!mexico}>
            <ComponenteExtranjero />
         </Ngif>
         <Text
            col={12}
            name="ColoniaLocalidad"
            label="Colonia / Localidad"
            color={"green"}
            // Otras props opcionales como color, mask, etc., si es necesario
         />
      </>
   );
});
