import { Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
export const Rfc = ({
  helperText,
  loading=false,
  col,
  label,
  name = "name",
  onChange,
  value = null,
  type = null,
  errors,
  handleBlur,
  optional,
  disabled,
  validations,
  message,
}) => {
  useEffect(() => {
  }, [ name,value]);
  const [touched, seTouched] = useState(false);

  return (
    <Grid item xs={col} style={{margin:"1rem 0"}} sx={{ display: 'flex', position: 'relative' }}>
      <TextField
        disabled={loading || disabled}
        fullWidth
        onBlur={handleBlur}
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
        value={value}
        error={(errors[name] && touched) || (errors[name] && message)}
        helperText={errors[name] || helperText}
        />
      {loading && <CircularProgress sx={{ position: 'absolute', top: '40%', left: '40%',}} />}
      
  </Grid>
  );
};