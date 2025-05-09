import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea, StepperContext } from "@mui/material";
import { Inpcheckbox } from "../../Reusables/Checkbox/Inpcheckbox";
import { useState } from "react";
import { useStepperContext } from "../../../context/StepperContext";

export const BajoProtesta = ({interes = false}) => {
  const { checkedProtesta, setCheckedProtesta } = useStepperContext();
  const handleChecked = (value) => {
    setCheckedProtesta(value);
  };
  return (
    <>
      <CssBaseline />
      <Container maxWidth="xl">
        <Card sx={{ maxWidth: "100%", margin: "auto" }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Bajo Protesta
              <br />
              Paso 4 de 4
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <Inpcheckbox
                text={`Bajo protesta de decir verdad, presento mi declaración de situación patrimonial y de intereses, conforme a lo dispuesto en la ley general de responsabilidades administrativas, la ley general del sistema nacional anticorrupción y la normatividad aplicable.`}
                checked={checkedProtesta}
                handleCheckbox={handleChecked}
              />
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};
