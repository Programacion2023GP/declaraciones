import React, { useContext, useEffect } from "react";
import { Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import { Field, useFormikContext } from "formik"; // Importa el hook useFormikContext
import InputMask from "react-input-mask";
import Interface from "../../../services/interface";

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
   const formik = useFormikContext(); // Obtiene el contexto de Formik

   useEffect(() => {}, [name]);

   const errors = formik.errors;

   const isError = formik.touched[name] && !!formik.errors[name];
   const handleInput = (event) => {
      const { type } = event.target;
   
      // Verificar si el tipo de campo es "number"
      if (type === "number") {
         // Obtener el valor actual del campo de entrada
         let value = event.target.value;
   
         // Filtrar el valor para permitir solo dígitos y un punto decimal
         value = value.replace(/[^0-9.]/g, '');
   
         // Verificar si hay más de un punto decimal y eliminar los extras
         const decimalCount = value.split('.').length - 1;
         if (decimalCount > 1) {
            value = value.slice(0, value.lastIndexOf('.'));
         }
   
         // Actualizar el valor del campo de entrada con el valor filtrado
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
                  type={type == null ? "text" : type} // Utiliza type si está definido, de lo contrario, usa "text"
                  variant="outlined"
                  value={formik.values && formik.values[name] ? formik.values[name] : ""}
                  onChange={formik.handleChange} // Utiliza el handleChange de Formik
                  onBlur={(e) => {
                     formik.handleBlur(e); // Usa handleBlur de Formik para manejar el blur

                     // Agrega tu lógica adicional aquí
                     // Por ejemplo, puedes agregar variables o eventos al contexto DebugerContext
                  }}
                  disabled={loading || disabled}
                  fullWidth
                  onInput={handleInput}
                  multiline={rows} // Habilita multiline solo si type no está definido
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
const handleInputFormik = async (e, setFieldValue, input, toUpper = true) => {
   try {
      const newText = toUpper ? await formatToUpperCase(e) : await formatToLowerCase(e);
      setFieldValue(input, newText);
   } catch (error) {
      console.log(error);
      Toast.Error(error);
   }
};
