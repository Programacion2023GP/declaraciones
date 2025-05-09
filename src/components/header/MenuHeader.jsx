import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useTheme } from "@mui/material/styles";
import {
   Box,
   SpeedDial,
   SpeedDialAction,
   Tooltip,
   Drawer,
   IconButton,
   Avatar,
   Typography,
   Stack,
   TextField,
   Button,
   InputAdornment,
   Card,
   CardContent
} from "@mui/material";
import { Logout as LogoutIcon, ManageAccounts as ManageAccountsIcon, Close as CloseIcon, Visibility, VisibilityOff } from "@mui/icons-material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { logoutAuth } from "../../user/auth/auth";
import axios from "axios";
import { Axios, PostAxios } from "../../services/services";
import { Success } from "../../toasts/toast";

const MenuHeader = () => {
   const theme = useTheme();
   const dispatch = useDispatch();
   // const [drawerOpen, setDrawerOpen] = useState(parseInt(localStorage.getItem("ConfirmationDateTime")) == 0  && parseInt(localStorage.getItem('Id_Role'))!=10 ? true : false);
   const [drawerOpen, setDrawerOpen] = useState(false);

   const [userInitials, setUserInitials] = useState("");

   // Obtener datos del usuario
   useEffect(() => {
      const name = localStorage.getItem("Name") || "";
      const lastName = localStorage.getItem("PaternalSurname") || "";
      setUserInitials(`${name[0] || ""}${lastName[0] || ""}`.toUpperCase());
   }, []);

   const fullName = `${localStorage.getItem("Name")} ${localStorage.getItem("PaternalSurname")}`;

   const actions = [
      {
         icon: <ManageAccountsIcon color="primary" />,
         name: "Cambiar contraseña",
         action: () => setDrawerOpen(true)
      },
      {
         icon: <LogoutIcon color="error" />,
         name: "Cerrar sesión",
         action: () => dispatch(logoutAuth())
      }
   ];

   return (
      <>
         {/* Menú de usuario flotante */}
         <Tooltip title={fullName} placement="left-start" arrow>
            <SpeedDial
               ariaLabel="User menu"
               sx={{
                  position: "fixed",
                  top: 16,
                  right: 16,
                  "& .MuiSpeedDial-fab": {
                     backgroundColor: theme.palette.primary.main,
                     "&:hover": {
                        backgroundColor: theme.palette.primary.dark
                     }
                  }
               }}
               icon={
                  <Avatar
                     sx={{
                        bgcolor: theme.palette.background.paper,
                        color: theme.palette.primary.main,
                        fontWeight: "bold"
                     }}
                  >
                     {userInitials}
                  </Avatar>
               }
               direction="down"
            >
               {actions.map((action) => (
                  <SpeedDialAction
                     key={action.name}
                     icon={action.icon}
                     tooltipTitle={action.name}
                     tooltipOpen
                     onClick={action.action}
                     FabProps={{
                        sx: {
                           margin: 2,
                           backgroundColor: theme.palette.background.paper,
                           "&:hover": {
                              backgroundColor: theme.palette.action.hover
                           }
                        }
                     }}
                  />
               ))}
            </SpeedDial>
         </Tooltip>

         {/* Drawer para cambiar contraseña */}
         <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={(event, reason) => {
               if (reason === "backdropClick" || reason === "escapeKeyDown") return;
               setDrawerOpen(false);
            }}
            PaperProps={{
               sx: {
                  width: { xs: "100%", sm: 450 },
                  p: 3,
                  display: "flex",
                  flexDirection: "column"
               }
            }}
         >
            <PasswordChangeForm onClose={() => setDrawerOpen(false)} />
         </Drawer>
      </>
   );
};

