import * as React from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
import { Button } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
// import { unstable_HistoryRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutAuth } from "../../user/auth/auth";
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
    { icon: <ManageAccountsIcon />, name: "Configurar perfil", path: "settings" }
];
const MenuHeader = () => {
    const dispatch = useDispatch()
    const navigate = (path) => {
        switch (path) {
            case "logout":
                dispatch(logoutAuth())
                
          
              // localStorage.clear()
              break;
            }
        };
        return (
      <SpeedDial
         ariaLabel="SpeedDial basic example"
         sx={{ position: "absolute", top: 4, right: 16 }}
         icon={<AccountCircle />}
         direction="down"
         ButtonProps={{ color: "inherit" }} // Quita el color azul del botón
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
   );
};
export default MenuHeader;
