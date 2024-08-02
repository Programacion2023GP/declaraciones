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
import Loading from "../Reusables/loading/Loading";
import { Opacity } from "@mui/icons-material";
// import { Card, CardContent, Typography, CardMedia, Button, Box } from '@mui/material';

const Login = () => {
   const [messages, setMessages] = useState(false);
   const [loading, setLoading] = useState(false);
   const [loadingPost, setLoadingPost] = useState(false);
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
               position: "relative",
               display: "flex",
               justifyContent: "center",
               alignItems: "center",
               height: "100vh",
               background: "linear-gradient(90deg, rgba(117, 133, 108, 1) 0%, rgba(117, 133, 108, 0.8) 50%, rgba(117, 133, 108, 1) 100%), rgb(52, 73, 52)"
            }}
         >
            <Ngif condition={loadingPost}>
               <Box position={"absolute"}>
                  <Loading />
               </Box>
            </Ngif>
            <Card sx={{ width: { xs: "90%", sm: "70%", md: "50%" }, padding: "2.5rem", boxShadow: 3, opacity: loadingPost ? 0.2 : 1 }}>
               <CardContent>
                  <CardMedia
                     component="img"
                     alt="Imagen de ejemplo"
                     height="140"
                     image={Gomez}
                     title="Imagen de ejemplo"
                     sx={{ height: "fit-content", objectFit: "contain", marginBottom: "2rem" }}
                  />

                  <Formik
                     initialValues={{ Email: "", Password: "" }}
                     validationSchema={validationSchema}
                     onSubmit={async (values, { setSubmitting }) => {
                        setSubmitting(false);
                        try {
                           setLoadingPost(true);
                           const response = await Axios.post("usuarios/login", values);
                           const user = response.data.data.result.user;
                        
                           localStorage.setItem("Id_User", user.Id_User);
                           localStorage.setItem("Id_Person", user.Id_Person);
                           localStorage.setItem("Id_Role", user.Id_Role);
                           localStorage.setItem("Name", user.Name);
                           localStorage.setItem("PaternalSurname", user.PaternalSurname);
                        
                           console.log("Updated", user.Id_Role);
                        
                           const checkLocalStorage = () => {
                              return localStorage.getItem("Id_Role") !== null;
                           };
                        
                           const waitUntilStorageIsUpdated = async () => {
                              while (!checkLocalStorage()) {
                                 await new Promise(resolve => setTimeout(resolve, 100)); // Espera 100ms antes de volver a verificar
                              }
                           };
                        
                           await waitUntilStorageIsUpdated();
                        
                           switch (parseInt(user.Id_Role)) {
                              case 1:
                                 window.location.hash = "/dashboard/checador";
                                 break;
                              case 2:
                                 window.location.hash = "/dashboard/misdeclaraciones";
                                 break;
                              case 3:
                                 window.location.hash = "/dashboard/misdeclaraciones";
                                 break;
                              case 4:
                                 window.location.hash = "/dashboard/usuarios";
                                 break;
                              case 5:
                                 window.location.hash = "/dashboard/checador";
                                 break;
                              default:
                                 console.error("Invalid Id_Role");
                           }
                        } catch (error) {
                           console.error(error);
                           Error("Credenciales incorrectas");
                        } finally {
                           setLoadingPost(false);
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
export default Login;
