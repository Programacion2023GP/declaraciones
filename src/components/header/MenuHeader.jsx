import * as React from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
import { Button, Drawer, Tooltip } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
// import { unstable_HistoryRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutAuth } from "../../user/auth/auth";
import Avatar from "@mui/material/Avatar";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import * as Yup from "yup";
import { FormikForm } from "../Reusables/formik/FormikForm";
import { Text } from "../Reusables/input/Input";
import { PasswordCompnent } from "../Reusables/componentpassword/ComponentPassword";
import { m } from "framer-motion";
import { Axios } from "../../services/services";
import { Error, Success } from "../../toasts/toast";

// import { logoutAuth } from "../../user/auth/auth";
// const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
//    position: "absolute",
//    "&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft": {
//       bottom: theme.spacing(2),
//       right: theme.spacing(2)
//    },
//    "&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight": {
//       top: theme.spacing(2),
//       left: theme.spacing(2)
//    }
// }));
const actions = [
   { icon: <LogoutIcon />, name: "Cerrar sesión", path: "logout" },
   { icon: <ManageAccountsIcon />, name: "Cambiar contraseña", path: "settings" }
];
const MenuHeader = () => {
   const [text, setText] = React.useState("");
   React.useEffect(() => {
      const firstLetter = localStorage.getItem("Name")[0];
      const paternalSurname = localStorage.getItem("PaternalSurname");
      const SecondLetter = paternalSurname ? paternalSurname[0] : null; // Devuelve null si no existe
            
      setText(firstLetter + SecondLetter);
   }, []);
   const dispatch = useDispatch();
   const [open, setOpen] = React.useState(false);
   const [PasswordChecked, setPasswordChecked] = React.useState(true);
   const [newPasswordChecked, setNewPasswordChecked] = React.useState(true);

   const toggleDrawer = (open) => (event) => {
      if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
         return;
      }
   };
   const navigate = (path) => {
      switch (path) {
         case "logout":
            dispatch(logoutAuth());
            // localStorage.clear()
            break;
         case "settings":
            setOpen(true);

            break;
      }
   };
   const formik = React.useRef(null);
   const initialValues = {
      id_User: parseInt(localStorage.getItem("Id_User")),
      password: "",
      newPassword: ""
   };
   const validationSchema = Yup.object().shape({
      id_User: Yup.number().min(1, "Debes estar logeado").required("Debes estar logeado"),
      password: Yup.string().min(6, "Contraseña debe tener al menos 6 caracteres").required("Contraseña es requerida"),
      newPassword: Yup.string()
         .min(8, "La contraseña debe tener al menos 8 caracteres")
         .matches(/[a-z]/, "La contraseña debe tener al menos una letra minúscula")
         .matches(/[A-Z]/, "La contraseña debe tener al menos una letra mayúscula")
         .matches(/[0-9]/, "La contraseña debe tener al menos un número")
         .required("La contraseña es requerida")
   });
   const submit = async (values) => {

      try {
         await Axios.post("usuarios/pasupdate", values);
         Success("Contraseña actualizada correctamente");
         setOpen(false);
      } catch (error) {
         console.error(error);
         Error("Hubo un error al actualizar la contraseña");
      }
   };
   return (
      <>
         <Tooltip title={`${localStorage.getItem("Name")}  ${localStorage.getItem("PaternalSurname")}`} placement="left-start">
            <SpeedDial
               ariaLabel="SpeedDial basic example"
               sx={{ position: "absolute", top: 4, right: 16, color: "green" }}
               icon={<Avatar sx={{ background: "#1976D2" }}>{text}</Avatar>}
               direction="down"
               ButtonProps={{ color: "i   nherit" }} // Quita el color azul del botón
            >
               {actions.map((action) => (
                  <SpeedDialAction
                     key={action.name}
                     onClick={() => navigate(action.path)}
                     icon={action.icon}
                     tooltipTitle={action.name}
                     ButtonProps={{ color: "inherit" }} // Quita el color azul del botón en cada acción
                  />
               ))}
            </SpeedDial>
         </Tooltip>
         <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
            <Box sx={{ width: 300 }} position={"relative"} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
               <Box position={"absolute"} right={0} top={0}>
                  <IconButton
                     onClick={() => {
                        setOpen(false);
                     }}
                     aria-label="close"
                  >
                     <CloseIcon />
                  </IconButton>

                  <FormikForm
                     title="Cambiar contraseña"
                     button
                     messageButton="Actualizar contraseña"
                     card={false}
                     ref={formik}
                     initialValues={initialValues}
                     validationSchema={validationSchema}
                     submit={submit}
                  >
                     {/* Contraseña */}

                     <PasswordCompnent
                        label={"Contraseña actual"}
                        col={12}
                        name={"password"}
                        newPasswordChecked={PasswordChecked}
                        setNewPasswordChecked={setPasswordChecked}
                     />
                     <PasswordCompnent
                        label={"Contraseña nueva"}
                        col={12}
                        name={"newPassword"}
                        newPasswordChecked={newPasswordChecked}
                        setNewPasswordChecked={setNewPasswordChecked}
                        // checkedShowSwitchPassword={checkedShowSwitchPassword}
                     />
                  </FormikForm>
               </Box>
               {/* Aquí puedes añadir contenido si lo deseas */}
            </Box>
         </Drawer>
      </>
   );
};
export default MenuHeader;
