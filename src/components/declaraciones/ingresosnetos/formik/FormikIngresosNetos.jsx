import { Box, Button, Card, CardContent, Grid, Typography } from "@mui/material";
import { Formik } from "formik";
export const FormikIngresosNetos = ({ initialValues, validationSchema, submit, title, children, ref }) => {
   <Card sx={{ maxWidth: "90%", margin: "auto", padding: ".8rem" }} TouchRippleProps={{ disabled: true }}>
      <CardContent>
         <Typography variant="h3" align="center" color="textPrimary" style={{ fontWeight: "500" }}>
            {title}
         </Typography>
         <Typography variant="h6" align="start" color="textPrimary" style={{ fontWeight: "500" }}>
            Capturar cantidades libres de impuestos, sin comas, sin puntos, sin centavos y sin ceros a la izquierda
         </Typography>
         <br />
         <Typography variant="body2" color="text.secondary">
            <Grid container spacing={2}>
               <Formik innerRef={ref} initialValues={initialValues} validationSchema={validationSchema} onSubmit={submit}>
                  {({ values, handleSubmit, handleChange, errors, touched, handleBlur, setFieldValue, setValues }) => {
                     {
                     }
                     return (
                        <>
                           <Box component={"form"} onSubmit={handleSubmit}>
                              {children}

                              <Button type="submit" variant="contained" color="primary">
                                 Registrar
                              </Button>
                           </Box>
                        </>
                     );
                  }}
               </Formik>
            </Grid>
         </Typography>
      </CardContent>
   </Card>;
};
