import { Button, Grid, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

export const CardForm = ({ children, handleSubmit, textbutton }) => {
  return (
    <Card
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: "90%", margin: "auto", padding: ".8rem" }}
      TouchRippleProps={{ disabled: true }}
    >
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          <Grid container spacing={2}>
            {children}
            <Grid item xs={12}></Grid>

            <Grid item xs={3}>
              <Button variant="contained" type="submit">
                {textbutton}
              </Button>
            </Grid>
          </Grid>
        </Typography>
      </CardContent>
    </Card>
  );
};
