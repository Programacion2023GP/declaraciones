import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState, useEffect } from "react";

export const Password = ({
  helperText,
  loading = false,
  col,
  label,
  name = "name",
  onChange,
  value = null,
  errors,
  handleBlur,
 
  disabled,
  message,
}) => {
  useEffect(() => {
  }, [name, value]);
  const [showPassword, setShowPassword] = useState(false);
  const [touched, seTouched] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <Grid item xs={col} sx={{ display: "flex", position: "relative" }}>
      <TextField
        disabled={loading ||disabled}
        fullWidth
        onBlur={handleBlur}
        label={label}
        type={showPassword ? "text" : "password"}
        variant="outlined"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
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
      {loading && (
        <CircularProgress
          sx={{ position: "absolute", top: "40%", left: "40%" }}
        />
      )}
    </Grid>
  );
};
