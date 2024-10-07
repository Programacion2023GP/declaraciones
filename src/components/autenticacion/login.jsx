import { useState, useEffect, useRef } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Card, CardContent, CardMedia, Typography, Button, Box, Grid } from "@mui/material";
import { Axios, GetAxios, PostAxios } from "../../services/services";

import { Success, Error } from "../../toasts/toast";
import { Email } from "../Reusables/email/Email";
import { Password } from "../Reusables/password/Password";
import { useDispatch } from "react-redux";
import { locationAuth, loginAuth } from "../../user/auth/auth";
import { Ngif } from "../Reusables/conditionals/Ngif";
import Gomez from "../../assets/icons/logo-gpd.png";
import Loading from "../Reusables/loading/Loading";
import { Opacity } from "@mui/icons-material";
import { Modal } from "../Reusables/table/DataTable";
import { FormikForm } from "../Reusables/formik/FormikForm";
import { Text } from "../Reusables/input/Input";
import { FileInputComponent } from "../Reusables/images/Images";
// import { Card, CardContent, Typography, CardMedia, Button, Box } from '@mui/material';
import "./styles.css";
const Login = () => {
   const [messages, setMessages] = useState(false);
   const [loading, setLoading] = useState(false);
   const [loadingPost, setLoadingPost] = useState(false);
   const [openModal, setOpenModal] = useState(false);
   const [usuarios, setUsuarios] = useState([]);
   const [imgFile, setImgFile] = useState([]);
   const formik = useRef(null);
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
      Password: Yup.string().min(6, "Debe contener al menos 6 caracteres la contraseña").required("La contraseña es obligatoria"),
      certificate: Yup.mixed()
         .required("El archivo es requerido")
         .test("fileType", "El archivo debe tener extensión .key", (value) => {
            return value && value.name.endsWith(".key");
         })
   });
   const initialValues = {
      Nomina: "",
      Email: "",
      Password: "",
      Id_User: ""
   };
   const validationPassword = Yup.object().shape({
      Nomina: Yup.string().required("El numero de nomina es requerido"),
      Email: Yup.string().email("Formato de correo electrónico inválido").required("El correo electrónico es obligatorio"),
      Password: Yup.string().min(6, "Debe contener al menos 6 caracteres la contraseña").required("La contraseña es obligatoria"),
      Id_User: Yup.number().required("El numero de nomina es requerido")
   });
   const sumbitPassword = async (values) => {
      try {
         await Axios.post("usuarios/updatePassword", values);
         Success("Contraseña actualizada correctamente");
         formik.current.resetForm();
         setOpenModal(false);
      } catch (error) {
         console.error(error);
         Error("Hubo un error al actualizar la contraseña");
      }
   };
   const handleNomina = async (name, value) => {
      if (value.length >= 6) {
         const response = usuarios.filter((item) => item.Nomina == parseInt(value))[0];
         const { Email, Id_User } = response || {};
         formik.current.setFieldValue("Email", Email);
         formik.current.setFieldValue("Id_User", Id_User);

         if (!Email) {
            Error("El numero de nomina no existe");
         }
      }
   };
   useEffect(() => {
      // dispatch(locationAuth());
      dispatch(loginAuth());
      const init = async () => {
         const response = await GetAxios(`usuarios/index`);
         if (response.length > 0) {
            setUsuarios(response);
         }
      };
      init();
      setLoading(true);
   }, []);
   return (
      <Ngif condition={loading}>
         <Grid container sx={{ background: "linear-gradient(90deg, rgb(34, 45, 56) 0%, rgb(58, 74, 89) 40%, rgb(92, 130, 140) 60%, rgb(70, 99, 116) 100%)" }}>
            <Grid item xs={12} md={5}>
               <Box
                  sx={{
                     display: "flex",
                     justifyContent: "center",
                     alignItems: "center",
                     height: "100vh"
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
                           sx={{ height: "fit-content", objectFit: "contain", marginBottom: "2rem" }}
                        />

                        <Formik
                           initialValues={{ Email: "", Password: "", certificate: null }}
                           validationSchema={validationSchema}
                           onSubmit={async (values, { setSubmitting }) => {

                              setSubmitting(false);
                              try {
                                 setLoadingPost(true);
                                 const formData = new FormData();
                                 formData.append("Email", values.Email);
                                 formData.append("Password", values.Password);
                                 if (values.certificate) {
                                   formData.append("certificate", values.certificate);
                                 }
                           
                                 const response = await Axios.post("usuarios/login", formData, {
                                   headers: {
                                     "Content-Type": "multipart/form-data", // Establecer el tipo de contenido a multipart/form-data
                                   },
                                 });                                 const user = response.data.data.result.user;
                                 localStorage.setItem("Id_User", user.Id_User);
                                 localStorage.setItem("Id_Person", user.Id_Person);
                                 localStorage.setItem("Id_Role", user.Id_Role);
                                 localStorage.setItem("Name", user.Name);

                                 localStorage.setItem("PaternalSurname", user.PaternalSurname);
                                 localStorage.setItem("MaternalSurname", user.MaternalSurname);
                                 localStorage.setItem("Sexo", user.Sexo);

                                 const checkLocalStorage = () => {
                                    return localStorage.getItem("Id_Role") !== null;
                                 };

                                 const waitUntilStorageIsUpdated = async () => {
                                    while (!checkLocalStorage()) {
                                       await new Promise((resolve) => setTimeout(resolve, 100)); // Espera 100ms antes de volver a verificar
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
                                    case 10:
                                       window.location.hash = "/dashboard/checador";

                                       break;
                                    default:
                                       console.error("Invalid Id_Role");
                                 }
                              } catch (error) {
                                 console.error(error);
                                 Error("Credenciales incorrectas");
                                 setImgFile([]);
                              } finally {
                                 setLoadingPost(false);
                              }
                           }}
                        >
                           {({ values, handleSubmit, handleChange, errors, touched, handleBlur, setFieldValue }) => (
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
                                 <div className="file-upload">
                                    <label htmlFor="certificate">Subir certificado (.key):</label>
                                    <input
                                       id="certificate"
                                       name="certificate"
                                       type="file"
                                       accept=".key"
                                       onChange={(event) => {
                                          setFieldValue("certificate", event.currentTarget.files[0]);
                                       }}
                                    />
                                    {errors.certificate && touched.certificate ? <div className="error-message">{errors.certificate}</div> : null}
                                 </div>

                                 <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                                    Iniciar sesión
                                 </Button>
                                 <a href="#" style={{ cursor: "pointer" }} onClick={() => setOpenModal(true)}>
                                    ¿olvidaste tu contraseña?
                                 </a>
                              </form>
                           )}
                        </Formik>
                        <Modal
                           openModal={openModal}
                           setOpenModal={() => {
                              setOpenModal(false);
                           }}
                        >
                           <FormikForm
                              ref={formik}
                              messageButton={"Actualizar mi contraseña"}
                              button
                              initialValues={initialValues}
                              validationSchema={validationPassword}
                              submit={sumbitPassword}
                           >
                              <Text col={12} name={"Nomina"} label={"Numero de nomina"} handleGetValue={handleNomina} />
                              <Text col={12} disabled={true} name={"Email"} type={"email"} label={"Correo electrónico"} />
                              <Text col={12} name={"Password"} label={"Nueva contraseña"} type={"password"} />
                              <Box style={{ margin: "2rem" }}></Box>
                           </FormikForm>
                        </Modal>
                     </CardContent>
                  </Card>
               </Box>
            </Grid>
            <Grid
               item
               xs={12}
               md={7}
               sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100vh"
               }}
            >
               <Typography
                  variant="h1"
                  sx={{
                     fontSize: 80,
                     fontWeight: 700,
                     color: "#FFFFFF",
                     textShadow: "0px 0px 10px rgba(255, 255, 255, 0.5)",
                     letterSpacing: 2,
                     overflow: "hidden",
                     whiteSpace: "nowrap",
                     animation: "typing 6s infinite",
                     "@keyframes typing": {
                        "0%": {
                           width: 0
                        },
                        "80%": {
                           width: "100%"
                        },
                        "90%": {
                           width: "100%"
                        },
                        "100%": {
                           width: 0
                        }
                     }
                  }}
               >
                  <span>Declaraciones</span>
               </Typography>
            </Grid>
         </Grid>
      </Ngif>
   );
};
export default Login;
