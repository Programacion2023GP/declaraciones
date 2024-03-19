import React, { useState } from "react";
import { Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { Field, useFormikContext } from "formik";

export const AutoComplete = ({ helperText, loading = false, handleGetValue = null, col, label, name = "name", options, disabled, optional, color, hidden }) => {
   const formik = useFormikContext(); // Obtiene el contexto de Formik
   const [inputValue, setInputValue] = useState("");

   const handleValue = (name, value) => {
      if (handleGetValue) {
         handleGetValue(name, value);
      }
      // return handleGetValue(name, value);
   };
   return (
      <Grid key={"grid_" + name} style={{ margin: "1rem 0" }} item xs={col} container sx={{ display: "flex", position: "relative" }}>
         <Field name={name} key={"field_" + name}>
            {({ field }) => (
               <Autocomplete
                  key={"auto_" + name}
                  disabled={disabled}
                  InputLabelProps={{
                     style: color ? { color: color } : {}
                  }}
                  sx={{ minWidth: "100%", display: hidden ? "none" : "flex", flexDirection: "column", alignItems: "center" }}
                  disablePortal
                  id={`${name}-autocomplete`}
                  options={options}
                  getOptionLabel={(option) => option.text}
                  onChange={(event, newValue) => {
                     const selectedOption = options.find((option) => option.text.trim() === newValue.text.trim());
                     handleValue(name, selectedOption.id);
                     // handleGetValue ?? handleGetValue(name, selectedOption.id);
                     formik.setFieldValue(name, selectedOption ? selectedOption.id : "");
                  }}
                  inputValue={inputValue}
                  onInputChange={(event, newInputValue) => {
                     setInputValue(String(newInputValue));
                  }}
                  renderInput={(params) => (
                     <TextField
                        key={"text_" + name}
                        {...params}
                        {...field}
                        disabled={loading || disabled}
                        fullWidth
                        label={label}
                        onBlur={formik.handleBlur}
                        variant="outlined"
                        error={formik.touched[name] && formik.errors[name]}
                        helperText={formik.touched[name] && formik.errors[name] ? formik.errors[name] : helperText}
                        InputProps={{
                           style: optional ? { color: "green" } : {},
                           ...params.InputProps,
                           endAdornment: (
                              <>
                                 {loading ? <CircularProgress color="primary" size={35} sx={{ position: "absolute", top: "30%", left: "40%" }} /> : null}
                                 {params.InputProps.endAdornment}
                              </>
                           )
                        }}
                     />
                  )}
               />
            )}
         </Field>
      </Grid>
   );
};
