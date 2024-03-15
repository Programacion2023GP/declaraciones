import { FormControl, Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Field, Formik } from "formik";
// Formik
export const Text = ({
  loading = false,
  col,
  label,
  name = "name",
  handleChange,
  value = null,
  type = null,
  errors,
  handleBlur,
  disabled,
  placeholder,
  touched,
  color,
}) => {
  useEffect(() => {
    console.log("aqui", handleBlur);
  }, [name, value]);
  // const [touched, seTouched] = useState(false);
  // console.log("aqui", handleBlur);

  return (
    <>
      <Grid
        style={{ margin: "1rem 0" }}
        item
        xs={col}
        sx={{ display: "flex", position: "relative" }}
      >
        <TextField
          key={"text_" + name}
          name={name}
          label={label}
          type={type ?? "text"}
          variant="outlined"
          value={value[name]}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={loading || disabled}
          fullWidth
          error={(errors[name] && touched[name])}
          helperText={
            errors[name] && touched[name]
              ?errors[name]:placeholder
              
          }
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
