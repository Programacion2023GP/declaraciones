import { Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";

export const AutoComplete = ({
  helperText,
  loading = false,
  col,
  label,
  name = "name",
  onChange,
  value = null,
  options,
  errors,
  touched,
  optional,
  disabled,
  message,
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleAutocompleteChange = (event, newValue) => {
    if (newValue) {
      onChange(name, parseInt(newValue.id));
    } else {
      onChange(name, ""); // Clear the value if no option is selected
    }
  };

  return (
    <Grid
      item
      xs={col}
      container
      sx={{ display: "flex", position: "relative" }}
    >
      <Autocomplete
        disabled={disabled}
        sx={{ minWidth: "100%" }}
        disablePortal
        id={`${name}-autocomplete`}
        options={options}
        getOptionLabel={(option) => option.text}
        onChange={(e) => {
          handleAutocompleteChange
          seTouched(true);
          console.warn(errors);
          onChange(e); // Llama a la función onChange proporcionada por Formik
          e.persist(); // Asegura que el evento esté disponible dentro del callback de useEffect
        }}        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(String(newInputValue));
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            disabled={loading || disabled}
            value={value}
            fullWidth
            onBlur={handleBlur}
            label={label}
            variant="outlined"
            error={(errors[name] && touched) || (errors[name] && message)}
            helperText={errors[name] || helperText}
            InputProps={{
              style: optional ? { color: "green" } : {},
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
    </Grid>
  );
};
