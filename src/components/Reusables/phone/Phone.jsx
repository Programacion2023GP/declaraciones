import { Grid, TextField, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";

export const Phone = ({
  helperText,
  loading = false,
  col,
  label,
  name = "name",
  onChange,
  value = null,
  type = null,
  errors,
  handleBlur,
  disabled,
  message,
}) => {
  const [maskedValue, setMaskedValue] = useState(value);

  useEffect(() => {
    if (value) {
      const masked = maskPhoneNumber(value);
      setMaskedValue(masked);
    } else {
      setMaskedValue("");
    }
  }, [value]);

  const maskPhoneNumber = (phoneNumber) => {
    // Aplicar la máscara (xxx)-xxx-xxxx
    return phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, "($1)-$2-$3");
  };

  const handleChange = (e) => {
    let newValue = e.target.value.replace(/[^0-9-]/g, "");

    // Limitar la longitud del número de teléfono a 10 dígitos
    if (newValue.length > 12) {
      newValue = newValue.slice(0, 12);
    }

    setMaskedValue(maskPhoneNumber(newValue));
    onChange(name, newValue.replace(/-/g, ""));
  };
  const [touched, seTouched] = useState(false);

  return (
    <Grid item xs={col} sx={{ display: "flex", position: "relative" }}>
      <TextField
        disabled={loading || disabled}
        fullWidth
        onBlur={handleBlur}
        label={label}
        type={type ?? "text"}
        variant="outlined"
        name={name}
        onChange={(e) => {
          handleChange;
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
