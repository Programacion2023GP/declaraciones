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
   CardContent,
   Alert
} from "@mui/material";
import {
   Logout as LogoutIcon,
   ManageAccounts as ManageAccountsIcon,
   Close as CloseIcon,
   Visibility,
   VisibilityOff
} from "@mui/icons-material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { logoutAuth } from "../../user/auth/auth";
import { Axios } from "../../services/services";
import { Success, Error } from "../../toasts/toast";

const MenuHeader = () => {
   const theme = useTheme();
   const dispatch = useDispatch();

   const [drawerOpen, setDrawerOpen] = useState(
      parseInt(localStorage.getItem("ConfirmationDateTime")) == 0 &&
         parseInt(localStorage.getItem("Id_Role")) != 10
         ? true
         : false
   );

   const [userInitials, setUserInitials] = useState("");

   useEffect(() => {
      const name = localStorage.getItem("Name") || "";
      const lastName = localStorage.getItem("PaternalSurname") || "";
      setUserInitials(`${name[0] || ""}${lastName[0] || ""}`.toUpperCase());
   }, []);

   const fullName = `${localStorage.getItem("Name")} ${localStorage.getItem("PaternalSurname")}`;

   const actions = [
      {
         icon: <ManageAccountsIcon className="!text-[#9B2242]" />,
         name: "Cambiar contraseña",
         action: () => setDrawerOpen(true)
      },
      {
         icon: <LogoutIcon className="!text-[#651D32]" />,
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
                     backgroundColor: "#9B2242 !important",
                     "&:hover": { backgroundColor: "#651D32 !important" }
                  }
               }}
               icon={
                  <Avatar
                     className="!font-bold !border-2 !border-[#B8B6AF]"
                     sx={{
                        bgcolor: "#ffffff !important",
                        color: "#9B2242 !important",
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
                        className:
                           "!bg-white hover:!bg-[#f8f8f8] !transition-all !duration-300 !shadow-md"
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
               className:
                  "!w-full sm:!w-[450px] !p-6 !flex !flex-col !bg-white !rounded-l-2xl !shadow-lg"
            }}
         >
            <PasswordChangeForm onClose={() => setDrawerOpen(false)} />
         </Drawer>
      </>
   );
};

const PasswordChangeForm = ({ onClose }) => {
   const [showPassword, setShowPassword] = useState({ current: false, new: false });

   const initialValues = {
      id_User: parseInt(localStorage.getItem("Id_User")) || 0,
      password:
         parseInt(localStorage.getItem("ConfirmationDateTime")) == 0 &&
            parseInt(localStorage.getItem("Id_Role")) != 10
            ? "123456"
            : "",
      newPassword: ""
   };

   const validationSchema = Yup.object().shape({
      password: Yup.string().min(6, "Mínimo 6 caracteres").required("Requerido"),
      newPassword: Yup.string()
         .min(6, "Mínimo 6 caracteres")
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
      <Card className="!shadow-md !rounded-2xl">
         <CardContent>
            <Box className="!flex !justify-between !items-center !mb-4">
               <Typography
                  variant="h5"
                  className="!font-bold !text-[#651D32]"
               >
                  {parseInt(localStorage.getItem("ConfirmationDateTime")) == 0 ? (
                     <Alert
                        severity="warning"
                        className="!rounded-lg !shadow-md !bg-[#fff8e1] !text-[#5d4037] !border-l-4 !border-[#ffa000] !mb-4"
                     >
                        <div className="!font-bold">ATENCIÓN</div>
                        <div className="!my-2">
                           Favor de actualizar tu contraseña para mejorar la seguridad en la plataforma.
                        </div>
                        <div className="!my-2">
                           La contraseña deberá tener al menos 6 caracteres.
                        </div>
                        <div className="!italic">
                           Guarda tu nueva contraseña en un lugar seguro.
                        </div>
                     </Alert>
                  ) : (
                     "Cambiar Contraseña"
                  )}
               </Typography>

               {parseInt(localStorage.getItem("ConfirmationDateTime")) == 1 &&
                  parseInt(localStorage.getItem("Id_Role")) != 10 && (
                     <IconButton onClick={onClose} className="!text-[#474C55] hover:!text-[#9B2242]">
                        <CloseIcon />
                     </IconButton>
                  )}
            </Box>

            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
               {({ isSubmitting, errors, touched }) => (
                  <Form>
                     <Stack spacing={3}>
                        {parseInt(localStorage.getItem("ConfirmationDateTime")) == 1 &&
                           parseInt(localStorage.getItem("Id_Role")) != 10 && (
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
                           )}

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

                        <Box className="!flex !justify-end !gap-3">
                           {parseInt(localStorage.getItem("ConfirmationDateTime")) == 1 && (
                              <Button
                                 variant="outlined"
                                 onClick={onClose}
                                 className="!border-[#727372] !text-[#474C55] hover:!bg-[#B8B6AF] hover:!text-[#130D0E]"
                              >
                                 Cancelar
                              </Button>
                           )}
                           <Button
                              onClick={()=>{
                                 onClose();
                              }}
                              type="button"
                              variant="outlined"
                              className="
                              !bg-[#F5F5F5]
                              hover:!bg-[#B8B6AF]
                              !text-[#474C55]
                              hover:!text-[#130D0E]
                              !border
                              !border-[#727372]
                              hover:!border-[#651D32]
                              !font-medium
                              !px-6
                              !py-2
                              !rounded-lg
                              !transition-all
                              !duration-300
                              !shadow-sm
  "
                              disabled={isSubmitting}
                           >
                              {isSubmitting ? "Guardando..." : "Salir"}
                           </Button>

                           <Button
                              type="submit"
                              variant="contained"
                              className="!bg-[#9B2242] hover:!bg-[#651D32] !text-white !font-semibold !px-6 !py-2"
                              disabled={isSubmitting}
                           >
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
