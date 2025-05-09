import { IconButton, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import { useMenuContext } from "../../context/MenuContext";
import MenuHeader from "./MenuHeader";
import MenuIcon from "@mui/icons-material/Menu";
import "./Header.scss";

export const Header = () => {
  const { open, setOpen } = useMenuContext();
  
  const toggleSidebar = () => {
    setOpen(prev => !prev);
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Parte izquierda con botón de menú */}
        <div className="header-left">
          <Tooltip title={open ? "Ocultar menú" : "Mostrar menú"}>
            <IconButton
              aria-label={open ? "Ocultar menú" : "Mostrar menú"}
              onClick={toggleSidebar}
              className="menu-button"
              size="large"
            >
              <MenuIcon fontSize="large" />
            </IconButton>
          </Tooltip>
          
         
        </div>

        {/* Parte derecha con menú de usuario */}
        <nav className="header-right" aria-label="Menú principal">
          <ul className="nav-menu">
            <li className="nav-item">
              <MenuHeader />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};