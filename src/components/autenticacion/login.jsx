import { useState, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import { Axios } from "../../services/services";
import { Success, Error } from "../../toasts/toast";
import { Email } from "../Reusables/email/Email";
import { Password } from "../Reusables/password/Password";

export const Login = () => {
  const [messages, setMessages] = useState(false);
  const styles = {
    media: {
      objectFit: "contain",
      width: "100%",
      height: "auto",
    },
  };

  const validationSchema = Yup.object().shape({
    Email: Yup.string()
      .email("Formato de correo electrónico inválido")
      .required("El correo electrónico es obligatorio"),
    Password: Yup.string()
      .min(6, "Debe contener al menos 6 caracteres la contraseña")
      .required("La contraseña es obligatoria"),
  });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card sx={{ width: "50%" }}>
        <CardContent>
          <Typography variant="h4" align="center" color="primary" gutterBottom>
            Iniciar sesión
          </Typography>
          <CardMedia
            component="img"
            alt="Imagen de ejemplo"
            height="10"
            image="https://declaraciones.gomezpalacio.gob.mx/img/logocontraloria2.90b2dfc3.png"
            title="Imagen de ejemplo"
            style={styles.media}
          />
          <Formik
            initialValues={{ Email: "", Password: "" }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              setSubmitting(false);

              try {
                setMessages(false);
                const response = await Axios.post("/login", values);
                
                Success(response.data.data.message);
                console.log(response.data.data);
                localStorage.setItem("Id_User", response.data.data.result.user.Id_User);
                localStorage.setItem("Id_Person", response.data.data.result.user.Id_Person);
                localStorage.setItem("Id_Role", response.data.data.result.user.Id_Role);
                window.location.hash = "/";
                return response.data;
              } catch (error) {
                if (error.response?.data?.data?.message) {
                  Error(error.response.data.data.message);
                } else {
                  Error("NO EXISTE CONEXION A LA DB");
                }
                return { error: error };
              }
            }}
          >
            {({
              values,
              handleSubmit,
              handleChange,
              errors,
              touched,
              handleBlur,
            }) => (
              <form onSubmit={handleSubmit}>
                <Email
                  col={12}
                  name="Email"
                  label="Correo electrónico"
                  value={values["Email"]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errors={errors}
                  message={messages}
                />
                <br />
                <Password
                  col={12}
                  name="Password"
                  label="Contraseña"
                  value={values["Password"]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errors={errors}
                  message={messages}
                />
                <br />
                <Button
                  type="submit"
                  onClick={() => {
                    setMessages(true);
                  }}
                  variant="contained"
                  color="primary"
                >
                  Enviar
                </Button>
              </form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </div>
  );
};
