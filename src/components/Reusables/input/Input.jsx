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
   const handleInputFormik = async (e, setFieldValue, input, toUpper = true) => {
      try {
         const newText = toUpper ? await formatToUpperCase(e) : await formatToLowerCase(e);
         setFieldValue(input, newText);
      } catch (error) {
         Toast.Error(error);
      }
   };
   const formatToLowerCase = (event) => {
      const newText = event.target.value.toLowerCase();
      return newText;
   };
   const formatToUpperCase = (event) => {
      const newText = event.target.value.toUpperCase();
      return newText;
   };
   const formik = useFormikContext();
   const handleValue = (name, value) => {
      if (handleGetValue) {
         handleGetValue(name, value);
      }
   };
   useEffect(() => {
   }, [name, formik.values[name]]);

   const errors = formik.errors;

   const isError = formik.touched[name] && !!formik.errors[name];
   const handleInput = (event) => {
      const { type } = event.target;

      if (type === "number") {
         let value = event.target.value;

         value = value.replace(/[^0-9.]/g, "");

         const decimalCount = value.split(".").length - 1;
         if (decimalCount > 1) {
            value = value.slice(0, value.lastIndexOf("."));
         }
         event.target.value = value;
      }
   };

   return (
      <>
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
                        value={
                           formik.values && formik.values[name] !== undefined && formik.values[name] !== null
                           ? type === "number" && formik.values[name] !== null
                             ? formik.values[name].toString().replace(/^0+(?=\d)/, "")
                             : formik.values[name]
                           : type === "number" && !isNaN(parseInt(formik.values[name]))
                             ? parseInt(formik.values[name])
                             : "" // Mostrar vacío si el valor es null o undefined
                         
                        }
                        onInput={(e) => {
                           textStyleCase != null ? handleInputFormik(e, formik.setFieldValue, name, textStyleCase) : null;
                        }}
                        onChange={(e) => field.onChange(e)}
                        onBlur={(e) => field.onBlur(e)}
                        disabled={loading || disabled}
                     >
                        {(inputProps) => (
                           <TextField
                              {...inputProps}
                              key={"text_" + name}
                              name={name}
                              label={label}
                              type={type !== null && type !== undefined ? type : "text"}
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
                  type={type == null ? "text" : type}
                  variant="outlined"
                  value={
                     formik.values && formik.values[name] !== undefined && formik.values[name] !== null
                        ? type === "number" && formik.values[name] !== null
                           ? formik.values[name].toString().replace(/^0+(?=\d)/, "")
                           : formik.values[name]
                        : type === "number" && !isNaN(parseInt(formik.values[name]))
                          ? parseInt(formik.values[name])
                          : "" // Mostrar vacío si el valor es null o undefined
                  }
                  // type === "number" && !isNaN(parseInt(formik.values[name])) && parseInt(formik.values[name]) === 0 ?0
                  onChange={formik.handleChange}
                  onBlur={(e) => {
                     formik.handleBlur(e);
                  }}
                  onInput={(e) => {
                     handleInput(e);
                     handleValue(name, e.target.value);
                     textStyleCase = type == null ? handleInputFormik(e, formik.setFieldValue, name, true) : false;
                     // textStyleCase != null ? handleInputFormik(e, formik.setFieldValue, name, textStyleCase) : null;
                  }}
                  disabled={loading || disabled}
                  fullWidth
                  // defaultValue={1}
                  inputProps={{ inputMode: "numeric" }}
                  multiline={rows}
                  rows={type === null || type === undefined ? rows : undefined}
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
