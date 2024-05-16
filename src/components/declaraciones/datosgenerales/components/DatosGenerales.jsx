import { Grid } from "@mui/material";
import { Text } from "../../../Reusables/input/Input";

export const DatosGeneral = ({}) => {
   return (
      <Grid container spacing={1}>
         <Text
            col={6}
            textStyleCase={true}
            name="Nombre"
            label="Nombre(s)"
            placeholder="Sin abreviaturas, sin acentos, ni signos especiales"
            //   mask={''}
            // Otras props opcionales como color, mask, etc., si es necesario
         />
         <Text textStyleCase={true} col={6} name="PrimerApellido" label="Primer apellido" placeholder={"Sin abreviaturas, sin acentos, ni signos especiales"} />

         <Text
            textStyleCase={true}
            col={12}
            name="SegundoApellido"
            label="Segundo apellido"
            placeholder={`
                    Si se tiene un solo apellido debera colocarse en el espacio de "Primer apellido" y dejar el espacio
                     "Segundo apellido" en blanco. Sin abreviaturas, sin acentos, ni signos especiales

                    `}
         />

         <Text textStyleCase={true} col={12} name="Curp" label="Curp" />
         <Text textStyleCase={true} col={12} name="Rfc" label="Rfc" />
         <Text textStyleCase={true} col={12} name="Homoclave" label="Homoclave" />
      </Grid>
   );
};
