import React from "react";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import { Grid } from "@mui/material";

export const Date = ({
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
  optional,
  disabled,
  validations,
}) => {
  return (
    <Grid item xs={col} sx={{ display: "flex", position: "relative" }}>
      <TextField
        type="date"
        fullWidth
        disabled={disabled || loading}
        label={label}
        variant="outlined"
        name={name}
        onChange={(e) => onChange(name, e.target.value)}
        value={value}
        error={errors[name] && touched[name]}
        helperText={errors[name] && touched[name] ? errors[name] : helperText}
        InputProps={{
          endAdornment: (
            <>{loading && <CircularProgress color="inherit" size={20} />}</>
          ),
        }}
        InputLabelProps={{
          
          shrink: true,
          style: { color: optiona?'"green"':'#1976d2' }, // Color del label en estado enfocado
        }}
        sx={{
          "& .MuiInputLabel-root": {
            color: "rgba(0, 0, 0, 0.54)", // Color del label
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(0, 0, 0, 0.23)", // Color del borde del input
          },
          '& .MuiInputBase-input[type="date"]::-webkit-calendar-picker-indicator':
            {
              background: "transparent",
              bottom: 0,
              color: "transparent",
              cursor: "pointer",
              height: "auto",
              left: 0,
              position: "absolute",
              right: 0,
              top: 0,
              width: "100%",
            },
          '& .MuiInputBase-input[type="date"]::-webkit-inner-spin-button, .MuiInputBase-input[type="date"]::-webkit-clear-button':
            {
              display: "none",
            },
          "& .MuiInputAdornment-positionEnd": {
            position: "absolute",
            right: 10,
            top: "50%",
            transform: "translateY(-50%)",
          },
        }}
      />
    </Grid>
  );
};
