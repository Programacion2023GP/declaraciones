import { Alert, Box, Button, Card, CardContent, Grid, Typography } from "@mui/material";
import { Formik } from "formik";
import { Ngif } from "../conditionals/Ngif";
import { forwardRef, useEffect } from "react";
export const FormikForm = forwardRef(
   ({ className, initialValues, validationSchema, submit, title, children, message, button, previousButton, handlePrevious, advertence }, ref) => {
      useEffect(() => {}, []);
      return (
         <Card className={className} sx={{ maxWidth: "90%", margin: "auto", padding: ".8rem" }}>
            <CardContent>
               <Typography variant="h3" align="center" color="textPrimary" style={{ fontWeight: "500" }}>
                  {title}
               </Typography>
               <Typography variant="h6" align="left" color="textPrimary" style={{ fontWeight: "500" }}>
                  {message}
               </Typography>
              <Ngif condition={advertence}>
              <Alert  variant="filled" severity="info" >
                  Notas
                  <br />
                  {advertence}
               </Alert>
              </Ngif>
               <br />
               <Grid container spacing={1}>
                  <Formik innerRef={ref} initialValues={initialValues} validationSchema={validationSchema} onSubmit={submit}  >
                     {({ values, handleSubmit, handleChange, errors, touched, handleBlur, setFieldValue, setValues ,}) => {
                        {
                           // console.log(errors);
                        }
                        return (
                           <>
                              <Grid container component={"form"} onSubmit={handleSubmit}>
                                 {children}

                                 <Ngif condition={previousButton && handlePrevious}>
                                  
                                    <Button sx={{ marginTop: "1rem",marginRight:"1ren" }} type="button" onClick={handlePrevious} variant="contained" color="secondary">
                                    Regresar a la pagina anterior
                                    </Button>
                                 </Ngif>
                                 <Ngif condition={button}>
                                     
                                    <Button sx={{ marginLeft:"1rem",marginTop: "1rem" }} type="submit" variant="contained" color="primary">
                                       Registrar y Continuar
                                    </Button>
                                 </Ngif>
                              </Grid>
                           </>
                        );
                     }}
                  </Formik>
               </Grid>
            </CardContent>
         </Card>
      );
   }
);
