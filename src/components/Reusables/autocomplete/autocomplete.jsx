import Grid from "@mui/system/Unstable_Grid/Grid";
import { Autocomplete, CircularProgress, FormControl, FormHelperText, IconButton, LinearProgress, TextField, Tooltip, Typography } from "@mui/material";
// import Toast from "../../utils/Toast";
import { useEffect, useState } from "react";
import { Field, useFormikContext } from "formik";
// import { IconReload } from "@tabler/icons";
import { Box } from "@mui/system";
import { Ngif } from "../conditionals/Ngif";
import { useLayoutEffect } from "react";

/**
 *
 * {/* Marca *}
   <Grid xs={12} md={6} sx={{ mb: 2 }}>
      <Select2Component
         name={"brand_id"}
         label={"Marca *"}
         valueLabel={values.brand}
         formDataLabel={"brand"}
         placeholder={"Selecciona una opción..."}
         options={dataBrands}
         fullWidth={true}
         // handleChangeValueSuccess={handleChangeBrands}
         handleBlur={handleBlur}
         error={errors.brand_id}
         touched={touched.brand_id}
         disabled={false}
         pluralName={""}
         refreshSelect={getSelectIndex}
      />
   </Grid>
 */

// =================== COMPONENTE =======================

export const AutoComplete = ({
   col,
   name,
   label,
   placeholder,
   options,
   reset,
   // options = ["Selecciona una opción..."],
   disabled,

   helperText,
   loading = false,
   loadingData,
   color,
   hidden,
   variant = "outlined",
   marginBoton,
   fielValue = "text",
   fullWidth,
   pluralName,
   refreshSelect = null,
   refreshSelectParams = null,
   handleGetValue = null,
   handleChangeValueSuccess,
   ...props
}) => {
   const formik = useFormikContext(); // Obtiene el contexto de Formik
   const errors = formik.errors;
   const isError = formik.touched[name] && !!formik.errors[name];

   const [labelValue, setLabelValue] = useState("Selecciona una opción...");
   const [loader, setLoader] = useState(false);

   const handleValue = (name, value) => {
      if (handleGetValue) {
         handleGetValue(name, value);
      }
   };

   const isOptionEqualToValue = (option, value) => {
      // const item = options.find((option) => option.id === Number(formik.values[name]))?.label;
      // if (item && item !== "Selecciona una opción...") {
      //    formik.setFieldValue(name, Number(formik.values[name]));
      //    setLabelValue(item);
      // }

      if (option[fielValue]) {
         if (typeof value === "string") return option[fielValue] === value;
         else {
            // value = option.label;
            // .lconsoleog(value);
            return option.id === value;
         }
      } else return option === value;
   };
   // const handleChangeValue = async (value, setValues) => {
   const handleChangeValue = async (value, setFieldValue) => {
      try {
         // console.log("Select2Component->handleChangeValue->value", value);

         if (!value) {
            formik.setFieldValue(name, 0);
            setLabelValue("Selecciona una opción...");
            return;
         }
         const selectedOption = dataOptions.find((option) =>
            typeof value === "object" ? option[fielValue].trim() === value[fielValue].trim() : option.trim() === value.trim()
         );
         handleValue(name, typeof value === "object" ? selectedOption.id : selectedOption);
         formik.setFieldValue(name, typeof value === "object" ? selectedOption.id : selectedOption);
         setLabelValue(typeof value === "object" ? selectedOption[fielValue] : selectedOption);
         // console.log("values", values);
         // // await setFormData(values);
         // // await setValues(values);

         if (handleChangeValueSuccess) handleChangeValueSuccess(value, setFieldValue); //en esta funcion
      } catch (error) {
         console.log(error);
         // Toast.Error(error);
      }
   };

   const handleClickRefresh = async () => {
      try {
         setLoader(true);
         await refreshSelect(refreshSelectParams);
         setLoader(false);
         // Toast.Success("Actualizada");
      } catch (error) {
         console.log(error);
         // Toast.Error(error);
      }
   };

   // useEffect(() => {
   //    // console.log("useEffect");
   // }, [options, formik.values[name]]);
   const [dataOptions, setDataOptions] = useState([]);
   useEffect(() => {
      Number(formik.values[name]) == 0 && setLabelValue("Selecciona una opción...");
      if (Array.isArray(options) && options.length > 0) {
         setDataOptions([{ id: 0, [fielValue]: "Selecciona una opción..." }, ...options]);
         setLoader(false);
         if (formik.values[name]) {
            const selectedOption = options.find((option) => option.id === formik.values[name]);
            if (selectedOption) {
               formik.setFieldValue(name, selectedOption.id); // Establece la opción seleccionada en Formik
               setLabelValue(selectedOption[fielValue]); // Establece el valor de la etiqueta
            }
         }
      }
      if (!Array.isArray(options)) {
         options = [];
         setLoader(false);
      }
   }, [options, formik.values[name]]);

   useEffect(()=>{
      formik.setFieldValue(name, 0);
      setLabelValue("Selecciona una opción...");

   },[reset])


   return (
      <Grid
         key={`Grid_Container_${name}`}
         style={{ margin: ".5rem 0", padding: " 0 .05rem 0 .4rem" }}
         item
         lg={col}
         xl={col}
         xs={12}
         md={12}
         container
         sx={{ display: "flex", position: "relative" }}
      >
         <FormControl key={`FormControl_${name}`} fullWidth>
            <Box key={`Box_${name}`} display={"flex"}>
               <Autocomplete
                  disabled={ disabled||loading}
                  autoHighlight={true}
                  // {...dataOptions}
                  sx={{ minWidth: "100%", display: hidden ? "none" : "flex", flexDirection: "column", alignItems: "center" }}
                  key={`select_${name}`}
                  disablePortal
                  openOnFocus
                  label={label}
                  placeholder={placeholder}
                  options={dataOptions}
                  // {...field}
                  getOptionLabel={(option) => (typeof option === "string" ? option : option[fielValue])}
                  // getOptionKey={(option) => option.id}
                  // getOptionSelected={(option, value) => option[fielValue] === value}
                  value={labelValue}
                  onChange={(_, newValue) => {
                     handleChangeValue(newValue, formik.setFieldValue);
                  }}
                  onBlur={formik.handleBlur}
                  fullWidth={fullWidth || true}
                  isOptionEqualToValue={isOptionEqualToValue}
                  renderInput={(params) => (
                     <TextField
                        disabled={loading}
                        key={`TextField_Selected_${name}`}
                        {...params}
                        name={name}
                        error={isError ? "true" : undefined}
                        label={label}
                        InputProps={{
                           ...params.InputProps,
                           endAdornment: (
                              <>
                                 {loading || loadingData ? (
                                    <>
                                       {loading && (
                                          <Box key={`Box_TextField_Selected_${name}`} sx={{ position: "absolute", display: "inline-flex", top: "15%", left: "50%" }}>
                                             <CircularProgress key={`CircularProgress_TextField_Selected_${name}`} color="primary" size={35} />
                                          </Box>
                                       )}

                                       {loadingData && !disabled && (
                                          <Box
                                             key={`loadingData_TextField_Selected_${name}`}
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
                                                key={`Typography_TextField_Selected_${name}`}
                                                variant="caption"
                                                component="div"
                                                color="text.secondary"
                                                sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}
                                             >
                                                Cargando informacion...
                                                <Box key={`Box_LinearProgress_Selected_${name}`} sx={{ mt: 1 }}>
                                                   <LinearProgress key={`Box_LinearProgress_Selected_${name}`} value={progress} sx={{ width: "100px" }} />
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
                  error={isError ? "true" : undefined}
               />

               {refreshSelect && (
                  <Tooltip title={`Actualizar ${pluralName}`} placement="top">
                     {/* <IconButton type="button" variant="text" color="primary" sx={{ borderRadius: "12px", mr: 1 }} onClick={handleClickRefresh}>
                        <IconReload />
                     </IconButton> */}
                  </Tooltip>
               )}
            </Box>

            {isError && (
               <FormHelperText error id={`ht-${name}`}>
                  {isError ? formik.errors[name] : helperText}
               </FormHelperText>
            )}
         </FormControl>
      </Grid>
   );
};
