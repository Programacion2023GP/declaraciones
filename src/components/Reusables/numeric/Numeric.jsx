import React, { useContext, useEffect, useState } from "react";
import { Button, Divider, Grid, IconButton, InputBase, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import { Field, useFormikContext } from "formik"; // Importa el hook useFormikContext
import InputMask from "react-input-mask";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Paper from "@mui/material/Paper";

export const Numeric = ({
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
   allowDecimal = false,
   initial
}) => {
   const formik = useFormikContext(); // Obtiene el contexto de Formik
   const [number, setNumber] = useState(initial || 0);
   useEffect(() => {}, [name]); // Observa los cambios en el nombre y el valor del campo

   const errors = formik.errors; // Obtiene los errores de Formik

   // Determinar si hay un error para este campo
   const isError = formik.touched[name] && formik.errors[name];
   const pattern = allowDecimal ? "^\\d*\\.?\\d*$" : "\\d*";
   const handleMore = () => {
      setNumber(parseInt(number) + 1);
   };
   const handleMinius = () => {
      setNumber(parseInt(number) - 1);
   };
   return (
      <>
         <Grid
            style={{ margin: marginBoton ? `${marginBoton} 0` : "1rem 0" }}
            item
            xs={col}
            sx={{ display: hidden ? "none" : "flex", flexDirection: "column", alignItems: "center", position: "relative" }}
         >
            <Grid style={{ margin: marginBoton ? `${marginBoton} 0` : "1rem 0" }} item>
               <Paper sx={{ p: "4px 4px", display: "flex", alignItems: "center", width: "100%" }}>
                  <IconButton onClick={handleMore} color="primary" sx={{ p: "10px" }} aria-label="menu">
                     <AddIcon />
                  </IconButton>
                  <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

                  <TextField
                     key={"text_" + name}
                     name={name}
                     value={number}
                     label={label}
                     type={"text"} // Utiliza type si está definido, de lo contrario, usa "text"
                     variant="standard"
                     fullWidth
                     InputLabelProps={{
                        style: color ? { color: color } : {},
                        pattern
                     }}
                     onChange={(e) => {
                        let inputValue = e.target.value;
                        let isNumber = /^\d*\.?\d*$/.test(inputValue); // Verifica si el valor ingresado es un número o un número decimal
                        inputValue = inputValue.replace(/[^\d.]/g, ""); // Elimina todos los caracteres no numéricos ni puntos

                        if (isNumber || inputValue === "") {
                           setNumber(parseInt(inputValue));
                           //    formik.setFieldValue(name, inputValue); // Actualiza el valor solo si es un número o está vacío
                        }
                     }}
                  />
                  <Divider sx={{ height: 28, m: 0 }} orientation="vertical" />
                  <IconButton onClick={handleMinius} color="error" sx={{ p: "10px" }} aria-label="menu">
                     <RemoveIcon />
                  </IconButton>
               </Paper>
               {/* Mueve el Typography aquí para que esté al mismo nivel que el Paper */}
               <Typography sx={{ color: formik.errors[name] ? "red" : "gray" }} variant="subtitle2" color="initial">
                  {isError ? formik.errors[name] : placeholder}
               </Typography>
               {loading && <CircularProgress sx={{ position: "absolute", top: "40%", left: "40%" }} />}
            </Grid>
         </Grid>
      </>
   );
};
