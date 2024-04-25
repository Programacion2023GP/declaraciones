import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, StepperContext } from "@mui/material";
import { Inpcheckbox } from "../../Reusables/Checkbox/Inpcheckbox";
import { useState } from "react";
import { useStepperContext } from "../../../context/StepperContext";
// import { useStepperContext } from "../../../context/StepperContext";

export const Plazos = () => {
  const { checkedPlazo, setCheckedPlazo } = useStepperContext();
  const handleChange = (value) => {
    setCheckedPlazo(value);
  };
  return (
    <>
      <CssBaseline />
      <Container maxWidth="xl">
        <Card sx={{ maxWidth: "100%", margin: "auto" }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Información de Plazos de Declaración
              <br />
              Paso 3 de 4
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              De los plazos de presentación de las Declaraciones.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <p>
                De conformidad con el artículo 33 de la Ley, la presentación de
                las Declaraciones materia del presente documento, se hará de
                conformidad con los siguientes plazos:
              </p>

              <h3>
                <strong>Inicial:</strong>
              </h3>
              <p>
                Dentro de los sesenta días naturales siguientes a la toma de
                posesión con motivo del:
              </p>
              <p>
                <li>Ingreso al servicio público por primera vez</li>
                <li>Reingreso al servicio público después de sesenta días</li>
              </p>

              <h3>
                <strong>Modificación:</strong>
              </h3>
              <p>
                Durante el mes de mayo de cada año, siempre y cuando haya
                laborado al menos un día del año inmediato anterior.
              </p>

              <h3>
                <strong>Conclusión del cargo:</strong>
              </h3>
              <p>
                Dentro de los sesenta días naturales siguientes a la conclusión
                del encargo.
              </p>
              <Inpcheckbox
                text="He leído y comprendido la información acerca de los Plazos de Declaración."
                checked={checkedPlazo}
                handleCheckbox={handleChange}
              />
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};
