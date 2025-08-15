import { useState, useEffect, useRef } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Card, CardContent, CardMedia, Typography, Button, Box, Grid, Divider, Paper, InputAdornment, IconButton, Link } from "@mui/material";
import { Person as PersonIcon, Lock as LockIcon, Visibility, VisibilityOff, KeyOutlined, ArrowForward, ErrorOutline } from "@mui/icons-material";
import { Axios, GetAxios } from "../../services/services";
import { Success, Error } from "../../toasts/toast";
import { Email } from "../Reusables/email/Email";
import { Password } from "../Reusables/password/Password";
import { useDispatch } from "react-redux";
import { loginAuth } from "../../user/auth/auth";
import { Ngif } from "../Reusables/conditionals/Ngif";
import Gomez from "../../assets/icons/logo-gpd.png";
import { Modal } from "../Reusables/table/DataTable";
import { FormikForm } from "../Reusables/formik/FormikForm";
import { Text } from "../Reusables/input/Input";
import "./styles.css";

const Login = () => {
   const [loading, setLoading] = useState(false);
   const [loadingPost, setLoadingPost] = useState(false);
   const [openModal, setOpenModal] = useState(false);
   const [usuarios, setUsuarios] = useState([]);
   const formik = useRef(null);
   const dispatch = useDispatch();
   const [email, setEmail] = useState(null);

   const validationSchema = Yup.object().shape({
      Email: Yup.string().email("Formato de correo electrónico inválido").required("El correo electrónico es obligatorio"),
      Password: Yup.string().min(6, "Debe contener al menos 6 caracteres la contraseña").required("La contraseña es obligatoria")
      //  certificate: email !== "admin@gomezpalacio.gob.mx" && Yup.mixed()
   });

   const initialValues = {
      Nomina: "",
      Email: "",
      Password: "",
      Id_User: ""
   };

   const validationPassword = Yup.object().shape({
      Nomina: Yup.string().required("El número de nómina es requerido"),
      Email: Yup.string().email("Formato de correo electrónico inválido").required("El correo electrónico es obligatorio"),
      Password: Yup.string().min(6, "Debe contener al menos 6 caracteres la contraseña").required("La contraseña es obligatoria"),
      Id_User: Yup.number().required("El número de nómina es requerido")
   });

   const submitPassword = async (values) => {
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
            Error("El número de nómina no existe");
         }
      }
   };

   useEffect(() => {
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
         <Box
            sx={{
               minHeight: "100vh",
               background: "linear-gradient(135deg, rgb(24, 42, 60) 0%, rgb(33, 58, 82) 40%, rgb(60, 95, 115) 70%, rgb(78, 116, 140) 100%)",
               position: "relative",
               overflow: "hidden"
            }}
         >
            {/* Elementos decorativos de fondo */}
            <Box
               sx={{
                  position: "absolute",
                  width: "60vh",
                  height: "60vh",
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)",
                  top: "-20vh",
                  right: "-20vh",
                  zIndex: 0
               }}
            />
            <Box
               sx={{
                  position: "absolute",
                  width: "80vh",
                  height: "80vh",
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 70%)",
                  bottom: "-30vh",
                  left: "-30vh",
                  zIndex: 0
               }}
            />

            <Grid container sx={{ minHeight: "100vh", position: "relative", zIndex: 1 }}>
               {/* Columna de formulario */}
               <Grid
                  item
                  xs={12}
                  md={5}
                  sx={{
                     display: "flex",
                     justifyContent: "center",
                     alignItems: "center",
                     padding: { xs: 2, md: 4 }
                  }}
               >
                  <Paper
                     elevation={10}
                     sx={{
                        width: { xs: "100%", sm: "90%", md: "80%" },
                        borderRadius: 2,
                        overflow: "hidden",
                        background: "rgba(255, 255, 255, 0.97)",
                        backdropFilter: "blur(10px)"
                     }}
                  >
                     <Box sx={{ padding: 4, pb: 3 }}>
                        <Box sx={{ textAlign: "center", mb: 4 }}>
                           <CardMedia
                              component="img"
                              alt="Logo Gomez Palacio"
                              image={Gomez}
                              sx={{
                                 height: "auto",
                                 width: "70%",
                                 maxWidth: "200px",
                                 objectFit: "contain",
                                 margin: "0 auto 1rem"
                              }}
                           />
                           <Typography
                              variant="h5"
                              component="h1"
                              sx={{
                                 fontWeight: 600,
                                 color: "#2c3e50",
                                 mb: 1
                              }}
                           >
                              Portal de Declaraciones
                           </Typography>
                           <Typography variant="body2" sx={{ color: "#7f8c8d" }}>
                              Ingresa tus credenciales para acceder
                           </Typography>
                        </Box>

                        <Formik
                           initialValues={{ Email: "", Password: "" }}
                           validationSchema={validationSchema}
                           onSubmit={async (values, { setSubmitting }) => {
                              setSubmitting(false);
                              try {
                                 setLoadingPost(true);
                                 const formData = new FormData();
                                 formData.append("Email", values.Email);
                                 formData.append("Password", values.Password);
                                 // if (values.certificate) {
                                 //   formData.append("certificate", values.certificate);
                                 // }

                                 const response = await Axios.post("usuarios/login", formData, {
                                    headers: {
                                       "Content-Type": "multipart/form-data"
                                    }
                                 });

                                 if (!response.data.data.result.user) {
                                    Error(response.data.data.message);
                                    return;
                                 }

                                 const user = response.data.data.result.user;
                                 localStorage.setItem("Id_User", user.Id_User);
                                 localStorage.setItem("Id_Person", user.Id_Person);
                                 localStorage.setItem("Id_Role", user.Id_Role);
                                 localStorage.setItem("Name", user.Name);
                                 localStorage.setItem("PaternalSurname", user.PaternalSurname);
                                 localStorage.setItem("MaternalSurname", user.MaternalSurname);
                                 localStorage.setItem("Sexo", user.Sexo);
                                 localStorage.setItem("ConfirmationDateTime", user.ConfirmationDateTime);

                                 const checkLocalStorage = () => localStorage.getItem("Id_Role") !== null;

                                 const waitUntilStorageIsUpdated = async () => {
                                    while (!checkLocalStorage()) {
                                       await new Promise((resolve) => setTimeout(resolve, 100));
                                    }
                                 };

                                 await waitUntilStorageIsUpdated();

                                 switch (parseInt(user.Id_Role)) {
                                    case 1:
                                    case 11:
                                    case 12:
                                       window.location.hash = "/dashboard/checador";
                                       break;
                                    case 2:
                                    case 3:
                                       window.location.hash = "/dashboard/misdeclaraciones";
                                       break;
                                    case 4:
                                       window.location.hash = "/dashboard/usuarios";
                                       break;
                                    case 5:
                                    case 10:
                                       window.location.hash = "/dashboard/checador";
                                       break;
                                    default:
                                       console.error("Invalid Id_Role");
                                 }
                              } finally {
                                 setLoadingPost(false);
                              }
                           }}
                        >
                           {({ values, handleSubmit, handleChange, errors, touched, handleBlur, setFieldValue }) => {
                              setEmail(values.Email);
                              return (
                                 <form onSubmit={handleSubmit}>
                                    <Box mb={3}>
                                       <Email
                                          col={12}
                                          name="Email"
                                          label="Correo electrónico"
                                          value={values.Email}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          errors={errors}
                                          touched={touched}
                                          InputProps={{
                                             startAdornment: (
                                                <InputAdornment position="start">
                                                   <PersonIcon sx={{ color: "#5c828c" }} />
                                                </InputAdornment>
                                             )
                                          }}
                                       />
                                    </Box>

                                    <Box mb={3}>
                                       <Password
                                          col={12}
                                          name="Password"
                                          label="Contraseña"
                                          value={values.Password}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          errors={errors}
                                          touched={touched}
                                          InputProps={{
                                             startAdornment: (
                                                <InputAdornment position="start">
                                                   <LockIcon sx={{ color: "#5c828c" }} />
                                                </InputAdornment>
                                             )
                                          }}
                                       />
                                    </Box>

                                    {/* <div className="file-upload">
                          <label htmlFor="certificate">
                            <KeyOutlined 
                              fontSize="small" 
                              sx={{ 
                                verticalAlign: 'middle', 
                                mr: 1, 
                                color: '#5c828c' 
                              }} 
                            />
                            Subir certificado (.key)
                            <Typography 
                              variant="caption" 
                              sx={{ 
                                display: 'block', 
                                color: '#7f8c8d',
                                ml: 3.5 
                              }}
                            >
                              Solo para directores
                            </Typography>
                          </label>
                          
                          <div className="file-input-container">
                            <input
                              id="certificate"
                              name="certificate"
                              type="file"
                              accept=".key"
                              onChange={(event) => {
                                setFieldValue("certificate", event.currentTarget.files[0]);
                              }}
                            />
                            <span className="file-input-button">Seleccionar archivo</span>
                          </div>
                          
                          {values.certificate && (
                            <div className="file-name">
                              <i className="file-icon"></i>
                              {values.certificate.name}
                            </div>
                          )}
                          
                          {errors.certificate && touched.certificate && (
                            <div className="error-message">
                              <ErrorOutline fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
                              {errors.certificate}
                            </div>
                          )}
                        </div> */}

                                    <Button
                                       type="submit"
                                       variant="contained"
                                       disabled={loadingPost}
                                       fullWidth
                                       sx={{
                                          mt: 3,
                                          mb: 2,
                                          py: 1.5,
                                          bgcolor: "#3a4a59",
                                          "&:hover": {
                                             bgcolor: "#2c3e50"
                                          },
                                          borderRadius: "8px",
                                          textTransform: "none",
                                          fontWeight: 600,
                                          fontSize: "1rem",
                                          boxShadow: "0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)"
                                       }}
                                       endIcon={!loadingPost && <ArrowForward />}
                                    >
                                       {loadingPost ? "Iniciando sesión..." : "Iniciar sesión"}
                                    </Button>

                                    <Box textAlign="center">
                                       <Link
                                          component="button"
                                          type="button"
                                          onClick={() => setOpenModal(true)}
                                          underline="hover"
                                          sx={{
                                             color: "#5c828c",
                                             fontSize: "0.875rem",
                                             cursor: "pointer",
                                             "&:hover": {
                                                color: "#3a4a59"
                                             }
                                          }}
                                       >
                                          ¿Olvidaste tu contraseña?
                                       </Link>
                                    </Box>
                                 </form>
                              );
                           }}
                        </Formik>
                     </Box>
                  </Paper>
               </Grid>

               {/* Columna de título animado */}
               <Grid
                  item
                  xs={12}
                  md={7}
                  sx={{
                     display: { xs: "none", md: "flex" },
                     flexDirection: "column",
                     justifyContent: "center",
                     alignItems: "center",
                     position: "relative"
                  }}
               >
                  <Box
                     sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        zIndex: 2
                     }}
                  >
                     <Typography
                        variant="h1"
                        sx={{
                           fontSize: { md: 64, lg: 80 },
                           fontWeight: 700,
                           color: "#FFFFFF",
                           textShadow: "0px 0px 20px rgba(255, 255, 255, 0.3)",
                           letterSpacing: 3,
                           position: "relative",
                           "&::after": {
                              content: '""',
                              position: "absolute",
                              bottom: -10,
                              left: 0,
                              width: "100%",
                              height: 4,
                              background: "rgba(255, 255, 255, 0.5)",
                              borderRadius: "2px"
                           }
                        }}
                     >
                        Declaraciones
                     </Typography>

                     <Typography
                        variant="h3"
                        sx={{
                           mt: 3,
                           fontSize: { md: 24, lg: 28 },
                           fontWeight: 400,
                           color: "rgba(255, 255, 255, 0.8)",
                           textAlign: "center",
                           maxWidth: "80%",
                           overflow: "hidden",
                           whiteSpace: "nowrap",
                           borderRight: "0.15em solid rgba(255, 255, 255, 0.8)",
                           animation: "typing 3.5s steps(40, end), blink-caret .75s step-end infinite",
                           "@keyframes typing": {
                              from: { width: 0 },
                              to: { width: "100%" }
                           },
                           "@keyframes blink-caret": {
                              "from, to": { borderColor: "transparent" },
                              "50%": { borderColor: "rgba(255, 255, 255, 0.8)" }
                           }
                        }}
                     >
                        {/* Portal de Administración */}
                     </Typography>
                  </Box>

                  {/* Elementos decorativos */}
                  <Box
                     sx={{
                        position: "absolute",
                        bottom: "10%",
                        right: "10%",
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        background: "rgba(255, 255, 255, 0.5)",
                        boxShadow: "0 0 20px 10px rgba(255, 255, 255, 0.2)",
                        animation: "pulse 4s infinite"
                     }}
                  />
                  <Box
                     sx={{
                        position: "absolute",
                        top: "15%",
                        left: "20%",
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        background: "rgba(255, 255, 255, 0.5)",
                        boxShadow: "0 0 15px 5px rgba(255, 255, 255, 0.15)",
                        animation: "pulse 3s infinite"
                     }}
                  />
               </Grid>
            </Grid>

            {/* Modal para restablecer contraseña */}
            <Modal
               openModal={openModal}
               setOpenModal={() => {
                  setOpenModal(false);
               }}
            >
               <Box sx={{ p: 2 }}>
                  <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: "#3a4a59" }}>
                     Recuperar contraseña
                  </Typography>

                  <FormikForm
                     ref={formik}
                     messageButton={"Actualizar contraseña"}
                     button
                     initialValues={initialValues}
                     validationSchema={validationPassword}
                     submit={submitPassword}
                     buttonProps={{
                        fullWidth: true,
                        sx: {
                           background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                           color: "white",
                           borderRadius: "12px",
                           py: 2,
                           fontSize: "1rem",
                           fontWeight: 600,
                           letterSpacing: "0.5px",
                           boxShadow: "0 4px 6px rgba(92, 130, 140, 0.2)",
                           "&:hover": {
                              background: "linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)",
                              boxShadow: "0 6px 8px rgba(92, 130, 140, 0.3)"
                           },
                           transition: "all 0.3s ease"
                        }
                     }}
                  >
                     <Box
                        sx={{
                           width: "100%",
                           mb: 3,
                           p: 3,
                           borderRadius: "12px",
                           backgroundColor: "rgba(255, 255, 255, 0.8)",
                           boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)"
                        }}
                     >
                        <Text
                           col={12}
                           name={"Nomina"}
                           label={"Número de nómina"}
                           placeholder={"Ingresa tu número de nómina"}
                           handleGetValue={handleNomina}
                           InputProps={{
                              startAdornment: (
                                 <InputAdornment position="start">
                                    <PersonIcon
                                       sx={{
                                          color: "#667eea",
                                          fontSize: "1.25rem"
                                       }}
                                    />
                                 </InputAdornment>
                              ),
                              sx: {
                                 "& .MuiOutlinedInput-root": {
                                    borderRadius: "10px",
                                    "& fieldset": {
                                       borderColor: "#e2e8f0"
                                    },
                                    "&:hover fieldset": {
                                       borderColor: "#cbd5e0"
                                    },
                                    "&.Mui-focused fieldset": {
                                       borderColor: "#667eea",
                                       boxShadow: "0 0 0 2px rgba(102, 126, 234, 0.2)"
                                    }
                                 }
                              }
                           }}
                        />

                        <Text
                           col={12}
                           disabled={true}
                           name={"Email"}
                           type={"email"}
                           label={"Correo electrónico"}
                           placeholder={"Tu correo registrado"}
                           InputProps={{
                              startAdornment: (
                                 <InputAdornment position="start">
                                    {/* <EmailIcon sx={{ 
              color: '#667eea',
              fontSize: '1.25rem'
            }} /> */}
                                 </InputAdornment>
                              ),
                              sx: {
                                 mt: 2,
                                 "& .MuiOutlinedInput-root": {
                                    borderRadius: "10px",
                                    backgroundColor: "#f8fafc",
                                    "& fieldset": {
                                       borderColor: "#e2e8f0"
                                    }
                                 }
                              }
                           }}
                        />

                        <Text
                           col={12}
                           name={"Password"}
                           label={"Nueva contraseña"}
                           type={"password"}
                           placeholder={"Crea una contraseña segura"}
                           InputProps={{
                              startAdornment: (
                                 <InputAdornment position="start">
                                    <LockIcon
                                       sx={{
                                          color: "#667eea",
                                          fontSize: "1.25rem"
                                       }}
                                    />
                                 </InputAdornment>
                              ),
                              endAdornment: (
                                 <InputAdornment position="end">
                                    <IconButton edge="end" onClick={() => setShowPassword(!showPassword)} sx={{ color: "#a0aec0" }}>
                                       {/* {showPassword ? <VisibilityOff /> : <Visibility />} */}
                                    </IconButton>
                                 </InputAdornment>
                              ),
                              sx: {
                                 mt: 2,
                                 "& .MuiOutlinedInput-root": {
                                    borderRadius: "10px",
                                    "& fieldset": {
                                       borderColor: "#e2e8f0"
                                    },
                                    "&:hover fieldset": {
                                       borderColor: "#cbd5e0"
                                    },
                                    "&.Mui-focused fieldset": {
                                       borderColor: "#667eea",
                                       boxShadow: "0 0 0 2px rgba(102, 126, 234, 0.2)"
                                    }
                                 }
                              }
                           }}
                        />
                     </Box>
                  </FormikForm>
               </Box>
            </Modal>
         </Box>
      </Ngif>
   );
};

export default Login;
