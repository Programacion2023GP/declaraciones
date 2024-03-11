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
  touched,
  handleBlur,
  optional,
  disabled,
  validations,
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

  return (
    <Grid item xs={col} sx={{ display: 'flex', position: 'relative' }}>
      <TextField
        disabled={loading ||disabled}
        fullWidth
        onBlur={handleBlur}
        label={label}
        type={type ?? "text"}
        variant="outlined"
        name={name}
        onChange={handleChange}
        value={maskedValue}
        error={errors[name] && touched[name]}
        helperText={errors[name] && touched[name] ? errors[name] : helperText}
        />
      {loading && <CircularProgress sx={{ position: 'absolute', top: '40%', left: '40%',}} />}
    </Grid>
  );
};
