import  { useEffect, useState } from "react";
import { Grid, FormControlLabel, Checkbox, CircularProgress, Typography } from "@mui/material";
import { useFormikContext } from "formik";




export const CustomCheckbox = ({
  loading = false,
  col,
  label,
  name,
  checked=false,
  value,
  rowLayout = true,
}) => {
  const [checkedComponent, setCheckedComponent] = useState(checked); // Estado inicializado como falso
  const formik = useFormikContext();
  const isError = formik.touched[name] && formik.errors[name];

  useEffect(() => {
    if(checked){
      formik.setFieldValue(name,value);

    }
    console.warn("aqui", formik.values[name]);
  }, [checked,formik.values[name]]);

  return (
    <>
      {rowLayout && <Grid item xs={12} />}
      <Grid item xs={col} sx={{ display: "flex", alignItems: "center", position: "relative" }}>
        <FormControlLabel
          control={
            <Checkbox
              name={name}
              checked={checkedComponent}
              onChange={(e) => {
                const checked = e.target.checked;
                setCheckedComponent(checked); // Actualiza el estado del componente
                formik.setFieldValue(name, checked ? value : undefined);
              }}
              disabled={loading}
              color="primary"
            />
          }
          label={label}
          sx={{
            marginRight: rowLayout ? "16px" : 0,
            marginBottom: rowLayout ? 0 : "8px",
            "& .MuiSvgIcon-root": {
              fontSize: "1.5rem"
            },
            "& .MuiTypography-body1": {
              fontSize: "14px"
            }
          }}
        />
        {loading && <CircularProgress sx={{ position: "absolute", top: "40%", left: "40%" }} />}
        <Typography sx={{ color: isError ? "red" : "gray" }} variant="subtitle2" color="initial">
          {isError}
        </Typography>
      </Grid>
    </>
  );
};
