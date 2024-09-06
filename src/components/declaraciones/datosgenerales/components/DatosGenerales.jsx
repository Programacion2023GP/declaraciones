import { Grid } from "@mui/material";
import { Text } from "../../../Reusables/input/Input";
import { useEffect } from "react";
import { useFormikContext } from "formik";

export const DatosGeneral = ({}) => {
   const formik = useFormikContext();
   useEffect(() => {
      const init = async () => {
         const errors = await formik.validationSchema;
         console.log(errors);
      };
      init();
      formik.setFieldValue("Nombre", localStorage.getItem("Name"));
      formik.setFieldValue("PrimerApellido", localStorage.getItem("PaternalSurname"));
      formik.setFieldValue("SegundoApellido", localStorage.getItem("MaternalSurname"));

      // formik.setFieldValue('Nombre',localStorage.getItem("Name"))

      // formik.setValues({
      //    Nombre: localStorage.getItem("Name"),
      //    PrimerApellido: localStorage.getItem("PaternalSurname"),
      //    SegundoApellido: ""
      // });
   }, [formik.values["Nombre"], formik.values["PrimerApellido"], formik.values["SegundoApellido"]]);

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

         <Text textStyleCase={true} col={4} name="Curp" label="Curp" />
         <Text textStyleCase={true} col={4} name="Rfc" label="Rfc" />
         <Text textStyleCase={true} col={4} name="Homoclave" label="Homoclave" />
      </Grid>
   );
};
