import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import { Field, useFormikContext } from "formik";
import InputMask from "react-input-mask";

export const Text = ({
   loading = false,
   col,
   label,
   name = "name",
   type = null,
   disabled,
   placeholder,
   color,
   rows,
   hidden,
   mask,
   marginBoton,
   textStyleCase = null,
   handleGetValue
}) => {
   const formik = useFormikContext();
   const isError = formik.touched[name] && !!formik.errors[name];

   // Tipos que NO deben ser transformados a mayúsculas/minúsculas ni filtrados
   const skipTransformTypes = ["date", "time", "datetime-local", "month", "week", "email", "tel", "url", "password"];

   const formatToUpperCase = (event) => event.target.value.toUpperCase();
   const formatToLowerCase = (event) => event.target.value.toLowerCase();

   const handleInputFormik = async (e, setFieldValue, input, toUpper = true) => {
      try {
         const newText = toUpper ? formatToUpperCase(e) : formatToLowerCase(e);
         setFieldValue(input, newText);
      } catch (error) {
         console.error(error);
      }
   };

   const handleValue = (name, value) => {
      if (handleGetValue) {
         handleGetValue(name, value);
      }
   };

   // Limpieza para campos numéricos comunes (no para date)
   const handleNumericInput = (event) => {
      const { type: inputType, value } = event.target;
      if (inputType === "number") {
         let newValue = value.replace(/[^0-9.]/g, "");
         const decimalCount = newValue.split(".").length - 1;
         if (decimalCount > 1) {
            newValue = newValue.slice(0, newValue.lastIndexOf("."));
         }
         event.target.value = newValue;
      }
   };

   // Manejo para números que deben conservar ceros a la izquierda (type="number" sin mask)
   const handleNumberAsTextChange = (e) => {
      const { value } = e.target;
      const numericValue = value.replace(/[^0-9]/g, "");
      formik.setFieldValue(name, numericValue);
      if (handleGetValue) handleGetValue(name, numericValue);
      if (textStyleCase != null && !skipTransformTypes.includes(type)) {
         handleInputFormik({ ...e, target: { ...e.target, value: numericValue } }, formik.setFieldValue, name, textStyleCase === "upper");
      }
   };

   const isNumberAsText = type === "number" && !mask;
   const shouldSkipTransform = skipTransformTypes.includes(type);

   return (
      <Grid
         style={{ margin: marginBoton ? `${marginBoton} 0` : ".3rem 0", paddingLeft: ".4rem", paddingTop: ".5rem" }}
         item
         lg={col}
         xl={col}
         xs={12}
         md={12}
         sx={{ display: hidden ? "none" : "flex" }}
      >
         {mask ? (
            <Field name={name}>
               {({ field }) => (
                  <InputMask
                     mask={mask}
                     value={formik.values[name] ?? ""}
                     onChange={(e) => field.onChange(e)}
                     onBlur={(e) => field.onBlur(e)}
                     disabled={loading || disabled}
                  >
                     {(inputProps) => (
                        <TextField
                           {...inputProps}
                           name={name}
                           label={label}
                           type={type || "text"}
                           variant="outlined"
                           fullWidth
                           error={isError}
                           helperText={isError ? formik.errors[name] : placeholder}
                           InputLabelProps={{ style: color ? { color: color } : {} }}
                        />
                     )}
                  </InputMask>
               )}
            </Field>
         ) : (
            <TextField
               name={name}
               label={label}
               type={isNumberAsText ? "text" : (type || "text")}
               variant="outlined"
               value={formik.values[name] ?? ""}
               onChange={(e) => {
                  if (isNumberAsText) {
                     handleNumberAsTextChange(e);
                  } else {
                     formik.handleChange(e);
                     handleValue(name, e.target.value);
                  }
               }}
               onBlur={formik.handleBlur}
               onInput={(e) => {
                  // No aplicar transformaciones a tipos especiales ni a números como texto
                  if (!shouldSkipTransform && !isNumberAsText) {
                     handleNumericInput(e);
                     handleValue(name, e.target.value);
                     if (textStyleCase) {
                        handleInputFormik(e, formik.setFieldValue, name, textStyleCase === "upper");
                     }
                  }
               }}
               disabled={loading || disabled}
               fullWidth
               multiline={rows}
               rows={rows}
               error={isError}
               helperText={isError ? formik.errors[name] : placeholder}
               InputLabelProps={{ style: color ? { color: color } : {} }}
               inputProps={{
                  ...(isNumberAsText && { inputMode: "numeric", pattern: "[0-9]*" })
               }}
            />
         )}
         {loading && <CircularProgress sx={{ position: "absolute", top: "40%", left: "40%" }} />}
      </Grid>
   );
};