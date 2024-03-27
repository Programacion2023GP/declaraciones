import { Box, Button, Card, CardContent, Grid, Typography } from "@mui/material";
import DataTable from "../../Reusables/table/DataTable";
import * as Yup from "yup";
import { Formik } from "formik";
import { Text } from "../../Reusables/input/Input";
import DatePickerComponent from "../../Reusables/datepicker/DatePickerComponent";

export const DatosParejas = ({ next, previous, title, debugerClear }) => {
   const dataForm = {
      Id_SituacionPatrimonial: parseInt(localStorage.getItem("id_SituacionPatrimonial"))
   };
   const validationSchema = Yup.object().shape({});
   const submit = async (values, { resetForm }) => {};
   return (
      <>
         <Card sx={{ maxWidth: "90%", margin: "auto", padding: ".8rem" }} TouchRippleProps={{ disabled: true }}>
            <CardContent>
               <Typography variant="h3" align="center" color="textPrimary" style={{ fontWeight: "500" }}>
                  {title}
               </Typography>
               <Typography variant="h6" align="start" color="textPrimary" style={{ fontWeight: "500" }}>
                  Los datos que no serán públicos estarán resaltados de color
                  <span style={{ color: "green" }}>verde</span>
               </Typography>
               <br />
               <Typography variant="body2" color="text.secondary">
                  <Grid container spacing={2}></Grid>
               </Typography>
               <Formik initialValues={dataForm} validationSchema={validationSchema} onSubmit={submit}>
                  {({ values, handleSubmit, handleChange, errors, touched, handleBlur, setFieldValue, setValues }) => {
                     {
                     }
                     return (
                        <Box component={"form"} onSubmit={handleSubmit}>
                           <Text
                              col={12}
                              name="NombreEntePublico"
                              label="Nombre (s)"
                              placeholder="Sin abreviaturas, sin acentos, ni signos especiales."
                              color={"green"}
                           />
                           <Text
                              col={12}
                              name="NombreEntePublico"
                              label="Primer apellido"
                              placeholder="Sin abreviaturas, sin acentos, ni signos especiales. "
                              color={"green"}
                           />
                           <Text
                              col={12}
                              name="NombreEntePublico"
                              label="Primer apellido"
                              placeholder={`
                              Si se tiene un sólo apellido deberá colocarse en el espacio del “primer apellido” y dejar el espacio del “segundo apellido” 
                              en blanco. Sin abreviaturas, sin acentos, ni signos especiales.`}
                              color={"green"}
                           />
                           <DatePickerComponent
                              idName={"FechaEngreso"}
                              label={"Fecha de nacimiento"}
                              format={"DD/MM/YYYY"}
                              setFieldValue={setFieldValue}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              //   value={values.FechaEngreso}
                              //   error={errors.FechaEngreso}
                              //   touched={touched.FechaEngreso}
                              showErrorInput={null}
                           />
                           <Text col={12} name="Rfc" label="RFC" color={"green"} />
                           <Text col={12} name="Homoclave" label="Homoclave" color={"green"} />
                           <Text col={12} name="curp" label="Curp" color={"green"} />

                           <Button type="submit" variant="contained" color="primary">
                              Registrar y Continuar
                           </Button>
                        </Box>
                     );
                  }}
               </Formik>
               <button variant="contained" color="secondary" onClick={next}>
                  CONTINUAR DESAROLLO DE PAGINA
               </button>
            </CardContent>
         </Card>
      </>
   );
};
