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

export const DocumentacionSugerida = () => {
  const { checked, setChecked } = useStepperContext();
  const handleChecked = (value) => {
    setChecked(value);
  };
  return (
    <>
      <CssBaseline />
      <Container maxWidth="xl">
        <Card sx={{ maxWidth: "100%", margin: "auto" }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Documentación sugerida
              <br />
              Paso 1 de 4
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Documentación sugerida para el llenado de la declaración. Para
              agilizar el llenado de la declaración es conveniente que, en el
              momento de la captura, se disponga de la siguiente documentación,
              entre otras, sin que sea necesaria su entrega:
              <ul>
                <li>
                  Clave Única de Registro de Población (CURP) emitida por la
                  Secretaría de Gobernación.
                </li>
                <li>
                  Registro Federal de Contribuyentes (RFC) emitido por el
                  Servicio de Administración Tributaria (SAT).
                </li>
                <li>Acta de matrimonio.</li>
                <li>Comprobante de domicilio.</li>
                <li>Currículum vitae.</li>
                <li>Recibo de nómina y/o declaración fiscal.</li>
                <li>Escrituras públicas y/o contratos de bienes inmuebles.</li>
              </ul>
              <Inpcheckbox
                text="He leído y acepto tener la información necesaria para realizar mi Declaración"
                checked={checked}
                handleCheckbox={handleChecked}
              />
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};