// Componente del formulario de cambio de contraseña
const PasswordChangeForm = ({ onClose }) => {
   const [showPassword, setShowPassword] = useState({
      current: false,
      new: false
   });

   const initialValues = {
      id_User: parseInt(localStorage.getItem("Id_User")) || 0,
      password: parseInt(localStorage.getItem("ConfirmationDateTime")) == 0 && parseInt(localStorage.getItem('Id_Role'))!=10  ? "123456" : "",
      newPassword: ""
   };

   const validationSchema = Yup.object().shape({
      password: Yup.string().min(6, "Mínimo 6 caracteres").required("Requerido"),
      newPassword: Yup.string()
         .min(8, "Mínimo 8 caracteres")
         .matches(/[a-z]/, "Requiere minúscula")
         .matches(/[A-Z]/, "Requiere mayúscula")
         .matches(/[0-9]/, "Requiere número")
         .notOneOf([Yup.ref("password")], "Debe ser diferente")
         .required("Requerido")
   });

   const handleSubmit = async (values, { setSubmitting }) => {
      try {
         await Axios.post("usuarios/pasupdate", values);
         Success("Contraseña actualizada correctamente");
         onClose();
      } catch (error) {
         console.error("Error:", error);
         Error("Error al actualizar contraseña");
      } finally {
         setSubmitting(false);
      }
   };

   return (
      <Card elevation={3}>
         <CardContent>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
               <Typography variant="h5">
                {parseInt(localStorage.getItem("ConfirmationDateTime")) ==0? "Cambia tu contraseña para continuar": "Cambiar Contraseña"}
                </Typography>
               {parseInt(localStorage.getItem("ConfirmationDateTime")) == 1 && parseInt(localStorage.getItem('Id_Role'))!=10 && (
                  <IconButton onClick={onClose}>
                     <CloseIcon />
                  </IconButton>
               )}
            </Box>

            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
               {({ isSubmitting, errors, touched }) => (
                  <Form>
                     <Stack spacing={3}>
                        {/* Campo de contraseña actual */}
                        {/* {parseInt(localStorage.getItem("ConfirmationDateTime")) ==1 && parseInt(localStorage.getItem('Id_Role'))!=10  && ( */}

                        <Field name="password">
                           {({ field }) => (
                              <TextField
                                 {...field}
                                 fullWidth
                                 label="Contraseña actual"
                                 type={showPassword.current ? "text" : "password"}
                                 error={touched.password && Boolean(errors.password)}
                                 helperText={touched.password && errors.password}
                                 InputProps={{
                                    endAdornment: (
                                       <InputAdornment position="end">
                                          <IconButton
                                             onClick={() =>
                                                setShowPassword({
                                                   ...showPassword,
                                                   current: !showPassword.current
                                                })
                                             }
                                             edge="end"
                                          >
                                             {showPassword.current ? <VisibilityOff /> : <Visibility />}
                                          </IconButton>
                                       </InputAdornment>
                                    )
                                 }}
                              />
                           )}
                        </Field>
                       

                        {/* Campo de nueva contraseña */}
                        <Field name="newPassword">
                           {({ field }) => (
                              <TextField
                                 {...field}
                                 fullWidth
                                 label="Nueva contraseña"
                                 type={showPassword.new ? "text" : "password"}
                                 error={touched.newPassword && Boolean(errors.newPassword)}
                                 helperText={touched.newPassword && errors.newPassword}
                                 InputProps={{
                                    endAdornment: (
                                       <InputAdornment position="end">
                                          <IconButton
                                             onClick={() =>
                                                setShowPassword({
                                                   ...showPassword,
                                                   new: !showPassword.new
                                                })
                                             }
                                             edge="end"
                                          >
                                             {showPassword.new ? <VisibilityOff /> : <Visibility />}
                                          </IconButton>
                                       </InputAdornment>
                                    )
                                 }}
                              />
                           )}
                        </Field>

                        {/* Botones de acción */}
                        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                           {/* {parseInt(localStorage.getItem("ConfirmationDateTime")) == 1 && ( */}
                              <Button variant="outlined" onClick={onClose}>
                                 Cancelar
                              </Button>
                           {/* )} */}
                           <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                              {isSubmitting ? "Guardando..." : "Aceptar"}
                           </Button>
                        </Box>
                     </Stack>
                  </Form>
               )}
            </Formik>
         </CardContent>
      </Card>
   );
};

export default MenuHeader;
