import { Grid, RadioGroup, FormControlLabel, Radio } from "@mui/material";
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
  touched,
  handleBlur,
  data,
  rowLayout = true, // Cambia a false para poner en columnas
}) => {
  useEffect(() => {}, [name, value]);

  return (
    <>
      <Grid item xs={col} sx={{ display: "flex", alignItems: "center" }}>
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
                marginRight: rowLayout ? "16px" : 0, // Espacio entre los radio buttons si están en la misma fila
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
        {loading && (
          <CircularProgress
            sx={{ position: "absolute", top: "40%", left: "40%" }}
          />
        )}
      </Grid>
    </>
  );
};
