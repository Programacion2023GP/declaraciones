import { Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useEffect } from "react";
import * as Yup from "yup";

export const Input = ({
  col,
  label,
  name = "name",
  onChange,
  value,
  type = null,
  validator,
  message,
  errors,
  touched,
  handleBlur,
  initialValues,
  dataForm,
}) => {
  useEffect(() => {
    validator((prevSchema) => {
      const newSchema = prevSchema.shape({
        [name]: Yup.string().required(
          `${message ?? `El ${name} es requerido`}`
        ),
      });
      
      return newSchema;
    });
    initialValues((prevValues) => ({
      ...prevValues,
      [name]: dataForm[name] || "", // Asigna el valor de dataForm[name] si existe, de lo contrario establece una cadena vacía
    }));
    console.log(dataForm)
  }, [validator, name, message,initialValues]);

  return (
    <Grid item xs={col}>
      <TextField
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
      />
    </Grid>
  );
};