import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState,useEffect } from 'react';

export const Password = ({
  helperText,
  loading=false,
  col,
  label,
  name = "name",
  onChange,
  value = null,
  type = null,
  errors,
  touched,
  handleBlur,
 
}) => {
  useEffect(() => {
  }, [ name,value]);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <Grid item xs={col} sx={{ display: 'flex', position: 'relative' }}>
      <TextField
        disabled={loading}
        fullWidth
        onBlur={handleBlur}
        label={label}
        type={showPassword ? 'text' : 'password'}
        variant="outlined"
        InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        name={name}
        onChange={(e) => onChange(name, e.target.value)}
        value={value}
        error={errors[name] && touched[name]}
        helperText={errors[name] && touched[name] ? errors[name] : helperText}
        />
      {loading && <CircularProgress sx={{ position: 'absolute', top: '40%', left: '40%',}} />}
      
  </Grid>
  );
};