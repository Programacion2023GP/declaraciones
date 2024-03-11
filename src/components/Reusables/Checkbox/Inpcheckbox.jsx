import {
  Grid,
  FormControlLabel,
  Checkbox,
  CircularProgress,
} from "@mui/material";
import React from "react";

export const Inpcheckbox = ({ text, checked, handleCheckbox }) => {
  const handleChange = (e) => {
    handleCheckbox(e.target.checked);
  };

  return (
    <FormControlLabel
      control={<Checkbox checked={checked} onChange={handleChange} />}
      label={text}
    />
  );
};

export const CustomCheckbox = ({
  loading = false,
  col,
  label,
  name = "name",
  onChange,
  value = [],
  data,
  rowLayout = true,
}) => {
  return (
    <>
      {rowLayout && <Grid item xs={12} />}
      <Grid item xs={col} sx={{ display: "flex", alignItems: "center" }}>
        <FormControlLabel
          control={
            <Checkbox
              name={name}
              checked={value.includes(data.value)}
              onChange={(e) => {
                const checked = e.target.checked;
                let newValue;
                if (checked) {
                  newValue = data.value;
                } else {
                  newValue = value.filter((val) => val !== String(data.value));
                }
                console.warn("valor", newValue);
                onChange(name, newValue);
              }}
              disabled={loading}
              color="primary"
            />
          }
          label={data.text}
          sx={{
            marginRight: rowLayout ? "16px" : 0,
            marginBottom: rowLayout ? 0 : "8px",
            "& .MuiSvgIcon-root": {
              fontSize: "1.5rem",
            },
            "& .MuiTypography-body1": {
              fontSize: "14px",
            },
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
