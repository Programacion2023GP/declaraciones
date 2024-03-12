import { Button, Grid, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

export const CardForm = ({
  children,
  handleSubmit,
  textButton,
  stepper,
  stepperFunction,
  stepperText,
}) => {
  return (
    <form
      // component="form"
      onSubmit={handleSubmit}
      TouchRippleProps={{ disabled: true }}
    >
      <CardContent>
        <Typography
          variant="h3"
          align="center"
          color="textPrimary"
          style={{ fontWeight: "500" }}
        >
          {/* {title} */}
        </Typography>
        <br />
        <Typography variant="body2" color="text.secondary">
          <Grid container spacing={3}>
            {children}
            <Grid item xs={12}></Grid>
            {stepper && (
              <>
                <Grid item xs={3}>
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={stepperFunction}
                  >
                    {stepperText}
                  </Button>
                </Grid>
                <Grid item xs={2}></Grid>
              </>
            )}
            <Grid item xs={3}>
              <Button variant="contained" type="submit">
                {textButton}
              </Button>
            </Grid>
          </Grid>
        </Typography>
      </CardContent>
    </form>
  );
};
