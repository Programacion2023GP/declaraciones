import { Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
export const Text = ({
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
  validations,
  disabled,
  color,
}) => {
  useEffect(() => {}, [name, value]);

  return (
    <>
      <Grid item xs={col} sx={{ display: "flex", position: "relative" }}>
        <TextField
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
          helperText={errors[name] && touched[name] ? errors[name] : null}
          InputLabelProps={{
            style: color ? { color: color } : {},
          }}
        />
        {loading && (
          <CircularProgress
            sx={{ position: "absolute", top: "40%", left: "40%" }}
          />
        )}
      </Grid>
    </>
  );
};
