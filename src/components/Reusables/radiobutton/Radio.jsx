import React, { useContext, useEffect, useState } from "react";
import { Grid, RadioGroup, FormControlLabel, Radio, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { Field, useFormikContext } from "formik"; // Importar Field y useFormikContext de Formik
import { Ngif } from "../conditionals/Ngif";

export const CustomRadio = ({
   // loading = false,
   col,

   name,
   title,
   hidden,
   options,
   handleGetValue,
   rowLayout = true // Cambiar a false para poner en columnas
}) => {
   const { values, errors, touched, handleChange, handleBlur } = useFormikContext(); // Obtener valores, errores y funciones de Formik
   const [loading,setLoading]= useState(false)
   useEffect(() => {
      if (Array.isArray(options) && options.length > 0) {

         setLoading(false)

      }
      if (Array.isArray(options) && options.length ==0) {
         setLoading(true)

      }
      if (!Array.isArray(options)) {
         setLoading(true)
         options = [];

      }


   }, [title, name, values[name],options]);

   const isError = touched[name] && errors[name];
   const handleValue = (name, value) => {
      if (handleGetValue) {
         handleGetValue(name, value);
      }
   };
   return (
      <Grid item lg={col} xl={col} xs={12} md={12} sx={{ display: hidden ? "none" : "flex", flexDirection: "column", alignItems: "center" }}>
         <Typography
            variant="subtitle1"
            align="center"
            color="textPrimary"
            sx={{ marginBottom: "1rem" }} // Agregar espacio debajo del título
         >
            {title}
         </Typography>
         <RadioGroup
            name={name}
            value={values[name]} // Usar el valor del formulario
            onChange={handleChange} // Usar la función de cambio de Formik
            onBlur={handleBlur} // Usar la función de desenfoque de Formik
            sx={{ flexDirection: rowLayout ? "row" : "column" }} // Ajustar la dirección del grupo de radio
         >
            <Ngif condition={options.length>0}>
             
            {options.map((option, index) => (
               <FormControlLabel
                  key={index}
                  value={option.value}
                  onClick={() => {
                     //  console.log("hola", handleGetValue);
                     handleValue(name, option.value);
                  }}
                  control={<Radio />}
                  label={option.label}
                  disabled={loading}
                  sx={{
                     marginBottom: rowLayout ? 0 : "8px", // Espacio entre los radio buttons si están en columnas
                     "& .MuiRadio-root": {
                        color: "#1976d2"
                     },
                     "& .MuiFormControlLabel-label": {
                        color: "#1976d2",
                        fontSize: "14px"
                     },
                     "& .Mui-checked": {
                        color: "#1976d2"
                     }
                  }}
               />
            ))}
            </Ngif>
         </RadioGroup>
         {isError && (
            <Typography variant="body2" color="error">
               {errors[name]}
            </Typography>
         )}
         {loading && <CircularProgress sx={{ position: "absolute", bottom: "20%", left: "50%" }} />}
      </Grid>
   );
};
