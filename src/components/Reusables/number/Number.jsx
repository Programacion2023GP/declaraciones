import { Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useFormikContext } from "formik";

export const Number = ({
   helperText,
   loading = false,
   col,
   label,
   name = "name",
   onChange,
   value = null,
   errors,
   touched,
   handleBlur,
   disabled,
   validations,
   color,
   optional
}) => {
   useEffect(() => {}, [name, value]);
   const formik = useFormikContext();
   return (
      <Grid item xs={col} sx={{ display: "flex", position: "relative" }}>
         <TextField
            disabled={loading || disabled}
            fullWidth
            onBlur={handleBlur}
            // label={label}
            type={"number"}
            variant="outlined"
            name={name}
            onChange={(e) => {
               let inputValue = e.target.value;
               let isNumber = /^\d*\.?\d*$/.test(inputValue); // Verifica si el valor ingresado es un número o un número decimal
               inputValue = inputValue.replace(/[^\d.]/g, ""); // Elimina todos los caracteres no numéricos ni puntos
               if (isNumber || inputValue === "") {
                  formik.setFieldValue(name, parseInt(inputValue));
                  handleValue(name, parseInt(inputValue));
                  setNumber(inputValue === "" ? 0 : parseInt(inputValue)); // Asigna cero si el valor es vacío
               }
            }}
            value={value}
            error={errors[name] && touched[name]}
            helperText={errors[name] && touched[name] ? errors[name] : helperText}
            InputLabelProps={{
               shrink: true,
               style: color ? { color: "green" } : {}
            }}
         />
         {loading && <CircularProgress sx={{ position: "absolute", top: "40%", left: "40%" }} />}
      </Grid>
   );
};
