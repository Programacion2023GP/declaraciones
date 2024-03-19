import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import { Field, useFormikContext } from "formik"; // Importa el hook useFormikContext
import InputMask from "react-input-mask";

export const Text = ({ loading = false, col, label, name = "name", type = null, disabled, placeholder, color, rows, hidden, mask }) => {
   const formik = useFormikContext(); // Obtiene el contexto de Formik

   useEffect(() => {}, [name, formik.values[name]]); // Observa los cambios en el nombre y el valor del campo

   const errors = formik.errors; // Obtiene los errores de Formik

   // Determinar si hay un error para este campo
   const isError = formik.touched[name] && formik.errors[name];

   return (
      <>
         <Grid
            style={{ margin: "1rem 0" }}
            item
            xs={col}
            sx={{ display: hidden ? "none" : "flex", flexDirection: "column", alignItems: "center", position: "relative" }}
         >
            {mask ? (
               <Field name={name}>
                  {({ field }) => (
                     <InputMask
                        mask={mask}
                        value={field.value}
                        onChange={(e) => field.onChange(e)} // Utiliza field.onChange para actualizar el valor en Formik
                        onBlur={(e) => field.onBlur(e)} // Utiliza field.onBlur para manejar el desenfoque y activar la validación
                        disabled={loading || disabled}
                     >
                        {(inputProps) => (
                           <TextField
                              {...inputProps}
                              key={"text_" + name}
                              name={name}
                              label={label}
                              type={type !== null && type !== undefined ? type : "text"} // Utiliza type si está definido, de lo contrario, usa "text"
                              variant="outlined"
                              fullWidth
                              error={isError}
                              helperText={isError ? formik.errors[name] : placeholder}
                              InputLabelProps={{
                                 style: color ? { color: color } : {}
                              }}
                           />
                        )}
                     </InputMask>
                  )}
               </Field>
            ) : (
              <TextField
              key={"text_" + name}
              name={name}
              label={label}
              type={type !== null && type !== undefined ? type : "text"} // Utiliza type si está definido, de lo contrario, usa "text"
              variant="outlined"
              value={formik.values[name]} // Utiliza el valor del campo desde Formik
              onChange={formik.handleChange} // Utiliza el handleChange de Formik
              onBlur={formik.handleBlur} // Utiliza el handleBlur de Formik
              disabled={loading || disabled}
              fullWidth
              multiline={type === null || type === undefined} // Habilita multiline solo si type no está definido
              rows={type === null || type === undefined ? rows : undefined} // Establece las filas solo si type no está definido
              error={isError}
              helperText={isError ? formik.errors[name] : placeholder}
              InputLabelProps={{
                style: color ? { color: color } : {}
              }}
            />
            
            )}
            {loading && <CircularProgress sx={{ position: "absolute", top: "40%", left: "40%" }} />}
         </Grid>
      </>
   );
};
