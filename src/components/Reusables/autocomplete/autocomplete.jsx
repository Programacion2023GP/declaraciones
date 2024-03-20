import React, { useEffect, useState } from "react";
import { Box, Grid, LinearProgress, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { Field, useFormikContext } from "formik";
import PropTypes from "prop-types";

export const AutoComplete = ({ helperText, loading = false, handleGetValue = null, col, label, name = "name", options = [], disabled, optional, color, hidden }) => {
   const formik = useFormikContext(); // Obtiene el contexto de Formik
   const [inputValue, setInputValue] = useState("");
   const [loadingData, setLoadingData] = useState(true);
   const [progress, setProgress] = useState(10);

   const handleValue = (name, value) => {
      if (handleGetValue) {
         handleGetValue(name, value);
      }
      // return handleGetValue(name, value);
   };

   useEffect(() => {
      if (Array.isArray(options) && options.length > 0) {
         setLoadingData(false);
      }
      if (!Array.isArray(options)) {
         options = []; // Si no es un array, lo convertimos en un array vacío
      }
   }, [options]);
   return (
      <Grid style={{ margin: "1rem 0" }} item xs={col} container sx={{ display: "flex", position: "relative" }}>
         <Field name={name}>
            {({ field }) => (
               <Autocomplete
                  disabled={loading || disabled || loadingData}
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
                        {...params}
                        {...field}
                        disabled={loading || disabled || loadingData}
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
                                 {loading || loadingData ? (
                                    <>
                                       {loading && (
                                          <Box sx={{ position: "absolute", display: "inline-flex", top: "15%", left: "50%" }}>
                                             <CircularProgress color="primary" size={35} />
                                          </Box>
                                       )}

                                       {loadingData && !disabled &&  (
                                          <Box
                                             sx={{
                                                position: "absolute",
                                                display: "flex",
                                                alignItems: "center",
                                                top: "15%",
                                                left: "50%",
                                                transform: "translateX(-50%)"
                                             }}
                                          >
                                             <Typography
                                                variant="caption"
                                                component="div"
                                                color="text.secondary"
                                                sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}
                                             >
                                                Cargando informacion...
                                                <Box sx={{ mt: 1 }}>
                                                   <LinearProgress value={progress} sx={{ width: "100px" }} />
                                                </Box>
                                             </Typography>
                                          </Box>
                                       )}
                                    </>
                                 ) : null}

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
AutoComplete.propTypes = {
   options: PropTypes.arrayOf(
     PropTypes.shape({
       id: PropTypes.number.isRequired,
       text: PropTypes.string.isRequired
     })
   ).isRequired,
   // Otras PropTypes para tus props aquí...
 };