import { IconButton, Tooltip } from "@mui/material";
import { useSidebarContext } from "../../context/SidebarContext"; // ← cambia el import
import MenuHeader from "./MenuHeader";
import MenuIcon from "@mui/icons-material/Menu";
import "./Header.scss";

export const Header = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebarContext(); // ← usa el hook del sidebar

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <Tooltip title={isSidebarOpen ? "Ocultar menú" : "Mostrar menú"}>
            <IconButton
              aria-label={isSidebarOpen ? "Ocultar menú" : "Mostrar menú"}
              onClick={toggleSidebar}
              className="menu-button"
              size="large"
            >
              <MenuIcon fontSize="large" />
            </IconButton>
          </Tooltip>
        </div>

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