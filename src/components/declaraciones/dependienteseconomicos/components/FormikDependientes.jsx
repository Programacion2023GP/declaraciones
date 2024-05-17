import { Box, Button, Card, CardContent, Grid, Typography } from "@mui/material";
import { Formik } from "formik";

export const FormikDependientes = ({ initialValues, validationSchema, submit, title, children, ref }) => {
   return (
      <Card sx={{ maxWidth: "90%", margin: "auto", padding: ".8rem",display:"flex", justifyContent:"center" }}>
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
               <Grid container spacing={2}>
                  <Formik innerRef={ref} initialValues={initialValues} validationSchema={validationSchema} onSubmit={submit}>
                     {({ values, handleSubmit, handleChange, errors, touched, handleBlur, setFieldValue, setValues }) => {
                        {
                        }
                        return (
                           <>
                              <Box component={"form"} onSubmit={handleSubmit}>
                                 {children}

                                 <Button sx={{marginTop:"1rem"}} type="submit" variant="contained" color="primary">
                                    Agregar a la tabla
                                 </Button>
                              </Box>
                           </>
                        );
                     }}
                  </Formik>
               </Grid>
            </Typography>
         </CardContent>
      </Card>
   );
};
