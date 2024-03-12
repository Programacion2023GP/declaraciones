import {
  Grid,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";

export const CustomRadio = ({
  loading = false,
  col,
  label,
  name = "name",
  onChange,
  value = null,
  type = null,
  errors,
  message,
  touched,
  helperText,
  handleBlur,
  title,
  data,
  rowLayout = true, // Cambia a false para poner en columnas
}) => {
  useEffect(() => {}, [name, value]);

  return (
    <>
      <Grid
        item
        xs={col}
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Typography
          variant="subtitle1"
          align="center"
          color="textPrimary"
          sx={{ marginBottom: "1rem" }} // Agregar espacio debajo del título
        >
          {title}
        </Typography>
        <RadioGroup
          name={name}
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          sx={{ flexDirection: rowLayout ? "row" : "column" }} // Ajusta la dirección del grupo de radio
        >
          {data.map((item, index) => (
            <FormControlLabel
              key={index}
              value={item}
              control={<Radio />}
              label={item}
              disabled={loading}
              sx={{
                marginBottom: rowLayout ? 0 : "8px", // Espacio entre los radio buttons si están en columnas
                "& .MuiRadio-root": {
                  color: "#1976d2",
                },
                "& .MuiFormControlLabel-label": {
                  color: "#1976d2",
                  fontSize: "14px",
                },
                "& .Mui-checked": {
                  color: "#1976d2",
                },
              }}
            />
          ))}
        </RadioGroup>
        {errors[name] && touched[name] && (
          <Typography variant="body2" color="error">
            {message&& errors[name] }
          </Typography>
        )}
        {helperText && (
          <Typography variant="body2" color="textSecondary">
            {helperText}
          </Typography>
        )}
        {loading && (
          <CircularProgress
            sx={{ position: "absolute", top: "40%", left: "40%" }}
          />
        )}
      </Grid>
    </>
  );
};
