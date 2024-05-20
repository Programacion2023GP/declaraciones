import { useState, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Card, CardContent, CardMedia, Typography, Button, Box } from "@mui/material";
import { Axios } from "../../services/services";

import { Success, Error } from "../../toasts/toast";
import { Email } from "../Reusables/email/Email";
import { Password } from "../Reusables/password/Password";
import { useDispatch } from "react-redux";
import { locationAuth, loginAuth } from "../../user/auth/auth";
import { Ngif } from "../Reusables/conditionals/Ngif";
import Gomez from "../../assets/icons/logo-gpd.png";
// import { Card, CardContent, Typography, CardMedia, Button, Box } from '@mui/material';

export const Login = () => {
   const [messages, setMessages] = useState(false);
   const [loading, setLoading] = useState(false);
   const styles = {
      media: {
         margin: "auto",
         display: "block",
         width: "50%",
         paddingTop: "20px",
         paddingBottom: "20px"
      }
   };
   const dispatch = useDispatch();
   const validationSchema = Yup.object().shape({
      Email: Yup.string().email("Formato de correo electrónico inválido").required("El correo electrónico es obligatorio"),
      Password: Yup.string().min(6, "Debe contener al menos 6 caracteres la contraseña").required("La contraseña es obligatoria")
   });
   useEffect(() => {
      // dispatch(locationAuth());
      dispatch(loginAuth());

      setLoading(true);
   }, []);
   return (
      <Ngif condition={loading}>
         <Box
            sx={{
               display: "flex",
               justifyContent: "center",
               alignItems: "center",
               height: "100vh",
               background: "linear-gradient(90deg, rgba(117, 133, 108, 1) 0%, rgba(117, 133, 108, 0.8) 50%, rgba(117, 133, 108, 1) 100%), rgb(52, 73, 52)"
              }}
         >
            <Card sx={{ width: { xs: "90%", sm: "70%", md: "50%" }, padding: "2.5rem", boxShadow: 3 }}>
               <CardContent>
                  <CardMedia
                     component="img"
                     alt="Imagen de ejemplo"
                     height="140"
                     image={Gomez}
                     title="Imagen de ejemplo"
                     sx={{ height: "fit-content", objectFit: "contain",marginBottom:"2rem" }}
                     
                  />

                  <Formik
                     initialValues={{ Email: "", Password: "" }}
                     validationSchema={validationSchema}
                     onSubmit={async (values, { setSubmitting }) => {
                        setSubmitting(false);
                        try {
                           const response = await Axios.post("/login", values);
                           localStorage.setItem("Id_User", response.data.data.result.user.Id_User);
                           localStorage.setItem("Id_Person", response.data.data.result.user.Id_Person);
                           localStorage.setItem("Id_Role", response.data.data.result.user.Id_Role);
                           window.location.hash = "/dashboard/declaraciones";
                           console.log(response.data.data);
                        } catch (error) {
                           console.error(error);
                        }
                     }}
                  >
                     {({ values, handleSubmit, handleChange, errors, touched, handleBlur }) => (
                        <form onSubmit={handleSubmit}>
                           <Email
                              col={12}
                              name="Email"
                              label="Correo electrónico"
                              value={values.Email}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              errors={errors}
                              touched={touched}
                           />
                           <br />
                           <Password
                              col={12}
                              name="Password"
                              label="Contraseña"
                              value={values.Password}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              errors={errors}
                              touched={touched}
                           />
                           <br />
                           <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                              Iniciar sesión
                           </Button>
                        </form>
                     )}
                  </Formik>
               </CardContent>
            </Card>
         </Box>
      </Ngif>
   );
};
