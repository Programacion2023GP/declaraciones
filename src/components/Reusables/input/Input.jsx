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
   textStyleCase = null
}) => {
   const formik = useFormikContext(); 

   useEffect(() => {}, [name]);

   const errors = formik.errors;

   const isError = formik.touched[name] && !!formik.errors[name];
   const handleInput = (event) => {
      const { type } = event.target;
   
      if (type === "number") {
         let value = event.target.value;
   
         value = value.replace(/[^0-9.]/g, '');
   
         const decimalCount = value.split('.').length - 1;
         if (decimalCount > 1) {
            value = value.slice(0, value.lastIndexOf('.'));
         }
         event.target.value = value;
      }
   };
   
   
   
   
   

   return (
      <>
         <Grid style={{ margin: marginBoton ? `${marginBoton} 0` : "0rem 0" }} item lg={col} xl={col} xs={12} md={12} sx={{ display: hidden ? "none" : "flex" }}>
            {mask ? (
               <Field name={name}>
                  {({ field }) => (
                     <InputMask
                        mask={mask}
                        value={formik.values && formik.values[name] ? formik.values[name] : ""}
                        onInput={(e) => {
                           textStyleCase != null ? handleInputFormik(e, formik.setFieldValue, idName, textStyleCase) : null;
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
                  value={formik.values && formik.values[name] ? formik.values[name] : ""}
                  onChange={formik.handleChange}
                  onBlur={(e) => {
                     formik.handleBlur(e); 
                  }}
                  disabled={loading || disabled}
                  fullWidth
                  onInput={handleInput}
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
const handleInputFormik = async (e, setFieldValue, input, toUpper = true) => {
   try {
      const newText = toUpper ? await formatToUpperCase(e) : await formatToLowerCase(e);
      setFieldValue(input, newText);
   } catch (error) {
      console.log(error);
      Toast.Error(error);
   }
};
