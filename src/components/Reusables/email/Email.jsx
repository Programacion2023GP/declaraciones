import { Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
export const Email = ({
  helperText,
  loading = false,
  col,
  label,
  name = "name",
  onChange,
  value = "",
  type = null,
  errors,
  handleBlur,
  disabled,
  message,
}) => {
  const [touched, seTouched] = useState(false);
  useEffect(() => {}, [name, value]);

  return (
    <Grid item xs={col} sx={{ display: "flex", position: "relative" }}>
      <TextField
        disabled={loading || disabled}
        fullWidth
        onBlur={() => {
          handleBlur;
        }}
        label={label}
        type={type ?? "text"}
        variant="outlined"
        name={name}
        onChange={(e) => {
          seTouched(true);
          console.warn(errors);
          onChange(e); // Llama a la función onChange proporcionada por Formik
          e.persist(); // Asegura que el evento esté disponible dentro del callback de useEffect
        }}
        value={value[name]}
        error={(errors[name] && touched) || (errors[name] && message)}
        helperText={errors[name] || helperText}
      />
      {loading && (
        <CircularProgress
          sx={{ position: "absolute", top: "15%", left: "40%" }}
        />
      )}
    </Grid>
  );
};
