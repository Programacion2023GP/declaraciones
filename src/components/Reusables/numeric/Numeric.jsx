import React, { useContext, useEffect, useState } from "react";
import { Button, Divider, Grid, IconButton, InputBase, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import { Field, useFormikContext } from "formik"; // Importa el hook useFormikContext
import InputMask from "react-input-mask";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Paper from "@mui/material/Paper";
import { symbol } from "prop-types";
import Interface from "../../../services/interface";

export const Numeric = ({
   loading = false,
   col,
   max,
   min,
   label,
   name = "name",
   disabled,
   placeholder,
   color,
   hidden,
   handleGetValue,
   marginBoton,
   allowDecimal = false,
   initial
}) => {
   const formik = useFormikContext(); // Obtiene el contexto de Formik
   const [isElevated, setIsElevated] = useState(false); // Variable de estado para controlar la elevación de las letras
   const [number, setNumber] = useState(formik.values[name] || initial || null);

   useEffect(() => {
      formik.values[name]>0 ?? setNumber(parseInt(formik.values[name]));
   }, [name, formik.values[name]]); // Observa los cambios en el nombre y el valor del campo

   const errors = formik.errors; // Obtiene los errores de Formik

   // Determinar si hay un error para este campo
   const isError = formik.touched[name] && formik.errors[name];
   const pattern = allowDecimal ? "^\\d*\\.?\\d*$" : "\\d*";
   const handleMore = () => {
      setIsElevated(true); // Eleva las letras cuando se presiona el botón
      if (number + 1 > max) {
         return;
      }
      setNumber(isNaN(number) ? 1 : number + 1);
      formik.setFieldValue(name, isNaN(number) ? 1 : number + 1); // Actualiza el valor solo si es un número o está vacío
   };

   const handleMinus = () => {
      setIsElevated(true); // Eleva las letras cuando se presiona el botón
      if (number - 1 > min) {
         return;
      }
      if (number == "") {
         setNumber(parseInt(0));
      }
      setNumber(isNaN(number) || number <= 0 ? 0 : number - 1);
      formik.setFieldValue(name, isNaN(number) ? 1 : number - 1); // Actualiza el valor solo si es un número o está vacío
   };
   const handleValue = (name, value) => {
      handleGetValue && handleGetValue(name, value);
   };
   return (
      <>
         <Grid
            style={{ margin: marginBoton ? `${marginBoton} 0` : "0" }}
            item
            lg={col}
            xl={col}
            xs={12}
            md={12}
            sx={{ display: hidden ? "none" : "flex", flexDirection: "column", alignItems: "center", position: "relative" }}
         >
            <Grid style={{ margin: marginBoton ? `${marginBoton} 0` : "0rem 0", width: "100%" }} item>
               <Paper sx={{ p: "4px 4px", display: "flex", alignItems: "center", width: "100%" }}>
                  <IconButton disabled={disabled} onClick={handleMore} color="primary" sx={{ p: "10px" }} aria-label="menu">
                     <AddIcon />
                  </IconButton>
                  <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

                  <TextField
                     key={"text_" + name}
                     disabled={disabled}
                     name={name}
                     value={number}
                     label={label}
                     // onClick={setIsElevated(true)}
                     type={"text"} // Utiliza type si está definido, de lo contrario, usa "text"
                     variant="standard"
                     fullWidth
                     onClick={() => {
                        setIsElevated(true);
                     }}
                     InputLabelProps={{
                        style: color ? { color: color } : {},
                        pattern,
                        shrink: disabled ? true : formik.values[name] ? formik.values[name] : isElevated
                     }}
                     onChange={(e) => {
                   
                        let inputValue = e.target.value;
                        let isNumber = /^\d*\.?\d*$/.test(inputValue); // Verifica si el valor ingresado es un número o un número decimal
                        inputValue = inputValue.replace(/[^\d.]/g, ""); // Elimina todos los caracteres no numéricos ni puntos
                        if (isNumber || inputValue === "") {
                           const parsedValue = parseInt(inputValue); // Convertir el valor a entero
                           if (parsedValue > max) {
                              // Si el valor ingresado es mayor que el máximo permitido
                              // Aquí podrías mostrar un mensaje de error o realizar alguna otra acción para notificar al usuario
                           } else if (parsedValue < min) {
                              // Si el valor ingresado es menor que el mínimo permitido
                              // Aquí podrías mostrar un mensaje de error o realizar alguna otra acción para notificar al usuario
                           } else {
                              // Si el valor ingresado está dentro del rango permitido
                              formik.setFieldValue(name, parsedValue);
                              handleValue(name, parsedValue);
                              setNumber(parsedValue === "" ? 0 : parsedValue); // Asigna cero si el valor es vacío
                           }
                        }
                     }}
                  />

                  <Divider sx={{ height: 28, m: 0 }} orientation="vertical" />
                  <IconButton disabled={disabled} onClick={handleMinus} color="error" sx={{ p: "10px" }} aria-label="menu">
                     <RemoveIcon />
                  </IconButton>
               </Paper>
               {/* Mueve el Typography aquí para que esté al mismo nivel que el Paper */}
               <Typography sx={{ color: isError ? "red" : "gray" }} variant="subtitle2" color="initial">
                  {isError || placeholder}
               </Typography>
               {loading && <CircularProgress sx={{ position: "absolute", top: "40%", left: "40%" }} />}
            </Grid>
         </Grid>
      </>
   );
};
