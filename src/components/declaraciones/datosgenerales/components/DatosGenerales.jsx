import { Text } from "../../../Reusables/input/Input";

export const DatosGeneral = ({}) => {
   return (
      <>
         <Text
            col={12}
            name="Nombre"
            label="Nombre(s)"
            placeholder="Sin abreviaturas, sin acentos, ni signos especiales"
            //   mask={''}
            // Otras props opcionales como color, mask, etc., si es necesario
         />
         <Text col={12} name="PrimerApellido" label="Primer apellido" placeholder={"Sin abreviaturas, sin acentos, ni signos especiales"} />

         <Text
            col={12}
            name="SegundoApellido"
            label="Segundo apellido"
            placeholder={`
                    Si se tiene un solo apellido debera colocarse en el espacio de "Primer apellido" y dejar el espacio
                     "Segundo apellido" en blanco. Sin abreviaturas, sin acentos, ni signos especiales

                    `}
         />

         <Text col={12} name="Curp" label="Curp" />
         <Text col={12} name="Rfc" label="Rfc" />
         <Text col={12} name="Homoclave" label="Homoclave" />
      </>
   );
};
