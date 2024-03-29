import { Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useEffect } from "react";
import CircularProgress from '@mui/material/CircularProgress';
export const TextArea = ({
  helperText,
  loading=false,
  rows=5,
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
  color,
  placeholder,
}) => {
  useEffect(() => {
  }, [ name,value]);

  return (
    <Grid item xs={col} sx={{ display: 'flex', position: 'relative' }}>
      <TextField
        placeholder={placeholder}
        multiline={true}
        rows={rows}
        disabled={loading || disabled}
        fullWidth
        onBlur={handleBlur}
        label={label}
        type={type ?? "text"}
        variant="outlined"
        name={name}
        onChange={(e) => onChange(name, e.target.value)}
        value={value}
        error={errors[name] && touched[name]}
        helperText={errors[name] && touched[name] ? errors[name] : helperText}
        InputLabelProps={{
          style: color ? { color: color } : {},
        }}
        />
      {loading && <CircularProgress sx={{ position: 'absolute', top: '40%', left: '40%',}} />}
      
  </Grid>
  );
};