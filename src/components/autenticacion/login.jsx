import { useState, useEffect } from "react";

import { Formulario } from "../Reusables/formulario/Formulario";
import { Password } from "../Reusables/password/Password";
import { Email } from "../Reusables/email/Email";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";

export const Login = () => {
  const styles = {
    media: {
      objectFit: "contain",
      width: "100%",
      height: "auto",
    },
  };
  const submit = () => {
    alert("holas");
  };
  useEffect(() => {}, []);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Card sx={{ padding: "1.5rem" }}>
          <CardContent>
            <Typography
              variant="h4"
              align="center"
              color="primary"
              gutterBottom
            >
              Iniciar sesión
            </Typography>
            <CardMedia
              component="img"
              alt="Imagen de ejemplo"
              height="100"
              image="https://declaraciones.gomezpalacio.gob.mx/img/logocontraloria2.90b2dfc3.png"
              title="Imagen de ejemplo"
              style={styles.media}
            />
            <Formulario
              submit={submit}
              textButton={"Iniciar sesión"}
              action={"post"}
              post={"/login"}
              navigate={'/'}
            >
              <Email col={12} name="Email" label={"Correo electrónico"} />
              <Password
                col={12}
                name="Password"
                label={"contraseña"}
                validations={{
                  min: 6,
                }}
              />
            </Formulario>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};
